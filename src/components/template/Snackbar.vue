<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-snackbar v-model="show" :color="color" top right>
    <v-icon v-if="icon"> {{ icon }}</v-icon>
    {{ message }}
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: '',
      color: ''
    }
  },

  created () {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.show = true
      }
    })
  },

  computed: {
    icon () {
      if (this.color === 'error') return 'mdi-alert-circle-outline'
      return null
    }
  }
}
</script>