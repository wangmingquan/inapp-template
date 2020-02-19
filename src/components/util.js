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
      backgroundColor: 'background-color',
      cornerRadius: 'border-radius',
      border: 'border',
      borderWidth: 'border-width',
      borderColor: 'border-color',
      width: 'width',
      height: 'height',
      font: 'font-size',
      color: 'color',
      backgroundImage: 'background-image',
      position: 'position',
      float: 'float',
      overflow: 'overflow',
      left: 'left',
      transform: 'transform',
      marginTop: 'margin-top',
      marginRight: 'margin-right',
      marginBottom: 'margin-bottom',
      marginLeft: 'margin-left',
      display: 'display',
      lineHeight: 'line-height',
      textAlign: 'text-align',
      padding: 'padding'
    }

    const getHTML = (template, options = {}) => {
      const { isFirstLevel, closeConfig = {} } = options
      const html = []
      const { layout, properties, type, subviews } = template
      const { margin, align } = layout
      if (type !== 'button') {
        const containerStyle = {
          overflow: 'hidden',
          position: 'relative'
        }
        const containerStyleStrs = []
        for (const i in containerStyle) {
          containerStyleStrs.push(`${i}: ${containerStyle[i]}`)
        }
        html.push(`<div data-mark="container" style="${containerStyleStrs.join('; ')}">`)
      }

      const style = {
        position: 'relative',
        border: '1px solid rgba(0, 0, 0, 0.0)'
      }

      // 行内转块级
      if (type === 'image' || type === 'button') {
        Object.assign(style, {
          display: 'block'
        })
      }
      // 样式：对齐方式
      if (align) {
        if (align === 'center') {
          Object.assign(style, {
            marginLeft: 'auto',
            marginRight: 'auto'
          })
        } else if (align === 'left') {
          style.float = 'left'
        } else if (align === 'right') {
          style.float = 'right'
        }
      }
      // margin 翻译成具体的值
      if (margin) {
        if (margin.top) layout.marginTop = margin.top
        if (margin.right) layout.marginRight = margin.right
        if (margin.bottom) layout.marginBottom = margin.bottom
        if (margin.left) layout.marginLeft = margin.left
        delete layout.margin
      }

      // 从数据中、布局中拿出样式
      for (const key in properties) {
        if (properties[key]) style[key] = properties[key]
      }
      for (const key in layout) {
        if (layout[key]) style[key] = layout[key]
      }

      // 将小数比例转换成百分比
      for (const key in style) {
        let value = style[key]
        if (/^0|1?\.\d+$/.test(value)) {
          value = parseFloat(value) * 100 + '%'
        }
        style[key] = value
      }
      const styleStrs = []
      for (const i in style) {
        if (styleMap[i]) {
          styleStrs.push(`${styleMap[i]}: ${style[i]}`)
        }
      }

      if (type === 'label') {
        html.push(`<p style="${styleStrs.join('; ')}">`)
        html.push(properties.text)
      } else if (type === 'view') {
        html.push(`<div style="${styleStrs.join('; ')}">`)
      } else if (type === 'button') {
        html.push(`<button style="${styleStrs.join('; ')}">`)
        html.push(properties.text)
      } else if (type === 'image') {
        html.push(`<img style="${styleStrs.join('; ')}" src="${properties.image}">`)
      }

      if (subviews && subviews.length) {
        for (const item of subviews) {
          html.push(getHTML(item))
        }
      }

      if (isFirstLevel && closeConfig.close_enabled) {
        const { close_style } = closeConfig
        const { image, width, height } = close_style
        const closeStyle = {
          position: 'absolute',
          right: parseInt(width) / -2 + 'px',
          top: parseInt(height) / -2 + 'px',
          background: `url(${image}) no-repeat center`,
          'background-size': '100% 100%',
          width: width,
          height: height
        }
        const closeStyleStr = []
        for (const i in closeStyle) {
          closeStyleStr.push(`${i}: ${closeStyle[i]}`)
        }
        html.push(`<div style="${closeStyleStr.join('; ')}"></div>`)
      }

      html.push(`</${tagMap[type]}>`)

      if (type !== 'button') {
        html.push('</div>')
      }
      return html.join('')
    }
    // 遮罩层
    tree.push(`<div style="width: 100%; height: 100%; position: fixed; left: 0; top: 0; background: ${data.properties.maskColor}">`)
    // 弹窗内容
    tree.push(getHTML(data.template, {
      isFirstLevel: true,
      closeConfig: {
        close_enabled: data.properties.close_enabled,
        close_style: data.properties.close_style
      }
    }))
    tree.push('</div>')
    return tree.join('')
  }
}
