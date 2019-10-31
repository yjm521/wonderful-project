<template>
    <div>dingdan</div>
</template>

<script>
    import Product from '../../services/product-services'
    const _product = new Product
    export default {
       name: 'dingdan',
       created () {
           let obj = {
               token: this.$store.state.tk.token,
           }
           _product.orders(obj).then(res => {
               console.log(res)
           })
       } 
    }
</script>

<style>

</style>