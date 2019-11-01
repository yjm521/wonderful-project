<template>
    <div class="box">
        <div class="login">
            <div class="login_tp">账号登录</div>
            <p>晨光-严选商城欢迎你</p>
            <div class="login_phone">
                <input v-model="phoneNumber" type="text" placeholder="手机号码">
            </div>
            <div class="login_pass">
                <input v-model="password" ref="ipt" type="password" placeholder="密码">
                <div @click="show">
                    <img v-show="!isShow" src="/static/close.png" alt="">
                    <img v-show="isShow" src="/static/open.png" alt="">
                </div>
            </div>
            <button @click="login">登录</button>
            <div v-show="flag" class="fail">手机号或密码错误</div>
            <router-link tag="p" to="/resetPassword">忘记密码</router-link>
            <router-link to="/register" tag="p">还没有注册？立即注册</router-link>
            
        </div>
    </div>
</template>

<script>
    import Product from '../../services/product-services'
    const _product = new Product()
    export default {
        name: 'login',
        data () {
            return {
                isShow: false,
                phoneNumber:"",
                password: '',
                flag: false
            }
        },
        methods: {
           show(){
               this.isShow=!this.isShow
               if(this.isShow == true){
                   this.$refs.ipt.type= "text"
               }else{
                   this.$refs.ipt.type= "password"
               }
           },
           login(){
               let obj = {
                   mobile: this.phoneNumber,
                   pwd: this.password,
               }
               _product.login(obj).then(res => {
                    console.log(res)
                    if (res.data.code == 0) {
                        let obj = {
                            token:res.data.data.token,
                            uid:res.data.data.uid
                        }
                        this.$router.push({path: '/'})
                        this.$store.commit("storeLogin",obj)
                    }else{
                        this.flag = true
                        setTimeout(()=>{
                            this.flag = false
                        },3000)
                    }
                })
           } 
        },
        created () {
           
        }
    }
</script>

<style lang="scss">
   @function pr($px) {
        @return $px/(375/375)/50*1rem;
    }
    .box{
        padding: pr(15);
        .login{
            padding: pr(20);
            border: 1px solid #ddd;
            box-shadow: 0 0 pr(5) pr(1) #eee;
            .fail{
                color: red;
                font-size: pr(10);
                text-align: center;
                line-height: pr(26);
            }
            .login_tp{
                font-size: pr(22);
                margin-bottom: pr(40);
                color: #666;
            }
            >p{
                &:nth-of-type(1){
                    font-size: pr(14);
                    margin-bottom: pr(35);
                    color: #909090;
                }
                &:nth-of-type(2){
                    font-size: pr(10);
                    margin-bottom: pr(20);
                    text-align: center;
                    color: darkgray;
                }
                &:nth-of-type(3){
                    font-size: pr(12);
                    text-align: center;
                    color: #549ff9;
                }
            }
            .login_phone{
                input{
                    width: 100%;
                    height: pr(30);
                    border-radius: pr(3);
                    border: none;
                    background: #f0f0f0;
                    outline: none;
                    text-indent: pr(10);
                }
                input:focus{
                    box-shadow: 0 0 pr(5) pr(3) #03a9f4;
                }
                input::-webkit-input-placeholder{color:#999};
            }
            .login_pass{
                margin-bottom: pr(20);
                display: flex;
                height: pr(80);
                align-items: center;
                input{
                    width: 80%;
                    height: pr(30);
                    text-indent: pr(10);
                    border-top-left-radius: pr(3);
                    border-bottom-left-radius: pr(3);
                    border: none;
                    background: #f0f0f0;
                    outline: none;
                }
                 input:focus{
                    box-shadow: 0 0 pr(5) pr(3) #03a9f4;
                }
                input::-webkit-input-placeholder{color:#999}
                >div{
                    width: 20%;
                    height: pr(31);
                    background: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-top-right-radius: pr(3);
                    border-bottom-right-radius: pr(3);
                    img{
                        width: pr(20);
                    }
                }
            }
            button{
                width: 80%;
                margin: 0 auto;
                border: none;
                display: block;
                height: pr(30);
                color: white;
                letter-spacing: 5px;
                margin-bottom: pr(20);
                border-radius: pr(3);
                background: linear-gradient(90deg,#5ea6f8,#bb87f6);
            }
        }
    }
</style>