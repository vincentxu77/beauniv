<template>
  <div class="cell-wrapper" v-if="userInfo">
    <div class="cell-title">
      <img :src="userInfo.avatar" alt>
      <span>{{userInfo.name}}</span>
    </div>
    <div style="background-color:#fff;margin-bottom: 2px;">
       <span>{{userInfo.school}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "info-cell",
  props: {
    userInfo: Object
  }
};
</script>

<style scoped>
.cell-wrapper {
  background-color: rgba(177, 172, 172, 0.467);
  box-sizing: border-box;
  color: inherit;
  min-height: 80px;
  font-size: 16px;
  line-height: 1;
  overflow: hidden;
  padding: 0 8px;
  width: 100%;
  line-height: 80px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
.cell-title {
  background-color:#fff;
  margin-bottom: 2px;
}
.cell-title img {
  width: 4rem;
  height: 4rem;
  vertical-align: middle;
  margin-right: 0.6rem;
}
.cell-title span {
  display: inline-block;
  vertical-align: middle;
}
</style>
