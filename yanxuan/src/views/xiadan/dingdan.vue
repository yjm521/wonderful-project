<template>
    <div class="dingdan">
        <div v-for="v in shoplist" :key="v.id">
            <!-- <img :src="v.pic" alt=""> -->
        </div>
    </div>
</template>

<script>
    import Product from '../../services/product-services'
    const _product = new Product
    export default {
       name: 'dingdan',
       data () {
           return {
               shoplist: []
           }
       },
       created () {
           let obj = {
               token: this.$store.state.tk.token
           }
           _product.orders(obj).then(res => {
               //this.shoplist = res.data.data.goodsMap
              // console.log(res.data.data.goodsMap)
               for(let i in res.data.data.goodsMap){
                   this.shoplist.push(res.data.data.goodsMap[i][0])
               }
               //console.log(this.shoplist)
           })
       } 
    }
</script>

<style lang="scss" scoped>

</style>