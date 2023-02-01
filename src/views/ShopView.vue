<template>
    <StylizedCard brown class="px-4 pb-2 pt-7 mt-6 mx-4">
      <StylizedCard black class="px-3 py-2 cardtitle"> Lojinha </StylizedCard>
      <v-row cols="12">
        <v-col cols="4">
          <StylizedCard brown-light content-class="d-flex" width="100%" height="80px" no-borders>
            <v-img
              :src="require('../assets/img/penguino.png')"
              class="my-3"
              contain
              height="61"
            />
          </StylizedCard>
        </v-col>
        <v-col cols="8" class="text-start">
          <div class="caption"> bem vindo a lojinha, aqui você pode trocar seu dinheirinho por items</div>
           <div class="d-flex mt-auto caption"> Você possui<span class="ml-1 yellow--text text--accent-2 d-flex"> 2  <PixelIcon icon="coins-pile" x-small class="ml-1"/></span> <p /></div>
        </v-col>
      </v-row>
      <v-divider class="my-2"/>

    
      <PixelTabs v-model="tab" :items="tabs" content-class="d-flex justify-space-around"/>

    <v-row cols="12" class="ma-0 mb-3">
      <v-col cols="4" v-for="i in 12" :key="`inv-${i}`" @click="currentTabItems[i - 1] ? selectItem(tabs[tab], currentTabItems[i - 1]) : null" :class="{'pointer': currentTabItems[i - 1]}">
        <StylizedCard light content-class="d-flex" height="50px">
          <v-img v-if="currentTabItems[i - 1]" :src="require(`@/assets/character/${tabs[tab]}/icon/${currentTabItems[i - 1]}.png`)" height="30px" contain class="self-align-center" />
        </StylizedCard>
      </v-col>
    </v-row>
    </StylizedCard>
  </template>
  
<script>
// @ is an alias to /src

import PixelTabs from '@/components/pixelTab.vue'

  
export default {
  name: 'tasksIndex',

  components: {
    PixelTabs
  },

  computed: {
    currentTabItems () {
      return this.items[this.tabs[this.tab]] || []
    }
  },
    
  data: () => ({
    tab: 0,
    tabs: ['head', 'top', 'bottom'],
    items: {
      head: [ 'gladiator', 'wizards-hat', 'templar', 'fox-mask'],
      top: ['gladiator', 'templar', 'red-armor', 'tuxedo', 'red-jacket'],
      bottom: ['gladiator', 'templar', 'wills']
    },
  }),
  methods: {
    changeTab() {
      // ?
    }
  },
}
</script>

<style lang="sass" scoped>
.cardtitle
  position: absolute
  top: -18px
  left: 0
  right: 0
  margin-left: auto
  margin-right: auto
  width: fit-content
</style>
  