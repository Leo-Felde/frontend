<template>
    <div>
      <v-dialog v-model="show" fullscreen>
        <v-card class="pixel-card">
          <StylizedCard black class="d-flex mb-1" height="50px">
            <span class="ml-5 my-auto"> Criar novo hábito </span>
            <v-btn icon class="ml-auto my-auto mr-2" @click="cancelarAdicionarHabito">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </StylizedCard>
          <v-divider />

          <span class="align-start"> Título </span>
          <v-row no-gutters class="mx-8 mt-1">
            <v-col>
              <v-text-field v-model="form.title" solo class="stylized-tf"/>
            </v-col>
          </v-row>

          <span class="subtitle"> Cor </span> 
          <v-row no-gutters class="mx-1">
            <div id="color-container" class="my-2 pixel-card-light mx-3">
              <v-btn class="mx-1" v-for="color in allColors" :key="color" fab large :color="color" elevation="0" @click="pickColor(color)"/>
            </div>
          </v-row>

          <span class="align-start"> Ícone </span>
          <v-row no-gutters class="mx-8">
            <v-col>
              <v-btn id="pick-icon" fab class="mx-1" elevation="0" :color="form.color || 'grey'" @click="iconPicker = true">
                <v-progress-circular class="habit-progress" size="80" />
                <v-icon color="white" large v-if="form.icon">{{ form.icon }}</v-icon> 
                <span v-else class="habit-select-caption caption white--text"> escolher </span>
              </v-btn>
            </v-col>
          </v-row>

          <span class="align-start"> Frequência </span>
          <v-row no-gutters class="mx-8">
            <v-col class="d-flex-column">
              <v-card v-for="dia in dias" :key="dia" class="pixel-card-alternate my-2">
                {{ dia }}
              </v-card>
            </v-col>
          </v-row>
          
          <v-divider class="my-3"/>
          <v-btn block @click="adicionarHabito" text> adicionar hábito </v-btn>
          <v-btn text @click="cancelarAdicionarHabito" class="mt-2"> cancelar </v-btn>
        </v-card>
      </v-dialog>

      <v-dialog v-if="show" v-model="iconPicker" fullscreen>
        <v-card>
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
                <v-btn fab class="ma-1" elevation="0" v-for="icon in item.icons" :key="icon" :color="form.color" @click="pickIcon(icon)"> 
                  <v-icon :color="form.color ? 'white' : 'black'"> {{ icon }} </v-icon> 
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
import StylizedCard from '@/components/layout/StylizedCard.vue'

export default {
  name: 'HabitsDialog',
  
  components: {
    StylizedCard
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
    dias: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']
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
</style>