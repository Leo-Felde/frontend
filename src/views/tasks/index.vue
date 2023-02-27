<template>
    <StylizedCard brown class="pa-2 pt-10 wrapper">
      <StylizedCard black class="px-3 py-2 cardtitle"> Missões </StylizedCard>
      <!-- <v-card-title class="justify-center"> Missões </v-card-title> -->
      <!-- <div class="d-flex">
        <TextField content-class="mx-2 mb-3" place-holder="pesquisar tarefas"/>
        <StylizedButton height="48px">
          <PixelIcon icon="magnifying-glass" />
        </StylizedButton>
      </div> -->
      <PixelTabs bigTabs :items="tabs" v-model="tab" content-class="d-flex justify-space-around" />
      <StylizedCard brown-light content-class="d-flex ma-5" height="60px" elevation="0">
        <span class="ma-auto subtitle-2 d-flex-column">
          {{  tabs[tab].name }}
          <span class="caption">
            descrição teste
          </span>
        </span>
      </StylizedCard>
      

      <v-divider class="my-4"/>
      <div class="quests__wrapper">
        <QuestList :items="currentTabQuests" />
      </div>

      <!-- <v-expansion-panels class="elevation-0 px-2 py-3">
            <StylizedCard brown-light width="100%">
            <v-expansion-panel
              v-for="(task, i) in tasks"
              :key="`${task}-${i}`"
            >
              <v-expansion-panel-header class="d-flex-column align-start pa-2">
                <div class="d-flex">
                  <v-img :src="require(`@/assets/img/${task.title}.png`)" contain width="30px" />
                  <span class="my-auto pl-1"> {{ task.title }} </span>
                </div>

                <span class="caption"> {{ task.description }} </span>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <QuestList :items="task.quests" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </StylizedCard>
        </v-expansion-panels> -->

      <!-- <StylizedCard brown-light class="pa-2 ma-2">
        <QuestList :items="tasks" />
      </StylizedCard> -->
      

    </StylizedCard>
  </template>
  
<script>
import QuestList from '@/components/QuestList.vue'
import PixelTabs from '@/components/pixelTab.vue'
import StylizedButton from '@/components/StylizedButton'

export default {
  name: 'tasksIndex',

  components: {
    // eslint-disable-next-line vue/no-unused-components
    QuestList,
    // eslint-disable-next-line vue/no-unused-components
    PixelTabs,
    // eslint-disable-next-line vue/no-unused-components
    StylizedButton
  },

  computed: {
    currentTabQuests () {
      // if (this.tab === 0) {
      //   const quests = [].concat.apply([], this.tasks.map(task => task.quests))
      //   console.log(quests)
      //   return quests
      // }
      return this.tasks[this.tab].quests
    }
  },

  data: () => ({
    tasks: [
      { title: 'guerreiro', description: 'Missões focadas no desenvolvimento físico', quests: [
        { id: 1, icon: 'mdi-arm-flex', title: 'Task 1', xp: 20, money: 10, description: 'va malhar, vadio', color: 'red' },
        { id: 2, icon: 'mdi-bike', title: 'Task 2', xp: 20, money: 10, color: 'red'  },
        { id: 3, icon: 'mdi-run', title: 'Task 3', xp: 20, money: 10, color: 'red'  },
        { id: 4, icon: 'mdi-bug', title: 'Task 4', xp: 20, money: 10, color: 'red'  },
        { id: 5, icon: 'mdi-bug', title: 'Task 5', xp: 20, money: 10, color: 'red'  },
        { id: 6, icon: 'mdi-bug', title: 'Task 6', xp: 20, money: 10, color: 'red'  },
        { id: 7, icon: 'mdi-bug', title: 'Task 7', xp: 20, money: 10, color: 'red'  },
        { id: 8, icon: 'mdi-bug', title: 'Task 8', xp: 20, money: 10, color: 'red'  },
      ]},
      { title: 'mago', description: 'Missões focadas no desenvolvimento mental', quests: [
        { id: 1, icon: 'mdi-bookshelf', title: 'Task 1', xp: 20, money: 10, description: 'va ler, vadio',  color: 'blue' },
        { id: 2, icon: 'mdi-auto-fix', title: 'Task 2', xp: 20, money: 10, color: 'blue'  },
        { id: 3, icon: 'mdi-head-snowflake-outline', title: 'Task 3', xp: 20, money: 10, color: 'blue'}
      ]},
      { title: 'teste', description: '...', quests: [
        { id: 1, icon: 'mdi-forest', title: 'Task 1', xp: 20, money: 10, description: 'va pro mato, vadio',color: 'green' },
        { id: 2, icon: 'mdi-bow-arrow', title: 'Task 2', xp: 20, money: 10, color: 'green' },
        { id: 3, icon: 'mdi-bow-arrow', title: 'Task 3', xp: 20, money: 10, color: 'green' },
        { id: 4, icon: 'mdi-bow-arrow', title: 'Task 4', xp: 20, money: 10, color: 'green' },
        { id: 5, icon: 'mdi-bow-arrow', title: 'Task 5', xp: 20, money: 10, color: 'green' },
      ]}
    ],
    tab: 0,
    tabs: [
      { icon: 'sword', name: 'Guerreiro' },
      { icon: 'wizards-hat', name: 'Mago' },
      { icon: 'bow-and-arrow', name: 'Teste' }
    ]
  }),
}
</script>

<style lang="sass" scoped>
.wrapper
  height: 100%
  max-height: calc(100% - 50px)
.cardtitle
  position: absolute
  top: -18px
  left: 0
  right: 0
  margin-left: auto
  margin-right: auto
  width: fit-content
  

.quests__wrapper
  overflow: auto
  height: 495px

::v-deep
  .v-expansion-panels
    overflow: hidden !important
  .v-expansion-panel-content__wrap
    max-height: 420px
    overflow: scroll
</style>
  