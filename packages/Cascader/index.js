// 导入组件，组件必须声明name
import YCategoryCascader from './src/CategoryCascader'
import YAddressCascader from './src/AddressCascader'
import YCascader from './src/BaseCascader'

// 为组件提供install安装方法，按需引入
YCategoryCascader.install = function(Vue) {
  Vue.component(YCategoryCascader.name, YCategoryCascader)
}

YAddressCascader.install = function(Vue) {
  Vue.component(YAddressCascader.name, YAddressCascader)
}

YCascader.install = function(Vue) {
  Vue.component(YCascader.name, YCascader)
}

// 导出组件
export default {
  YCategoryCascader,
  YAddressCascader,
  YCascader
}

