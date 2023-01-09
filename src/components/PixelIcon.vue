<template>
  <v-img :src="require(`@/assets/icons/${icon}.png`)" contain :max-width="width"/>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: 'banana-peel' },
    large: Boolean,
    small: Boolean,
    xSmall: Boolean
  },

  computed: {
    width () {
      if (this.large) return 40
      else if (this.small) return 24
      else if (this.xSmall) return 16
      else return 36 // normal
    }
  }
}
</script>
