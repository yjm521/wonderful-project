<template>
    <div class="kanLs">
        <div class="kanTop">
            <router-link to="/" tag="p"><i class="el-icon-arrow-left"></i></router-link>
            <p>砍价列表</p>
        </div>
            <router-link class="ls" :to="{path:'/detail/',query:{id:v.id}}" tag="div" v-for="(v,i) in kanList" :key="i">
                <img :src="v.pic" alt="">
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
    import Product from '../../services/product-services'
    const _product = new Product()
    export default {
        name: 'bargain',
        data() {
            return {
                kanList: [],
                fitList: [],
                idLs: [],
                ls: []
            }
        },
        created () {
            
            _product.kanList().then(res => {
                  this.idLs = res.data.data.result
               //console.log(res.data.data)
                for(let i in res.data.data.goodsMap){
                    this.kanList.push(res.data.data.goodsMap[i])
                    }
                 console.log(res.data.data)
            })
        }
    }
</script>
<style lang="scss">
    .kanLs{
        .mine-active{
            color:#000;
        }
         .kanTop{
            height: 0.7rem;
            display: flex;
            align-items: center;
            padding: 0 0.15rem;
            justify-content: space-between;
            border-bottom: 0.01rem solid #ddd;
            p:nth-of-type(1){
                i{
                    font-size: 0.28rem;
                }
            }
            p:nth-of-type(2){
                width: 90%;
                text-align: center;
            }
        }
            .ls{
                height: 2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 0.15rem;
                border-top: 0.01rem solid #ddd;
                img{
                    width: 1.5rem;
                    height: 1.5rem;
                    display: block;
                    margin-right: 0.2rem;
                }
                .ri{
                    width: 70%;
                    h3{
                        line-height: 0.3rem;
                    }
                    &>p{
                        font-size: 0.16rem;
                        color:darkgray;
                        margin: 0.15rem 0;
                    }
                    &>div{
                        display: flex;
                        justify-content: space-around;
                        div{
                            &:nth-of-type(1){
                                p:nth-of-type(1){
                                    font-size: 0.2rem;
                                    font-weight: bold;
                                }
                            }
                        }
                    }
                }
            }
        }
   
</style>