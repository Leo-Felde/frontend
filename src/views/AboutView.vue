<template>
  <StylizedCard paper color="yellow" class="ma-4" height="200" >
    <PixelIcon icon="coins" />
    <StylizedButton special @click="adicionarHabito" class="mt-2"> Teste </StylizedButton>
  </StylizedCard>
</template>

<script>
import StylizedButton from '@/components/StylizedButton'

export default {  
  name: 'AboutPage',
  components: {
    StylizedButton
  },
}
</script>
