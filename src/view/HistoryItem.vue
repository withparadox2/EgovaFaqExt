<template>
    <div class="history-item">
        <item :item="item.user"></item>
        <div class="btn-container">
            <tiny-button class="btn-remove" type="danger" @click.native="clickRemove">移除</tiny-button>
            <tiny-button class="btn-pin" @click.native="clickPin">{{item.isPinned ? '取消置顶' : '置顶'}}</tiny-button>
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
  width: 100%;
  height: 100%;
}
</style>
<script>
import Item from './Item.vue'
import TinyButton from './TinyButton.vue'

export default {
    props: {
        item: {
            type: Object
        }
    },
    components: {
        Item, TinyButton
    },
    methods: {
        clickRemove() {

        },
        clickPin() {

        }
    }
}
</script>
