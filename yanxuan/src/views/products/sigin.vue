<template>
    <div class="sigin">
        <div>
            <p>您的可用积分为</p>
            <h2>999</h2>
        </div>
        <div></div>
        <div>
            <button>签到</button>
        </div>
        <div class="sigin_content">
            <div class="one">
                <div>
                    <p>消费购物</p>
                    <p>购物完成，确认收货后立返积分</p>
                </div>
                <button>去购物</button>
            </div>
            <div class="one">
                <div>
                    <p>积分购物</p>
                    <p>积分兑好礼，20积分即可兑换礼券</p>
                </div>
                <button>去兑换</button>
            </div>
            
        </div>
        <router-link to="/" tag="div" class="fd">
            <i class="el-icon-arrow-left"></i>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'sigin'
}
</script>

<style lang="scss">
    .sigin{
        .fd{
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: white;
            position: fixed;
            left: 0.2rem;
            top: 0.2rem;
            text-align: center;
            z-index: 10;
            i{
                color: #000;
                font-size: 0.3rem;
                line-height: 0.5rem;
            }
        }
        >div{
            &:nth-child(1){
                height: 2.5rem;
                background: -webkit-gradient(linear,left top,right top,from(#f1ead8),to(#fefbf2));
                text-align: center;
                padding-top: 1rem;
                p{
                    color: #999;
                    font-size: 0.3rem;
                    margin-bottom: 0.5rem;
                }
                h2{
                    font-size: 0.5rem;
                    color:#b3a078;
                }
            }
            &:nth-child(2){
                background: #e8e1cf;
                height: 1rem;
            }
            &:nth-child(3){
                height: 1.2rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                button{
                    background: #b3a078;
                    border: none;
                    width: 2.6rem;
                    height: .6rem;
                    border-radius: .6rem;
                    font-size: .26rem;
                    color: #fff;
                    margin: 0 auto;
                }
            }
        }
        .sigin_content{
            .one{
                width: 90%;
                margin: 0.2rem auto;
                height: 1.2rem;
                background: #f4ebe2;
                display: flex;
                align-items: center;
                border-radius: 0.1rem;
                >div{
                    margin: 0 0.5rem;
                    p{
                        &:nth-child(1){
                            font-size: 0.2rem;
                            color:#e1b68c;
                            margin-bottom: 0.2rem;
                        }
                        &:nth-child(2){
                            font-size: 0.16rem;
                            color:#e1b68c;
                        }
                    }
                }
                button{
                    border: none;
                    width: 1rem;
                    height: 0.4rem;
                    font-size: .2rem;
                    color: #fff;
                    border-radius: .06rem;
                    background: #e1b68c;
                }
            }
        }
    }
</style>