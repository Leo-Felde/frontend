<template>
  <div>
    <v-tabs v-if="bigTabs" v-model="tab" :show-arrows="false" :class="`big-pixel-tabs ${contentClass}`">
      <v-tab v-for="tab in items" :key="tab" class="mx-2">
        <div v-for="i in 4" :key="i" :class="`big-pixel-tab-deco-${i}`"/>
        <span v-if="typeof tab !== 'object'"> {{  tab }} </span>
        <span v-if-else= "tab.title"> {{ tab.title }} </span>
        <v-icon v-if="tab.icon" :icon="tab.icon" />
      </v-tab>
    </v-tabs>

    <v-tabs v-else v-model="tab" :show-arrows="false" :class="`pixel-tabs ${contentClass}`">
      <v-tab v-for="tab in items" :key="tab.title" class="mx-1">
        <div v-for="i in 4" :key="i" :class="`pixel-tab-deco-${i}`"/>
        <span v-if="typeof tab !== 'object'"> {{  tab }} </span>
        <span v-else-if= "tab.title"> {{ tab.title }} </span>
        <PixelIcon v-if="tab.icon" :icon="tab.icon" />
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  name: 'Pixel-tabs',

  props: {
    bigTabs: Boolean,
    contentClass: { type: String, default: null },
    items: { type: Array, default: undefined },
    value: { type: Number, default: 0 },
  },
  
  watch: {
    value () {
      this.tab = this.value
    },

    tab () {
      this.$emit('input', this.tab)
    }
  },
  
  data: () => ({
    tab: 0
  }),
}
</script>

<style lang="sass" scoped>
@mixin shadow-color($color)
  box-shadow: 6px 3px 0 0 #{$color}, 9px 3px 0 0 #{$color}, 12px 3px 0 0 #{$color}, 15px 3px 0 0 #{$color}, 18px 3px 0 0 #{$color}, 3px 6px 0 0 #{$color}, 6px 6px 0 0 #{$color}, 3px 9px 0 0 #{$color}, 3px 12px 0 0 #{$color}, 3px 15px 0 0 #{$color}, 3px 18px 0 0 #{$color}
  height: 3px 
  width: 3px

@mixin big-shadow-color($color)
  box-shadow: 3px 3px 0 0 #{$color}, 6px 3px 0 0 #{$color}, 9px 3px 0 0 #{$color}, 3px 6px 0 0 #{$color}, 3px 9px 0 0 #{$color}
  height: 3px 
  width: 3px

  
.big-pixel-tabs
  .v-tab
    background-color: rgb(176, 151, 130)
    box-shadow: 0px 3px 0px rgb(170, 144, 122) inset, 0 3px 5px -1px rgba(0,0,0,.2),0 5px 8px 0 rgba(0,0,0,.14),0 1px 14px 0 rgba(0,0,0,.12) !important
    border: 3px solid rgb(157, 128, 103)
    &--active
      color: rgb(50, 50, 50) !important
      background: rgb(183, 160, 138) !important
      box-shadow: 0px 3px 0px rgb(170, 144, 122) inset !important
      .big-pixel-tab-deco
        @include big-shadow-color("rgb(126,103,76)")
  .big-pixel-tab-deco
    position: absolute
    @include big-shadow-color("rgb(126,103,76)")
    $position: 6px
    height: 3px
    width: 3px
    &-1
      @extend .big-pixel-tab-deco
      left: -$position
      top: -$position
    &-2
      @extend .big-pixel-tab-deco
      top: -$position
      right: -$position
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-3
      @extend .big-pixel-tab-deco
      bottom: -$position
      left: -$position
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)
    &-4
      @extend .big-pixel-tab-deco
      bottom: -$position
      right: -$position
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)

:deep(.v-item-group)
  background-color: transparent !important
:deep(.v-tabs-slider-wrapper)
  display: none

.pixel-tabs
  .v-tab
    color: rgb(134, 115, 91) !important
    min-width: 49px !important
    &--active
      color: rgb(50, 50, 50) !important
      background: rgb(183, 160, 138) !important
      .pixel-tab-deco
        @include shadow-color("rgb(219,204,193)")
  .pixel-tab-deco
    position: absolute
    @include shadow-color("rgb(212,194,182)")
    height: 3px
    width: 3px
    &-1
      @extend .pixel-tab-deco
      left: 0px
      top: 0px
    &-2
      @extend .pixel-tab-deco
      top: 0px
      right: 0px
      -webkit-transform: scaleX(-1)
      transform: scaleX(-1)
    &-3
      @extend .pixel-tab-deco
      bottom: 0px
      left: 0px
      -webkit-transform: scaleX(-1) rotate(180deg)
      transform: scaleX(-1) rotate(180deg)
    &-4
      @extend .pixel-tab-deco
      bottom: 0px
      right: 0px
      -webkit-transform: rotate(180deg)
      transform: rotate(180deg)

  :deep(.v-item-group)
    background-color: transparent !important
  :deep(.v-tabs-slider-wrapper)
    display: none

</style>