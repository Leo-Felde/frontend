<template>
    <div>
      <v-dialog v-model="show" fullscreen>
      <StylizedCard content-class="habit-wrapper" brown>
          <StylizedCard black class="d-flex mb-1 card-title" height="50px">
            <span class="ml-5 my-auto"> Criar novo hábito </span>
            <v-btn icon class="ml-auto my-auto mr-2" @click="cancelarAdicionarHabito">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </StylizedCard>
          <v-divider />

          <v-row no-gutters class="mx-8 mt-1">
            <v-col>
              <TextField v-model="form.titulo" label="título"/>
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
              <v-btn-toggle v-model="diasSelecionados" group multiple mandatory tile class="d-flex-column" dense>
                <StylizedButton v-for="(dia, index) in dias" :key="dia.id" class="mb-5 dia-card" block special>
                  <v-icon color="green" v-if="diasSelecionados.includes(index)"> mdi-check-bold </v-icon> 
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


            <StylizedButton color="blue" @click="adicionarHabito" class="mt-2"> Adicionar habito </StylizedButton>
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
              :key="i"
            >
              <v-expansion-panel-header>
                {{ item.category }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-btn fab class="ma-1 darken-2" elevation="0" v-for="icon in item.icons" :key="icon" :color="form.color" @click="pickIcon(icon)"> 
                  <v-icon :color="form.color ? 'white' : 'black'"> {{ icon }} </v-icon> 
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </StylizedCard>
          </v-expansion-panels>
        </StylizedCard>
      </v-dialog>
    </div>
</template>

<script>
import StylizedButton from '@/components/StylizedButton'

export default {
  name: 'HabitsDialog',
  components: {
    StylizedButton
  },

  data: () => ({
    show: false,
    iconPicker: false,
    form: {},
    allColors: ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'blue-grey', 'grey'],
    allIcons: [
      { category: 'Habbies/Atividades', icons: ['mdi-weight-lifter', 'mdi-run', 'mdi-hiking', 'mdi-skateboarding', 'mdi-karate', 'mdi-meditation', 'mdi-diving', 'mdi-dance-ballroom']},
      { category: 'Entreterimento', icons: ['mdi-television-speaker', 'mdi-television-play', 'mdi-television-speaker-off', 'mdi-video-box', 'mdi-video', 'mdi-video-off', 'mdi-video-vintage', 
        'mdi-movie-open', 'mdi-movie-open-star', 'mdi-movie-open-off', 'mdi-music', 'mdi-music-clef-treble', 'mdi-speaker-wireless'
      ]},
      { category: 'Jogos', icons: ['mdi-space-invaders', 'mdi-controller', 'mdi-controller-off', 'mdi-nintendo-game-boy', 
        'mdi-puzzle', 'mdi-dice-5', 'mdi-chess-queen', 'mdi-cards-playing', 'mdi-cards-diamond', 'mdi-cards-spade', 'mdi-cards-heart', 'mdi-cards-club', 'mdi-pokeball', 'mdi-steam'] },
      { category: 'Animais', icons: ['mdi-dog-service', 'mdi-dog-side', 'mdi-bone', 'mdi-dog', 'mdi-bird', 'mdi-cat', 'mdi-rabbit-variant', 'mdi-fish','mdi-fishbowl', 'mdi-horse', 'mdi-rodent', 'mdi-owl', 'mdi-spider-thread', 'mdi-unicorn-variant'] },
      { category: 'Pessoas', icons: [ 'mdi-account-tie', 'mdi-account-tie-woman', 'mdi-human-greeting', 'mdi-human-male-board-poll', 'mdi-wheelchair', 'mdi-baby', 'mdi-baby-bottle-outline', 'mdi-human-baby-changing-table', 'mdi-baby-carriage', 'mdi-cradle', 'mdi-human-cane',
        'mdi-face-man', 'mdi-face-man-shimmer', 'mdi-face-woman', 'mdi-face-woman-shimmer'] },    
      { category: 'Médico', icons: ['mdi-clipboard-pulse', 'mdi-heart-pulse', 'mdi-pulse', 'mdi-stethoscope', 'mdi-hand-wash', 'mdi-lotion', 'mdi-brain', 'mdi-tooth', 'mdi-lungs', 'mdi-medication', 'mdi-needle', 'mdi-pill', 'mdi-emoticon-sick'] },
    ],
    diasSelecionados: [0, 1, 2, 3, 4, 5, 6],
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

  props: {
    value: Boolean
  },

  watch: {
    value (value) {
      this.show = value
    },
  },

  methods: {
    cancelarAdicionarHabito () {
      this.form = {}
      this.show = false
      this.$emit('input', false)
    },

    adicionarHabito () {
      this.$emit('newHabit', this.form)
      this.show = false
      this.$emit('input', false)
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
  z-index: 1

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

.v-expansion-panel
  background: transparent !important
  &::before
    box-shadow: none !important
  &--active
    margin-top: 0px !important
    .v-expansion-panel-header--active
      padding-top: 0px
::v-deep
  .v-dialog.dialogo-icones
    max-height: 600px !important
    height: 90% !important
    overflow: hidden !important
    .card-icones
      height: 100%
      overflow: hidden !important
    .cardtitle
      z-index: 1
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