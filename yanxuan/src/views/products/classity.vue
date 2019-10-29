<template>
    <div class="cty">
        <div class="tp">
            <p><i class="el-icon-search"></i></p>
            <input type="text" placeholder="搜索商品">
        </div>
        <div class="rl">
            <div class="le">
                <div class="lef">
                    <ul>
                        <li :class="inx==10?'col':''" @click="all">所有分类</li>
                        <li :class="inx==i?'col':''" @click="fit(v,i)" v-for="(v,i) in claLs" :key="i">{{ v.name }}</li>
                    </ul>
                </div>
            </div>
            <div class="ri">
                    <router-link :to="{ name: 'classy', params: { id: v.id } }" tag="div"  v-for="(v,i) in newLs" :key="i">
                        <img :src="v.icon" alt="">
                        <p>{{ v.name }}</p>
                    </router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import Product from '../../services/product-services'
    const _product = new Product
    export default {
        name: 'classity',
        data(){
            return {
                claLs: [],
                riLs: [],
                newLs: [],
                inx:10
            }
        },
        created () {
            _product.classity().then(res => {
                this.newLs = res.data.data
                this.claLs = res.data.data.filter((v)=>{
                    return !v.type.includes(2)
                })
                this.riLs = res.data.data.filter((v)=>{
                    return v.type.includes(2)
                })
                //console.log(this.riLs)
            })
            
        },
        methods: {
            fit(item,i){
                this.newLs = this.riLs.filter((v)=>{
                    return v.type.includes(item.type)
                })
                //console.log(i)
                this.inx = i
            },
            all(){
                this.newLs = this.riLs
                this.inx = 10
            }
        }
    }
</script>
<style lang="scss">
    .cty{
        width: 5.6rem;
        padding-left: 1.6rem;
        padding-top: 0.6rem;
        overflow-x: hidden;
        .tp{
            height: 0.6rem;
            width: 100%;
            display: flex;
            align-items: center;
            padding-left: 0.3rem;
            position: fixed;
            top: 0;
            left: 0;
            background: white;
            border-bottom: 0.01rem solid #f0f0f0;
            p{
                width: 0.4rem;
                height: 0.36rem;
                background: #f0f0f0;
                text-align: center;
                line-height: 0.34rem;
                border-top-left-radius: 0.17rem;
                border-bottom-left-radius: 0.17rem;
            }
            input{
                width: 60%;
                height: 0.34rem;
                background: #f0f0f0;
                border: none;
                border-top-right-radius: 0.17rem;
                border-bottom-right-radius: 0.17rem;
                outline: none;
            }
        }
        .rl{
            .le{
                position: fixed;
                top: 0.6rem;
                left:0;
                background: white;
                width: 1.6rem;
                .lef{
                    width: 1.6rem;
                    ul{
                        width: 1.6rem;
                        li{
                            width: 1.6rem;
                            text-align: center;
                            height: 0.6rem;
                            line-height: 0.6rem;
                        }
                        .col{
                            border-left: 0.02rem solid red;
                            color: red;
                        }
                    }
                }
            }
           .ri{
               display: flex;
               flex-wrap: wrap;
               justify-content: space-between;
                    div{
                        img{
                            width: 1.3rem;
                            height: 1.3rem;
                        }
                        p{
                            width: 1.3rem;
                            text-align: center;
                            font-size: 0.18rem;
                            line-height: 0.4rem;
                        }
                    }
           }
            
        }
    }
</style>