<template>
  <StylizedCard brown content-class="vertical-center mx-auto pa-5" :width="this.$vuetify.breakpoint.smAndDown ? '90%' : '350px'">
    <StylizedCard black class="title-card px-5 py-1">
       Bem vindo
    </StylizedCard>
    
    <form>
      <TextField
        v-model="email"
        ref="email"
        label="E-mail"
        dense
        required
        :error-messages="emailErrors"
        :hide-details="false"
        @blur="$v.email.$touch()"
      />

      <TextField
        v-model="password"
        ref="password"
        :type="showPassword ? 'text' : 'password'"
        dense
        required
        label="senha"
        :hide-details="false"
        :error-messages="passwordErrors"
        @blur="$v.password.$touch()"
      >
        <template v-slot:append>
          <v-btn icon @click="showPassword = !showPassword"> <v-icon> {{showPassword ? 'mdi-eye-off' : 'mdi-eye'}} </v-icon></v-btn>
        </template>
      </TextField>
    </form>
    <div>
      <StylizedButton color="blue" block @click="authenticate" :loading="loading" class="mb-2"> Entrar </StylizedButton>

      <span class="pointer"> esqueceu a senha? </span>
      <v-divider class="mt-3 mb-4"/>
      <StylizedButton color="green" @click="$router.push('/auth/new')"> Criar nova  Conta </StylizedButton>
  </div>
  </StylizedCard>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
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
    email : null,
    password: null,
    loading: false,
    showPassword: false,
    errMessage: undefined
  }),

  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },

  computed: {
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('E-mail inválido.')
      !this.$v.email.required && errors.push('Campo obrigatório.')
      return errors
    },

    passwordErrors () {
      const errors = []
      if (this.errMessage) return this.errMessage
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Campo obrigatório.')
      return errors
    }
  },

  methods: {
    // resetForm () {
    //   this.$v.$reset()
    //   Object.keys(this.form).forEach(f => {
    //     this[f] = null
    //   })
    // },

    async authenticate () {
      this.errMessage = null
      this.$v.$touch()
      if (this.$v.$anyError) return
      
      this.loading = true
      try {
        const params = {
          email: this.email,
          senha: encode(this.password)
        }
        const resp = await Auth.login(params)

        if (resp.data.statusCode === 404) { // usuario ou senha errada
          this.errMessage = resp.data.content.error
        } else if (resp.data.statusCode === 200) {

          const usuario = resp.data.content.usuario
          const token = resp.data.content.token

          Cookies.set('usuario', JSON.stringify(usuario), { expires: 7 })
          Cookies.set('token', token, { expires: 7 })

          sessionStorage.setItem('usuario', JSON.stringify(usuario))
          sessionStorage.setItem('token', token)

          this.$store.commit('usuario/setUsuario', usuario)
          this.$router.push('/home')
        }
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao realizar login', color: 'red' })
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