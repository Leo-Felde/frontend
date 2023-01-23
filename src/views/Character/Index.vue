<template>
  <StylizedCard brown class="ma-4 mt-6" height="90%" >
    <StylizedCard black class="cardtitle px-3 py-2"> Character </StylizedCard>
    <v-btn smalll icon class="debug-btn" @click="debug = !debug"> <v-icon> mdi-bug </v-icon></v-btn>
    <CharacterViewer :showCustomization="debug" />
  </StylizedCard>
</template>
<script>

import StylizedButton from '@/components/StylizedButton'
import CharacterViewer from '@/components/CharacterViewer'

export default {  
  name: 'AboutPage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    StylizedButton,
    CharacterViewer
  },

  data: () => ({
    debug: true
  })
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

.debug-btn
  position: absolute
  top: 20px
  right: 10px
</style>
