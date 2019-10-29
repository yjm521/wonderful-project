<template>
    <div class="spe_ls">
        <div class="tp">
            <p @click="back">
                <i class="el-icon-arrow-left"></i>
            </p>
            <p>专栏详情</p>
        </div>
        <div class="zhong">
            <h2>{{ ls.title }}</h2>
            <img :src="ls.pic" alt="">
            <p v-html="ls.content"></p>
        </div>
    </div>
</template>

<script>
    import Product from '../../services/product-services'
    const _product = new Product()
    export default {
        name: 'spe',
        data(){
            return {
                ls: {}
            }
        },
        created () {
            let { id } = this.$route.params
            console.log(id)
            _product.detail(id).then(res => {
                console.log(res)
                this.ls = res.data.data
            })
        },
        methods: {
            back(){
                window.history.back()
            }
        }
    }
</script>

<style lang='scss'>
    .spe_ls{
        width: 5.6rem;
        padding-top: 1rem;
        .tp {
            width: 5.6rem;
            height: 1rem;
            background: white;
            border-bottom: 0.01rem solid #ddd;
            line-height: 1rem;
            display: flex;
            justify-content: space-between;
            padding: 0 0.15rem;
            position: fixed;
            left: 0;
            top: 0;
            p:nth-of-type(2){
                width: 95%;
                text-align: center;
                font-size: 0.28rem;
            }
        }
        .zhong{
            h2{
                height: 1rem;
                line-height: 1rem;
                text-align: center;
                font-size: 0.38rem;
            }
            img{
                width: 100%;
            }
            p{
                font-size: 0.24rem;
                line-height: 0.4rem;
            }
        }
    }
</style>