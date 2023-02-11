<template>
  <StylizedCard brown content-class="vertical-center mx-auto pa-5" :width="this.$vuetify.breakpoint.smAndDown ? '85%' : '350px'">
    <StylizedCard black class="title-card px-5 py-1">
       Bem vindo
    </StylizedCard>
    <v-row cols="12" no-gutters>
        <v-col cols="12" lg="12" class="my-3">
            <TextField v-model="form.email" dense required label="email" />
        </v-col>
        <v-col cols="12" lg="12">
            <TextField v-model="form.senha" dense required label="senha" :hide-details="false" />
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
import StylizedButton from '@/components/StylizedButton.vue'

import Auth from '@/Api/Geral/Auth'

export default {  
  name: 'AuthLogin',
  components: {
    StylizedButton
  },

  data: () => ({
    form: { email: null, senha: null},
    loading: false
  }),

  methods: {
    async authenticate () {
      this.loading = true
      try {
        const resp = await Auth.login(this.form)
        console.log(resp)
      } catch (err) {
        console.log('%cErro no login:\n', 'color: red')
        console.log(err)
      } finally {
        this.loading = false
      }
      
      // console.log('loading de teste')
      // this.loading = true

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