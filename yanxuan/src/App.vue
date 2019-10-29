<template>
  <div id="app">
    <transition>
        <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

body,html,div,p,ul,ol,li,h2,h3,h4,h5,h6{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.2rem;
  line-height: 0.2rem;
  overflow-x: hidden;
  padding-bottom: 1.2rem;
  
  ul,li{
    list-style: none;
  }
  .ft{
    width: 100%;
    color: darkgray;
    position: fixed;
    background: white;
    bottom: 0;
    left: 0;
    z-index: 999;
     .mine-active{
        color:red;
    }
    ul{
      width: 100%;
      height: 1.2rem;
      display: flex;
      align-items: center;
      li{
        width: 25%;
        text-align: center;
        i{
          font-size: 0.3rem;
          margin-bottom: 0.15rem;
        }
      } 
    }
  }
  .v-enter-active,.v-leave-active {
    transition: all .5s;
  }
  .v-enter{
    opacity: 0;
    transform: translateX(100%);
    position:absolute;
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position:absolute;
  }
 
  
}
</style>