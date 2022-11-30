<template>
  <v-app id="app">
    <!-- <v-app-bar v-if="!loginRoute" color="green">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </v-app-bar> -->

    <MainMenu v-if="!mobile" @toggleNavigationDrawer="toggleNavDrawer" />
    <div id="view-box">
      <router-view/>
    </div>

    <NavigationProvider v-model="navDrawer" />
</v-app>
</template>

<script>
import MainMenu from '@/components/layout/MainMenu.vue'
import NavigationProvider from '@/components/layout/NavigationProvider.vue'

export default {
  name: 'App',

  components: {
    MainMenu,
    NavigationProvider
  },

  data: () => ({
    navDrawer: false
  }),

  computed: {
    loginRoute () {
      return this.$route.path.includes('auth')
    },

    mobile () {
      return this.$vuetify.breakpoint.smAndDown
    }
  },

  methods: {
    toggleNavDrawer () {
      console.log('toggleNavDrawer')
      this.navDrawer = !this.navDrawer
    }
  }
}
</Script>

<style lang="sass">
@import './styles/main.sass'

#view-box
  height: 100%
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center

nav
  padding: 30px
a
  font-weight: bold
  color: #2c3e50

  &.router-link-exact-active
    color: #42b983


</style>
