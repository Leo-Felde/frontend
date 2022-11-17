<template>
    <v-app-bar
      color="deep-purple"
      dark
      max-height="64px"
    >
      <v-app-bar-nav-icon @click="$emit('toggleNavigationDrawer')"/>
    </v-app-bar>
  </template>

<script>
export default {
  name: 'MainMenu',

  data: () => ({

  })
}
</Script>

<style lang="sass">

</style>
