<template>
  <v-card class="pa-4 ma-3 pixel-card">
    <v-img src="@/assets/border.svg" v-for="n in 4" :key="n" :id="`border-deco-${n}`" />
    <v-card-title class="justify-center"> Habits </v-card-title>
    <div class="py-2" id="habits-container">
      <v-btn fab class="mx-2" elevation="0" @click="newHabit"> 
        <v-icon color="light-green darken-2">mdi-plus</v-icon> 
      </v-btn>
      <div v-for="item in habits" :key="item.id" class="habit-container">
        <v-btn fab class="mx-2" elevation="0" :color="item.color" v-long-press="300" @click="toggleItem(item, true)" @touchstart="toggleItem(item, false)">
          <v-progress-circular :value="item.value" :color="`${item.color} lighten-2`" class="habit-progress" size="60" />
          <v-icon color="white">{{ item.icon }}</v-icon> 
        </v-btn>
        <span class="habit-title caption">{{ item.title }}</span>
      </div>
    </div>
    <v-divider class="my-2"/>

      <v-card-title class="justify-center pb-0"> Quests </v-card-title>
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          class="quest-item my-2 py-0"
        >
          <v-list-item-avatar>
            <v-icon
              class="grey lighten-1"
              dark
            >
              mdi-sword
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="d-flex justify-start"> Label </v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <span class="green--text">+2xp</span>
            <span class="orange--text"> 3<v-icon color="orange"> mdi-circle-multiple </v-icon></span>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-dialog v-model="showNewHabitDialog" fullscreen>
        <v-card>
          <v-card-title class="justify-between">
            <span> Criar novo hábito </span>
            <v-btn icon class="ml-auto" @click="cancelHabit">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />

          <span class="align-start"> Título </span>
          <v-row no-gutters class="mx-8">
            <v-col>
              <v-text-field v-model="form.title" outlined dense />
            </v-col>
          </v-row>

          <span class="subtitle"> Cor </span> 
          <v-row no-gutters class="mx-1">
            <div id="color-container" class="my-2">
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
          
          <v-divider class="my-3"/>
          <v-btn block @click="adicionarHabito"> adicionar hábito </v-btn>
          <v-btn text @click="cancelarAdicionarHabito" class="mt-2"> cancelar </v-btn>
        </v-card>
      </v-dialog>

      <v-dialog v-if="showNewHabitDialog" v-model="iconPicker" fullscreen>
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
    </v-card>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data: () => ({
    iconPicker: false,
    showNewHabitDialog: false,
    form: {},
    habits: [{ id: 1, title: 'debug', icon: 'mdi-bug', color: 'green', value: 0 }],
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
    ]
  }),

  components: {

  },

  methods: {
    adicionarHabito () {
      this.habits.push({...this.form, value: 0 })
      this.showNewHabitDialog = false
    },

    cancelarAdicionarHabito () {
      this.form = {}
      this.showNewHabitDialog = false
    },
  
    newHabit() {
      this.showNewHabitDialog = true
    },

    cancelHabit () {
      this.form = {}
      this.showNewHabitDialog = false
    },

    toggleItem (item, toggle) {
      // setTimeout(() => {
      //   window.navigator.vibrate(300)
      // }, toggle ? 0 : 1000)

      this.habits[this.habits.findIndex(h => h.id === item.id)].value = toggle ? 100 : 0
    },

    pickIcon (icon) {
      this.$set(this.form, 'icon', icon)
      this.iconPicker = false
    },

    pickColor (color) {
      this.$set(this.form, 'color', color)
    } 
  }
}
</script>

<style lang="sass" scoped>
#habits-container, #color-container
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

#border-deco
  position: absolute
  height: 24px
  width: 24px
  &-1
    @extend #border-deco
    left: -8px
    top: -8px
  &-2
    @extend #border-deco
    right: -8px
    top: -8px
    -webkit-transform: scaleX(-1)
    transform: scaleX(-1)
  &-3
    @extend #border-deco
    left: -8px
    bottom: -8px
  &-4
    @extend #border-deco
    right: -8px
    bottom: -8px
    -webkit-transform: scaleX(-1)
    transform: scaleX(-1)

.v-list-item
  border: 1px solid #e1e1e1
  height: 65px

.habit
  &-container
    display: flex
    flex-direction: column
  &-progress
    position: absolute
  &-select-caption
    position: absolute
    text-transform: capitalize !important

.v-dialog__content
  .v-card
    max-width: inherit !important
</style>
