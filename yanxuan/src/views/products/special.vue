<template>
    <div class="spe">
         <div class="tp">
            <router-link tag="p" to="/">
            <i class="el-icon-arrow-left"></i>
            </router-link>
            <p>严选专栏</p>
        </div>
        <ul>
            <router-link tag="li" :to="{ name: 'spe', params: { id: v.id } }" v-for="(v,i) in igList" :key="i">
                <img :src="v.pic" alt="">
                <div class="fot">
                    <h2 v-html="v.title"></h2>
                    <p>{{ v.descript }}</p>
                    <div>查看详情</div>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script>
    import Product from '../../services/product-services'
    const _product = new Product
    export default {
        name: 'special',
        data(){
            return {
                igList: []
            }
        },
        created () {
            _product.cms().then(res => {
                this.igList = res.data.data
            })
        }
    }
</script>
<style lang="scss">
    .spe{
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
            z-index: 12;
            p:nth-of-type(2){
                width: 95%;
                text-align: center;
                font-size: 0.28rem;
            }
        }
        ul{
            width: 5.6rem;
            text-align: center;
            color: white;
            li{
                width: 5.6rem;
                position: relative;
                img{
                    width: 5.6rem;
                    height: 3rem;
                }
                .fot{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.6);
                    z-index: 1;
                    h2{
                        height: 0.6rem;
                        line-height: 0.6rem;
                        width: 85%;
                        margin: 0.1rem auto;
                        margin-top: 0.5rem;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    &>p{
                        margin: 0.2rem 0;
                        line-height: 0.3rem;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>