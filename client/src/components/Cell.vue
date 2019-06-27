<template>

    <div class="cell_circle">
        <div class="img_wrapper">
            <img :src="cricleObj.img" alt="">
        </div>
        <div class="content_wrapper">
          <div class="cell_name">
                {{cricleObj.name}}
          </div>
          <div class="cell_text" v-rainbow v-if="cricleObj.text">
                {{cricleObj.text}}
          </div>
            <div class="cell_img" v-if="cricleObj.imgs.length > 0">
                <img v-for="(item, index) in cricleObj.imgs " :key="index"
                 :src="item" alt="" :preview="cricleObj.name">
                 <div class="toDetail" v-if="cricleObj.imgs.length > 0">
                   <router-link to='/feed' class="nav-link">
                   <img src="../assets/toDetail.gif" title="戳我查看更多" >
                   </router-link>
                   
                 </div>
            </div>
            <div style="position:relative;height:20px">
              <div style="position:absolute;display:inline-block;left:0;color: #888;">
                <i :class="'fa fa-map-marker'"></i>
              {{cricleObj.school}}
              </div>
            
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "cell_circle",  
  props: {
    cricleObj: Object
  },
  directives:{
  	'rainbow':{
  		bind(el,binding,vnode){
  			el.style.color = "#" + Math.random().toString(16).slice(2,8);
  		}
  	}
  }
};
</script>
<style>
.cell_circle {
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  flex-direction: row;
}
.img_wrapper {
  flex: 1;
}
.img_wrapper img {
  width: 40px;
  height: 40px;
}
.content_wrapper {
  flex: 9;
  padding-left: 8px;
}
.content_wrapper .cell_name {
  font-weight: bold;
  color: #8cafe6;
}
.content_wrapper div {
  margin-top: 8px;
  word-wrap: break-word;
}
.content_wrapper .cell_img {
  width: 100%;
  overflow: hidden;
}
.content_wrapper .cell_img img {
  width: 31%;
  height: 6rem;
  float: left;
  margin-right: 5px;
  margin-bottom: 5px;
}

</style>