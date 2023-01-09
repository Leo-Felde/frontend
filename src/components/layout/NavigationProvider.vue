<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary absolute v-if="!this.$vuetify.breakpoint.smAndDown">
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    <v-divider/>
    <v-list dense>
        <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.to"
        >
        <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <!-- navegação mobile -->
    <v-bottom-navigation v-else v-model="tab" color="#000" fixed id="navigation">
      <v-img src="@/assets/img/navdeco1.svg" id="nav-deco-middle" />
      <v-img :src="require(`@/assets/img/navdecocorner.svg`)" v-for="n in 4" :key="n" :id="`corner-deco-${n}`" />

      <v-btn value="avatar" to="/character">
        <v-icon> mdi-human-male-height </v-icon>
      </v-btn>
      <v-btn value="stats" to="/stats">
        <v-icon> mdi-chart-bar </v-icon>
      </v-btn>
      <v-btn value="home" to="/home" id="main-nav">
        <v-icon large> mdi-view-dashboard-outline </v-icon>
      </v-btn>
      <v-btn value="tasks" to="/tasks">
        <v-icon> mdi-format-list-checkbox </v-icon>
      </v-btn>
      <v-btn value="shop" to="/shop">
        <v-icon> mdi-basket </v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
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
