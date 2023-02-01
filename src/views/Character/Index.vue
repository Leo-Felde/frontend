<template>
  <StylizedCard brown class="ma-4 mt-6" height="90%" >
    <StylizedCard black class="cardtitle px-3 py-2"> Personagem </StylizedCard>
    <CharacterViewer class="mx-auto"/>
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
