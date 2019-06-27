<template>
    <div class="index">
        <router-view></router-view>
        <TabBar :data='tabberData'></TabBar>
    </div>
</template>

<script>
import TabBar from "../components/TabBar";

export default {
  name: "index",
  data() {
    return {
      tabberData: [
        { title: "万花筒", icon: "eye", path: "/circle" },
       { title: "聊天", icon: "comments", path: "/chats" },
        { title: "好友", icon: "users", path: "/contacts" },
        { title: "我", icon: "smile-o", path: "/me" }
      ]
    };
  },
  components: {
    TabBar
  }
};
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
}
</style>


