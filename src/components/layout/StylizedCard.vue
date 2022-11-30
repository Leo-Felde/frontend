<template>
  <v-card v-if="black" :class="`black white--text ${contentClass}`" tile :height="height">
    <v-img :src="require(`@/assets/img/navdecocorner.svg`)" v-for="n in 4" :key="n" :class="`black-deco-${n}`" />
    <slot/>
  </v-card>
</template>

<script>
export default {
  props: {
    black: Boolean,
    paper: Boolean,
    height: { type: String, default: null },
    contentClass: { type: String, default: null },
    color: { type: String, default: null }
  } 
}
</script>

<style lang="sass" scoped>
.v-card.black
  background: #353540 !important
  outline: 3px solid white !important

.black-deco
  position: absolute
  height: 10px
  width: 10px
  &-1
    @extend .black-deco
    left: 5px
    top: 5px
  &-2
    @extend .black-deco
    right: 5px
    top: 5px
    -webkit-transform: scaleX(-1)
    transform: scaleX(-1)
  &-3
    @extend .black-deco
    left: 5px
    bottom: 5px
    -webkit-transform: scaleX(-1) rotate(180deg)
    transform: scaleX(-1) rotate(180deg)
  &-4
    @extend .black-deco
    right: 5px
    bottom: 5px
    -webkit-transform: rotate(180deg)
    transform: rotate(180deg)
    caret-color: black !important
</style>