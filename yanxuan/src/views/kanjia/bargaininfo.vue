<template>
    <div class="kanjia">
        <div class="coating" v-show="layerShow">
            <div class="layerinfo">
                <p><i @click="closeLayer" class="el-icon-close"></i></p>
                <p>恭喜</p>
                <p>砍价创建成功</p>
                <p>快邀请好友来砍价把~</p>
                <div class="icons">
                    <div>
                        <p><i class="el-icon-share"></i></p>
                        <p>邀请好友</p>
                    </div>
                    <div>
                        <p><i class="el-icon-picture-outline"></i></p>
                        <p>生成二维码</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="kanjiainfo_container">
            <p><i class="el-icon-user"></i></p>
            <p>我发现了一件好货，来帮我砍到最低价把~</p>
            <div class="shopinfo">
                <img :src="kanls.pic" alt="">
                <div class="ri">
                    <h3 v-html="kanls.name"></h3>
                    <div class="origin">
                        <div>
                            <span>底价</span>
                            <span>￥{{ kls.minPrice }}</span>
                        </div>
                        <div v-for="(v,i) in helps" :key="i">原价￥{{ kls.curPrice+v.cutPrice  }}</div>
                    </div>
                </div>
            </div>
            <div class="price">
                当前价<span>{{ kls.curPrice }}</span>元，已砍<span v-for="(v,i) in helps" :key="i">{{ v.cutPrice }}</span>元
            </div>
            <div class="buy">
                <p @click="mykan">{{ msg }}</p>
                <p>邀请好友砍价</p>
            </div>
            <div class="timer">
                <ul>
                    <li></li>
                </ul>
            </div>
        </div>
        <div class="info_foot">
            <p>{{ helps.length }}名好友帮砍</p>
            <div class="dv" v-for="(v,i) in helps" :key="i">
                <p><i class="el-icon-user"></i></p>
                <p>{{ v.dateAdd }}</p>
                <p>砍掉 {{ v.cutPrice }}元</p>
            </div>
        </div>
    </div>
    <!-- el-icon-user el-icon-arrow-left
 -->
</template>

<script>
import Product from '../../services/product-services'
const _product = new Product()
export default {
    name: 'bargaininfo',
    data () {
        return {
            layerShow: true,
            kls: {},
            kanPri: {},
            helps: [],
            msg: "自己先砍一刀"
        }
    },
    created () {
        let kjid = this.$route.query.kjid
        let joiner = 1122517
        console.log(kjid)
        console.log(joiner)
        let obj = {
            kjid:kjid,
            joiner: joiner
        }
        _product.tokanjia(obj).then(res => {
            console.log(res)
            this.kls = res.data.data.kanjiaInfo
            this.helps = res.data.data.helps
        })
        
    },
    methods: {
        closeLayer(){
            this.layerShow = false
        },
        mykan(){
            let obj = this.$route.query
            console.log(obj)
            this.msg = "以当前价购买"
            _product.kanOne(obj).then(res => {
                console.log(res)
                this.kanPri = res.data.data
                console.log(this.kanPri)
            })
        }
    },
    computed: {
      kanls(){
          return this.$store.state.kaninfo
      }  
    }
}
</script>

<style lang="scss">
    .kanjia{
        width: 5.6rem;
        .info_foot{
            width: 100%;
            >p{
                text-align: center;
                line-height: 0.5rem;
                font-size: 0.16rem;
                color: #b39f75;
            }
            .dv{
                height: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-around;
                p:nth-of-type(1){
                    width: 0.7rem;
                    height: 0.7rem;
                    background: #ddd;
                    border-radius: 50%;
                    text-align: center;
                    margin-bottom: 0.2rem;
                    i{
                        line-height: 0.7rem;
                        color: black;
                        font-size: 0.5rem;
                    }
                }
                p:nth-of-type(2){
                   font-size: 0.16rem;
                }
                p:nth-of-type(3){
                   font-size: 0.22rem;
                   color: #a88f61;
                }
            }
        }
        .kanjiainfo_container{
            width: 100%;
            height: 5rem;
            background: linear-gradient(to right top,#e7d9bf,#b7a47c);
            padding-top: 0.5rem;
            >p{
                &:nth-of-type(1){
                    width: 1rem;
                    height: 1rem;
                    background: #f5f5f5;
                    border-radius: 50%;
                    text-align: center;
                    box-shadow: 0 0 0.05rem 0.05rem darkgray;
                    margin: 0 auto;
                    margin-bottom: 0.2rem;
                    i{
                        line-height: 1rem;
                        color: white;
                        font-size: 0.8rem;
                    }
                }
                &:nth-of-type(2){
                    color: white;
                    text-align: center;
                }
                
            }
            .shopinfo{
                background: #f6edde;
                width: 80%;
                height: 1.5rem;
                margin: 0.2rem auto;
                border-radius: 0.1rem;
                box-shadow: 0 0 10px 1px #a7a7a7;
                display: flex;
                align-items: center;
                img{
                    width: 1.3rem;
                    height: 1.3rem;
                    margin: 0 0.1rem;
                }
                .ri{
                    .origin{
                        display: flex;
                        margin-top: 0.4rem;
                        >div{
                            &:nth-of-type(1){
                                color:#b09972;
                                span:nth-of-type(2){
                                    font-size: 0.3rem;
                                    margin-right: 0.5rem;
                                }
                            }
                            &:nth-of-type(2){
                                color: darkgray;
                                text-decoration: line-through;
                            }
                        }
                    }
                }
            }
            .price{
                text-align: center;
                color: white;
                margin-bottom: 0.2rem;
                span{
                    font-size: 0.3rem;
                }
            }
            .buy{
                display: flex;
                justify-content: center;
                p{
                    width: 2rem;
                    height: 0.6rem;
                    text-align: center;
                    color: white;
                    line-height: 0.6rem;
                    border: 1px solid #b0a48c;
                    &:nth-of-type(1){
                        background: #b0a48c;
                        border-radius: 0.05rem;
                        margin-right: 0.2rem;
                    }
                    &:nth-of-type(2){
                        border-radius: 0.05rem;
                        color: #b3a079;
                    }
                }
            }
        }
        .coating{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.3);
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .layerinfo{
                width: 2.5rem;
                height: 3rem;
                border-radius: 0.1rem;
                background:#b7a47c;
                text-align: center;
                color: white;
                line-height: 0.3rem;
                >p:nth-of-type(1){
                    color: white;
                    height: 0.4rem;
                    i{
                        text-indent: 2.2rem;
                        font-size: 0.24rem;
                        line-height: 0.4rem;
                    }
                }
                >p:nth-of-type(3){
                    font-size: 0.16rem;
                    margin-bottom: 0.1rem;
                }
                >p:nth-of-type(2){
                    font-size: 0.24rem;
                    margin-bottom: 0.1rem;
                }
                .icons{
                    display: flex;
                    justify-content: center;
                    margin-top: 0.2rem;
                    >div{
                        &:nth-of-type(1){
                            width: 0.7rem;
                            margin-right: 0.35rem;
                            p:nth-of-type(1){
                                width: 0.5rem;
                                height: 0.5rem;
                                border-radius: 50%;
                                background: brown;
                                text-align: center;
                                margin: 0 auto;
                                i{
                                    line-height: 0.5rem;
                                }
                            }
                            p:nth-of-type(2){
                                width: 0.7rem;
                                font-size: 0.13rem;
                                text-align: center;
                            }
                        }
                        &:nth-of-type(2){
                            width: 0.7rem;
                            p:nth-of-type(1){
                                width: 0.5rem;
                                height: 0.5rem;
                                border-radius: 50%;
                                background: brown;
                                text-align: center;
                                margin: 0 auto;
                                i{
                                    line-height: 0.5rem;
                                }
                            }
                             p:nth-of-type(2){
                                
                                font-size: 0.13rem;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }
    

</style>