<template>
  <y-input
    v-model.trim="currentValue"
    v-bind="$attrs"
    :type="$attrs.type || 'text'"
    :maxlength="$attrs.maxLength || 100"
    :minlength="$attrs.minLength"
    :show-word-limit="$attrs.showWordLimit"
    :placeholder="$attrs.placeholder || `请输入${label}`"
    :clearable="$attrs.clearable || true"
    :show-password="$attrs.showPassword || false"
    :size="$attrs.size"
    :prefix-icon="$attrs.prefixIcon"
    :suffix-icon="$attrs.suffixIcon"
    :rows="$attrs.rows || 2"
    :autosize="$attrs.autosize"
    :autocomplete="$attrs.autocomplete || 'off'"
    :auto-complete="$attrs.autoComplete || 'off'"
    :name="$attrs.name"
    :readonly="$attrs.readonly"
    :max="$attrs.max"
    :min="$attrs.min"
    :step="$attrs.step"
    :resize="$attrs.resize"
    :autofocus="$attrs.autofocus || false"
    :label="$attrs.label"
    :tabindex="$attrs.tabindex"
    :validate-event="$attrs.validateEvent || true"
    :disabled="$attrs.disabled"
    :form="$attrs.form"
    @input="handleInputEvent"
    v-on="$listeners"
  ></y-input>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: {
      type: String, // 属性别名
      default: ''
    },
    value: {
      // 默认值
      type: [String, Number, Boolean, Object],
      default: ''
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    // 监听外部的value
    value(val) {
      this.currentValue = val
    }
  },
  methods: {
    handleInputEvent(value) {
      // 当选择框发生变化时，将值传递出去
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="less" scoped></style>
