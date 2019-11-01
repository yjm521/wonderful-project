<template>
    <div class="cart">
        <div class="cart_top">
            <p v-show="shopList.length!=0&&!finishedShow" @click="editClick">编辑</p>
            <p v-show="shopList.length!=0&&finishedShow" @click="finishedClick">完成</p>
            <p>购物车</p>
        </div>
        <div v-show="shopList.length==0" class="cart_content">
            <img src="/static/car.png" alt="">
        </div>
        <div class="shoplist">
                <div class="cont" v-for="(v,i) in shopList" :key="i">
                    <input @click="changeChecked(v)" type="checkbox" :checked="v.checked">
                    <img :src="v.info.pic" alt="">
                    <div class="wrap">
                        <p v-html="v.info.name"></p>
                        <p>{{ v.size }}</p>
                        <p>{{ v.col }}</p>
                        <div>
                            <p>￥{{ v.info.minPrice }}</p>
                            <div>
                                <button @click="reduce(v)">-</button>
                                <p>{{ v.num }}</p>
                                <button @click="increase(v)">+</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div class="selectAll">
            <label for="a">
                <input id="a" :checked="isSelectAll" type="checkbox" @click="selectAll">全选
            </label>
            <p>合计￥{{ allPri }}</p>
            <button @click="place" v-show="!delShow">下单</button>
            <button v-show="delShow" @click="del">删除</button>
        </div>
        <div class="cart_link">
            <div class="like_top">猜你喜欢</div>
            <div class="per">
                <router-link class="perls" :to="{path:'/detail/',query:{id:v.id}}" v-for="(v,i) in ranList" :key="i" tag="div">
                    <img :src="v.pic" alt="">
                    <div>
                        <p>{{ v.name }}</p>
                        <p>{{ v.characteristic }}</p>
                    </div>
                    <p>{{ v.minPrice.toFixed(2) }}</p>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import localStore from '../../storage/index.js'
    import Product from '../../services/product-services'
    const _product = new Product()
    export default {
        name: 'cart',
        data () {
            return {
                ls: [],
                ranList: [],
                delShow: false,
                finishedShow: false
            }
        },
        created () {
            _product.per().then(res => {
                this.ls = res.data.data
                 for(let i=1;i<=4;i++){
                    let ran = parseInt(Math.random()*this.ls.length)
                    this.ranList.push(this.ls[ran])
                }
                //console.log(this.ranList)
            })
        },
        methods: {
            editClick(){
                this.delShow = true
                this.finishedShow = true
                this.$store.state.storeLs.forEach(v => v.checked=false)
            },
            finishedClick(){
                this.delShow = false
                this.finishedShow = false
                this.$store.state.storeLs.forEach(v => v.checked=true)
            },
            del(){
                this.$store.state.storeLs = this.$store.state.storeLs.filter(v => {
                    return v.checked == false
                }).splice(0)
            },
            increase(v){
                v.num++
            },
            reduce(v){
                v.num--
                if(v.num<=1){
                    v.num = 1
                }
            },
            changeChecked(v){
                v.checked = !v.checked
            },
            selectAll(){
                if(this.isSelectAll){
                    this.$store.state.storeLs.forEach(v => v.checked=false)
                }else{
                    this.$store.state.storeLs.forEach(v => v.checked=true)
                }
                console.log(this.isSelectAll)
            },
            place(){
                this.$store.state.storeLs.forEach(v => {
                    if(v.checked==false){
                        alert("未选中任何商品")
                    }else{
                        this.$router.push("/purchase")
                    }
                })
                
            }
        },
        watch: {
          shopList:{
            handler(){
              localStore.set("list",this.shopList)
            },
            deep:true
          }
        },
        computed: {
            shopList(){
                
                return this.$store.state.storeLs
            },
            allPri(){
                return this.$store.getters.allPri
            },
            isSelectAll(){
                if(this.$store.state.storeLs.length == 0){
                    return false
                } 
                return !this.$store.state.storeLs.find(item => !item.checked)
            }
        }
    }
</script>
<style lang="scss">
    @function pr($px) {
		@return $px/(375/375)/50*1rem;
	}
    .cart{
        width: 100%;
        overflow-x: hidden;
        .cart_top{
            height: pr(42);
            line-height: pr(42);
            display: flex;
            width: 100%;
            p:nth-of-type(1){
                margin-left: 0.1rem;
                color: red;
                
            }
            p:nth-of-type(2){
                margin-left: 0.1rem;
                color: red;
                
            }
            p:nth-of-type(3){
                width: 90%;
                text-align: center;
            }
        }
        .selectAll{
            height: 0.8rem;
            width: 100%;
            display: flex;
            position: fixed;
            left: 0;
            right: 0;
            bottom: 1.2rem;
            background: white;
            z-index:1;
            align-items: center;
            justify-content: space-between;
            border-bottom: 0.01rem solid #000;
            label{
                margin-left: 0.2rem;
                color: darkgray;
                input{
                    width: 0.2rem;
                    height: 0.2rem;
                    margin-right: 0.15rem;
                }
            }
            p{
                color: red;
            }
            button{
                width: 1.8rem;
                border: none;
                outline: none;
                background: #b7282e;
                height: 0.8rem;
                color: white;
                font-size: 0.24rem;
                letter-spacing: 0.1rem;
            }
        }
        .shoplist{
            width: 100%;
            .cont{
                display: flex;
                height: 1.8rem;
                align-items: center;
                border-bottom: 0.01rem solid #ddd;
                input{
                    margin-left: 0.15rem;
                    width: 0.25rem;
                    height: 0.25rem;
                }
                img{
                    width: 1rem;
                    height: 1rem;
                    border: 1px solid #666;
                    margin: 0 0.2rem;
                }
                .wrap{
                    width: 60%;
                    >p{
                        &:nth-of-type(1){
                            font-size: 0.18rem;
                        }
                        &:nth-of-type(2){
                            color: darkgray;
                            margin: 0.1rem 0;
                            font-size: 0.16rem;
                        }
                        &:nth-of-type(3){
                            color: darkgray;
                            margin: 0.1rem 0;
                            font-size: 0.16rem;
                        }
                    }
                    >div{
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                        height: 0.5rem;
                        align-items: center;
                        >p{
                            color: red;
                        }
                        >div{
                            display: flex;
                             button{
                                width: 0.4rem;
                                height: 0.3rem;
                                border: none;
                                outline: none;
                                font-size: 0.26rem;
                                background: #f0f0f0;
                            }
                            >p{
                                width: 0.3rem;
                                height: 0.3rem;
                                margin: 0 0.15rem;
                                line-height: 0.3rem;
                                text-align: center;
                                border-top: 0.01rem solid #f0f0f0;
                                border-bottom: 0.01rem solid #f0f0f0;
                            }
                        }
                    }
                }
            }
        }
        .cart_content{
            height: pr(220);
            background: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: pr(100);
                height: pr(100);
            }
        }
        .cart_link{
            .like_top{
                height: pr(57);
                line-height: pr(57);
                text-align: center;
            }
            .per{
                width: 5.6rem;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                .perls{
                    width: 2.6rem;
                    img{
                    width: 2.6rem;
                    height: 3rem;
                    }
                    &>div{
                        width: 2.6rem;
                        p:nth-of-type(2){
                            width: 2.6rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            color: darkgray;
                            font-size: 0.16rem;
                        }
                        p:nth-of-type(2){
                            width: 2.6rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            color: darkgray;
                            font-size: 0.16rem;
                            margin-top: 0.2rem;
                        }
                    }
                    &>p{
                        color:red;
                        width: 2.6rem;
                        line-height: 0.4rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
</style>