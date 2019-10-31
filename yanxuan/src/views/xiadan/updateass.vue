<template>
    <div class="box">
        <div class="upadress">
            <div class="tp">
                <p><i @click="back" class="el-icon-arrow-left"></i></p>
                <p>新增地址</p>
            </div>
            <div class="perInfo">
                <div>联系人</div>
                <input v-model="user" type="text" placeholder="姓名">
            </div>
            <div class="perInfo">
                <div>手机号码</div>
                <input v-model="mobile" type="text" placeholder="11位手机号码">
            </div>
            <div class="perInfo">
                <div>选择地区</div>
                <input @focus="getSheng" :value="msg"  type="text" placeholder="请选择 请选择">
            </div>
            <div class="perInfo">
                <div>详细地址</div>
                <input v-model="address" type="text" placeholder="街道门牌信息">
            </div>
            <div class="perInfo">
                <div>邮政编码</div>
                <input v-model="code" type="text" placeholder="邮政编码">
            </div>
            <button @click="save">保存</button>
            <button @click="delAddress">删除</button>
            <button>取消</button>
        </div>
        <div class="selectAddress" v-show="selectShow">
            <div class="slts">
               <!-- <select @change="changeOpt(val)" v-model="val" name="" id="">
                   <option v-for="(v,i) in shengs"  :key="i" :value="v.name">{{ v.name }}</option>
               </select>
               <select v-model="shiVal" name="" id="">
                   <option v-for="(v,i) in shis"  :key="i" :value="v.name">{{ v.name }}</option>
               </select> -->
                <el-select class="el" @change="changeOpt(val)" v-model="val" placeholder="请选择">
                    <el-option
                    v-for="item in shengs"
                    :key="item.id"
                    :value="item.name">
                    {{ item.name }}
                    </el-option>
                </el-select>
                <el-select class="el" @change="changShi(shiVal)" v-model="shiVal">
                    <el-option
                    v-for="item in shis"
                    :key="item.id"
                    :value="item.name">
                    {{ item.name }}
                    </el-option>
                </el-select>
                <button @click="ok">确定</button>
            </div>
        </div>
        <div class="del" v-show="flag">
            <i class="el-icon-check"></i>
            <p>删除成功</p>
        </div>
    </div>
    
</template>

<script>
    import Product from '../../services/product-services'
    const _product = new Product()
    export default {
        name: 'updateass',
        data () {
            return {
                selectShow: false,
                value:"",
                shengs: [],
                val: "",
                shiVal: "",
                shis: [],
                id: "",
                shiid: "",
                msg: "请选择 请选择",
                user: '',
                mobile: "",
                address: "",
                code: "",
                flag: false
            }
        },
        created () {
           
        },
        methods: {
            delAddress(){
                 let obj = {
                     token:this.$store.state.tk.token,
                     id: this.$route.params.id
                 }
                 _product.delAddress(obj).then(res => {
                    console.log(res)
                    if(res.data.code == 0){
                        this.flag = true
                        setTimeout(()=>{
                            this.flag = false
                            this.$router.push("/user_address")
                        },1500)
                        
                    }
                })
            },
            back(){
                history.back()
            },
            getSheng(){
                this.selectShow = true
                 _product.sheng().then(res => {
                    this.shengs = res.data.data
                })
            },
            ok(){
                this.selectShow = false
                this.msg = this.val + " " + this.shiVal
            },
            save(){
                let obj = {
                    address: this.address,
                    cityId: this.shiid,
                    code: this.code,
                    linkMan: this.user,
                    mobile: this.mobile,
                    provinceId: this.id,
                    token: this.$store.state.tk.token
                }
                _product.addAddress(obj).then(res => {
                    console.log(res.data.data)
                })
                this.$router.push("/user_address")
            },
            changeOpt(item){
                this.shengs.forEach(v => {
                    if(v.name == item){
                        this.id = v.id
                    }
                })
                //console.log(this.id)
                 _product.shi(this.id).then(res => {
                    this.shis = res.data.data
                })
            },
            changShi(item){
                console.log(item)
                this.shis.forEach(v => {
                    if(v.name == item){
                        this.shiid = v.id
                    }
                })
                console.log(this.shiid)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .box{
        width: 5.6rem;
        height: 100%;
        .del{
            text-align: center;
            line-height: 0.6rem;
            position: absolute;
            color: white;
            left: 50%;
            top: 50%;
            background: rgba(0,0,0,.38);
            width: 2rem;
            height: 2rem;
            margin-left: -1rem;
            margin-top: -1.5rem;
            i{
                font-size: 1.1rem;
            }
        }
        .selectAddress{
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            position: absolute;
            left: 0;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            .slts{
                width: 3rem;
                height: 2rem;
                display: flex;
                //align-content: space-around;
                flex-wrap: wrap;
                .el{
                    width: 3rem;
                    height: 1rem;
                }
                button{
                    width: 3rem;
                    height: 0.6rem;
                    background: gold;
                    border: none;
                    outline: none;
                    border-radius: 0.06rem;
                    color: #000;
                    font-size: 0.2rem;
                    letter-spacing: 0.1rem;
                }
            }
        }
    }
    .upadress{
        width: 5.6rem;
        .tp{
            width: 100%;
            display: flex;
            height: 0.6rem;
            justify-content: space-around;
            align-items: center;
            p:nth-of-type(2){
                width: 90%;
                text-align: center;
            }
        }
        .perInfo{
            display: flex;
            height: 0.7rem;
            border-bottom: 0.01rem solid #ddd;
            align-items: center;
            width: 95%;
            margin: 0 auto;
            justify-content: space-between;
            >div{
                width: 1.5rem;
                text-align: left;
            }
            input{
                width: 4rem;
                height: 0.4rem;
                font-size: 0.2rem;
                border: none;
                outline: none;
            }
        }
        button{
            width: 95%;
            height: 0.6rem;
            background: #1aac19;
            margin: 0.1rem auto;
            border:none;
            outline: none;
            display: block;
            border-radius: 0.1rem;
            color: white;
            font-size: 0.24rem;
            &:nth-of-type(1){
                margin-top: 0.3rem;
            }
            &:nth-of-type(2){
                 background: #e64240;
            }
            &:nth-of-type(3){
                 background: #ddd;
            }
        }
    }
</style>