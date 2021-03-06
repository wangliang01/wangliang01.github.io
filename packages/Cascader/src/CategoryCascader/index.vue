<template>
  <!-- 品类选择器 -->
  <el-cascader
    :ref="ref"
    v-model="currentValue"
    v-bind="$attrs"
    clearable
    :props="props"
    v-on="$listeners"
    @change="handleValueChange"
  >
  </el-cascader>
</template>

<script>
export default {
  name: 'YCategoryCascader',
  props: {
    // 父组件传递过来的值:  ['1', '2', '4']
    value: {
      type: [Array, String],
      default: () => []
    },
    // 请求数据接口
    dataApi: {
      type: Function,
      required: true
    },
    // 显示的值： 选项1 / 选项2 / 选项4
    inputValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentValue: this.value,
      ref: `category_cascader_${Date.now()}`,
      props: {
        lazy: true,
        checkStrictly: false,
        lazyLoad: async(node, resolve) => {
          const params = {
            level: node.level || 0,
            parentId: node.value || 0
          }
          if (this.dataApi instanceof Function) {
            const res = await this.dataApi(params)
            if (res.data && Array.isArray(res.data)) {
              const data = res.data.map(item => {
                return {
                  label: item.label || item.name,
                  value: item.value || item.id,
                  leaf: node.level >= 2
                }
              })
              resolve(data)
            } else {
              resolve(res)
            }
          } else {
            throw new TypeError('dataApi参数类型不是一个Function')
          }
        }
      }

    }
  },
  watch: {
    value: {
      handler(val) {
        if (typeof val === 'string') {
          this.currentValue = val.split(',')
        } else {
          this.currentValue = val
        }
      },
      deep: true
    },
    inputValue: {
      handler(val) {
        this.$nextTick(() => {
          this.$refs[this.ref].presentText = val
          this.$refs[this.ref].inputValue = val
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleValueChange(value) {
      // 在为要从DOM从取相关的文本内容，所以在这里用到了this.$nextTick
      this.$nextTick(() => {
        const inputValue = this.$refs[this.ref].presentText
        if (Array.isArray(value)) {
          this.$emit('input', value.join(','))
        } else {
          this.$emit('input', value)
        }
        this.$emit('value-change', value, inputValue)
      })
    }
  }
}
</script>

<style scoped>
.el-cascader {
  display: block;
}
</style>
