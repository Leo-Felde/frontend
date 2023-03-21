<template>
  <v-bottom-navigation v-model="tab" color="#000" fixed id="navigation">
    <v-img src="@/assets/img/navdeco1.svg" id="nav-deco-middle" />
    <v-img :src="require(`@/assets/img/navdecocorner.svg`)" v-for="n in 4" :key="n" :id="`corner-deco-${n}`" />

    <v-btn value="avatar" to="/character">
      <v-icon> mdi-account-circle </v-icon>
    </v-btn>
    <v-btn value="stats" to="/stats">
      <v-icon> mdi-chart-line </v-icon>
    </v-btn>
    <v-btn value="home" to="/home" id="main-nav">
      <v-icon large> mdi-view-dashboard-outline </v-icon>
    </v-btn>
    <v-btn value="tasks" to="/tasks">
      <v-icon> mdi-format-list-group-plus </v-icon>
    </v-btn>
    <v-btn value="shop" to="/shop">
      <v-icon> mdi-cart-minus </v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: 'NavigationProvider',

  props: {
    value: Boolean
  },

  watch: {
    value (value) {
      this.drawer = value
    },

    drawer (value) {
      this.$emit('input', value)
    }
  },

  data: () => ({
    tab: 'recent',
    drawer: false,
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard', to: '/home' },
      { title: 'About', icon: 'mdi-forum', to: '/about' }
    ]
  })
}
</Script>

<style lang="sass" scoped>

#navigation
  background: #353540
  outline: 3px solid white !important
  .v-btn
    .v-icon
     color: #bbb6c4
    &--active
      .v-icon
        color: white
    
#nav-deco-middle
  position: absolute
  width: 55px
  top: -17px

#corner-deco
  position: absolute
  height: 10px
  width: 10px
  &-1
    @extend #corner-deco
    left: 5px
    top: 5px
  &-2
    @extend #corner-deco
    right: 5px
    top: 5px
    -webkit-transform: scaleX(-1)
    transform: scaleX(-1)
  &-3
    @extend #corner-deco
    left: 5px
    bottom: 5px
    -webkit-transform: scaleX(-1) rotate(180deg)
    transform: scaleX(-1) rotate(180deg)
  &-4
    @extend #corner-deco
    right: 5px
    bottom: 5px
    -webkit-transform: rotate(180deg)
    transform: rotate(180deg)

nav
  padding: 30px
a.v-btn
  color: #2c3e50
  background-color: transparent !important
  margin-top: auto
  margin-bottom: auto

  &.router-link-exact-active
    color: #42b983

</style>
