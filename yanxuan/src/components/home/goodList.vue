<template>
    <div class="goodList">
      <div class="good_top">
        <router-link tag="p" to="/special">
          精选专题
          <i class="el-icon-arrow-right"></i>
        </router-link>
      </div>
      <div class="wrapper" ref='wrapper'>
          <ul class="content">
              <router-link tag="li" :to="{ name: 'spe', params: { id: v.id } }" v-for="(v,i) in perLs" :key="i">
                  <img :src="v.pic" alt="">
                  <p v-html="v.title"></p>
                  <p>{{ v.descript }}</p>
              </router-link>
          </ul>
      </div>
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    export default {
        name: 'goodList',
        props: ["perLs"],
        mounted () {
            this.$nextTick(() => {
                //$refs绑定元素
                if(!this.scroll){
                    this.scroll = new BScroll(this.$refs.wrapper, {
                    //开启点击事件 默认为false
                    click:true,
                    scrollX:true,
                    scrollY:false,

                })
                // console.log(this.scroll)
                }else if(!this.$refs.wrapper){
                    return
                }
                else{
                    this.scroll.refresh()
                }
            })
        }
    }
</script>
<style lang="scss">
    .good_top {
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
  .per_top {
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
  .wrapper{
      height: 3rem;
      overflow: hidden;
      width: 5.6rem;
      ul{
          width: 16rem;
          display: flex;
          height: 2rem;
          li{
              width: 5rem;
              height: 2rem;
              img{
                  width: 80%;
                  height: 2rem;
              }
              p{
                  width: 60%;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
              }
              p:nth-of-type(1){
                  padding-top: 0.1rem;
                  margin-bottom: 0.1rem;
              }
              p:nth-of-type(2){
                  color:darkgray;
                  font-size: 0.14rem;
              }
          }
      }
  }
</style>