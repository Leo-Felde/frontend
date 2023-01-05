<template>
  <v-text-field
    v-model="textValue"
    solo
    :dense="dense"
    :required="required"
    :label="label"
    :class="`stylized-tf ${contentClass}`"
    :append-icon="appendIcon"
    :placeholder="placeHolder"
    :hideDetails="hideDetails"
    :error-messages="errorMessages"
    :rules="rules"
    :counter="counter"
    :type="type"
  >
    <template v-slot:append>
      <slot name="append" />
    </template>

    <template v-slot:prepend-inner>
      <div v-for="i in 2" :key="i" :id="`tf-deco-${i}`"/>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'TextField',

  props: {
    hideDetails: { type: Boolean, default: true },
    dense: Boolean,
    required: Boolean,
    rules: { type: Array, default: () => [] },
    errorMessages: { type: [String, Array], default: () => [] },
    type: { type: String, default: 'text' },
    contentClass: { type: String, default: '' },
    appendIcon: { type: String, default: undefined },
    placeHolder: { type: String, default: undefined },
    counter: { type: String, default: undefined },
    label: { type: String, default: undefined },
    value: { type: String, default: null }
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