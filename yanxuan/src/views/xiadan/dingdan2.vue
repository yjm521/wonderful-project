<template>
    <div class="ping">
        <div @click="change()">
            整体评价：
            <label><input type="radio" v-model="quality" value="0" name="quality">差评</label>
            <label><input type="radio" v-model="quality" value="1" name="quality">中评</label>
            <label><input type="radio" v-model="quality" value="2" name="quality">好评</label>
        </div>
        <textarea v-model="txt" name="" id="" maxlength="200" placeholder="说说它的优点和不足"></textarea>
        <div class="foo">
            <el-button @click="fb" type="success">发布</el-button>
        </div>
    </div>

</template>

<script>
import Product from '../../services/product-services'
const _product = new Product
export default {
    name: 'dingdan2',
    data () {
        return {
            txt: '',
            quality: ''
        }
    },
    methods: {
        fb(){
            let one = this.$route.params.orderId
            let two = this.$route.params.id
            let three = this.$store.state.tk.token
            let str = {
                token: three,
                orderId: one,
                reputations:[
                    {
                        id:two,
                        reputation:2,
                        remark: this.txt
                    }
                ]
            }
             let obj = {
                token: three,
                postJsonString: JSON.stringify(str)
            }
            _product.reput(obj).then(res => {
                console.log(res)
            })
        },
        change(e){
            console.log(e)
        }
    }
}
</script>

<style lang="scss">
    .ping{
        >div{
            height: 0.6rem;
            line-height: 0.6rem;
            padding-left: 0.2rem;
        }
        textarea{
            width: 90%;
            display: block;
            margin-left: 0.2rem;
            border: 1px solid #666;
            text-indent: 0.1rem;
            height: 3rem;
            font-size: 0.2rem;
        }
        .foo{
            width: 100%;
            button{
                width: 90%;
                display: block;
                margin-top: 0.2rem;
                height: 0.6rem;
                font-size: 0.26rem;
                letter-spacing: 0.1rem;
            }
        }
    }
</style>