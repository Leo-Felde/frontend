<template>
  <StylizedCard brown height="90%" width="500px">
    <StylizedCard black class="cardtitle px-3 py-2"> Personagem </StylizedCard>
    <div v-if="loading" class="d-flex-column mt-10">
      <v-progress-circular color="red darken-2" size="80" width="5" class="mx-auto" indeterminate />
      <span class="ml-2s"> carregando... </span>
    </div>
    <CharacterViewer v-else class="mx-auto" @logout="logout" />

    <v-overlay v-if="loadingLogout">
      
    </v-overlay>
  </StylizedCard>
</template>
<script>
import Auth from '@/Api/Geral/Auth'
import Usuario from '@/Api/Geral/Usuario'

import Cookies from 'js-cookie'

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
    loading: true,
    loadingLogout: false
  }),

  async mounted () {
    await this.carregarUsuario()
  },

  methods: {
    async carregarUsuario () {
      this.loading = true
      try {
        const resp = await Usuario.carregar(this.usuario.id)
        this.$store.commit('usuario/setUsuario', resp.data.content.usuario)
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao carregar usuário', color: 'error' })
      } finally {
        this.loading = false
      }
    },

    async logout () {
      try {
        this.loadingLogout = true
        await Auth.logout()

        Cookies.set('usuario', null, { expires: 7 })
        Cookies.set('token', null, { expires: 7 })

        this.$router.push('/auth')
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao desconectar usuário', color: 'error' })
      } finally {
        this.loadingLogout = false
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
