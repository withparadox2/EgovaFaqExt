<template>
  <div class="value-item">
    <div class="bg-node" />
    <span class="pin-icon"
          v-show="item.isPinned" />
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

.value-item .pin-icon {
  display: inline-block;
  width: 20px;
  height: 20px;
  vertical-align: top;
  margin-top: 7px;
  margin-right: 8px;
  background-size: cover;
  background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDUxLjAxMiA1MS4wMTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxLjAxMiA1MS4wMTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8bGluZSBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojRTBFMUUyO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiIHgxPSIzNS43MjkiIHkxPSIzNS43MzQiIHgyPSI1MC4wMDYiIHkyPSI1MC4wMTIiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0VGQ0U0QTsiIGQ9Ik0zNSwzNi40NjNMMjAuNDUyLDUxLjAxMmMtMy41ODUtOS4wMDMsMC41MzUtMTguMTUsMC41MzUtMTguMTVMNy41MjcsMTcuMDM5ICBjMCwwLTQuMzg2LDAuNzA0LTcuNTIyLTEuNzg1TDE1LjI2LDBjMCwwLDIuNTA4LDMuMTE3LDEuNzY4LDcuNjA3bDE1Ljc4NSwxMy40M2MwLDAsOC40OTMtNC4zODUsMTguMTUtMC41MzdMMzUsMzYuNDYzeiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRUJCQTE2OyIgZD0iTTIwLjk4NywzMi44NjFjMCwwLTAuMDM2LDAuMDg0LTAuMDg2LDAuMjA1TDMzLjAzNywyMC45M2MtMC4xMzMsMC4wNjItMC4yMjUsMC4xMDctMC4yMjUsMC4xMDcgIEwxNy4wNzksNy42NTFsLTkuNDc2LDkuNDc2TDIwLjk4NywzMi44NjF6Ii8+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=);
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
