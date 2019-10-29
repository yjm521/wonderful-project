<template>
    <div class="box">
        <div class="login">
            <div class="login_tp">新用户注册</div>
            <p>很高兴您成为商城的会员（注册只需一步）</p>
            <div class="login_phone">
                <input ref="phoneInput" @blur="phoneBlur" v-model="phone" type="text" placeholder="手机号码">
            </div>
            <div class="login_pass">
                <input v-model="password" ref="ipt" type="password" placeholder="密码">
                <div @click="show">
                    <img v-show="!isShow" src="/static/close.png" alt="">
                    <img v-show="isShow" src="/static/open.png" alt="">
                </div>
            </div>
            
            <div class="ok">
                <input @blur="okBlur" v-model="ok_password" ref="ipt2" type="password" placeholder="确认密码">
                <div @click="showEye">
                    <img v-show="!flag" src="/static/close.png" alt="">
                    <img v-show="flag" src="/static/open.png" alt="">
                </div>
            </div>
            <div class="tips" v-show="tips">请确认密码是否一致</div>
             <div class="username">
                <input v-model="username" type="text" placeholder="用户名">
            </div>
            <div class="code">
                <input v-model="msgCode" type="text" placeholder="图形验证码">
                <div @click="changeImgCode">
                    <img :src="`https://api.it120.cc/small4/verification/pic/get?key=${this.timer}`" alt="">
                </div>
                
            </div>
            <input @focus="showCity" class="city" v-model="city">
            <div class="getcode">
                <input v-model="code" type="text">
                <button :disabled="dis" @click="getMsg">{{ txt }}</button>
            </div>
            <button @click="register">立即注册</button>
            <p @click="back">已有账号？立即登录</p>
            <div v-show="succ" class="succ">恭喜你，注册成功</div>
        </div>

        <div v-show="showCy" class="box_float"></div>
        <div :class="showCy?'white sh':'white hd'">
            <div class="tp">
                <p @click="showCy=false">取消</p>
                <p @click="showCy=false">确定</p>
            </div>
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
                flag:false,
                codeImgPath: '',
                phone: '',
                password: '',
                ok_password: '',
                username: '',
                msgCode: '',
                timer: "",
                tips:false,
                city: '选择省-选择市',
                showCy:false,
                code: '',
                succ: false,
                txt: '获取验证码',
                dis:false
            }
        },
        created () {
            this.timer = new Date().getTime()
        },
        methods: {
            getMsg(){
                let wait = 60
                let tm = setInterval(() => {
                    if (wait == 0) {
                        this.dis = false
                        this.txt = "获取验证码";
                        clearInterval(tm)
                    } else {
                        this.txt = wait + "秒后重试";
                        wait--;
                        this.dis = true
                    }
                }, 1000);
                
                let obj = {
                    mobile:this.phone,
                    key: this.timer,
                    picCode: this.msgCode
                }
                _product.msg(obj).then(res => {
                    console.log(res)
                })
            },
            showCity(){
                this.showCy = true
            },
            register(){
                let obj = {
                    mobile: this.phone,
                    pwd: this.password,
                    code: this.code,
                    nick: this.username
                }
                _product.register(obj).then(res => {
                    console.log(res)
                    if(res.data.code == 0){
                        this.succ = true
                        setTimeout(()=>{
                            this.succ =false
                        },2000)
                        
                    }
                })
            },
            phoneBlur(){
                let phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
                if(!phoneReg.test(this.phone)){
                    this.$refs.phoneInput.style.border = "1px solid red"
                    this.$refs.phoneInput.style.background = "#ffe9e4"
                    return false
                }else{
                    this.$refs.phoneInput.style.border = "1px solid green"
                    this.$refs.phoneInput.style.background = ""
                }
            },
            okBlur(){
                if(this.password!=this.ok_password){
                    this.tips = true
                    this.$refs.ipt2.style.border = "1px solid red"
                    this.$refs.ipt2.style.background = "#ffe9e4"
                    this.$refs.ipt.style.border = "1px solid red"
                    this.$refs.ipt.style.background = "#ffe9e4"
                    return
                }else{
                    this.tips = false
                    this.$refs.ipt2.style.border = "1px solid green"
                    this.$refs.ipt2.style.background = ""
                    this.$refs.ipt.style.border = "1px solid green"
                    this.$refs.ipt.style.background = ""
                }
            },
            changeImgCode(){
                console.log(this.timer)
                this.timer = new Date().getTime()
            },
            back(){
                history.back()
            },
           show(){
               this.isShow=!this.isShow
               if(this.isShow == true){
                   this.$refs.ipt.type= "text"
               }else{
                   this.$refs.ipt.type= "password"
               }
           }, 
           showEye(){
               this.flag=!this.flag
               if(this.flag == true){
                   this.$refs.ipt2.type= "text"
               }else{
                   this.$refs.ipt2.type= "password"
               }
           } 
        }
    }
</script>

<style lang="scss">
   @function pr($px) {
        @return $px/(375/375)/50*1rem;
    }
    .box{
        overflow: hidden;
        padding: pr(15);
        position: relative;
        .box_float{
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,.3);
            position: absolute;
            left: 0;
            top: 0;
            z-index: 10;
        }
        .succ{
            color: green;
            font-size: pr(16);
            text-align: center;
            line-height: pr(40);
        }
        .white{
                width: 100%;
                height: pr(320);
                position: absolute;
                z-index: 20;
                bottom: 0;
                left: 0;
                background: white;
                transition: all 0.5s ease;
                .tp{
                    display: flex;
                    justify-content: space-between;
                    padding:0 pr(15);
                    height: pr(40);
                    font-size: pr(14);
                    align-items: center;
                    p:nth-of-type(1){
                        color:#e9aa14;
                    }
                    p:nth-of-type(2){
                        color:#508aff;
                    }
                }
            }
        .hd{
            position: absolute;
            left: 0;
            bottom: pr(-1000);
            transition: all 0.7s linear;
        }
        .sh{
            position: absolute;
            left: 0;
            bottom: 0;
            transition: all 0.7s linear;
        }
        .login{
            padding: pr(20);
            border: 1px solid #ddd;
            box-shadow: 0 0 pr(5) pr(1) #eee;
            .tips{
                color: red;
                line-height: pr(30);
            }
            .city{
                margin-bottom: pr(10);
                width: 100%;
                height: pr(30);
                border-radius: pr(3);
                border: none;
                background: #f0f0f0;
                outline: none;
                text-indent: pr(10);
               line-height: pr(30);
            }
            .getcode{
                display: flex;
                height: pr(50);
                //align-items: center;
                justify-content: center;
                margin-bottom: pr(10);
                input{
                    width: 50%;
                    height: pr(30);
                    border-top-left-radius: pr(3);
                    border-bottom-left-radius: pr(3);
                    border: none;
                    background: #f0f0f0;
                    outline: none;
                    text-indent: pr(10);
                }
                input:focus{
                    box-shadow: 0 0 pr(5) pr(3) #03a9f4;
                }
                input::-webkit-input-placeholder{color:#999};
                button{
                    width: 50%;
                    height: pr(30);
                    background: #f0f0f0;
                    text-align: center;
                    display:block;
                    color: #666;
                    outline: none;
                    border: none;
                    border-left: pr(1) solid #ddd;
                    font-size: pr(8);
                }
            }
            .code{
                margin: pr(20) 0;
                display: flex;
                >div{
                    width: 50%;
                    height: pr(30);
                    border-left: pr(1) solid #ddd;
                    img{
                        width: 100%;
                        height: pr(30);
                    }
                }
                input{
                    width: 50%;
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
            .login_tp{
                font-size: pr(22);
                color: #666;
                margin-bottom: pr(30);
            }
            >p{
                &:nth-of-type(1){
                    font-size: pr(12);
                    margin-bottom: pr(35);
                    color: #909090;
                    line-height: pr(24);
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
                margin-bottom: pr(10);
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
            .username{
                margin: pr(10) 0;
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
                display: flex;
                margin-bottom:pr(15);
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
            .ok{
                display: flex;
                
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