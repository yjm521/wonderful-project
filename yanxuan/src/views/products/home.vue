<template>
  <div class="ban">
    <div v-show="top_show" class="tp">于佳名</div>
    <homeBan :banList="banList"></homeBan>
    <kanList :kanLs="kanLs"></kanList>
    <goodList :perLs="perLs"></goodList>
    <div class="perList">
      <div class="per_top">
        <p>
          人气推荐
          <i class="el-icon-arrow-right"></i>
        </p>
      </div>
    </div>
    <perlist :tuijian="tuijian"></perlist>
  </div>
</template>
<script>

import homeBan from '../../components/home/home-ban'
import kanList from '../../components/home/kanList'
import perlist from '../../components/home/perlist'
import goodList from '../../components/home/goodList'
import Product from '../../services/product-services'
const _product = new Product()
export default {
  components: {
      homeBan,
      kanList,
      goodList,
      perlist
  },
  name: "home",
  data() {
    return {
      show: false,
      scroll: 0,
      top_show:false,
      banList: [],
      perLs: [],
      kanLs: [],
      tuijian: []
    };
  },
  created () {
    _product.list().then(res => {
      let { data } = res.data
      this.banList = data
    })
    _product.goodList().then(res => {
      this.perLs = res.data.data.splice(0,3)
    })
    _product.kanList().then(res => {
      this.kanLs = res.data.data.goodsMap
    })
    _product.per().then(res => {
      this.tuijian = res.data.data.splice(8,4)
      //console.log(this.tuijian)
    })
  },
  mounted () {
    document.addEventListener("scroll",this.scrollShow)
  },
  methods: {
    scrollShow(){
        this.scroll=document.documentElement.scrollTop||document.body.scrollTop;
            if(this.scroll>=1000){
                this.top_show=true
            }else{
                this.top_show=false
            }
    }
  }
};
</script>
<style lang="scss" scoped>
    .ban{
      width: 5.6rem;
      overflow-x: hidden;
    }
    .tp{
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 0.6rem;
      font-size: 0.34rem;
      color:gold;
      text-align: center;
      line-height: 0.6rem;
      background: lightcoral;
      z-index: 20;
    }
</style>