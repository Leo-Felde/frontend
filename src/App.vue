<template>
  <v-app id="app">
    <!-- <v-app-bar v-if="!loginRoute" color="green">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </v-app-bar> -->

      <div :id="`${loginRoute ? 'login-' : ''}view-box`">
        <router-view/>
      </div>
      <NavigationProvider v-show="!loginRoute" v-model="navDrawer" />
</v-app>
</template>

<script>
import NavigationProvider from '@/components/layout/NavigationProvider.vue'

export default {
  name: 'App',

  components: {
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
#login-view-box
  height: 100%
  background-color: #a94949


#view-box
  height: 100%
  margin-bottom: 56px
  max-height: calc(100vh - 56px)
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center

</style>
