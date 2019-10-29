<template>
  <div class="kanPri">
    <div class="kanPri_top">
      <router-link tag="p" to="/bargain">
        全民砍价
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
      <router-link :to="{path:'/detail/',query:{id:v.id}}" class="ls" v-show="v.stores==100" v-for="(v,i) in kanLs" :key="i">
        <img :src="v.pic" alt />
        <div class="ri">
          <h3 v-html="v.name"></h3>
          <p>{{ v.characteristic }}</p>
          <div>
            <div>
              <p style="color:red;">￥{{ v.minPrice }}</p>
              <p>低价</p>
            </div>
            <div>
              <p>￥{{ v.originalPrice }}</p>
              <p>原价</p>
            </div>
            <div>
              <p>{{ v.stores }}</p>
              <p>限量</p>
            </div>
          </div>
        </div>
      </router-link>
    
  </div>
</template>
<script>
export default {
  name: "kanList",
  props: ["kanLs"]
};
</script>
<style lang="scss">
    .kanPri_top {
    height: 0.6rem;
    border-bottom: 0.01rem solid #ddd;
    line-height: 0.6rem;
    & > p {
      height: 0.6rem;
      line-height: 0.6rem;
      text-align: center;
      font-size: 0.2rem;
    }
  }
  a{
    text-decoration: none;
    color:#000;
  }
    .ls {
      height: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.15rem;
      border-top: 0.01rem solid #ddd;
      img {
        width: 1.5rem;
        height: 1.5rem;
        display: block;
        margin-right: 0.2rem;
      }
      .ri {
        width: 70%;
        line-height: 0.2rem;
        h3 {
          line-height: 0.3rem;
        }
        & > p {
          font-size: 0.16rem;
          color: darkgray;
          margin: 0.2rem 0;
        }
        & > div {
          display: flex;
          justify-content: space-around;
          div {
            &:nth-of-type(1) {
              p:nth-of-type(1) {
                font-size: 0.2rem;
                font-weight: bold;
              }
            }
          }
        }
      }
    }
</style>