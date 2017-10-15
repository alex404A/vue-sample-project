<template>
<li>
  <div class="sidebar-item" @click="toggle" :class="{active: isActive}">
    <span class="sidebar-item-text"> {{menuItem.name}} </span>
    <i class="fa fa-caret-down sidebar-item-dropicon" v-if="isFolder" v-show="!open"></i>
    <i class="fa fa-caret-up sidebar-item-dropicon" v-if="isFolder" v-show="open"></i>
  </div>
  <ul v-show="open" v-if="isFolder">
    <SideBarItem v-for="child in menuItem.children" :key="child.name" v-on:change-route="changeRoute" :menuItem="child" :activeItem="activeItem">
    </SideBarItem>
  </ul>
</li>
</template>

<script>

export default {
  name: 'SideBarItem',
  props: {
    menuItem: Object,
    activeItem: String
  },
  data () {
    return {
      open: false,
      isActive: false
    }
  },
  computed: {
    isFolder () {
      return this.menuItem.children && this.menuItem.children.length > 0
    }
  },
  methods: {
    toggle () {
      if (this.isFolder) {
        this.open = !this.open
      } else {
        this.$emit('change-route', this.menuItem)
      }
    },
    changeRoute (menuItem) {
      this.$emit('change-route', menuItem)
    },
    activate (name) {
      if (this.menuItem.children) {
        this.isActive = false
        this.menuItem.children.forEach(item => {
          if (item.name === name) {
            this.isActive = true
            this.open = true
          }
        })
      } else {
        this.isActive = this.menuItem.name === name
      }
    }
  },
  watch: {
    activeItem (value) {
      this.activate(value)
    }
  },
  created () {
    this.activate(this.activeItem)
  }
}
</script>

<style scoped lang="scss">
@import 'src/style/common/var';
ul {
  padding-left: 0px;
  overflow: hidden;
}
li {
  list-style-type: none;
  width: 230px;
}
.sidebar-item {
  cursor: pointer;
  list-style-type: none;
  font-size: 15px;
  padding:0px;
  height: 50px;
  line-height: 50px;
  background-color: $white;
  margin-bottom: 2px;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .sidebar-item-text{
    color: $siderbar-text-color-normal;
    width: 150px;
    align-items: left;
  }
  .sidebar-item-dropicon {
    position: absolute;
    left: 200px;
    display: inline-block;
  }
}
.active {
  .sidebar-item-text{
    color: $highlight;
  }
}
#childItem{
  .sidebar-item {
    background-color: $hover-row-color
  }
}
</style>
