<template>
  <v-card class="ma-auto px-10 py-4" width="22%">

    <v-row cols="12" no-gutters>
        <v-col cols="12" lg="12">
            <v-text-field label="email" outlined dense />
        </v-col>
        <v-col cols="12" lg="12">
            <v-text-field label="senha" outlined dense />
        </v-col>
    </v-row>
    <v-btn color="primary" block class="mb-1" @click="authenticate" :loading="loading"> Entrar </v-btn>
    <v-btn text small> esqueceu a senha? </v-btn>
    <v-divider class="mt-2 mb-4"/>
    <v-btn color="green" class="white--text"> Criar conta </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'LoginAuth',

  data: () => ({ loading: false }),

  methods: {
    async authenticate () {
      this.loading = true

      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('loading de teste')

      this.loading = false
      this.$router.push('/home')
    }
  }
}
</script>

<style>

</style>
