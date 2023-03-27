<template>
  <StylizedCard brown ref="form" class="mx-auto pa-5 pt-8 vertical-center" :width="this.$vuetify.breakpoint.smAndDown ? '90%' : '350px'">
    <StylizedCard black class="title-card px-5 py-1">
       Nova conta
    </StylizedCard>

    <form>
      <TextField
        v-model="name"
        ref="name"
        label="Nome"
        dense
        required
        :error-messages="nameErrors"
        :hide-details="false"
        @blur="$v.name.$touch()"
      />

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
        label="Senha"
        hint="Deve conter no mínimo 8 characteres"
        dense
        required
        type="password"
        :error-messages="passwordErrors"
        :hide-details="false"
        @blur="$v.password.$touch()"
      />

      <TextField
        v-model="confirmPassword"
        ref="confirmPassword"
        label="Confirme a senha"
        hint="Deve conter no mínimo 8 characteres"
        dense
        required
        type="password"
        :error-messages="confirmPasswordErrors"
        :hide-details="false"
        @blur="$v.confirmPassword.$touch()"
      />
    </form>

    <div class="d-flex">
      <v-btn text @click="cancelar">
        Cancelar
      </v-btn>
      <v-spacer></v-spacer>
      <StylizedButton color="green" @click="submit" :loading="loading"> Cadastrar-se </StylizedButton>
    </div>

    <ConfirmDialog ref="confirm" />
  </StylizedCard>
</template>

<script>
import { encode } from 'js-base64'
import { required, minLength, email } from 'vuelidate/lib/validators'

import Auth from '@/Api/Geral/Auth'

import StylizedButton from '@/components/StylizedButton.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

export default {  
  name: 'LoginAuth',
  components: {
    StylizedButton,
    ConfirmDialog
  },

  data: () => ({
    errMessage: false,
    loading: false,
    name: null,
    email: null,
    mostrarSenhaConfirm: false,
    password: '',
    confirmPassword: ''
  }),

  validations: {
    name: {
      required,
      minLength: minLength(3)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      minLength: minLength(6)
    },
  },

  computed: {
    form () {
      return {
        nome: this.name,
        email: this.email,
        senha: this.password,
        confirmarSenha: this.confirmPassword
      }
    },

    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.minLength && errors.push('Deve ter no mínimo 3 characteres')
      !this.$v.name.required && errors.push('Campo obrigatório.')
      return errors
    },

    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      this.errMessage.length && errors.push(this.errMessage[0])
      !this.$v.email.email && errors.push('Deve ser um e-mail válido.')
      !this.$v.email.required && errors.push('Campo obrigatório.')
      return errors
    },

    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Deve ter no mínimo 6 characteres')
      !this.$v.password.required && errors.push('Campo obrigatório.')
      return errors
    },

    confirmPasswordErrors () {
      const errors = []
      if (this.$v.confirmPassword.$dirty) {
        !this.$v.confirmPassword.minLength && errors.push('Deve ter no mínimo 6 characteres')
        !this.$v.confirmPassword.required && errors.push('Campo obrigatório.')
      }
      this.password !== this.confirmPassword && errors.push('As senhas não correspondem')
      return errors
    },
  },


  methods: {
    resetForm () {
      this.$v.$reset()
      Object.keys(this.form).forEach(f => {
        this[f] = null
      })
    },
  
    async submit () {
      this.$v.$touch()
      if (this.$v.$anyError) return

      this.loading = true
      try {
        const params = {
          nome: this.name,
          email: this.email.toLowerCase(),
          senha: encode(this.password)
        }

        const resp = await Auth.cadastro(params)
        if (resp.data.statusCode !== 200) {
          this.errMessage = Object.values(resp.data.content)
          return
        }
        this.$snackbar.showMessage({ content: 'Cadastro realizado com sucesso', color: 'green' })
        setTimeout(() => {
          this.$router.push('/auth')
        }, 1000)
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao cadastrar usuário', color: 'error' })
      } finally {
        this.loading = false
      }
    },

    async cancelar () {
      if (this.$v.$anyDirty){
        if (!await this.$refs.confirm.open(
          'Cancelar cadastro',
          'Tem certeza que deseja cancelar o cadastro?'
        )) return
      }
      
      this.$router.push('/auth')
    }
  },
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

.new-login-wrapper
  top: 25%
</style>
