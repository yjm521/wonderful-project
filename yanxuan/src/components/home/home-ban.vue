<template>
    <div>
        <div class="block">
            <el-carousel trigger="click" height="5.4rem">
                <el-carousel-item v-for="(item,index) in banList" :key="index">
                <div>
                    <img :src="item.picUrl" alt />
                </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="nav">
            <ul>
                <router-link tag="li" to="/sigin">
                    <img src="/static/heart.png" alt="">
                    <p>签到</p>
                </router-link>
                <router-link tag="li" to="/gift">
                    <img src="/static/queen.png" alt="">
                    <p>礼券</p>
                </router-link>
                <router-link tag="li" to="/bargain">
                    <img src="/static/star.png" alt="">
                    <p>砍价</p>
                </router-link>
                <router-link tag="li" to="/special">
                    <img src="/static/deng.png" alt="">
                    <p>专栏</p>
                </router-link>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'homeBan',
        props: ["banList"]
    }
</script>
<style lang="scss">
    .block {
        width: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .nav {
        height: 1.5rem;
        position: relative;
        left: 0;
        top: -0.3rem;
        width: 100%;
        background: white;
        z-index: 10;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;
        border-bottom: 0.2rem solid #ddd;
    ul {
      height: 1.5rem;
      display: flex;
      width: 100%;
      align-items: center;
      li {
        width: 25%;
        text-align: center;
        img{
            width: 0.6rem;
            height: 0.6rem;
            margin-bottom: 0.15rem;
        }
      }
    }
  }
</style>