<template>
  <div id="faq-root">
    <div class="faq-box">
      <div class="faq-head">
        <div class="faq-title-row">
          <span class="faq-title">For Egova Faq</span>
          <tiny-button class="faq-close"
                       @click.native="close"
                       type="light">关闭</tiny-button>
        </div>
        <input placeholder="请输入姓名..."
               v-model="searchText">
      </div>
      <div class="faq-value-box"
           id="value-box-base">
        <div v-show="showHistory"
             class="history-wrapper">
          <item-title>历史记录</item-title>
          <transition-group name="history-list"
                            tag="div">
            <history-item v-for="(item, index) in historyList"
                          :key="item.user.option.value"
                          :item="item"
                          @updateAction="updateHistoryList"
                          @removeItem="removeHistoryItem($event)"
                          @pinAction="pinAction($event)"
                          @click.native="clickItem(item.user, index)"></history-item>
          </transition-group>

        </div>
        <item-title>{{searchText ? '搜索结果' : '人员列表'}}</item-title>
        <item v-for="item in dataList"
              :key="item.label"
              :item="item"
              :highlightText="searchText"
              @click.native="clickItem(item)"></item>
      </div>
    </div>
  </div>
</template>
<style scoped>
#faq-root {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}

.faq-box {
  background-color: white;
  width: 50%;
  height: 70%;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.faq-head {
  padding: 10px;
  border-radius: 8px 8px 0 0;
  background-color: rgb(98, 141, 182);
  height: 85px;
  box-sizing: border-box;
}

.faq-title-row {
  overflow: hidden;
}

.faq-title {
  font-family: "Times New Roman", Times, serif;
  font-size: 20px;
  color: white;
}

input {
  padding: 0px 15px;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  border: 1px solid #aaa;
  margin-top: 10px;
  border-radius: 15px;
  font-size: 12px;
  outline: none;
}

input:focus {
  border-color: rgb(98, 141, 182);
}

.faq-close {
  float: right;
}

.faq-box .faq-value-box {
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
  top: 85px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  padding: 0 10px;

  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.faq-value-box::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
  border-radius: 5px;
}

.faq-value-box::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

.faq-value-box::-webkit-scrollbar-thumb {
  background-color: rgb(98, 141, 182);
  border-radius: 5px;
}

.history-list-enter-active {
  transition: all 1s;
}
.history-list-leave-active {
  transition: all 1s;
  position: absolute;
  width: 100%;
}
.history-list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
.history-list-move {
  transition: transform 1s;
}
</style>
<script>
import { getUserList } from "../js/data-parser"
import { closeDialog } from "../js/helper"
import { updateHistory, loadHistoryList, orderHistoryList } from "../js/history"

import Item from "./Item.vue"
import ItemTitle from "./ItemTitle.vue"
import TinyButton from "./TinyButton.vue"
import HistoryItem from "./HistoryItem.vue"

export default {
  data() {
    return {
      searchText: "",
      historyList: []
    }
  },
  computed: {
    dataList() {
      let list = getUserList()
      return this.searchText
        ? list.filter(
            user => user.label.indexOf(this.searchText) >= 0
          )
        : list
    },
    showHistory() {
      return !this.searchText && this.historyList.length > 0
    }
  },
  mounted() {
    this.updateHistoryList()
  },
  methods: {
    close() {
      closeDialog()
    },
    clickItem(user, index) {
      console.log(user)
      this.historyList.splice(index, 1)
      let visibleNode = document.querySelector('#issue_assigned_to_id').parentElement.querySelector('.selectize-control.single .selectize-input .item')
      if (visibleNode) {
        visibleNode.setAttribute('data-value', user.option.value)
        visibleNode.innerText = user.label

        let hideNode = document.querySelector('#issue_assigned_to_id option')
        if (hideNode) {
          hideNode.value = user.option.value
          hideNode.innerText = user.label
        }
      }
     
      user.option.selected = true
      updateHistory(user.option.value)
      this.close()
    },
    updateHistoryList() {
      this.historyList = loadHistoryList(
        this.dataList.reduce((store, item) => {
          store[item.option.value] = item
          return store
        }, {})
      )
    },
    removeHistoryItem(item) {
      let indexToRemove = this.historyList.indexOf(item)
      if (indexToRemove >= 0) {
        this.historyList.splice(indexToRemove, 1)
      }
    },
    pinAction() {
      orderHistoryList(this.historyList)
    }
  },
  components: {
    ItemTitle,
    Item,
    TinyButton,
    HistoryItem
  }
}
</script>