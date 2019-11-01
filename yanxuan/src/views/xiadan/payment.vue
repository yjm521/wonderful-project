<template>
    <div class="container">
        <div class="box">
            <div class="tp">
                <p><i @click="back" class="el-icon-arrow-left"></i></p>
                <p>确认付款</p>
            </div>
            <div class="lst">
                <p><i class="el-icon-smoking"></i></p>
                <div>
                    <p>
                        <span>商品总额：</span>
                        <span>￥{{ order.amount }}</span>
                    </p>
                    <p>订单号：{{ order.orderNumber }}</p>
                </div>
            </div>
            <div class="lt">
                <p><i class="el-icon-map-location"></i></p>
                <div>
                    <p>
                        <span>{{ address.linkMan }}</span>
                        <span>{{ address.mobile }}</span>
                    </p>
                    <p>{{ address.address }}</p>
                </div>
            </div>
        </div>
        <button @click="alt">微信支付￥{{ order.amount }}</button>
        <div class="succ" v-show="flag">
            支付成功
        </div>
    </div>
    
</template>

<script>
export default {
    name: 'payment',
    data () {
        return {
            flag: false      
        }
    },
    methods: {
        back(){
            history.back()
        },
        alt(){
            this.flag = true
            setTimeout(()=>{
                this.flag = false
            },1000)
            this.$store.state.storeLs = this.$store.state.storeLs.filter(v => {
                return v.checked == true
            }).splice(0)
            this.$store.commit("myorder",this.order.orderNumber)
        }
    },
    computed: {
        order(){
            return this.$store.state.order
        },
        address(){
            return this.$store.state.address
        }
    }
}
</script>

<style lang="scss" scoped>
    .container{
        position: relative;
        .succ{
            width: 2rem;
            height: 2rem;
            background: rgba(0,0,0,.3);
            text-align: center;
            line-height: 2rem;
            position: absolute;
            left: 50%;
            margin-left: -1rem;
            top: 50%;
           font-size: 0.3rem;
           color: white;
        }
        button{
            width: 100%;
            height: 0.6rem;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            border: none;
            outline: none;
            background: #b7282e;
            color: white;
            font-size: 0.24rem;
        }
    }
    .box{
        .lst{
            height: 1.2rem;
            display: flex;
            align-items: center;
            border-top: 0.01rem solid #ddd;
            >p{
                font-size: 0.3rem;
                color: #f8662f;
                width: 15%;
                text-align: center;
            }
            >div{
                width: 85%;
                >p:nth-of-type(1){
                    margin-bottom: 0.15rem;
                    span:nth-of-type(2){
                        color: red;
                    }
                }
                >p:nth-of-type(2){
                    font-size: 0.16rem;
                    color: darkgrey;
                }
            }
        }
        .lt{
            height: 1.2rem;
            display: flex;
            align-items: center;
            border-top: 0.01rem solid #ddd;
            >p{
                font-size: 0.3rem;
                color: #5a9fec;
                width: 15%;
                text-align: center;
            }
            >div{
                width: 85%;
                >p:nth-of-type(1){
                    margin-bottom: 0.15rem;
                }
                >p:nth-of-type(2){
                    font-size: 0.16rem;
                    color: darkgrey;
                }
            }
        }
        .tp{
            height: 0.6rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            >p{
                &:nth-of-type(1){
                    i{
                        font-size: 0.24rem;
                    }
                }
                &:nth-of-type(2){
                     width: 95%;
                    text-align: center;
                }
            }
        }
    }
</style>