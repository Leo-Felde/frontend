<template>
  <v-snackbar
    v-model="show"
    absolute
    top
    right
  >
    {{ message }}
    
    <v-btn @click="show = false"> close </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'snack-bar',
  
  props: {
    message: { String, default: ''},
    value: Boolean
  },

  data: () => ({
    show: false
  })
}
</script>