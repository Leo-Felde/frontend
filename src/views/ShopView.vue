<template>
    <StylizedCard brown class="pa-2 ma-2">
      <v-card-title class="justify-center"> Lojinha </v-card-title>
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
          <div class="caption mt-4">
            Você possui<span class="orange--text text--accent-2 caption"> 2 <v-icon small color="orange accent-2"> mdi-circle-multiple </v-icon></span> <p />
            Você comprou 0 items
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-2"/>

    <PixelTabs v-model="tab" :items="tabs" class="mb-3" content-class="d-flex justify-space-around"/>

      <v-row cols="12" class="ma-0 mb-3">
        <v-col cols="4" v-for="i in 12" :key="i">
          <StylizedCard black content-class="d-flex" height="50px">
            <span class="ma-auto caption grey--text"> item </span>
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
    
  data: () => ({
    tab: 0,
    tabs: [
      { icon: 'weapons' },
      { icon: 'armor-boots' },
      { icon: 'potions' }
    ]
  }),
  methods: {
    changeTab() {
      // ?
    }
  },
}
</script>
  