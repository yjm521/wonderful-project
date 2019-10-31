<template>
  <div class="address_box">
      <div class="tp">
          <p @click="back"><i class="el-icon-arrow-left"></i></p>
          <p>我的地址</p>
          <router-link tag="p" to="/update_address/new">新增地址</router-link>
      </div>
      <div class="addressInfo">
          <div v-for="(v,i) in list" :key="i">
              <input :checked="v.isDefault" type="radio" name="a">
              <div>
                  <p>
                      <span>{{ v.linkMan }}</span>
                      <span>{{ v.mobile }}</span>
                  </p>
                  <p>{{ v.address }}</p>
              </div>
              <router-link tag="p" :to="`/update_address/${v.id}`"><i class="el-icon-edit"></i></router-link>
          </div>
      </div>
  </div>
</template>

<script>
    import Product from '../../services/product-services'
    const _product = new Product
    export default {
        name: 'addre',
        data () {
            return {
                list: [],
                city: ""
            }
        },
        created () {
            let id = this.$store.state.tk.token
            _product.address(id).then(res => {
                console.log(res)
                this.list = res.data.data
            })
            _product.defaultAddress(id).then(res => {
                //console.log(res.data.data)
                this.$store.commit("defaultAdd",res.data.data)
            })
        },
        methods: {
           back(){
               history.back()
           }
        }
    }
</script>

<style lang="scss" scoped>
    .address_box{
        .tp{
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 0.6rem;
            p:nth-of-type(1){
                font-size: 0.26rem;
            }
            P:nth-of-type(2){
                width: 70%;
                text-align: center;
            }
            P:nth-of-type(3){
                color: darkred;
            }
        }
        .addressInfo{
            width: 100%; 
            >div{
                width: 100%;
                height: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-around;
                border-bottom: 0.01rem solid #ddd;
                input{
                    width: 0.2rem;
                    height: 0.2rem;
                }
                >div{
                    width: 60%;
                    p:nth-of-type(1){
                        margin-bottom: 0.15rem;
                        span:nth-of-type(1){
                            margin-right: 0.1rem;
                        }
                    }
                    p:nth-of-type(2){
                        color: darkgrey;
                        font-size: 0.16rem;
                    }
                }
                >p{
                    font-size: 0.25rem;
                    color: darkgrey;
                }
            }
        }
    }
</style>