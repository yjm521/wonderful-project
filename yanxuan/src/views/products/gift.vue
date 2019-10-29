<template>
    <div class="gift">
        <div class="tp">
            <div>
                <input type="text" placeholder="请输入礼券码">
                <button>兑换</button>
            </div>
        </div>
        <div class="gift_now">
            <div class="gift_tp">
                <p>
                    <span>1</span>
                    <span>元</span>
                </p>
                <div>
                    <p>满减1</p>
                    <p>满100元使用</p>
                </div>
                <button>立即领取</button>
            </div>
            <p class="gift_bt">领取7天内有效</p>
        </div>
        <div class="gift_now">
            <div class="gift_tp">
                <p>
                    <span>0</span>
                    <span>元</span>
                </p>
                <div>
                    <p>满减</p>
                    <p>满10元使用</p>
                </div>
                <button>立即领取</button>
            </div>
            <p class="gift_bt">领取7天内有效</p>
        </div>
        <router-link to="/" tag="div" class="fd">
            <i class="el-icon-arrow-left"></i>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'gift'
}
</script>

<style lang="scss">
    .gift{
        .tp{
            height: 1rem;
            padding-top: 2rem;
            >div{
                width: 90%;
                height: 1rem;
                border: 1px solid orangered;
                border-radius: 0.1rem;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 5rem;
                input{
                    width: 3rem;
                    height: 0.4rem;
                    margin-right: 0.2rem;
                    border:0.01rem solid orangered;
                    text-indent: 0.15rem;
                    border-radius: 0.07rem;
                    color: orangered;
                    font-size: 0.2rem;
                }
                input::-webkit-input-placeholder{color:orangered}
                button{
                    border: none;
                    background: #ee7c7b;
                    width: 0.8rem;
                    height: 0.5rem;
                    color: white;
                    border-radius: 0.05rem;
                }
            }
        }
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
        .gift_now{
            width: 90%;
            margin: 0.2rem auto;
            .gift_tp{
                display: flex;
                justify-content: space-around;
                height: 1.3rem;
                background: #ec7877;
                align-items: center;
                border-top-left-radius: 0.15rem;
                border-top-right-radius: 0.15rem;
                border-bottom: 0.05rem dotted #cc7773;
                >p{
                    color: white;
                    span{
                        &:nth-child(1){
                            font-size: 0.36rem;
                            font-weight: bold;
                            margin-right: 0.05rem;
                        }
                        &:nth-child(2){
                            font-size: 0.16rem;
                        }
                    }
                }
                >div{
                    width: 60%;
                    color:white;
                    p{
                        &:nth-child(1){
                            margin-bottom: 0.2rem;
                        }
                    }
                }
                button{
                    width: 0.8rem;
                    height: 0.3rem;
                    border: none;
                    outline: none;
                    background: #fce8e7;
                    color: #d45656;
                    border-radius: 0.04rem;
                    font-size: 0.12rem;
                }
            }
            .gift_bt{
                height: 0.4rem;
                line-height: 0.4rem;
                background: #ec7877;
                color: white;
                font-size: 0.16rem;
                text-indent: 0.15rem;
                border-bottom-right-radius: 0.15rem;
                border-bottom-left-radius: 0.15rem;
            }
        }
    }
</style>