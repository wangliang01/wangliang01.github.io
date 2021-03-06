<template>
  <div class="base-table">
    <slot name="default"></slot>
    <el-table
      :key="key"
      v-bind="tableAttrs"
      :data="data"
      :tooltip-effect="tableAttrs['tooltip-effect'] || 'dark'"
      :style="`width: ${width || '100%'}`"
      v-on="$listeners"
    >
      <TableItem
        v-for="(col, index) in columnAttrs"
        :key="index"
        :col="col"
        :columns="columns"
      ></TableItem>
    </el-table>
    <el-pagination
      v-if="paginationAttrs.isPagination"
      v-bind="paginationAttrs"
      style="margin-top: 20px;text-align: right;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>
<script>
import { defaultTableAttrs, defaultColumn, defaultPagination } from './config'
import TableItem from './TableItem'
export default {
  name: 'YTable',
  components: {
    TableItem
  },
  props: {
    /**
     * data:  显示的数据， 等同于el-table中的data属性
     */
    data: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * columns: 显示和表格项，数组里的每一项都是一个对象，对象中的属性与el-table-column中的属性一一对应
     */
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * pagination: 分页属性：如果为Boolean为true,则取默认值，如果是对象，则merge默认值， 如果total有值，会覆盖pagination中的total属性
     */
    pagination: {
      type: [Object, Boolean],
      default: false
    },
    /**
     * 分页总数，
     */
    total: {
      type: Number,
      default: 0
    },
    // 重新加载函数
    reload: {
      type: Function,
      default() {
        return () => {}
      }
    }
  },
  data() {
    return {
      key: Math.random().toString(32).replace('.', ''),
      tableAttrs: defaultTableAttrs, // 表格属性，同el-table上的属性
      columnAttrs: [], // 表格项属性， 同el-table-column上的属性
      paginationAttrs: {} // 分页属性，同el-pagination上的属性
    }
  },
  watch: {
    pagination: {
      handler() {
        this.getPagination()
      },
      deep: true,
      immediate: false
    },
    total() {
      this.getPagination()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // 解决y-table组件没有相关方法的问题
      this.$children.forEach(component => {
        const el = component.$el
        const classList = [...el.classList]
        if (classList.includes('el-table')) {
          Object.keys(component).forEach(key => {
            if (['clearSelection', 'toggleRowSelection', 'toggleAllSelection', 'toggleRowExpansion', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort'].includes(key)) {
              this[key] = component[key]
            }
          })
        }
      })
      // 获取element table上的属性
      const tableAttrs = {}
      Object.keys(defaultTableAttrs).forEach(key => {
        if (this.$attrs[key] !== undefined) {
          tableAttrs[key] = this.$attrs[key]
        }
      })
      this.tableAttrs = Object.assign({}, defaultTableAttrs, tableAttrs)

      // 获取element table col上的属性
      this.columnAttrs = this.columns.map(column => {
        const obj = Object.assign({}, defaultColumn, column)
        return obj
      })

      this.getPagination()
    },
    getPagination() {
      // 获取element 分页属性
      const pagination = this.pagination
      let paginationAttrs = {}
      if (pagination) {
        if (typeof pagination === 'object') {
          paginationAttrs = {
            ...defaultPagination,
            ...pagination,
            isPagination: true
          }
        } else {
          paginationAttrs = {
            ...defaultPagination,
            isPagination: true
          }
        }
      }
      Object.keys(paginationAttrs).forEach(key => {
        if (this.$attrs[key] !== undefined && key !== 'pagination') {
          paginationAttrs[key] = this.$attrs[key]
        }
      })

      if (this.total) {
        paginationAttrs.total = this.total
      }
      this.paginationAttrs = paginationAttrs
    },
    handleSizeChange(pageSize) {
      this.$emit('size-change', pageSize)
      this.paginationAttrs = Object.assign({}, this.paginationAttrs, {
        pageSize,
        type: 'size-change',
        currentPage: 1
      })
      if (typeof this.reload === 'function') {
        this.reload(this.paginationAttrs)
      }
    },
    handleCurrentChange(currentPage) {
      this.$emit('page-current-change', currentPage)
      this.paginationAttrs = Object.assign({}, this.paginationAttrs, {
        currentPage,
        type: 'current-change'
      })

      if (typeof this.reload === 'function') {
        this.reload(this.paginationAttrs)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.base-table {
  overflow: auto;
}
</style>
