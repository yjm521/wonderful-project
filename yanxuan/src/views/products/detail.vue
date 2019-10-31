<template>
    <div>
        <!-- 加入购物车模态框 -->
        <div v-show="shopSh" class="shoptop">
            <!-- <div class="shoptop"> -->
                <div class="tp">
                    <img :src="info.pic" alt="">
                    <div>
                        <p>{{ info.name }}</p>
                        <p>￥{{ info.minPrice }}</p>
                    </div>
                    <p @click="close">x</p>
                </div>
                <div class="shopSt">
                    <ul>
                        <li>
                            <p>{{ shopls.name }}</p>
                            <div>
                                <div :class="inx1==index?'redcolor':''"  @click="changeRed(item,index)" v-for="(item,index) in shopls.childsCurGoods" :key="index">{{ item.name }}</div>
                            </div>
                        </li>
                    </ul>
                    <ul>
                         <li v-if="alls.length == 2">
                            <p>{{ shopls2.name }}</p>
                            <div>
                                <div :class="inx2==index?'redcolor':''" @click="changeRed2(item,index)" v-for="(item,index) in shopls2.childsCurGoods" :key="index">{{ item.name }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="shopnum">
                    <p>购买数量</p>
                    <div>
                        <button @click="jian">-</button>
                        <p>{{ shopNumber }}</p>
                        <button @click="jia">+</button>
                    </div>
                </div>
                <button @click="addShop" class="btn">加入购物车</button>
            <!-- </div> -->
            
        </div>
        <!-- 立即购买模态框 -->
        <div v-show="nowshop" class="shopfloat">
            <div class="shoptop">
                <div class="tp">
                    <img :src="info.pic" alt="">
                    <div>
                        <p>{{ info.name }}</p>
                        <p>￥{{ info.minPrice }}</p>
                    </div>
                    <p @click="closenow">x</p>
                </div>
                <div class="shopSt">
                    <ul>
                        <li>
                            <p>{{ shopls.name }}</p>
                            <div>
                                <div :class="inx1==index?'redcolor':''"  v-for="(item,index) in shopls.childsCurGoods" :key="index">{{ item.name }}</div>
                            </div>
                        </li>
                    </ul>
                    <ul>
                         <li v-if="alls.length == 2">
                            <p>{{ shopls2.name }}</p>
                            <div>
                                <div :class="inx2==index?'redcolor':''" v-for="(item,index) in shopls2.childsCurGoods" :key="index">{{ item.name }}</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="shopnum">
                    <p>购买数量</p>
                    <div>
                        <button>-</button>
                        <p>{{ shopNumber }}</p>
                        <button>+</button>
                    </div>
                </div>
                <button class="btn">立即购卖</button>
            </div>
            
        </div>
        <div class="det">
            <!-- 底部固定 -->
            <div class="foot" v-show="kanjiashow">
                <ul>
                    <li><i class="el-icon-headset"></i></li>
                    <router-link to="/cart" tag="li">
                        <i class="el-icon-shopping-cart-2"></i>
                        <p>{{ this.$store.getters.allCount }}</p>
                    </router-link>
                    <li><i class="el-icon-star-off"></i></li>
                    <li @click="nowShop">立即购买</li>
                    <li @click="showShop">加入购物车</li>
                </ul>
            </div>
            <router-link tag="div" :to="{path:'/bargain_info',query:{kjid:this.kid,joiner:this.$store.state.tk.uid,token:this.$store.state.tk.token}}" 
                                    class="foot2" v-show="!kanjiashow">
                                    立即发起砍价，最低可砍到1元
            </router-link>
            <div class="block">
                <el-carousel trigger="click" height="5.4rem">
                    <el-carousel-item v-for="(item,index) in pics" :key="index">
                    <div>
                        <img :src="item.pic" alt />
                    </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <p class="tit" v-html="info.name"></p>
            <div class="num">
                <div>
                    <p>￥{{ info.minPrice }}</p>
                    <p>￥{{ info.originalPrice }}</p>
                </div>
                <p>已售{{ info.numberSells }}</p>
            </div>
            <div class="selectShop" @click="showShop">
                <p>选择规格：{{ shopls.name }}</p>
                <p><i class="el-icon-arrow-right"></i></p>
            </div>
            <div class="shops">
                <p @click="jieshao" :class="red?'red':''">商品介绍</p>
                <p @click="pingjia" :class="red?'':'red'">商品评价</p>
            </div>
            <div v-show="isShow" class="htl" v-html="detLs.content"></div>
            <div class="pingjia" v-show="!isShow">
                <ul>
                    <li v-for="(v,i) in pingPers" :key="i">
                        <div><i class="el-icon-user"></i></div>
                        <div>
                            <div>
                                <p>匿名评价</p>
                                <p>{{ v.goods.goodReputationStr }}</p>
                            </div>
                            <p>{{ v.goods.goodReputationRemark }}</p>
                            <div>
                                <span>{{ v.goods.dateReputation }}</span>
                                <span>选择规格:</span>
                                <span v-html="v.goods.goodsName"></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div @click="back" class="fd">
                <i class="el-icon-arrow-left"></i>
            </div>
            <div class="addsucc" v-show="addsucc">
                加入成功
            </div>
        </div>
        <div class="dont" v-show="dont">
            <div class="tips">
                <p>提示</p>
                <p>请选择商品规格</p>
                <p @click="closeDont">确定</p>
            </div>
        </div>
    </div>
    
    
</template>

<script>
    import Product from '../../services/product-services'
    const _product = new Product()
    export default {
        name: 'detail',
        data () {
            return {
                detLs: [],
                pics: [],
                info: [],
                shopSh: false,
                shopls: [],
                shopls2: [],
                alls: [],
                red: true,
                pingPers: [],
                isShow: true,
                inx1: -1,
                inx2: -1,
                size: "",
                color: "",
                addsucc: false,
                nowshop: false,
                kanjiashow: false,
                shopNumber: 1,
                ls: [],
                kid: "",
                dont: false,
                colorid: "",
                colorid2: "",
                sizeid: "",
                childs: ""
            }
        },
        created () {
            let { id } = this.$route.query
            _product.det(id).then(res => {
                this.detLs = res.data.data
                this.pics = res.data.data.pics
                this.info = res.data.data.basicInfo
                this.shopls = res.data.data.properties[0]
                this.shopls2 = res.data.data.properties[1]
                this.alls = res.data.data.properties
                // console.log(this.shopls)
                // console.log(this.shopls2)
                let kanjiaBool = res.data.data.basicInfo.kanjia
                if(kanjiaBool == false) {
                    this.kanjiashow = true
                }else{
                    this.kanjiashow = false
                }
                this.$store.commit("kanjia",this.info)
            })
            // let tk = this.$store.state.tk.token
            //  _product.defaultAddress(tk).then(res => {
            //     //console.log(res.data.data)
            //     this.$store.commit("defaultAdd",res.data.data)
            // })
            _product.kanList().then(res => {
                let { id } = this.$route.query
                //console.log(id)
                 this.ls = res.data.data.result.filter(v => {
                     return v.goodsId == id
                 })
                 this.kid = this.ls[0].id
                 console.log(this.ls)
                 console.log(this.kid)
            })
        },
        methods: {
            jia(){
                this.shopNumber++
            },
            jian(){
                this.shopNumber--
                if(this.shopNumber <= 1){
                    this.shopNumber = 1
                }
            },
            nowShop(){
                this.nowshop = true
            },
            closenow(){
                this.nowshop = false
            },
            changeRed(v,i){
                let { id } = this.$route.query
                this.inx1 = i
                this.size = v.name
                
                console.log(v)
                this.colorid = v.id
                this.sizeid = v.id
                console.log(this.colorid)
                let obj = {
                    goodsId: id,
                    colorid: this.colorid,
                    sizeid: this.sizeid
                }
                _product.size(obj).then(res => {
                    console.log(res.data.data)
                    this.childs = res.data.data.propertyChildIds
                })
            },
            changeRed2(v,i){
                let { id } = this.$route.query
                this.inx2 = i
                this.color = v.name
                //console.log(v)
                this.sizeid = v.id
                console.log(this.colorid)
                console.log(this.sizeid)
                 let obj = {
                    goodsId: id,
                    colorid: this.colorid,
                    sizeid: this.sizeid
                }
                _product.size(obj).then(res => {
                    console.log(res.data.data)
                    this.childs = res.data.data.propertyChildIds
                    console.log(this.childs)
                })
            },
            jieshao(){
                this.red = true
                 this.isShow = true
            },
            pingjia(){
                let { id } = this.$route.query
                this.red = false
                this.isShow = false
                _product.reputation(id).then(res => {
                    console.log(res.data.data)
                    this.pingPers = res.data.data
                })
            },
            back(){
                history.back()
            },
            showShop(){
                this.shopSh = true
            },
            closeDont(){
                this.dont = false
            },
            addShop(){
                let { id } = this.$route.query
                let obj = {
                    info: this.info,
                    size: this.size,
                    col: this.color,
                    checked: true,
                    num: this.shopNumber,
                    goodsId: id,
                    propertyChildIds:this.childs
                }
                if(this.alls.length == 2){
                    if(this.size == "" || this.col == ""){
                         this.dont = true
                         return
                    }else{
                        this.addsucc = true
                        this.shopSh = false
                        setTimeout(()=>{
                            this.addsucc = false
                        },2000)
                        this.$store.commit("add",obj)
                    }
                }else{
                    if(this.size == ""){
                        this.dont = true
                        return
                    }else{
                        this.addsucc = true
                        this.shopSh = false
                        setTimeout(()=>{
                            this.addsucc = false
                        },2000)
                        this.$store.commit("add",obj)
                    }
                }
              
                    // if(this.size=="" && this.col!=""){
                    //     this.dont = true
                    //     return
                    // }else if(this.size !="" && this.col ==""){
                    //     this.dont = true
                    //     return
                    // }else if(this.size==""&&this.col==""){
                    //     this.dont = true
                    //     return
                    // }else{
                    //     this.addsucc = true
                    //     this.shopSh = false
                    //     setTimeout(()=>{
                    //         this.addsucc = false
                    //     },2000)
                    //     this.$store.commit("add",obj)
                    //     this.inx1 = -1
                    //     this.inx2 = -1  
                    // }
                
                
                
                
            },
            close(){
                this.shopSh = false
            }
        }
    }
</script>

<style lang="scss">
    .addsucc{
        width: 1rem;
        height: 1rem;
        background: rgba(0,0,0,.5);
        position: absolute;
        text-align: center;
        line-height: 1rem;
        color: white;
        left: 50%;
        top: 3rem;
        z-index: 111;
    }
    .dont{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0,0,0,0.3);
        z-index: 300;
        display: flex;
        justify-content: center;
        align-items: center;
        .tips{
            width: 3rem;
            text-align: center;
            height: 1.5rem;
            background: white;
            line-height: 0.45rem;
            color: #000;
            border-radius: 0.15rem;
            p:nth-of-type(3){
                color: blue;
            }
            p:nth-of-type(2){
                color: darkgray;
                font-size: 0.16rem;
            }
        }
    }
    .det{
        width: 5.6rem;
        .pingjia{
            width: 100%;
            ul{
                width: 100%;
                li{
                    width: 100%;
                    display: flex;
                    height: 1.8rem;
                    border-bottom: 0.01rem dashed #666;
                    padding-top: 0.2rem;
                    >div{
                        &:nth-of-type(1){
                            width: 0.8rem;
                            margin: 0 0.2rem;
                            height: 0.8rem;
                            border: 0.01rem solid #ddd;
                            border-radius: 50%;
                            text-align: center;
                            background: #f0f0f0;
                            i{
                                line-height: 0.8rem;
                                font-size: 0.5rem;
                            }
                        }
                        &:nth-of-type(2){
                            >div:nth-of-type(1){
                                display: flex;
                                line-height: 0.4rem;
                                p:nth-of-type(2){
                                    width: 0.6rem;
                                    text-align: center;
                                    height: 0.4rem;
                                    background: #b7282e;
                                    color: white;
                                    margin-left: 0.15rem;
                                    border-radius: 0.05rem;
                                }
                            }
                            >div:nth-of-type(2){
                                    color:#b2b2b2;
                                }
                            >p{
                                margin: 0.2rem 0;
                            }
                            
                        }
                    }
                }
            }
        }
        .shops{
            width: 100%;
            height: 1rem;
            display: flex;
            .red{
                border-bottom: 0.05rem solid red;
            }
            p{
                width: 50%;
                height: 1rem;
                text-align: center;
                line-height: 1rem;
            }
        }
        .selectShop{
            display: flex;
            justify-content: space-between;
            width:5.6rem;
            height: 1rem;
            align-items: center;
            border-bottom: 0.2rem solid #ddd;
            line-height: 1rem;
            >p{
                &:nth-of-type(1){
                    margin-left: 0.2rem;
                }
                i{
                    font-size: 0.24rem;
                    color: #000;
                    margin-right: 0.2rem;
                }
            }
        }
        .fd{
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: white;
            position: fixed;
            left: 0.2rem;
            top: 0.2rem;
            text-align: center;
            z-index: 10;
            i{
                color: #000;
                font-size: 0.3rem;
                line-height: 0.5rem;
            }
        }
        .img-lazyload{
            width: 100%!important;
        }
        .tit{
            height: 0.6rem;
            line-height: 0.6rem;
            text-indent: 0.2rem;
            font-size: 0.28rem;
        }
        .num{
            display: flex;
            justify-content: space-between;
            height: 0.5rem;
            align-items: center;
            padding: 0 0.2rem;
            >p{
                color: darkgray;
            }
            &>div{
                display: flex;
                p{
                    &:nth-of-type(1){
                        color: red;
                        font-size: 0.28rem;
                        font-weight: bold;
                        margin-right: 0.15rem;
                    }
                    &:nth-of-type(2){
                        color: darkgray;
                        text-decoration: line-through;
                    }
                }
            }
        }
        .block {
            width: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .foot2{
        width: 100%;
        height: 1rem;
        background: #b7282e;
        box-shadow: 0 0 5px 1px #bebebe;
        position: fixed;
        left: 0;
        bottom: 0;
        color: white;
        text-align: center;
        line-height: 1rem;
        font-size: 0.24rem;
        z-index: 20;
    }
    .foot{
        width: 100%;
        height: 1rem;
        background: #fff;
        box-shadow: 0 0 5px 1px #bebebe;
        position: fixed;
        left: 0;
        z-index: 20;
        bottom: 0;
        ul{
            height: 0.8rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.3rem;
            li{
                text-align: center;
                &:nth-child(1){
                    font-size: 0.4rem;
                    width: 17%;
                }
                &:nth-child(2){
                    font-size: 0.4rem;
                    width: 17%;
                    display: flex;
                    padding-left: 0.2rem;
                    p{
                        color: red;
                        font-size: 0.26rem;
                    }
                }
                &:nth-child(3){
                    font-size: 0.4rem;
                    width: 17%;
                }
                &:nth-child(4){
                    font-size: 0.2rem;
                    width: 25%;
                }
                &:nth-child(5){
                    font-size: 0.2rem;
                    width: 25%;
                    background: #b7282e;
                    color: white;
                    height: 0.8rem;
                    line-height: 0.8rem;
                }
            }
        }
    }
    .htl{
        ul{
            margin-top: 0.2rem;
            li{
                height: 0.5rem;
                line-height: 0.5rem;
                text-indent: 0.2rem;
            }
        }
    }
    .cart{
        width: 100%;
        height: 100%;
    }
            .btn{
                width: 100%;
                height: 0.8rem;
                background: #b7282e;
                border: none;
                outline: none;
                color: white;
                font-size: 0.26rem;
            }
            .shopnum{
                display: flex;
                height: 1.2rem;
                align-items: center;
                width: 100%;
                justify-content: space-between;
                background: white;
                >div{
                    display: flex;
                    margin-right: 0.2rem;
                    height: 1.2rem;
                    align-items: center;
                    button{
                        width: 0.6rem;
                        height: 0.5rem;
                        border: none;
                        outline: none;
                        font-size: 0.26rem;
                        background: #f0f0f0;
                    }
                    >p{
                        width: 0.4rem;
                        height: 0.5rem;
                        margin: 0 0.15rem;
                        line-height: 0.5rem;
                        text-align: center;
                        border-top: 0.01rem solid #f0f0f0;
                        border-bottom: 0.01rem solid #f0f0f0;
                    }
                }
                >p{
                    margin-left: 0.2rem;
                }
            }
            .shoptop{
                position: fixed;
                left: 0;
                bottom:1.8rem;
                background: white;
                height: 5rem;
                width: 100%;
                z-index: 150;
                .shopSt{
                    width: 100%;
                    height: 2.8rem;
                    border-bottom: 0.01rem solid #ddd;
                    padding-top: 0.4rem;
                    padding-left: 0.2rem;
                    ul{
                        li{
                            p{
                                margin-bottom: 0.2rem;
                            }
                            >div{
                                width: 100%;
                                display: flex;
                                margin-bottom: 0.1rem;
                                flex-wrap: wrap;
                                div{
                                    font-size: 0.16rem;
                                    width: 2rem;
                                    height: 0.4rem;
                                    border: 1px solid #999;
                                    text-align: center;
                                    line-height: 0.4rem;
                                    margin-right: 0.15rem;
                                    border-radius: 0.03rem;
                                    margin-bottom: 0.1rem;
                                }
                                .redcolor{
                                    border: 0.01rem solid red;
                                    color: red;
                                }
                            }
                        }
                    }
                }
                .tp{
                    width: 100%;
                    display: flex;
                    height: 1.5rem;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 0.01rem solid #ddd;
                    img{
                        width: 1.2rem;
                        height: 1.2rem;
                        margin-left:0.2rem; 
                    }
                    >div{
                        >p{
                            &:nth-of-type(1){
                                margin-bottom: 0.2rem;
                                font-size: 0.18rem;
                            }
                            &:nth-of-type(2){
                                color: red;
                                font-size: 0.16rem;
                            }
                        }
                    }
                    >p{
                        font-size: 0.3rem;
                        margin-right: 0.2rem;
                    }
                }
            }
    
    
</style>