<template>
    <div class="reset">
        <h3>修改密码</h3>
        <div class="login_phone">
            <input type="text" placeholder="手机号码" v-model="phone">
        </div>
        <div class="login_phone">
            <input type="text" v-model="newpass" placeholder="设置新密码">
        </div>
        <div class="ig">
            <input type="text" v-model="msgCode" placeholder="图形验证码">
            <div>
                <img @click="changeImgCode" :src="`https://api.it120.cc/small4/verification/pic/get?key=${this.timer}`" alt="">
            </div>
        </div>
        <div class="getcode">
            <input v-model="code" type="text">
            <button :disabled="dis" @click="getMsg">{{ txt }}</button>
        </div>
        <button @click="okupdate">确定修改密码</button>
    </div>
</template>

<script>
import Product from '../../services/product-services'
const _product = new Product()
export default {
    name: 'resetPassword',
    data () {
        return {
            timer: "",
            txt: '获取短信验证码',
            dis:false,
            msgCode: "",
            code: "",
            phone: "",
            newpass: ""
        }
    },
    created () {
        this.timer = new Date().getTime()
       
    },
    methods: {
         changeImgCode(){
            //console.log(this.timer)
             this.timer = new Date().getTime()
        },
        okupdate(){
            let obj = {
                mobile: this.phone,
                pwd: this.newpass,
                code: this.code
            }
             _product.reset(obj).then(res => {
                console.log(res)
                if(res.data.code == 0) {
                    alert("修改成功")
                    this.$router.push("/login")
                }
            })
        },
        getMsg(){
                let wait = 10
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
    }
}
</script>

<style lang="scss" scoped>
    @function pr($px) {
        @return $px/(375/375)/50*1rem;
    }
    .reset{
        width: 5.6rem;
        input{
            font-size: 0.16rem;
            color: #000;
        }
        >button{
            width: 80%;
            display: block;
            margin: 0 auto;
            height: 0.6rem;
            border: none;
            outline: none;
            background: #03a9f4;
            border-radius: 0.05rem;
            color: white;
            font-size: 0.24rem;
        }
    }
    h3{
        text-align: center;
        line-height: 0.6rem;
    }
    .login_phone{
        text-align: center;
        margin: 0.2rem auto;
        input{
            width: 80%;
            height: 0.4rem;
            border: none;
            border: 1px solid #000;
            text-indent: 0.2rem;
        }        
    }
    .getcode{
                display: flex;
                height: pr(50);
                width: 80%;
                margin: 0.3rem auto;
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
    .ig{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 0.6rem;
        input{
            height: 0.4rem;
            width: 53%;
            border: none;
            border: 1px solid #000;
            text-indent: 0.2rem;
        }
        >div{
            height: 0.4rem;
            img{
                height: 0.4rem;
                border-left: none;
            }
        }
    }
</style>