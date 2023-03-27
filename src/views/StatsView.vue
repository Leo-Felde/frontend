<template>
    <v-card
    class="text-center"
    color="#BDAA97"
    dark
    max-width="600"
  >
    <v-card-text>
      <div class="text-h4">
        Atividade semanal
      </div>
    </v-card-text>
    <v-card-text>
      <v-sheet color="rgba(0, 0, 0, .12)">
        <v-sparkline
          :value="value"
          :labels="label"
          color="rgba(255, 255, 255, .7)"
          height="100"
          padding="24"
          stroke-linecap="round"
          smooth
        />

        <v-skeleton-loader v-if="loading" type="chip" class="mb-2 loading-stats" />
        <v-progress-linear v-if="loading" indeterminate />

        <span v-if="semAtividade && !loading" class="no-activity-text caption">
          Nenhuma atividade nos últimos 7 dias
        </span>
      </v-sheet>
    </v-card-text>

  </v-card>
</template>

<script>
import Usuario from '@/Api/Geral/Usuario'
export default {
  data: () => ({
    value: [],
    loading: true,
    label: [
      'Dom', 'Seg', 'Terc', 'Qua', 'Qui', 'Sex', 'Sab'
    ],
    dias: [
      'Dom','Seg', 'Tec', 'Qua', 'Qui', 'Sex', 'Sab'
    ]
  }),

  computed: {
    semAtividade () {
      if (!this.value.length > 0) return true
      return this.value.every(element => element === 0)
    },
  },
  
  async mounted () {
    await this.buscarAtividadeSemanal()
  },

  methods: {
    async buscarAtividadeSemanal(){
      this.loading = true

      const idUsuario = this.$store.state.usuario.dados.id
      const resp = await Usuario.buscarAtividadeSemanal(idUsuario)
      let atividade = resp.data.content.map(obj => obj.count)
      this.value = atividade

      const today = new Date().getDay()
      this.label = this.dias.slice(today + 1).concat(this.dias.slice(0, today + 1))
      this.loading = false
    }

    
  },

}
</script>

<style lang="sass" scoped>
.no-activity-text
  position: absolute
  left: 20px
  top: 100px

.loading-stats
  :deep(.v-skeleton-loader__chip)
    width: 700px
    height: 170px
    border-radius: 0px
    background: #0e0e0e22

</style>