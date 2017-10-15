<template>
<ul class="sidebar-list">
  <SideBarItem :menuItem="child" v-on:change-route="changeRoute" v-for="child in items" :key="child.name" :activeItem="activeItem">
  </SideBarItem>
</ul>
</template>

<script>
import SideBarItem from 'src/components/SideBarItem'

export default {
  name: 'SideBar',
  components: {
    SideBarItem
  },
  props: {
    items: Array,
    activeItem: String
  },
  methods: {
    changeRoute (menuItem) {
      this.$emit('change-route', menuItem)
    }
  }
}
</script>

<style scoped lang="scss">
.sidebar-list {
  margin: 0;
  padding-left: 0px;
}
</style>
