const rgba = (color) => {
  if (typeof color === 'string') {
    return color
  } else {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  }
}

export default {
  data2dom (data) {
    const tree = []
    const tagMap = {
      view: 'div',
      row: 'div',
      column: 'div',
      label: 'p',
      image: 'img',
      button: 'button',
      link: 'a'
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
      paddingTop: 'padding-top',
      paddingRight: 'padding-right',
      paddingBottom: 'padding-bottom',
      paddingLeft: 'padding-left',
      display: 'display',
      lineHeight: 'line-height',
      textAlign: 'text-align',
      padding: 'padding',
      textDecoration: 'text-decoration',
      boxSizing: 'box-sizing'
    }

    const getHTML = (template, options = {}) => {
      const { isFirstLevel, closeConfig = {} } = options
      const html = []
      const { layout, properties, type, subviews } = template
      const { margin, padding, align } = layout

      const style = {
        position: 'relative',
        border: '1px solid rgba(0, 0, 0, 0.0)',
        boxSizing: 'border-box'
      }

      // 行内转块级
      if (type === 'image' || type === 'button') {
        Object.assign(style, {
          display: 'block'
        })
      }
      // link 特殊样式
      if (type === 'link') {
        Object.assign(style, {
          display: 'block',
          textDecoration: 'underline'
        })
      }
      // link 特殊样式
      if (type === 'row') {
        Object.assign(style, {
          display: 'flex'
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
          // style.float = 'left'
        } else if (align === 'right') {
          // style.float = 'right'
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
      if (padding) {
        if (padding.top) layout.paddingTop = padding.top
        if (padding.right) layout.paddingRight = padding.right
        if (padding.bottom) layout.paddingBottom = padding.bottom
        if (padding.left) layout.paddingLeft = padding.left
        delete layout.padding
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
          styleStrs.push(`${styleMap[i]}: ${rgba(style[i])}`)
        }
      }

      if (type === 'label') {
        html.push(`<p style="${styleStrs.join('; ')}">`)
        html.push(properties.text)
      } else if (type === 'link') {
        html.push(`<a style="${styleStrs.join('; ')}">`)
        html.push(properties.text)
      } else if (type === 'view' || type === 'row' || type === 'column') {
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

      if (isFirstLevel && closeConfig.closeEnabled) {
        const { closeStyle } = closeConfig
        const { image, width, height } = closeStyle
        const _closeStyle = {
          position: 'absolute',
          right: parseInt(width) / -2 + 'px',
          top: parseInt(height) / -2 + 'px',
          background: `url(${image}) no-repeat center`,
          'background-size': '100% 100%',
          width: width,
          height: height
        }
        const closeStyleStr = []
        for (const i in _closeStyle) {
          closeStyleStr.push(`${i}: ${_closeStyle[i]}`)
        }
        html.push(`<div style="${closeStyleStr.join('; ')}"></div>`)
      }

      html.push(`</${tagMap[type]}>`)
      return html.join('')
    }
    // 遮罩层
    tree.push(`<div style="width: 100%; height: 100%; position: fixed; left: 0; top: 0; background: ${rgba(data.properties.maskColor)}">`)
    // 弹窗内容
    tree.push(getHTML(data.template, {
      isFirstLevel: true,
      closeConfig: {
        closeEnabled: data.properties.closeEnabled,
        closeStyle: data.properties.closeStyle
      }
    }))
    tree.push('</div>')
    return tree.join('')
  }
}
