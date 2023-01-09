<template>
  <StylizedCard class="pa-2 mx-3 mt-6" brown>
    <StylizedCard black class="px-3 py-2 cardtitle"> Hábitos </StylizedCard>
    <div class="py-2 mt-6" id="habits-container">
      <v-btn fab class="mx-2" elevation="0" @click="showNewHabitDialog = true"> 
        <v-icon color="light-green darken-2">mdi-plus</v-icon> 
      </v-btn>
      
      <div v-for="item in habits" :key="item.id" class="habit-container">
        <v-btn fab class="mx-2 darken-2" elevation="0" :color="item.color" long-press="500" @touchstart="touchStart(item)" @touchend="touchEnd(item)">
          <v-progress-circular :value="item.value" :color="`${item.color} lighten-2`" class="habit-progress" size="60" />
          <v-icon color="white">{{ item.icon }}</v-icon> 
        </v-btn>
        <span class="habit-title caption">{{ item.title }}</span>
      </div>
    </div>
    <v-divider class="mt-6 mb-10"/>

    <StylizedCard black class="px-3 py-2 cardsubtitle"> Missões ativas </StylizedCard>
      <QuestList :items="tasks" />

      <HabitForm v-model="showNewHabitDialog" @newHabit="adicionarHabito" />
    </StylizedCard>
</template>

<script>
// @ is an alias to /src
import QuestList from '@/components/QuestList.vue'
import HabitForm from './habits/Form.vue'

export default {
  name: 'HomeView',
  data: () => ({
    press: false,
    pressTime: 0,
    showNewHabitDialog: false,
    tasks: [{ id: 1, icon: 'mdi-sword', title: 'debug', xp: 20, money: 10, color: 'blue', expiration: '2023/01/17' }, { id: 2, icon: 'mdi-sword', title: 'debug', xp: 20, money: 10, color: 'yellow'  }, { id: 3, icon: 'mdi-sword', title: 'debug', xp: 20, money: 10, color: 'red'  }],
    habits: [{ id: 1, title: 'debug', icon: 'mdi-bug', color: 'green', value: 0 }]
  }),

  components: {
    QuestList,
    HabitForm
  },

  methods: {
    adicionarHabito (habit) {
      this.habits.push({...habit, value: 0 })
    },

    touchStart () {
      console.log('touchStart')
      this.touch = true
      
    },

    touchEnd () {
      console.log('touchEnd')
      this.touch = false
    },

    toggleItem (item, toggle) {
      // setTimeout(() => {
      //   window.navigator.vibrate(300)
      // }, toggle ? 0 : 1000)

      this.habits[this.habits.findIndex(h => h.id === item.id)].value = toggle ? 100 : 0
    },
  }
}
</script>

<style lang="sass" scoped>
#habits-container
  display: flex
  max-width: inherit
  overflow: hidden
  overflow-x: scroll
  scrollbar-width: none
  &::-webkit-scrollbar
    display: none

.habit
  &-container
    display: flex
    flex-direction: column
  &-progress
    position: absolute

.v-dialog__content
  .v-card
    max-width: inherit !important

.cardtitle
  position: absolute
  top: -18px
  left: 0
  right: 0
  margin-left: auto
  margin-right: auto
  width: fit-content

.cardsubtitle
  position: absolute
  top: 128px
  left: 0
  right: 0
  margin-left: auto
  margin-right: auto
  width: fit-content
</style>
