<template>
    <div class="scroll-wrap" ref="wrapper">
        <div>
            <!-- 下拉刷新 -->
            <div class="pulldown" v-show="dragTip.showLoding">
                <div class="clear">
                    <div class="fl"><img width="16" src="../assets/scroll_load.gif"></div>
                    <div class="fl">{{dragTip.text}}</div>
                </div> 
            </div>

            <slot></slot>

            <!-- 上拉加载 -->
            <div class="pullup">
              <div class="clear" v-if="!isDone">
                  <div class="fl"><img width="16" src="../assets/scroll_load.gif"></div>
                  <div class="fl">加载中.....</div>
              </div>
              <div class="list-donetip" v-else>
                  <slot name="doneTip">没有更多数据</slot>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "scroll",
  props: {
    probeType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dragTip: {
        text: "下拉刷新",
        showLoding: false
      },
      isDone: false
    };
  },
  mounted() {
      this.$nextTick(() => {
        this._initScroll();
      })
    },
  methods: {
    _initScroll() {
      if (!this.$refs.wrapper) {
        return;
      }

      // better-scroll的初始化
      else if(!this.scroll){
      this.scroll = new BScroll(this.$refs.wrapper, {
        click:true,
        taps:true,
        probeType: this.probeType
      })
      };

      // 派发顶部下拉事件，用于下拉刷新
      this.scroll.on("scroll", pos => {
        //显示下拉刷新loading
        this.dragTip.showLoding = true;

        if (pos.y > 38) {
          this.dragTip.text = "释放刷新";
        }
      });
      // 下拉刷新时，松手时触发pulldown事件，并注册刷新结束事件
      this.scroll.on("touchEnd", pos => {
        if (pos.y > 38) {
          this.dragTip.text = "刷新中...";
          //重新初始化
          this.$on("pullrefresh.finishLoad", this.resetParams);
          this.$emit("pulldown", pos);
        }
      });

      // 派发滚动到底部事件，用于上拉加载
      this.scroll.on("scrollEnd", () => {
        if (this.scroll.y <= this.scroll.maxScrollY + 38) {
          //所有数据加载完毕后
          this.$on("infinitescroll.loadedDone", () => {
            this.isDone = true;
          });
          //重新初始化
          this.$on("infinitescroll.reInit", () => {
            this.isDone = false;
          });
          this.$emit("pullup"); // 触发pullup事件
        }
      });
    },
    resetParams() {
      this.isDone = false;
      setTimeout(() => {
        this.dragTip = {
          text: "下拉刷新",
          showLoding: false
        };
      }, 500);
    },
    refresh() {
            // 代理better-scroll的refresh方法
            this.scroll && this.scroll.refresh()
        },
  },
  watch: { // 监听数据的变化延时refreshDelay时间后调用refresh方法重新计算保证滚动效果正常 
        data() {
            setTimeout(() => {
                this.refresh()
            }, 20)
        }
    }
};
</script>


<style scoped>
.scroll-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.fl {
  display: inline-block;
}
.fl img {
  vertical-align: middle;
  margin-right: 0.2rem;
}
/* 下拉刷新 */
.pulldown,
.pullup {
  width: 100%;
  height: 38px;
  position: relative;
  color: #888;
}
.clear {
  padding: 10px 0px;
  font-size: 0.28rem;
  position: absolute;
  left: 50%;
  top: 5px;
  transform: translate(-50%, 0);
}
.list-donetip {
  text-align: center;
  line-height: 38px;
  font-size: 0.28rem;
}
</style>
