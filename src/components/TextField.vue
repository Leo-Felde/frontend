<template>
  <v-text-field v-model="textValue" solo :class="`stylized-tf ${contentClass}`" :placeholder="placeHolder" >
    <template v-slot:prepend-inner>
      <div v-for="i in 2" :key="i" :id="`tf-deco-${i}`"/>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'TextField',

  props: {
    value: { type: String, default: null },
    contentClass: { type: String, default: '' },
    placeHolder: { type: String, default: undefined }
  },

  data: () => ({
    textValue: null
  }),

  watch: {
    value () {
      this.textValue = this.value
    },

    textValue () {
      this.$emit('input', this.textValue)
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep
  .v-input__slot
    border-radius: 0px !important
    outline: 3px solid white !important
    background: #86735b !important
    box-shadow: 0px 0px 0px 3px #353540 inset, 0px 7px 0px 0px #7e674c inset !important
    margin-bottom: 0px
  .v-text-field__details
    display: none
#tf-deco
  position: absolute
  box-shadow: 3px 3px 0 0 rgba(53,53,64,255), 6px 3px 0 0 rgba(255,255,255,255), 3px 6px 0 0 rgba(53,53,64,255), 6px 6px 0 0 rgba(53,53,64,255), 9px 6px 0 0 rgba(255,255,255,255), 3px 9px 0 0 rgba(53,53,64,255), 6px 9px 0 0 rgba(53,53,64,255), 9px 9px 0 0 rgba(255,255,255,255), 3px 12px 0 0 rgba(53,53,64,255), 6px 12px 0 0 rgba(255,255,255,255)
  height: 3px
  width: 3px
  &-1
    @extend #tf-deco
    left: 0px
    top: 32%
    -webkit-transform: scaleX(-1)
    transform: scaleX(-1)
  &-2
    @extend #tf-deco
    right: 0px
    top: 32%
</style>