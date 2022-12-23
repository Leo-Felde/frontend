<template>
  <v-btn @click="$emit('click')" :block="block" class="black-btn" color="#353540"> teste </v-btn>
</template>

<script>
export default {
  props: {
    block: Boolean,
    loading: Boolean
  }
}
</script>

<style scoped lang="sass">
.black-btn.v-btn
  outline: 3px solid white
  // background-color: #353540 !important
  box-shadow: 0px 4px 0px 0px #686d74 inset, 0px -4px 0px 0px #26222c inset !important
</style>