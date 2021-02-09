// 判断是否叶子节点
const isLeaf = (data, prop) => {
  return !(Array.isArray(data[prop]) && data[prop].length > 0)
}

// 创建 node 节点
export const renderNode = (h, data, context) => {
  const { props } = context // children, data, injections, listeners, parent, props, scopedSlots, slots
  const cls = ['tree-org-node']
  const childNodes = []
  const children = data[props.props.children]
  // 如果是叶子节点则追加leaf事件
  if (isLeaf(data, props.props.children)) {
    cls.push('is-leaf')
  } else if (props.collapsable && !data[props.props.expand]) { // 追加是否展开class
    cls.push('collapsed')
  }
  // 渲染label块
  childNodes.push(renderLabel(h, data, context))

  if (!props.collapsable || data[props.props.expand]) {
    childNodes.push(renderChildren(h, children, context))
  }

  return <div class={cls}>
    {childNodes}
  </div>

  // return h('div', {
  //   'class': cls
  // }, childNodes)
}

// 创建展开折叠按钮
export const renderBtn = (h, data, { props, listeners }) => {
  const expandHandler = listeners['on-expand']

  const cls = ['tree-org-node-btn']

  if (data[props.props.expand]) {
    cls.push('expanded')
  }

  return <span class={cls} onClick={e => {
    const target = e.target
    target.setAttribute('contentEditable', false)
    expandHandler && expandHandler(e, data)
  }}></span>

  // return h('span', {
  //   'class': cls,
  //   on: {
  //     click: e => expandHandler && expandHandler(e, data)
  //   }
  // })
}

// 创建 label 节点
/* eslint-disable */
export const renderLabel = (h, data, context) => {
  const { props, listeners } = context
  const label = data[props.props.label]
  const renderContent = props.renderContent
  const clickHandler = listeners['on-node-click']
  const blurHandler = listeners['on-blur']
  const childNodes = []
  if (typeof renderContent === 'function') {
    const vnode = renderContent(h, data)

    vnode && childNodes.push(vnode)
  } else {
    childNodes.push(label)
  }

  if (props.collapsable && !isLeaf(data, props.props.children)) {
    childNodes.push(renderBtn(h, data, context))
  }

  const cls = ['tree-org-node-label-inner']
  /* eslint-disable */
  let { labelStyle, labelClassName, selectedClassName, selectedKey } = props

  if (typeof labelClassName === 'function') {
    labelClassName = labelClassName(data)
  }

  labelClassName && cls.push(labelClassName)

  // add selected class and key from props
  if (typeof selectedClassName === 'function') {
    selectedClassName = selectedClassName(data)
  }

  selectedClassName && selectedKey && data[selectedKey] && cls.push(selectedClassName)

  // return h('div', {
  //   'class': 'tree-org-node-label'
  // }, [h('div', {
  //   'class': cls,
  //   style: data['style'] ? data['style'] : labelStyle,
  //   on: {
  //     click: e => clickHandler && clickHandler(e, data)
  //   }
  // }, childNodes)])

  return <div class="tree-org-node-label">
    <div class={cls} style={data['style'] ? data['style'] : labelStyle} onClick={e => {
      const target = e.target
      target.setAttribute('contentEditable', true)
      target.focus()
      clickHandler && clickHandler(e, data)
    }} onBlur={e => {
      console.log('blur', e.target.innerText, data)
      blurHandler && blurHandler(e, data)
    }}>
      {childNodes}
    </div>
  </div>
}

// 创建 node 子节点
export const renderChildren = (h, list, context) => {
  if (Array.isArray(list) && list.length) {
    const children = list.map(item => {
      return renderNode(h, item, context)
    })

    // return h('div', {
    //   'class': 'tree-org-node-children'
    // }, children)
    return <div class="tree-org-node-children">
      {children}
    </div>
  }
  return ''
}

export const render = (h, context) => {
  const { props } = context
  return renderNode(h, props.data, context)
}

export default render
