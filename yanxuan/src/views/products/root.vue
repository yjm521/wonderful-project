<template>
    <div>
         <transition>
            <keep-alive>
                <router-view/>
            </keep-alive>
        </transition>
        <div class="ft">
            <ul>
                <router-link tag="li" to="/" exact>
                    <i class="el-icon-house"></i>
                    <p>首页</p>
                </router-link>
                <router-link tag="li" to="/classity">
                    <i class="el-icon-menu"></i>
                    <p>分类</p>
                </router-link>
                <router-link tag="li" to="/cart">
                    <i class="el-icon-shopping-cart-2"></i>
                    {{ this.$store.getters.allCount }}
                    <p>购物车</p>
                </router-link>
                <router-link tag="li" to="/user">
                    <i class="el-icon-user"></i>
                    <p>个人</p>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
    
</style>