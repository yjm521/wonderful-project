<template>
    <div class="dingdan">
        <p><i @click="back" class="el-icon-arrow-left"></i></p>
        <div class="ls" v-for="(v,i) in shoplist" :key="v.id">
            <div class="shopItem" v-for="(val,inx) in v" :key="inx">
                <img :src="val.pic" alt="">
                <div class="ri">
                    <p>{{ val.goodsName }}</p>
                    <p>{{ val.property }}</p>
                    <div>
                        <p>￥{{ val.amount }}</p>
                        <div @click="toEval(item,val)" v-for="(item,index) in orderList" :key="index" v-show="item.id==i">
                            {{ item.statusStr }}
                        </div>
                    </div>
                    <div class="num" v-for="(item,index) in orderList" :key="index" v-show="item.id==i">
                        订单号：{{ item.orderNumber }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Product from '../../services/product-services'
    const _product = new Product
    export default {
       name: 'dingdan',
       data () {
           return {
               shoplist: [],
               orderList: [],
               list: [],
               orderNumber: ""
           }
       },
       created () {
           let obj = {
               token: this.$store.state.tk.token,
               pageSize: 10
           }
           _product.orders(obj).then(res => {
               this.shoplist = res.data.data.goodsMap
               this.orderList = res.data.data.orderList
               console.log(this.shoplist)
               console.log(res.data.data)
           })
       },
       methods: {
           back(){
               history.back()
           },
           toEval(v,item){
               let id = item.id
               let orderId = item.orderId
               console.log(v)
               console.log(id,orderId)
               if (v.statusStr == '待评价') {
                   this.$router.push(`/dingdan/${orderId}/${id}`)
               }
           }
       } 
    }
</script>

<style lang="scss" scoped>
    .dingdan{
        >p{
            height: 0.44rem;
            i{
                line-height: 0.44rem;
                font-size: 0.3rem;
                text-indent: 0.2rem;
            }
        }
        .ls{
            .shopItem{
                display: flex;
                height: 2rem;
                align-items: center;
                border-bottom: 0.01rem solid #ddd;
                img{
                    width: 1.5rem;
                    border: 1px solid darkgrey;
                    height: 1.5rem;
                    border-radius: 0.1rem;
                    margin-left: 0.2rem;
                    margin-right: 0.5rem;
                }
                .ri{
                    >p{
                        &:nth-child(2){
                            color: darkgray;
                            font-size: 0.15rem;
                            margin: 0.15rem 0;
                        }
                    }
                    >div{
                        &:nth-of-type(1){
                            display: flex;
                            color: red;
                            >p{
                                margin-right: 0.2rem;
                            }
                            margin-bottom: 0.15rem;
                        }
                    }
                    .num{
                            color: darkgray;
                            font-size: 0.14rem;
                        }
                }
            }
        }
    }
</style>