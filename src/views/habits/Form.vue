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

          <span class="align-start"> Título </span>
          <v-row no-gutters class="mx-8 mt-1">
            <v-col>
              <TextField v-model="form.titulo"/>
            </v-col>
          </v-row>

          <span class="subtitle"> Cor </span> 

          <StylizedCard brown-light no-borders content-class="mx-2" id="color-container">
              <v-btn class="mx-1 darken-2" v-for="color in allColors" :key="color" fab large :color="color" elevation="0" @click="pickColor(color)"/>
          </StylizedCard>

          <span class="align-start"> Ícone </span>
          <v-row no-gutters class="mx-8">
            <v-col>
              <v-btn id="pick-icon" fab class="mx-1 darken-2" elevation="0" :color="form.color || 'grey'" @click="iconPicker = true">
                <v-progress-circular class="habit-progress" size="80" />
                <v-icon color="white" large v-if="form.icon">{{ form.icon }}</v-icon> 
                <span v-else class="habit-select-caption caption white--text"> escolher </span>
              </v-btn>
            </v-col>
          </v-row>

          <span class="align-start"> Frequência </span>
          <v-row no-gutters class="mx-8">
            <v-col class="d-flex-column">
              <v-card v-for="dia in dias" :key="dia.id" class="pixel-card-alternate my-2 dia-card" @click="dia.value = !dia.value">
                <v-icon color="green" v-if="dia.value"> mdi-check-bold </v-icon> 
                {{ dia.text }}
              </v-card>
            </v-col>
          </v-row>
          
          <v-divider class="my-3"/>
          <span class="align-start"> Período </span>
          <v-row no-gutters class="mx-8">
            <v-btn-toggle
              v-model="form.period"
              mandatory
            >
              <v-btn v-for="item in perido" outlined :key="item.id" class="my-2">
                <v-icon> {{ item.icon }}</v-icon> 
                {{ item.text }}
              </v-btn>
            </v-btn-toggle>
          </v-row>


          <v-btn block @click="adicionarHabito" text> adicionar hábito </v-btn>
          <v-btn text @click="cancelarAdicionarHabito" class="mt-2"> cancelar </v-btn>
        </StylizedCard>
      </v-dialog>

      <v-dialog v-if="show" v-model="iconPicker">
        <StylizedCard class="pa-4" brown>
          <v-card-title class="justify-between">
            <span> Ícone </span>
            <v-btn icon class="ml-auto" @click="iconPicker = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-expansion-panels>
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
          </v-expansion-panels>
        </StylizedCard>
      </v-dialog>
    </div>
</template>

<script>

export default {
  name: 'HabitsDialog',
  
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
      {id: 'manha', text: 'manhã', icon: 'mdi-weather-sunset', value: 'manha'},
      {id: 'dia', text: 'Dia', icon: 'mdi-weather-sunny', value: 'dia'},
      {id: 'noite', text: 'Noite', icon: 'mdi-weather-night', value: 'noite'},
      {id: 'qqr',text: 'qualquer', icon: 'mdi-theme-light-dark', value: 'qqr'},
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
</style>