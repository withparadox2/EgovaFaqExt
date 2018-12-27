let userList = []

function User(label, option) {
  // 在列表中显示的文本信息
  this.label = label
  // 对应的实际option，当选择该条记录时，则将其selected属性置为true
  this.option = option
}

export function parseUserListFromNode(node) {
  userList = []
  function parseOptions(options, label) {
    for (let i = 0; i < options.length; i++) {
      let option = options[i]
      if (option.nodeName == 'OPTION') {
        let showText = option.innerText
        if (label) {
          showText = '【' + label + '】' + showText
        }
        if (showText && showText.replace(/^\s+|\s+$/g, '')) {
          userList.push(new User(showText, option))
        }
      } else if (option.nodeName == 'OPTGROUP') {
        label = (label ? label + ',' : '') + option.label
        parseOptions(option.children, label)
      }
    }
  }
  parseOptions(node.children || [], null)
  return userList
}

export function getUserList() {
  return userList
}
