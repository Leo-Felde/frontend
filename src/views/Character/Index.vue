<template>
  <StylizedCard brown class="ma-4 mt-6" height="90%" >
    <StylizedCard black class="cardtitle px-3 py-2"> Personagem </StylizedCard>
    <div v-if="loading" class="d-flex-column mt-10">
      <v-progress-circular color="red darken-2" size="80" width="5" class="mx-auto" indeterminate />
      <span class="ml-2s"> carregando... </span>
    </div>
    <CharacterViewer v-else class="mx-auto"/>
  </StylizedCard>
</template>
<script>
import Usuario from '@/Api/Geral/Usuario'

import CharacterViewer from '@/components/CharacterViewer'
import StylizedButton from '@/components/StylizedButton'

export default {  
  name: 'AboutPage',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    StylizedButton,
    CharacterViewer
  },

  data: () => ({
    loading: false
  }),

  async mounted () {
    await this.carregarUsuario()
  },

  methods: {
    async carregarUsuario () {
      this.loading = true
      try {
        const resp = await Usuario.carregar(this.usuario.id)
        console.log(resp.data)
        this.$store.commit('usuario/setUsuario', resp.data.content.usuario)
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao carregar usuário', color: 'error' })
      } finally {
        this.loading = false
      }
    }
  },

  computed: {
    usuario () {
      return this.$store.state.usuario.dados
    }
  }
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
