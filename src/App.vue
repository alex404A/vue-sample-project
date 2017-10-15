<template>
  <div id="app">
    <HeaderBar class="headerbar"></HeaderBar>
    <div class="main">
      <SideBar id="sidebar" :items="menuItems" :activeItem="activeItem" v-on:change-route="changeRoute"></SideBar>
      <router-view id="main-component" v-on:change-route="changeRoute"></router-view>
    </div>
  </div>
</template>

<script>
import router from 'src/router'
import dataStore from 'src/service/dataStore'
import SideBar from 'src/components/SideBar'
import HeaderBar from 'src/components/HeaderBar'

export default {
  name: 'app',
  components: {
    HeaderBar,
    SideBar
  },
  data () {
    return {
      menuItems: [],
      activeItem: ''
    }
  },
  methods: {
    changeRoute (menuItem) {
      if (!menuItem.children) {
        router.push(menuItem.url, () => {
        })
      }
      this.activeItem = menuItem.name
    },
    setActiveItem () {
      let routePath = this.$route ? this.$route.path : '/'
      let resItem
      // 自动跳转路由
      if (routePath === '/' || routePath === '/index.html' || routePath === '/index') {
        resItem = this.menuItems[0]
        while (resItem.children && resItem.children.length > 0) {
          resItem = resItem.children[0]
        }
      } else {
        this.menuItems.forEach(item => {
          if (item.url === this.$route.path) {
            resItem = item
          }
          if (item.children) {
            item.children.forEach(sItem => {
              if (sItem.url === this.$route.path) {
                resItem = sItem
              }
            })
          }
        })
      }
      if (resItem) {
        router.push(resItem.url)
        this.activeItem = resItem.name
      }
    }
  },
  watch: {
    $route (value) {
      this.setActiveItem()
    }
  },
  async created () {
    let menus = await dataStore.getMenus()
    this.menuItems = menus
    this.setActiveItem()
  }
}
</script>

<style <style lang="scss" scoped>
@import './style/_mixins';
@import './style/common/var';

$header-height:3rem;
$sidebar-width-larger-than-pad:14rem;
$sidebar-width-larger-than-pc-middle:14rem;

#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  background-color: $background-color;
  min-height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.headerbar{
  flex: 0 0 auto;
}

.main{
  padding: 0 50px;
  padding-top: 12px;
  background-color: $background-color;
  display: flex;
  flex: 1 0 auto;
}
.sidebar {
  position: relative;
  width: 230px;
}

.main-component {
  position: relative;
  flex: 1;
  margin-left: 10px;
  overflow: hidden;
  margin-bottom: 50px;
}
.footerbar{
  flex: 0 0 auto;
}

</style>

