var appState = new DataState()

function checkAndUpdate() {
    var selectNode = document.querySelector('select[name=\"issue[assigned_to_id]\"]')
    if (!selectNode || selectNode.parentElement.children.length == 3) {
        return
    }

    appState = new DataState()

    // 在下次刷新页面之前认为用户列表不会改变 
    appState.setUserList(parseUserListFromNode(selectNode))

    var selectBtn = buildSelectButton()
    selectNode.parentElement.appendChild(selectBtn)
    selectBtn.onclick = function (event) {
        appState.searching = false
        // 每次点开弹窗历史记录都有可能发生改变，重新加载
        appState.historyList = loadHistoryList()

        showSelectPopup()
        event.preventDefault()
    }
}

function buildSelectButton() {
    var btn = document.createElement('button')
    btn.style.marginLeft = '10px'
    btn.textContent = '选择'
    return btn
}

function showSelectPopup() {
    var container = document.createElement('div')
    container.innerHTML = '<div class="faq-box">\
                                <div class="faq-head">\
                                    <div class="faq-title-row">\
                                        <span class="faq-title">For Egova Faq</span>\
                                        <button class="faq-close item-button">关闭</button>\
                                    </div>\
                                    <input placeholder="请输入姓名..."></input>\
                                </div>\
                                <div class="faq-value-box" id="value-box-base"></div>\
                            </div>'
    container.id = 'faq-root'
    document.body.appendChild(container)

    var btnClose = container.querySelector('button.faq-close')
    btnClose.onclick = function () {
        document.body.removeChild(container)
    }

    var valueBoxBase = container.querySelector('#value-box-base')
    setupBox(valueBoxBase)

    appState.appHooks.closeAction = btnClose.onclick
    appState.appHooks.valueBoxBase = valueBoxBase
    appState.searchText = ''

    var input = container.querySelector('.faq-box input')
    input.focus()
    input.oninput = function () {
        appState.searchText = input.value && input.value.replace(/^\s+|\s+$/g, "")
        displayBaseItems()
    }
    displayBaseItems()
}

function setupBox(valueBox) {
    // 在弹窗中滚动鼠标时禁止外部的列表跟着一起滚动
    valueBox.addEventListener('mousewheel', function (e) {
        if (typeof e.wheelDeltaY != 'undefined') {
            var d = e.wheelDeltaY
            if (((this.scrollHeight - this.clientHeight) - this.scrollTop < 1 && d < 0) || (this.scrollTop < 1 && d > 0)) {
                e.preventDefault()
            }
        }
    })
}

function displayBaseItems() {
    var valueBox = appState.appHooks.valueBoxBase
    var searchText = appState.searchText

    valueBox.innerHTML = ''

    var childEleList = []
    var historyEleList = []

    if (!searchText) {
        appState.historyList.forEach(function (history) {
            historyEleList.push(
                createValueItem(history.user, history)
            )
        })

        if (historyEleList.length > 0) {
            valueBox.appendChild(createTitle('历史记录'))
            historyEleList.forEach(function (child) {
                valueBox.appendChild(child)
            })
        }

        valueBox.appendChild(createTitle('人员列表'))
    }

    appState.userList.forEach(function (user) {
        if (!searchText
            || user.label.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
            childEleList.push(createValueItem(user))
        }
    })

    if (searchText && childEleList.length == 0) {
        valueBox.appendChild(createEmptyContent())
    }

    childEleList.forEach(function (child) {
        valueBox.appendChild(child)
    })
}

function createEmptyContent() {
    var item = document.createElement('div')
    item.classList.add('content-empty')
    item.innerHTML = '结果为空...'
    return item
}

function createTitle(text) {
    var item = document.createElement('div')
    item.classList.add('value-title')
    item.innerHTML = '<div class="divider"></div><div class="content">' + text + '</div>'
    return item
}

function createValueItem(user, history) {
    var searchText = appState.searchText
    var item = document.createElement('div')
    item.classList.add('value-item')

    //点击按钮时会改变value-item的颜色，这里单独加一个节点用来处理背景颜色
    var innerHtml = '<div class="bg-node"></div>'

    if (history && history.isPinned) {
        innerHtml += '<span class="pin-icon"></span>'
    }

    var text = user.label

    if (searchText) {
        text = text.toLowerCase().split(searchText.toLowerCase()).join('<span class="highlight">' + searchText + '</span>')
    }

    innerHtml += (text ? text : '')

    if (history) {
        innerHtml += '<button class="btn-remove item-button danger">移除</button>'
        innerHtml += '<button class="btn-pin item-button gap-right">' + (history.isPinned ? '取消置顶' : '置顶') + '</button>'
        item.innerHTML = innerHtml

        item.querySelector('.btn-remove').onclick = function (e) {
            removeHistory(user.option.value)
            reloadHistoryAndUpdateView()
            e.stopPropagation()
        }

        item.querySelector('.btn-pin').onclick = function (e) {
            pinAction(!history.isPinned, user.option.value)
            reloadHistoryAndUpdateView()
            e.stopPropagation()
        }
    } else {
        item.innerHTML = innerHtml
    }

    item.onclick = function () {
        user.option.selected = true
        updateHistory(user.option.value)
        appState.appHooks.closeAction()
    }
    return item
}

function DataState() {
    // 从网页中解析出来的全部用户数据，除了用户，也包括组
    this.userList = []
    // 保存在本地的历史数据
    this.historyList = []
    // 是否处于搜索状态
    this.searching = false
    // user.option.value->user where user in userList
    this.idToUser = {}

    this.searchText = ''

    this.appHooks = {
        closeAction: function () { },
        valueBoxBase: null
    }
}

DataState.prototype.setUserList = function (list) {
    this.userList = list || []
    var idToUser = this.idToUser
    this.userList.forEach(function (user) {
        idToUser[user.option.value] = user
    })
}

function User(label, option) {
    // 在列表中显示的文本信息
    this.label = label
    // 对应的实际option，当选择该条记录时，则将其selected属性置为true
    this.option = option
}

function parseUserListFromNode(node) {
    var userList = []
    function parseOptions(options, label) {
        for (var i = 0; i < options.length; i++) {
            var option = options[i]
            if (option.nodeName == 'OPTION') {
                var showText = option.innerText
                if (label) {
                    showText = '【' + label + '】' + showText
                }
                if (showText && showText.replace(/^\s+|\s+$/g, "")) {
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

function History(localItem) {
    // 该条历史记录所对应的User对象，如果为null在显示时则会被过滤掉
    this.user = null
    // 是否被标记置顶
    this.isPinned = localItem.isPinned
    // 置顶的时间
    this.pinTime = localItem.pinTime
    // 最后一次选中的时间
    this.lastSelectTime = localItem.lastSelectTime
    // 唯一id，对应User.option.value
    this.optionValue = localItem.optionValue
}

function reloadHistoryAndUpdateView() {
    appState.historyList = loadHistoryList()
    displayBaseItems()
}

function loadHistoryList() {
    var localList = getHistoryList()
    var list = localList.filter(function (item) {
        var user = appState.idToUser[item.optionValue]
        item.user = user
        return !!user
    })
    if (localList.length != list.length) {
        cacheHistoryList(list.map(function (item) {
            return new History(item)
        }))
    }
    return orderHistoryList(list)
}

// 置顶的记录按置顶时间倒序排列，然后其他记录按最后一次选择时间倒序排列
function orderHistoryList(list) {
    list.sort(function (a, b) {
        if (a.isPinned && !b.isPinned) {
            return -1
        } else if (a.isPinned && b.isPinned) {
            return b.pinTime - a.pinTime
        } else if (!a.isPinned && b.isPinned) {
            return 1
        } else {
            if (!a.lastSelectTime) {
                return 1
            } else if (!b.lastSelectTime) {
                return -1
            } else {
                return b.lastSelectTime - a.lastSelectTime
            }
        }
    })
    return list
}


//旧缓存数据只存储了id
var CACHE_KEY_OLD = 'faq-history'
//新缓存数据还包括配置
var CACHE_KEY = 'faq-history-v2'

function getHistoryList() {
    var cacheStr = localStorage.getItem(CACHE_KEY)
    // 新版本中数据为空，先尝试从旧版本恢复，然后再读取
    if (!cacheStr) {
        migrateOldData()
        cacheStr = localStorage.getItem(CACHE_KEY)
    }
    return JSON.parse(cacheStr || '[]') || []
}

function migrateOldData() {
    var oldList = JSON.parse(localStorage.getItem(CACHE_KEY_OLD) || '[]') || []
    var timeId = oldList.length + 1
    var newList = oldList.map(function (id) {
        return {
            optionValue: id,
            // 旧数据列表没有保存修改时间，是按照时间倒序排列的，我们这里保持其原来的顺序
            lastSelectTime: timeId--
        }
    })
    cacheHistoryList(newList)
    localStorage.setItem(CACHE_KEY_OLD, null)
}

function updateHistory(optionValue) {
    var list = getHistoryList()
    var index = findTarget(list, optionValue)
    if (index >= 0) {
        list[index].lastSelectTime = Date.now()
    } else {
        list.push({
            optionValue: optionValue,
            lastSelectTime: Date.now()
        })
    }
    cacheHistoryList(list)
}

function findTarget(historyList, optionValue) {
    for (var i = 0; i < historyList.length; i++) {
        if (historyList[i].optionValue == optionValue) {
            return i
        }
    }
    return -1
}

function removeHistory(optionValue) {
    var list = getHistoryList()
    var index = findTarget(list, optionValue)
    if (index >= 0) {
        list.splice(index, 1)
        cacheHistoryList(list)
    }
}

function pinAction(pin, optionValue) {
    var list = getHistoryList()
    var index = findTarget(list, optionValue)
    if (index < 0) {
        return
    }
    var option = list[index]
    if (pin) {
        option.isPinned = true
        option.pinTime = Date.now()
    } else {
        option.isPinned = false
    }
    if (!option.lastSelectTime) {
        option.lastSelectTime = Date.now()
    }
    cacheHistoryList(list)
}

function cacheHistoryList(list) {
    localStorage.setItem(CACHE_KEY, JSON.stringify(list))
}

checkAndUpdate()

// 由于当用户更改了项目之后页面会重新渲染，导致之前注入的按钮消失，因此
// 每3秒钟检测一次，如果没有按钮则重新注入，保证功能正常
setInterval(checkAndUpdate, 3000)