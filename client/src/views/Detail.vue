<template>
  <div class="detail">
    <Header title="详情"/>
    <div class="container">
    </div>
  </div>
</template>
<script>
import Header from "../components/Header";

export default {
  name: "detail",
  computed: {
    
  },
  methods: {
    
  },
  components: {
    Header,
  }
};
</script>
<style scoped>
.detail {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
  box-sizing: border-box;
  padding: 16px 0;
  background-color: #f1f1f1;
}

</style>
