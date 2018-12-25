<template>
    <button class="item-button" :class="[type]"><slot></slot></button>
</template>
<style scoped>
.item-button {
  font-size: 12px;
  color: rgb(98, 141, 182);
  border: 1px solid rgb(98, 141, 182);
  border-radius: 5px;
  background: transparent;
  outline: none;
  height: 20px;
  border-radius: 5px;
  padding: 0 8px;
  line-height: 20px;
}

.item-button:active {
  background: rgba(98, 141, 182, 0.2);
}

.item-button.danger {
  color: rgb(209, 29, 128);
  border-color: rgb(209, 29, 128);
}

.item-button.danger:active {
  background: rgba(209, 29, 128, 0.1);
}

.item-button.faq-close {
  color: white;
  border-color: white;
}

.item-button.faq-close:active {
  background: rgba(255, 255, 255, 0.1);
}
</style>
<script>
export default {
    props: {
        type: {
            type: String, // danger, normal, light
            default: 'normal'
        }
    }
}
</script>