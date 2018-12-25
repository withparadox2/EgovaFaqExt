<template>
  <div id="faq-root">
    <div class="faq-box">
      <div class="faq-head">
        <div class="faq-title-row">
          <span class="faq-title">For Egova Faq</span>
          <tiny-button class="faq-close" @click.native="close" type="light">关闭</tiny-button>
        </div>
        <input placeholder="请输入姓名..." v-model="searchText">
      </div>
      <div class="faq-value-box" id="value-box-base">
        <item-title v-show="!searchText && historyList.length > 0">历史记录</item-title>
        <history-item
          v-for="(item, index) in historyList"
          :key="index"
          :item="item"
          @updateAction="updateHistoryList"
          @click.native="clickItem(item.user)"
        ></history-item>
        <item-title>人员列表</item-title>
        <item
          v-for="item in dataList"
          :key="item.label"
          :item="item"
          :highlightText="searchText"
          @click.native="clickItem(item)"
        ></item>
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
  position: absolute;
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
</style>
<script>
import { getUserList } from "../js/data-parser";
import { closeDialog } from "../js/helper";
import { updateHistory, loadHistoryList } from "../js/history";

import Item from "./Item.vue";
import ItemTitle from "./ItemTitle.vue";
import TinyButton from "./TinyButton.vue";
import HistoryItem from "./HistoryItem.vue";

export default {
  data() {
    return {
      searchText: "",
      historyList: []
    };
  },
  computed: {
    dataList() {
      return getUserList();
    }
  },
  mounted() {
    this.updateHistoryList();
  },
  methods: {
    close() {
      closeDialog();
    },
    clickItem(user) {
      user.option.selected = true;
      updateHistory(user.option.value);
      this.close();
    },
    updateHistoryList() {
      this.historyList = loadHistoryList(
        this.dataList.reduce((store, item) => {
          store[item.option.value] = item;
          return store;
        }, {})
      );
    }
  },
  components: {
    ItemTitle,
    Item,
    TinyButton,
    HistoryItem
  }
};
</script>