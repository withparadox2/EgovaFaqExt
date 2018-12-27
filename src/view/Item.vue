<template>
  <div class="value-item">
    <div class="bg-node" />
    <span v-html="htmlText"></span>
  </div>
</template>
<style scoped>
.value-item {
  font-size: 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  line-height: 34px;
  position: relative;
}

.value-item button {
  position: relative;
  margin-top: 6px;
}

.value-item .bg-node {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.value-item .bg-node:active {
  background: rgba(0, 0, 0, 0.12);
}
</style>
<style>
.value-item .highlight {
  color: red;
  background: yellow;
}
</style>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    highlightText: {
      type: String
    }
  },
  computed: {
    htmlText() {
      var text = this.item.label
      if (this.highlightText) {
        text = text
          .toLowerCase()
          .split(this.highlightText.toLowerCase())
          .join('<span class="highlight">' + this.highlightText + "</span>")
      }
      return text
    }
  }
}
</script>
