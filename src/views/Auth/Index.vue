<template>
  <StylizedCard brown content-class="vertical-center mx-auto pa-5" :width="this.$vuetify.breakpoint.smAndDown ? '85%' : '350px'">
    <StylizedCard black class="title-card px-5 py-1">
       Bem vindo
    </StylizedCard>
    <v-row cols="12" no-gutters>
        <v-col cols="12" lg="12" class="my-3">
            <TextField v-model="email" dense required label="email" />
        </v-col>
        <v-col cols="12" lg="12">
            <TextField v-model="password" ref="loginPassword" :type="showPassword ? 'text' : 'password'" dense required label="senha" :hide-details="false">
              <template v-slot:append>
                <v-btn icon @click="showPassword = !showPassword"> <v-icon> {{showPassword ? 'mdi-eye-off' : 'mdi-eye'}} </v-icon></v-btn>
              </template>
            </TextField>
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
import { encode } from 'js-base64'
import Cookies from 'js-cookie'

import Auth from '@/Api/Geral/Auth'

import StylizedButton from '@/components/StylizedButton.vue'

export default {  
  name: 'AuthLogin',
  components: {
    StylizedButton
  },

  data: () => ({
    email: null,
    password: null,
    loading: false,
    showPassword: false
  }),

  methods: {
    async authenticate () {
      this.loading = true
      try {
        const params = {
          email: this.email,
          senha: encode(this.password)
        }
        const resp = await Auth.login(params)

        Cookies.set('usuario', JSON.stringify(resp.data.content.usuario))
        Cookies.set('token', resp.data.content.token, { expires: 7 })

        sessionStorage.setItem('tokeusuario', JSON.stringify(resp.data.content.usuario))
        sessionStorage.setItem('token', resp.data.content.token)

        this.$router.push('/home')
      } catch (err) {
        console.log('%cErro no Cadastro:\n', 'color: red')
        console.log(err.response)
      } finally {
        this.loading = false
      }

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