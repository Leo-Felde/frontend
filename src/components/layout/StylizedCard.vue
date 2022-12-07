<template>
  <v-card v-if="black" :class="`black white--text ${contentClass}`" tile :height="height">
    <v-img v-show="!noBorders" :src="require(`@/assets/img/navdecocorner.svg`)" v-for="n in 4" :key="n" :class="`black-deco-${n}`" />
    <slot/>
  </v-card>

  <v-card v-else-if="paper" :class="`paper ${contentClass}`" tile :height="height">
    <v-img v-show="!noBorders" src="@/assets/img/mborder-1.svg" v-for="n in 4" :key="n" :id="`border-deco-${n}`" />
    <slot/>
  </v-card>

  <v-card v-else-if="paperLight" :class="`paperLight ${contentClass}`" tile :height="height">
    <v-img v-show="!noBorders" src="@/assets/img/redjewelborder.svg" v-for="n in 4" :key="n" :id="`border-deco-${n}`" />
    <slot/>
  </v-card>
</template>

<script>
export default {
  props: {
    black: Boolean,
    paper: Boolean,
    paperLight: Boolean,
    noBorders: { type: Boolean, default: false },
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

.v-card.paper
  outline: 3px solid white !important
  box-shadow: 0px 0px 0px 3px #353540 inset, 0px 0px 0px 6px #a88b79 inset !important
  background-color: #bdaa97 !important
  padding: 4px 4px 4px 4px
  $space: -3px
  #border-deco
    position: absolute
    width: 27px
    &-1
      @extend #border-deco
      left: $space
      top: $space
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-2
      @extend #border-deco
      right: $space
      top: $space
    &-3
      @extend #border-deco
      left: $space
      bottom: $space
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)
    &-4
      @extend #border-deco
      right: $space
      bottom: $space
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)
.v-card.paperLight
  outline: 3px solid #4d3f38 !important
  box-shadow: 0px 0px 0px 3px #bdaa97 inset !important
  background-color: #d4c2b6 !important
  padding: 4px 4px 4px 4px
  $space: -3px
  #border-deco
    position: absolute
    width: 27px
    &-1
      @extend #border-deco
      left: $space
      top: $space
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-2
      @extend #border-deco
      right: $space
      top: $space
    &-3
      @extend #border-deco
      left: $space
      bottom: $space
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)
    &-4
      @extend #border-deco
      right: $space
      bottom: $space
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)
</style>