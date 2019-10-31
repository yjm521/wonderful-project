<template>
    <div class="user">
        <div class="user_top">
            <div><i class="el-icon-user"></i></div>
            <div>
                <router-link v-show="!flag" to="/login" tag="p">点击登录</router-link>
                <p v-show="flag">{{ userid }}</p>
                <p>积分：0</p>
            </div>
        </div>
        <div class="user_news">
            <img src="/static/news.png" alt="">
            <marquee style="color:#d00000;font-size:0.14rem" behavior="" scrollamount="2" direction="up">{{ news }}</marquee>
        </div>
        <router-link tag="div" to="/dingdan" class="user_mine">
            <div>
               <div>
                    <i class="el-icon-tickets"></i>
                    <p>我的订单</p>
               </div>
                <i class="el-icon-arrow-right"></i>
            </div>
        </router-link>
        <div class="user_nav">
                <ul>
                    <li>
                        <img src="/static/one.png" alt="">
                        <p>待付款</p>
                    </li>
                    <li>
                        <img src="/static/two.png" alt="">
                        <p>待发货</p>
                    </li>
                    <li>
                        <img src="/static/three.png" alt="">
                        <p>待收货</p>
                    </li>
                    <li>
                        <img src="/static/four.png" alt="">
                        <p>待评价</p>
                    </li>
                </ul>
        </div>
        <div class="user-subnav">
            <ul>
                <li>
                    <img src="/static/nav_1.png" alt="">
                    <p>我的余额</p>
                    <p>0元</p>
                </li>
                
                <li>
                    <img src="/static/nav_2.png" alt="">
                    <p>我的砍价</p>
                </li>

                <li>
                    <img src="/static/nav_3.png" alt="">
                    <p>我的礼券</p>
                </li>

                <li>
                    <img src="/static/nav_4.png" alt="">
                    <p>我的收藏</p>
                </li>

                <router-link tag="li" :to="{name: 'addre',params:{token:this.$store.state.tk.token}}">
                    <img src="/static/nav_5.png" alt="">
                    <p>我的地址</p>
                </router-link>

                <li>
                    <img src="/static/nav_6.png" alt="">
                    <p>联系客服</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'user',
        data () {
            return {
                news: '新上线更稳定的付费快递查询接口！！！',
                flag:false,
                userid: '',
                token: "",
                id: ""
            }
        },
        created () {
           if(localStorage.getItem("tokenData")){
               this.userid = JSON.parse(localStorage.getItem("tokenData")).uid
               this.flag = true
           }
           console.log(this.$store.state.myod)
           this.token = this.$store.state.tk.token
           this.id = this.$store.state.myod
        },
        methods: {
            
        }
    }
</script>
<style lang="scss">
    @function pr($px) {
        @return $px/(375/375)/50*1rem;
    }
    .user{
        width: 100%;
        overflow-x: hidden;
        .user_top{
            height: pr(150);
            width: 100%;
            display: flex;
            align-items: center;
            background: #bbac85;
            >div{
                &:nth-child(1){
                    width: pr(60);
                    height:pr(60);
                    border-radius: 50%;
                    background: white;
                    text-align: center;
                    margin: 0 pr(15);
                    i{
                        line-height: pr(60);
                        font-size: pr(40);
                    }
                }
                &:nth-child(2){
                    color: white;
                    >p{
                        &:nth-child(1){
                            width: pr(50);
                            text-align: center;
                            margin-bottom: pr(15);
                            font-size: pr(12);
                        }
                        &:nth-child(2){
                            width: pr(50);
                            text-align: center;
                            margin-bottom: pr(15);
                            font-size: pr(12);
                        }
                        &:nth-child(3){
                            width: pr(50);
                            height: pr(25);
                            background: #b3a078;
                            line-height: pr(25);
                            text-align: center;
                        }
                    }
                }
            }
        }
        .user_news{
            height: pr(30);
            display: flex;
            align-items: center;
            border-bottom:pr(5) solid #f0f0f0;
            img{
                width: pr(15);
                height: pr(15);
                margin: 0 pr(15);
            }
            p{
                color: #d00000;
                text-decoration: underline;
            }
        }
        .user_mine{
            &>div{
                display: flex;
                align-items: center;
                height: pr(40);
                justify-content: space-between;
                padding: 0 0.2rem;
                border-bottom:pr(1) solid #f0f0f0;
                >div{
                    display: flex;
                    i{
                        margin-right: pr(5);
                        color: orangered;
                    }
                }
                >i{
                    font-size: pr(14);
                }
            }
        }
        .user_nav{
            width: 100%;
            height: pr(60);
            border-bottom:pr(5) solid #f0f0f0;
            ul{
                width: 100%;
                height: pr(60);
                display: flex;
                align-items: center;
                li{
                    width: 25%;
                    text-align: center;
                    img{
                        width: pr(25);
                        height: pr(25);
                        margin-bottom: pr(5);
                    }
                }
            }
        }
        .user-subnav{
            width: 100%;
            height: pr(160);
            border-bottom:pr(5) solid #f0f0f0;
            ul{
                width: 100%;
                height: pr(160);
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                li{
                    width: 33.3%;
                    text-align: center;
                    img{
                        width: pr(25);
                        height: pr(25);
                        margin-bottom: pr(5);
                    }
                }
            }
        }
    }
</style>