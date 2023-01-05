<template>
  <v-btn @click="$emit('click')" :block="block" :class="`pixel-btn ${buttonColor}-btn white--text`">
    <div :class="`conteudo-botao ${loading ? 'v-hidden' : ''}`">
      <slot />
    </div>
    <div class="v-btn__loader" v-if="loading">
      <v-progress-circular indeterminate width="2" size="18" />
    </div>
    <div v-show="!noBorders" v-for="n in 4" :key="n" :id="`btn-${buttonColor}-border-deco-${n}`" />
   </v-btn>
</template>

<script>
export default {
  props: {
    block: Boolean,
    loading: Boolean,
    noBorders: Boolean,
    disabled: Boolean,
    color: { type: String, default: 'black' }
  },

  computed: {
    buttonColor () {
      if (this.disabled) return 'grey'
      else return this.color
    }
  }
}
</script>

<style scoped lang="sass">
@mixin corners($color, $color2: "#fff")
  box-shadow: 3px 3px 0 0 #{$color2}, 6px 3px 0 0 #{$color2}, 9px 3px 0 0 #{$color2}, 3px 6px 0 0 #{$color}, 6px 6px 0 0 #{$color}, 9px 6px 0 0 #{$color2}, 12px 6px 0 0 #{$color2}, 3px 9px 0 0 #{$color}, 6px 9px 0 0 #{$color}, 9px 9px 0 0 #{$color}, 12px 9px 0 0 #{$color2}, 6px 12px 0 0 #{$color}, 9px 12px 0 0 #{$color}, 12px 12px 0 0 #{$color2}, 9px 15px 0 0 #{$color}, 12px 15px 0 0 #{$color2}


.pixel-btn
  :deep(.v-btn__content)
    min-height: 20px !important
  &.v-btn, &.v-btn--loading
    border-radius: 6%
    #pixel-btn-border-deco
      position: absolute
      height: 3px
      width: 3px
      z-index: 2
      $Xpos: -7px
      $Ypos: -14px
      &-1
        @extend #pixel-btn-border-deco
        left: $Xpos
        top: $Ypos
        -webkit-transform: scaleX(-1)
        transform: scaleX(-1)
      &-2
        @extend #pixel-btn-border-deco
        right: $Xpos
        top: $Ypos
      &-3
        @extend #pixel-btn-border-deco
        left: $Xpos
        bottom: $Ypos
        -webkit-transform: rotate(180deg)
        transform: rotate(180deg)
      &-4
        @extend #pixel-btn-border-deco
        right: $Xpos
        bottom: $Ypos
        -webkit-transform: scaleX(-1) rotate(180deg)
        transform: scaleX(-1) rotate(180deg)
  
.black-btn.v-btn
  @extend .pixel-btn
  outline: 3px solid white
  background-color: #353540 !important
  box-shadow: 0px 4px 0px 0px #686d74 inset, 0px -4px 0px 0px #26222c inset !important
  #btn-black-border-deco
    @extend #pixel-btn-border-deco
    &-1
      @extend #pixel-btn-border-deco-1
      @include corners("#686d74")
    &-2
      @extend #pixel-btn-border-deco-2
      @include corners("#686d74")
    &-3
      @extend #pixel-btn-border-deco-3
      @include corners("#26222c")
    &-4
      @extend #pixel-btn-border-deco-4
      @include corners("#26222c")

.blue-btn.v-btn
  @extend .pixel-btn
  outline: 3px solid white
  background-color: #1976D2 !important
  box-shadow: 0px 4px 0px 0px #1E88E5 inset, 0px -4px 0px 0px #1565C0 inset !important
  #btn-blue-border-deco
    @extend #pixel-btn-border-deco
    &-1
      @extend #pixel-btn-border-deco-1
      @include corners("#1E88E5")
    &-2
      @extend #pixel-btn-border-deco-2
      @include corners("#1E88E5")
    &-3
      @extend #pixel-btn-border-deco-3
      @include corners("#1565C0")
    &-4
      @extend #pixel-btn-border-deco-4
      @include corners("#1565C0")

.green-btn.v-btn
  @extend .pixel-btn
  outline: 3px solid white
  background-color: #318f3c !important
  box-shadow: 0px 4px 0px 0px #74a66c inset, 0px -4px 0px 0px #2a6b32 inset !important
  #btn-green-border-deco
    @extend #pixel-btn-border-deco
    &-1
      @extend #pixel-btn-border-deco-1
      @include corners("#74a66c")
    &-2
      @extend #pixel-btn-border-deco-2
      @include corners("#74a66c")
    &-3
      @extend #pixel-btn-border-deco-3
      @include corners("#2a6b32")
    &-4
      @extend #pixel-btn-border-deco-4
      @include corners("#2a6b32")

.grey-btn.v-btn
  @extend .pixel-btn
  pointer-events: none
  outline: 3px solid #eaeaea
  background-color: #8a8a8a !important
  box-shadow: 0px 4px 0px 0px #9b9b9b inset, 0px -4px 0px 0px #686868 inset !important
  color: #606060 !important
  #btn-grey-border-deco
    @extend #pixel-btn-border-deco
    &-1
      @extend #pixel-btn-border-deco-1
      @extend #btn-grey-border-deco
      @include corners("#9b9b9b", "#eaeaea")
    &-2
      @extend #pixel-btn-border-deco-2
      @include corners("#9b9b9b", "#eaeaea")
    &-3
      @extend #pixel-btn-border-deco-3
      @include corners("#686868", "#eaeaea")
    &-4
      @extend #pixel-btn-border-deco-4
      @include corners("#686868", "#eaeaea")

</style>