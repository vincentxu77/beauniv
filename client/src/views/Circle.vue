<template>
    <div class="circle">
        <Header 
            title='万花筒'
            btn_icon='plus-square-o'
            @rightClick="$router.push('/publish')"
        ></Header>
        <div class="container">
            <!-- <div class="scroll-wrap"> -->
            <Scroll
              ref="pullrefresh"
              @pulldown="loadData"
              @pullup="loadMore">
                <div class="head_wrapper">
                    <div class="user_head">
                        <span style="color:#8B4726
                        ">尊敬的{{user.name}}，欢迎您！</span>
                        <div class="user_img">
                          <img :src="user.avatar" alt="" class="head_img">
                        </div>
                    </div>
                </div>
                <div class="content_wrapper">
                    <Cell
                        v-for="(cricle, index) in cricleList"
                        :key="index"
                        :cricleObj='cricle'
                    ></Cell> 
                </div>
            </Scroll>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
import Header from "../components/Header";
import jwt_decode from "jwt-decode";
import Cell from "../components/Cell";
import Scroll from "../components/Scroll";

export default {
  name: "fcircle",
  data() {
    return {
      col:2,
      data:[],
      cricleList: [],
      page: 2, // 加载更多从page2开始
      size: 3, // 每次请求3条数据
      loading: false
    };
  },
  components: {
    Header,
    Cell,
    Scroll
  },
  computed: {
    user() {
      const token = localStorage.stuToken;
      // 解析token
      const decode = jwt_decode(token);
      return decode;
    },
  },
  mounted() {
    this.getLatestData();
  },

  methods: {
    getLatestData() {
      if (this.loading) return;
      this.loading = true;
      this.$axios("/api/profile/latest").then(res => {
        this.loading = false;
        this.cricleList = [...res.data];
        this.$refs.pullrefresh.$emit("pullrefresh.finishLoad");
        this.$nextTick(()=>{
          this.$refs.pullrefresh._initScroll();
        })
      });
    },
    loadData() {
      //下拉刷新重新初始化
      this.page = 2;
      this.getLatestData();
    },
    loadMore() {
      this.getMoreData();
    },
    getMoreData() {
      if (this.loading) return;
      // 发送axios请求
      this.loading = true;
      this.$axios(`/api/profile/${this.page}/${this.size}`).then(res => {
        this.loading = false;
        const result = [...res.data];
        if (result.length > 0) {
          // 拿到结果数据进行遍历 push到列表数组中，并且page+1
          this.$refs.pullrefresh.$emit("infinitescroll.reInit");
          result.forEach(item => {
            this.cricleList.push(item);
          });
          this.page++;
        } else {
          // 数组为空，没有更多数据，page不再递增
          this.$refs.pullrefresh.$emit("infinitescroll.loadedDone");
        }
      });
    }
  }
};
</script>
<style scoped>
.circle {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 50px;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  padding-top: 50px;
  overflow: auto;
  padding-bottom: 30px;
}
.head_wrapper {
  width: 100%;
  position: relative;
  height: 60px;
  background: url(../assets/cricle_bg.png) no-repeat;
  background-size: 100% 100%;
}
.head_wrapper .user_head {
  position: absolute;
  right: 1px;
}
.user_img {
  width: 60px;
  height: 60px;
  padding: 3px;
  border: 1px solid #c5c5c5;
  box-sizing: border-box;
}
.user_head img {
  width: 100%;
  height: 100%;
}
.user_head span {
  line-height: 55px;
  position: absolute;
  right: 60px;
  width: 310px;
  text-align: right;
  color: white;
}

</style>

