<template>
  <v-app id="app">
    <!-- <v-app-bar v-if="!loginRoute" color="green">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </v-app-bar> -->

      <div :id="`${loginRoute ? 'login-' : ''}view-box`" class="px-4 pt-6">
        <router-view class="router-view"/>
      </div>

      <Snackbar />
      <ConfirmDialog ref="confirm" />
      <NavigationProvider v-show="!loginRoute" />
</v-app>
</template>

<script>
import ConfirmDialog from '@/components/ConfirmDialog.vue'
import NavigationProvider from '@/components/layout/NavigationProvider.vue'
import Snackbar from '@/components/template/Snackbar.vue'

export default {
  name: 'App',

  components: {
    ConfirmDialog,
    NavigationProvider,
    Snackbar
  },

  computed: {
    loginRoute () {
      return this.$route.path.includes('auth')
    },

    mobile () {
      return this.$vuetify.breakpoint.smAndDown
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
  max-height: calc(100vh - 56px)
  overflow: hidden
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center

.router-view
  max-height: 95%
  display: flex !important
  flex-direction: column
  max-width: 500px !important
  margin-left: auto
  margin-right: auto
</style>
