<template>
        <div class="per">
            <router-link class="perls" :to="{path:'/detail/',query:{id:v.id}}" v-for="(v,i) in tuijian" :key="i" tag="div">
                <img :src="v.pic" alt="">
                <div>
                    <p>{{ v.name }}</p>
                    <p>{{ v.characteristic }}</p>
                </div>
                <p>{{ v.minPrice | Pri }}</p>
            </router-link>
        </div>
</template>

<script>
    export default {
        name: 'perlist',
        props: ["tuijian"],
        filters: {
            Pri(x){
                return "￥" + x.toFixed(2)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .per{
        width: 5.6rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        .perls{
            width: 2.6rem;
            img{
               width: 2.6rem;
               height: 3rem;
            }
            &>div{
                width: 2.6rem;
                p:nth-of-type(2){
                    width: 2.6rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: darkgray;
                    font-size: 0.16rem;
                }
                p:nth-of-type(2){
                    width: 2.6rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    color: darkgray;
                    font-size: 0.16rem;
                    margin-top: 0.2rem;
                }
            }
            &>p{
                color:red;
                width: 2.6rem;
                line-height: 0.4rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
        
</style>