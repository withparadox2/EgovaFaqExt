<template>
    <div class="history-item">
        <item :item="item.user"></item>
        <div class="btn-container">
            <tiny-button class="btn-remove" type="danger" @click.native.stop="clickRemove">移除</tiny-button>
            <tiny-button class="btn-pin" @click.native.stop="clickPin">{{item.isPinned ? '取消置顶' : '置顶'}}</tiny-button>
        </div>
    </div>
</template>
<style scoped>
.history-item {
  position: relative;
}
.btn-remove,
.btn-pin {
  float: right;
  margin-top: 6px;
}
.btn-pin {
  margin-right: 10px;
}
.btn-container {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
<script>
import Item from './Item.vue'
import TinyButton from './TinyButton.vue'
import { removeHistory, pinAction } from '../js/history'

export default {
    props: {
        item: {
            type: Object
        }
    },
    components: {
        Item, TinyButton
    },
    computed: {
        optionValue() {
            return this.item.user.option.value
        }
    },
    methods: {
        clickRemove() {
            removeHistory(this.optionValue)
            this.updateList()
        },
        clickPin() {
            pinAction(!this.item.isPinned, this.optionValue)
            this.updateList()
        },
        updateList() {
            this.$emit('updateAction')
        }
    }
}
</script>