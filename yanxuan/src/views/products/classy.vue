<template>
    <div class="cl">
        <div class="tp">
            <router-link tag="p" to="/classity">
            <i class="el-icon-arrow-left"></i>
            </router-link>
            <p>分类商品</p>
        </div>
        <div class="content">
            <router-link :to="{path:'/detail/',query:{id:v.id}}" tag="div" v-for="(v,i) in classityList" :key="i">
                <img :src="v.pic" alt="">
                <p>{{ v.name }}</p>
                <h2 v-html="v.name"></h2>
                <div>
                    <h3>￥{{ v.minPrice }}</h3>
                    <p>已售{{ v.numberSells }}</p>
                </div>
            </router-link>
        </div>
        <div class="no" v-show="classityList.length == 0">
            <img src="/static/none.png" alt="">
        </div>
    </div>
</template>

<script>
    import Product from '../../services/product-services'
    const _product = new Product() 
    export default {
        name: 'classy',
        data () {
            return {
                classityList: []
            }
        },
        created () {
           let id = this.$route.params.id
           //console.log(id)
          _product.classls(id).then(res => {
              //console.log(res.data.data)
              this.classityList = res.data.data.filter((v)=>{
                  return v.categoryId == id
              })
             //console.log(this.classityList)
          })  
        }
    }
</script>

<style lang="scss" >
    .cl{
        padding-top: 1rem;
        .tp {
            width: 5.6rem;
            height: 1rem;
            background: white;
            border-bottom: 0.01rem solid #ddd;
            line-height: 1rem;
            display: flex;
            justify-content: space-between;
            padding: 0 0.15rem;
            position: fixed;
            left: 0;
            top: 0;
            p:nth-of-type(2){
                width: 95%;
                text-align: center;
                font-size: 0.28rem;
            }
        }
        .content{
            width: 5.6rem;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            //padding: 0 0.1rem;
            &>div{
                img{
                    width: 2.6rem;
                }
                &>p{
                    width: 2.6rem;
                    height: 0.4rem;
                    text-indent: 0.15rem;
                    line-height: 0.4rem;
                    background: gold;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    width: 2.6rem;
                }
                h2{
                    line-height: 0.5rem;
                    font-weight: normal;
                    width: 2.6rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                &>div{
                    width: 2.6rem;
                    display: flex;
                    justify-content: space-between;
                    height: 0.5rem;
                    align-items: center;
                    h3{
                        color: red;
                        font-size: 0.32rem;
                    }
                    p{
                        color: darkgray;
                    }
                }
            }
        }
        .no{
            width: 5.6rem;
            text-align: center;
            padding-top: 1.5rem;
            img{
                width: 2.5rem;
                
            }
        }
    }
     
</style>