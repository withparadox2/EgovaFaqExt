<template>
    <div class="value-title">
        <div class="divider"></div>
        <div class="content"><slot></slot></div>
    </div>
</template>
<style scoped>
.value-title {
  height: 30px;
  margin-top: 15px;
  position: relative;
}

.value-title .divider {
  position: absolute;
  top: 50%;
  left: 20%;
  right: 20%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    white,
    rgb(98, 141, 182),
    rgb(98, 141, 182),
    white
  );
}

.value-title .content {
  background: white;
  padding: 5px 10px;
  font-size: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgb(98, 141, 182);
}
</style>