<template>
    <div>
      <v-text-field v-model="textValue" solo class="stylized-tf">
        <template v-slot:append-outer>
          <v-img v-for="i in 2" :key="i" :class="`tf-deco-${i}`" src="@/assets/img/tf-deco.svg"/>
        </template>
      </v-text-field>
    </div>
</template>

<script>
export default {
  name: 'TextField',

  props: {
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
  .stylized-tf
    .v-input__slot
      border-radius: 0px !important
      outline: 3px solid white
      background: #86735b !important
      box-shadow: 0px 0px 0px 3px #353540 inset, 0px 7px 0px 0px #7e674c inset !important

.tf-deco
  position: absolute
  width: 10px
  margin-top: 5px
  &-1
    @extend .tf-deco
    left: 22px
    -webkit-transform: scaleX(-1)
    transform: scaleX(-1)
  &-2
    @extend .tf-deco
    right: 32px
</style>