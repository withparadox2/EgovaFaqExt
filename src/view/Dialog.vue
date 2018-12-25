<template>
    <div id="faq-root">
        <div class="faq-box">
            <div class="faq-head">
                <div class="faq-title-row">
                    <span class="faq-title">For Egova Faq</span>
                    <button class="faq-close item-button">关闭</button>
                </div>
                <input placeholder="请输入姓名..."/>
            </div>
            <div class="faq-value-box" id="value-box-base"></div>
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
</style>