<template>
    <v-card
    class="text-center"
    color="green"
    dark
    max-width="600"
  >
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          :labels="dias"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        />
      </v-sheet>
    </v-card-text>

    <v-card-text>
      <div class="text-h4 font-weight-thin">
        Atividade semanal
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Usuario from '@/Api/Geral/Usuario'
export default {
  data: () => ({
    value: [
      0,
      2,
      1,
      2,
      1,
      0,
      1,
    ],
    dias: [
      'Seg', 'Tec', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'
    ]
  }),
  
  async mounted () {
    await this.buscarAtividadeSemanal()
  },

  methods: {
    async buscarAtividadeSemanal(){
      const idUsuario = this.$store.state.usuario.dados.id
      const resp = await Usuario.buscarAtividadeSemanal(idUsuario)
      console.log(resp)
    }

    
  },

}
</script>

<style>

</style>