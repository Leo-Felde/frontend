<template>
  <v-card v-if="black" :class="`black white--text ${contentClass}`" tile :height="height" :width="width">
    <div v-show="!noBorders" v-for="n in 4" :key="n" :id="`black-border-deco-${n}`" />
    <slot />
  </v-card>

  <v-card v-else-if="brown" :class="`brown ${contentClass}`" tile :height="height" :width="width">
    <div v-show="!noBorders" v-for="n in 4" :key="n" :id="`brown-border-deco-${n}`" />
    <slot />
  </v-card>

  <v-card v-else-if="brownLight" :class="`brownLight ${contentClass}`" tile :height="height" :width="width">
    <div v-show="!noBorders" v-for="n in 4" :key="n" :id="`lbrown-border-deco-${n}`" />
    <slot />
  </v-card>

  <v-card v-else-if="paper" :class="`${color ? `paper-${color}` : 'paper'} ${contentClass}`" tile :height="height" :width="width">
    <div v-show="!noBorders" v-for="n in 4" :key="n" :id="`paper-border-deco-${n}`" />
    <div v-show="!noDeco" v-for="n in 2" :key="n" :id="`paper-inner-deco-${n}`"/>
    <slot />
  </v-card>

  <!-- <v-card v-else-if="paper" :class="`paper ${contentClass}`" tile :height="height">
    <v-img v-show="!noBorders" src="@/assets/img/redjewelborder.svg" v-for="n in 4" :key="n" :id="`border-deco-${n}`" />
    <slot/>
  </v-card> -->
</template>

<script>
export default {
  props: {
    black: Boolean,
    brown: Boolean,
    brownLight: Boolean,
    paper: Boolean,
    noBorders: Boolean,
    noDeco: { type: Boolean, default: true },
    height: { type: String, default: null },
    width: { type: String, default: null },
    contentClass: { type: String, default: null },
    color: { type: String, default: null }

  } 
}
</script>

<style lang="sass" scoped>
@mixin border-color($color) 
  border: solid 3px #{$color}

@mixin shadow-color($color)
  // box-shadow: 3px 3px 0 0 #{$color}, 6px 3px 0 0 #{$color}, 9px 3px 0 0 #{$color}, 3px 6px 0 0 #{$color}, 9px 6px 0 0 #{$color}, 3px 9px 0 0 #{$color}, 6px 9px 0 0 #{$color}
  box-shadow: 3px 3px 0 0 #{$color}, 6px 3px 0 0 #{$color}, 9px 3px 0 0 #{$color}, 3px 6px 0 0 #{$color}, 9px 6px 0 0 #{$color}, 3px 9px 0 0 #{$color}, 6px 9px 0 0 #{$color}
  height: 3px 
  width: 3px

.paper
  background: #fbf2eb
  border: 3px solid
  $height: -6px
  $width: -6px
  #paper-border-deco
    position: absolute
    &-1
      @extend #paper-border-deco
      left: $width
      top: $height
    &-2
      @extend #paper-border-deco
      right: $width
      top: $height
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-3
      @extend #paper-border-deco
      left: $width
      bottom: $height
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)
    &-4
      @extend #paper-border-deco
      right: $width
      bottom: $height
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)
  #paper-inner-deco
    background: #fbf2eb
    position: absolute
    height: 40%
    width: 3px
    top: 30%
    &-1
      @extend #paper-inner-deco
      left: -3px
    &-2
      @extend #paper-inner-deco
      right: -3px
  &-blue
    @extend .paper
    @include border-color("#657baa")
    #paper-border-deco
      @include shadow-color("#657baa")
  &-red
    @extend .paper
    @include border-color("#b95f5f")
    #paper-border-deco
      @include shadow-color("#b95f5f")
  &-yellow
    @extend .paper
    @include border-color("#e1b35d")
    #paper-border-deco
      @include shadow-color("#e1b35d")
  &-black
    @extend .paper
    @include border-color("#222034")
    #paper-border-deco
      @include shadow-color("#222034")
  &-green
    @extend .paper
    @include border-color("#37946e")
    #paper-border-deco
      @include shadow-color("#37946e")
  

.v-card.black
  background: #353540 !important
  outline: 3px solid white !important
  $height: 0px
  $width: 16px
  #black-border-deco
    position: absolute
    box-shadow: 3px 3px 0 0 rgba(99,97,103,255), 6px 3px 0 0 rgba(99,97,103,255), 9px 3px 0 0 rgba(99,97,103,255), 12px 6px 0 0 rgba(99,97,103,255), 12px 9px 0 0 rgba(99,97,103,255), 12px 12px 0 0 rgba(99,97,103,255)
    height: 3px
    width: 3px
    &-1
      @extend #black-border-deco
      left: $width
      top: $height
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-2
      @extend #black-border-deco
      right: $width
      top: $height
    &-3
      @extend #black-border-deco
      left: $width
      bottom: $height
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)
    &-4
      @extend #black-border-deco
      right: $width
      bottom: $height
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)
    
.v-card.brown
  outline: 3px solid white !important
  box-shadow: 0px 0px 0px 3px #353540 inset, 0px 0px 0px 6px #a88b79 inset !important
  background-color: #bdaa97 !important
  padding: 4px 4px 4px 4px
  $height: -6px
  $width: 24px
  #brown-border-deco
    position: absolute
    box-shadow: 3px 3px 0 0 rgba(255,255,255,255), 6px 3px 0 0 rgba(255,255,255,255), 9px 3px 0 0 rgba(255,255,255,255), 12px 3px 0 0 rgba(255,255,255,255), 15px 3px 0 0 rgba(255,255,255,255), 18px 3px 0 0 rgba(255,255,255,255), 21px 3px 0 0 rgba(255,255,255,255), 24px 3px 0 0 rgba(255,255,255,255), 3px 6px 0 0 rgba(53,53,64,255), 6px 6px 0 0 rgba(53,53,64,255), 9px 6px 0 0 rgba(53,53,64,255), 12px 6px 0 0 rgba(53,53,64,255), 15px 6px 0 0 rgba(53,53,64,255), 18px 6px 0 0 rgba(53,53,64,255), 21px 6px 0 0 rgba(53,53,64,255), 24px 6px 0 0 rgba(53,53,64,255), 27px 6px 0 0 rgba(255,255,255,255), 3px 9px 0 0 rgba(168,139,121,1), 6px 9px 0 0 rgba(53,53,64,255), 9px 9px 0 0 rgba(53,53,64,255), 12px 9px 0 0 rgba(53,53,64,255), 15px 9px 0 0 rgba(53,53,64,255), 18px 9px 0 0 rgba(191,184,180,255), 21px 9px 0 0 rgba(53,53,64,255), 24px 9px 0 0 rgba(53,53,64,255), 27px 9px 0 0 rgba(255,255,255,255), 3px 12px 0 0 rgba(168,139,121,1), 6px 12px 0 0 rgba(53,53,64,255), 9px 12px 0 0 rgba(53,53,64,255), 12px 12px 0 0 rgba(53,53,64,255), 15px 12px 0 0 rgba(145,141,141,255), 18px 12px 0 0 rgba(99,97,103,255), 21px 12px 0 0 rgba(145,141,141,255), 24px 12px 0 0 rgba(53,53,64,255), 27px 12px 0 0 rgba(255,255,255,255), 6px 15px 0 0 rgba(168,139,121,1), 9px 15px 0 0 rgba(53,53,64,255), 12px 15px 0 0 rgba(53,53,64,255), 15px 15px 0 0 rgba(53,53,64,255), 18px 15px 0 0 rgba(145,141,141,255), 21px 15px 0 0 rgba(53,53,64,255), 24px 15px 0 0 rgba(53,53,64,255), 27px 15px 0 0 rgba(255,255,255,255), 6px 18px 0 0 rgba(168,139,121,1), 9px 18px 0 0 rgba(53,53,64,255), 12px 18px 0 0 rgba(53,53,64,255), 15px 18px 0 0 rgba(53,53,64,255), 18px 18px 0 0 rgba(53,53,64,255), 21px 18px 0 0 rgba(53,53,64,255), 24px 18px 0 0 rgba(53,53,64,255), 27px 18px 0 0 rgba(255,255,255,255), 9px 21px 0 0 rgba(168,139,121,1), 12px 21px 0 0 rgba(53,53,64,255), 15px 21px 0 0 rgba(53,53,64,255), 18px 21px 0 0 rgba(53,53,64,255), 21px 21px 0 0 rgba(53,53,64,255), 24px 21px 0 0 rgba(53,53,64,255), 27px 21px 0 0 rgba(255,255,255,255), 12px 24px 0 0 rgba(168,139,121,1), 15px 24px 0 0 rgba(168,139,121,1), 18px 24px 0 0 rgba(53,53,64,255), 21px 24px 0 0 rgba(53,53,64,255), 24px 24px 0 0 rgba(53,53,64,255), 27px 24px 0 0 rgba(255,255,255,255), 18px 27px 0 0 rgba(168,139,121,1), 21px 27px 0 0 rgba(168,139,121,1), 24px 27px 0 0 rgba(53,53,64,255), 27px 27px 0 0 rgba(255,255,255,255)
    height: 3px
    width: 3px
    &-1
      @extend #brown-border-deco
      left: $width
      top: $height
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-2
      @extend #brown-border-deco
      right: $width
      top: $height
    &-3
      @extend #brown-border-deco
      left: $width
      bottom: $height
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)
    &-4
      @extend #brown-border-deco
      right: $width
      bottom: $height
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)

.v-card.brownLight
  box-shadow: 0px 0px 0px 3px #4D3F38 inset, 0px 0px 0px 6px rgb(189, 170, 151) inset !important
  background-color: rgb(212, 194, 182) !important
  padding: 4px 4px 4px 4px
  $height: -9px
  $width: 12px
  #lbrown-border-deco
    position: absolute
    box-shadow: 6px 3px 0 0 rgba(77,63,56,255), 9px 3px 0 0 rgba(77,63,56,255), 12px 3px 0 0 rgba(77,63,56,255), 15px 3px 0 0 rgba(77,63,56,255), 18px 3px 0 0 rgba(77,63,56,255), 3px 6px 0 0 rgba(77,63,56,255), 6px 6px 0 0 rgba(169,73,73,255), 9px 6px 0 0 rgba(77,63,56,255), 12px 6px 0 0 rgba(169,73,73,255), 15px 6px 0 0 rgba(209,121,115,255), 18px 6px 0 0 rgba(77,63,56,255), 3px 9px 0 0 rgba(77,63,56,255), 6px 9px 0 0 rgba(77,63,56,255), 9px 9px 0 0 rgba(77,63,56,255), 12px 9px 0 0 rgba(77,63,56,255), 15px 9px 0 0 rgba(169,73,73,255), 18px 9px 0 0 rgba(77,63,56,255), 3px 12px 0 0 rgba(189,170,151,1), 6px 12px 0 0 rgba(77,63,56,255), 9px 12px 0 0 rgba(146,52,70,255), 12px 12px 0 0 rgba(77,63,56,255), 15px 12px 0 0 rgba(77,63,56,255), 18px 12px 0 0 rgba(77,63,56,255), 3px 15px 0 0 rgba(189,170,151,1), 6px 15px 0 0 rgba(77,63,56,255), 9px 15px 0 0 rgba(77,63,56,255), 12px 15px 0 0 rgba(77,63,56,255), 15px 15px 0 0 rgba(169,73,73,255), 18px 15px 0 0 rgba(77,63,56,255), 3px 18px 0 0 rgba(189,170,151,1), 6px 18px 0 0 rgba(189,170,151,1), 9px 18px 0 0 rgba(189,170,151,1), 12px 18px 0 0 rgba(77,63,56,255), 15px 18px 0 0 rgba(77,63,56,255)
    height: 3px
    width: 3px
    &-1
      @extend #lbrown-border-deco
      left: $width
      top: $height
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-2
      @extend #lbrown-border-deco
      right: $width
      top: $height
    &-3
      @extend #lbrown-border-deco
      left: $width
      bottom: $height
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)
    &-4
      @extend #lbrown-border-deco
      right: $width
      bottom: $height
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)
</style>