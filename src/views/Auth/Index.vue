<template>
  <StylizedCard brown content-class="vertical-center mx-auto pa-5" :width="this.$vuetify.breakpoint.smAndDown ? '85%' : '350px'">
    <StylizedCard black class="title-card px-5 py-1">
       Bem vindo
    </StylizedCard>
    <v-row cols="12" no-gutters>
        <v-col cols="12" lg="12" class="my-3">
            <TextField required v-model="form.email" dense label="email" />
        </v-col>
        <v-col cols="12" lg="12">
            <TextField required v-model="form.senha" dense label="senha" :hide-details="false" />
        </v-col>
    </v-row>
    <div>
      <StylizedButton color="blue" block @click="authenticate" :loading="loading" class="mb-2"> Entrar </StylizedButton>

      <span class="pointer"> esqueceu a senha? </span>
      <v-divider class="mt-3 mb-4"/>
      <StylizedButton color="green" @click="$router.push('/auth/new')"> Criar nova  Conta </StylizedButton>
  </div>
  </StylizedCard>
</template>

<script>
import Usuario from '@/api/geral/usuario.js'

import StylizedButton from '@/components/StylizedButton.vue'

export default {  
  name: 'AuthLogin',
  components: {
    StylizedButton
  },

  data: () => ({
    loading: false,
    form: {email: null, senha: null}
  }),

  methods: {
    async authenticate () {
      try {
        this.loading = true

        const resp = await Usuario.login(this.form)
        console.log(resp)
      } catch(err) {
        console.log(err)
      } finally {
        this.loading = false
      }
      // await new Promise(resolve => setTimeout(resolve, 1500))


      // this.loading = false
      // this.$router.push('/home')
    }
  }
}
</script>

<style scoped lang="sass">
.title-card
  position: absolute
  top: -18px
  left: 0px
  right: 0px
  margin-left: auto
  margin-right: auto
  width: fit-content

</style>