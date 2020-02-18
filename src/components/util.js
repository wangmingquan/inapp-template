export default {
  data2dom (data) {
    const tree = []
    const tagMap = {
      view: 'div',
      label: 'p',
      image: 'img',
      button: 'button'
    }
    const styleMap = {
      backgroundColor: 'backgroundColor',
      cornerRadius: 'border-radius',
      borderWidth: 'borderWidth',
      borderColor: 'borderColor',
      width: 'width',
      height: 'height',
      font: 'fontSize',
      color: 'color',
      backgroundImage: 'backgroundImage'
    }

    // 获取样式
    const getStyle = (properties, layout) => {
      const style = {}
      const { margin, align } = layout

      if (align) {
        // !todo 处理居中方式
      }

      // margin 翻译成具体的值
      if (margin) {
        if (margin.top) layout.marginTop = margin.top
        if (margin.right) layout.marginRight = margin.top
        if (margin.bottom) layout.marginBottom = margin.top
        if (margin.left) layout.marginLeft = margin.top
        delete layout.margin
      }

      // 从数据中、布局中拿出样式
      for (const key in properties) {
        style[key] = properties[key]
      }
      for (const key in layout) {
        style[key] = layout[key]
      }

      // 将小数比例转换成百分比
      for (const key in style) {
        let value = style[key]
        if (/^0?\.\d+$/.test(value)) {
          value = parseFloat(value) * 100 + '%'
        }
        style[styleMap[key]] = value
      }
      return style
    }
    const { template } = data
    tree.push({
      tag: tagMap[template.type],
      style: getStyle(template.properties, template.layout)
    })
    return tree
  }
}
