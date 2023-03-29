<template>
    <div>
      <v-dialog v-model="show" fullscreen eager>
      <StylizedCard content-class="habit-wrapper" brown>
          <StylizedCard black class="d-flex mb-1 card-title" height="50px">
            <span class="ml-5 my-auto"> Criar novo hábito </span>
            <v-btn icon class="ml-auto my-auto mr-2" @click="cancelarAdicionarHabito">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </StylizedCard>
          <v-divider />

          <v-row no-gutters class="mx-8 mt-4">
            <v-col>
              <TextField
                v-model="form.title"
                ref="title"
                label="título"
                required
                :error-messages="titleErrors"
                :hide-details="false"
                @blur="$v.title.$touch()"
              />
            </v-col>
          </v-row>
          <v-divider class="mt-3 mb-2"/>
          <span class="subtitle"> Cor </span> 

          <StylizedCard brown-light no-borders content-class="mx-2" id="color-container">
              <v-btn class="mx-1 darken-2" v-for="color in allColors" :key="color" fab large :color="color" elevation="0" @click="pickColor(color)"/>
          </StylizedCard>
          <v-divider class="my-3"/>
          <span class="align-start mb-2"> Ícone </span>
          <v-row no-gutters class="mx-8">
            <v-col>
              <v-btn id="pick-icon" fab class="mx-1 darken-2" elevation="0" :color="form.color || 'grey'" @click="iconPicker = true">
                <v-progress-circular class="habit-progress" size="80" />
                <v-icon color="white" large v-if="form.icon">{{ form.icon }}</v-icon> 
                <span v-else class="habit-select-caption caption white--text"> escolher </span>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider class="my-3"/>
          <span class="align-start"> Frequência </span>
          <v-row no-gutters class="mx-8 mt-2">
            <v-col class="d-flex-column">
              <v-btn-toggle v-model="form.days" group multiple mandatory tile class="d-flex-column" dense>
                <StylizedButton v-for="(dia, index) in dias" :key="dia.id" class="mb-5 dia-card" block special>
                  <v-icon color="green" v-show="form.days.includes(index)"> mdi-check-bold </v-icon> 
                  {{ dia.text }}
                </StylizedButton>
              </v-btn-toggle>
            </v-col>
          </v-row>
          
          <v-divider class="my-3"/>
          <span class="align-start"> Período </span>
          <v-row no-gutters class="mx-3">
            <v-btn-toggle
              v-model="form.period"
              mandatory
              group
            >
              <v-btn v-for="item in perido" outlined :key="item.id" class="my-2 white--text d-flex-column">
                <PixelIcon :icon="item.icon" />
                {{ item.text }}
              </v-btn>
            </v-btn-toggle>
          </v-row>

            <div class="d-flex justify-space-around mt-2">
              <StylizedButton v-if="habito?.id" color="red" @click="excluirHabito" :loading="loading" :disabled="loading"> Excluir </StylizedButton>
              <StylizedButton color="blue" @click="adicionarHabito" :loading="loading" :disabled="loading"> {{ habito?.id ? 'Editar habito': 'Adicionar habito' }} </StylizedButton>
            </div>
            <v-btn text @click="cancelarAdicionarHabito" class="my-2"> cancelar </v-btn>
        </StylizedCard>
      </v-dialog>

      <v-dialog v-if="show" v-model="iconPicker" content-class="dialogo-icones" height="600px">
        <StylizedCard class="pa-4 card-icones pt-10" brown>
          <StylizedCard black class="cardtitle px-3 pt-1">
            <span> Ícones </span>
            <v-btn icon class="ml-auto" @click="iconPicker = false">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </StylizedCard>
          <v-expansion-panels class="elevation-0 px-2 py-3">
            <StylizedCard brown-light width="100%">
            <v-expansion-panel
              v-for="(item, i) in allIcons"
              :key="`icon-group-${i}`"
            >
              <v-expansion-panel-header>
                {{ item.category }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-btn fab class="ma-1 darken-2" elevation="0" v-for="(icon, n) in item.icons" :key="`${item.id}-${n}`" :color="form.color" @click="pickIcon(icon)"> 
                  <v-icon :color="form.color ? 'white' : 'black'"> {{ icon }} </v-icon> 
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </StylizedCard>
          </v-expansion-panels>
        </StylizedCard>
      </v-dialog>

      <ConfirmDialog ref="confirm" />
    </div>
</template>

<script>
import Habitos from '@/Api/Geral/Habitos' 

import { cloneDeep } from 'lodash-es'
import { required, minLength } from 'vuelidate/lib/validators'

import ConfirmDialog from '@/components/ConfirmDialog.vue'
import StylizedButton from '@/components/StylizedButton'

export default {
  name: 'HabitsDialog',
  components: {
    ConfirmDialog,
    StylizedButton
  },

  data: () => ({
    show: false,
    iconPicker: false,
    loading: false,
    formOriginal: { color: 'red', days: [ 0, 1, 2, 3, 4, 5, 6 ]},
    form: { color: 'red', days: [ 0, 1, 2, 3, 4, 5, 6 ] },
    allColors: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey', 'grey'],
    allIcons: [
      { id: 1, category: 'Habbies/Atividades', icons: ['mdi-weight-lifter', 'mdi-run', 'mdi-hiking', 'mdi-skateboarding', 'mdi-karate', 'mdi-meditation', 'mdi-diving', 'mdi-dance-ballroom', 'mdi-human-scooter', 'mdi-kabaddi']},
      { id: 2, category: 'Entreterimento', icons: ['mdi-television-speaker', 'mdi-television-play', 'mdi-television-speaker-off', 'mdi-video-box', 'mdi-video', 'mdi-video-off', 'mdi-video-vintage', 
        'mdi-movie-open', 'mdi-movie-open-star', 'mdi-movie-open-off', 'mdi-music', 'mdi-music-clef-treble', 'mdi-speaker-wireless'
      ]},
      { id: 3, category: 'Jogos', icons: ['mdi-space-invaders', 'mdi-controller', 'mdi-controller-off', 'mdi-nintendo-game-boy', 
        'mdi-puzzle', 'mdi-dice-5', 'mdi-chess-queen', 'mdi-cards-playing', 'mdi-cards-diamond', 'mdi-cards-spade', 'mdi-cards-heart', 'mdi-cards-club', 'mdi-pokeball', 'mdi-steam'] },
      { id: 4, category: 'Animais', icons: ['mdi-dog-service', 'mdi-dog-side', 'mdi-bone', 'mdi-dog', 'mdi-bird', 'mdi-cat', 'mdi-rabbit-variant', 'mdi-fish','mdi-fishbowl', 'mdi-horse', 'mdi-rodent', 'mdi-owl', 'mdi-spider-thread', 'mdi-unicorn-variant'] },
      { id: 5, category: 'Pessoas', icons: [ 'mdi-account-tie', 'mdi-account-tie-woman', 'mdi-human-greeting', 'mdi-human-male-board-poll', 'mdi-wheelchair', 'mdi-baby', 'mdi-baby-bottle-outline', 'mdi-human-baby-changing-table', 'mdi-baby-carriage', 'mdi-cradle', 'mdi-human-cane',
        'mdi-face-man', 'mdi-face-man-shimmer', 'mdi-face-woman', 'mdi-face-woman-shimmer'] },    
      { id: 6, category: 'Saúde', icons: ['mdi-clipboard-pulse', 'mdi-heart-pulse', 'mdi-pulse', 'mdi-stethoscope', 'mdi-hand-wash', 'mdi-lotion', 'mdi-brain', 'mdi-tooth', 'mdi-lungs', 'mdi-medication', 'mdi-needle', 'mdi-pill', 'mdi-emoticon-sick'] },
      { id: 7, category: 'Comida', icons: ['mdi-baguette', 'mdi-cup', 'mdi-cup-off', 'mdi-cup-water', 'mdi-blender', 'mdi-bottle-soda', 'mdi-bottle-wine', 'mdi-bowl-mix', 'mdi-bread-slice', 'mdi-cake-variant', 'mdi-cake-layered', 'mdi-candy', 'mdi-carrot', 'mdi-cheese', 'mdi-coffee', 'mdi-coffee-maker', 'mdi-coffee-off', 'mdi-food', 'mdi-food-apple'] },
    ],
    dias: [
      {id: 'domingo', text: 'Domingo', value: true},
      {id: 'segunda', text: 'Segunda-feira', value: true},
      {id: 'terca', text: 'Terça-feira', value: true},
      {id: 'quarta',text: 'Quarta-feira', value: true},
      {id: 'quinta',text: 'Quinta-feira', value: true},
      {id: 'sexta',text: 'Sexta-feira', value: true},
      {id: 'sabado',text: 'Sábado', value: true}
    ],
    perido: [
      {id: 'manha', text: 'manhã', icon: 'sun-raise', value: 'manha'},
      {id: 'dia', text: 'Dia', icon: 'sun', value: 'dia'},
      {id: 'noite', text: 'Noite', icon: 'moon', value: 'noite'},
      {id: 'qqr',text: 'qualquer', icon: 'sun-moon', value: 'qqr'},
    ]
  }),

  validations: {
    title: {
      required,
      minLength: minLength(5)
    }
  },

  computed: {
    title () {
      return this.form.title
    },

    titleErrors () {
      const errors = []
      if (!this.$v.title.$dirty) return errors
      !this.$v.title.minLength && errors.push('Deve ter no mínimo 6 characteres')
      !this.$v.title.required && errors.push('Campo obrigatório.')
      return errors
    },
  },

  props: {
    value: Boolean,
    id: { type: Number, default: undefined },
    habito: { type: Object, default: undefined },
  },

  watch: {
    value (value) {
      this.show = value
    },

    show () {
      this.$emit('input', this.show)
      if (!this.habito) {
        this.form = cloneDeep(this.formOriginal)
      } else {
        const options = cloneDeep(this.habito)
        options.days = JSON.parse(options.days)
        this.form = options
      }
    }
  },

  async mounted () {
    this.$v.$reset()
    this.form = cloneDeep(this.formOriginal)
  },

  methods: {
    cancelarAdicionarHabito () {
      this.$v.$reset()
      this.form = cloneDeep(this.formOriginal)
      this.show = false
      this.$emit('fechar')
    },

    async adicionarHabito () {
      this.$v.$touch()
      if (this.$v.$anyError) return

      this.loading = true
      try {
        const params = cloneDeep(this.form)
        params.days = JSON.stringify(params.days)
        params.id_usuario = this.$store.state.usuario.dados.id
        await Habitos.salvar(params)
        this.$emit('newHabit')
        this.cancelarAdicionarHabito()
        this.$snackbar.showMessage({ content: `Hábito ${ this.form.id ? 'editado' : 'cadastrado'} com sucesso`, color: 'green' })
      } catch (err) {
        this.$snackbar.showMessage({ content: `Falha ao ${ this.form.id ? 'editar' : 'cadastrar'} Hábito`, color: 'error' })
      } finally {
        this.loading = false
      }
    },

    async excluirHabito () {
      if (!await this.$refs.confirm.open(
        'Excluir Hábito',
        'Tem certeza que deseja excluir este hábito?'
      )) return

      this.loading = true
      try {
        await Habitos.excluir(this.form.id)

        this.$emit('newHabit')
        this.cancelarAdicionarHabito()
        this.$snackbar.showMessage({ content: 'Hábito excluído com sucesso', color: 'green' })
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao excluir Hábito', color: 'error' })
      } finally {
        this.loading = false
      }
    },

    pickColor (color) {
      this.$set(this.form, 'color', color)
    },

    pickIcon (icon) {
      this.$set(this.form, 'icon', icon)
      this.iconPicker = false
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep
  .v-dialog
    overflow-x: hidden !important

.card-title
  position: fixed
  width: 100%
  top: 0px
  z-index: 3

#color-container
  display: flex
  max-width: inherit
  overflow: hidden
  overflow-x: scroll
  scrollbar-width: none
  &::-webkit-scrollbar
    display: none

#pick-icon
  height: 80px
  width: 80px
.habit
  &-select-caption
    position: absolute
    text-transform: capitalize !important
  &-progress
    position: absolute

.dia-card
  user-select: none
  .v-icon
    position: absolute
    left: 10px

.habit-wrapper
  margin-top: 50px !important

::v-deep
  .v-dialog.dialogo-icones
    max-height: 600px !important
    height: 90% !important
    overflow: hidden !important
    .card-icones
      height: 100%
      overflow: hidden !important
    .cardtitle
      z-index: 2
      position: absolute
      top: 0px
      left: 0px
      width: 100%
      display: flex
      justify-content: space-between
    .v-item-group.v-expansion-panels
      height: 100%
      overflow: auto
</style>