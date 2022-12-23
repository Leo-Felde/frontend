<template>
  <StylizedCard brown content-class="mx-5 mt-auto my-auto pa-6 login-wrapper" width="300px">

    <v-row cols="12" no-gutters>
        <v-col cols="12" lg="12">
            <TextField dense label="email" outlined />
        </v-col>
        <v-col cols="12" lg="12">
            <TextField dense label="senha" outlined @click="authenticate" :loading="loadin" />
        </v-col>
    </v-row>
    <BlackButton block />
    <!-- <v-btn color="primary" block class="mb-1" @click="authenticate" :loading="loading"> Entrar </v-btn> -->
    <v-btn text small> esqueceu a senha? </v-btn>
    <v-divider class="mt-2 mb-4"/>
    <v-btn color="green" class="white--text"> Criar conta </v-btn>
  </StylizedCard>
</template>

<script>
import BlackButton from '@/components/BlackButton.vue'

export default {  
  name: 'LoginAuth',
  components: {
    BlackButton
  },

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

<style scoped lang="sass">
.login-wrapper
  top: 25%

</style>
