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

function loadHistoryList(idToUser = {}) {
    var localList = getHistoryList()
    var list = localList.filter(function (item) {
        var user = idToUser[item.optionValue]
        item.user = user
        return !!user
    })
    if (localList.length != list.length) {
        // 移除过期数据
        cacheHistoryList(list.map(function (item) {
            let itemTmp = { ...item }
            itemTmp.user = null
            return itemTmp
        }))
    }
    return orderHistoryList(list)
}

export {
    getHistoryList, updateHistory, removeHistory, pinAction, orderHistoryList, loadHistoryList
}