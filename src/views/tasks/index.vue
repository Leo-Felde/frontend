<template>
    <StylizedCard brown class="pa-2 pt-10 mx-3 mt-6">
      <StylizedCard black class="px-3 py-2 cardtitle"> placeholder </StylizedCard>
      <!-- <v-card-title class="justify-center"> Missões </v-card-title> -->

      <PixelTabs :items="tabs" v-model="tab" content-class="d-flex justify-space-around"/>
      <!-- <TextField content-class="mx-2 mt-3" place-holder="pesquisar tarefas"/> -->
      <!-- <StylizedCard brown-light content-class="d-flex ma-5" height="60px" elevation="0">
        <span class="ma-auto caption"> testetete </span>
      </StylizedCard> -->

      <!-- <v-divider class="my-4"/> -->
      <StylizedCard brown-light class="pa-2 ma-2">
        <QuestList :items="tasks" />
      </StylizedCard>
      

    </StylizedCard>
  </template>
  
<script>
import QuestList from '@/components/QuestList.vue'
import PixelTabs from '@/components/pixelTab.vue'

export default {
  name: 'tasksIndex',

  components: {
    QuestList,
    PixelTabs
  },

  data: () => ({
    tasks: [
      { id: 1, icon: 'mdi-arm-flex', title: 'Task 1', xp: 20, money: 10, description: 'va malhar, vadio', color: 'red' }, { id: 2, icon: 'mdi-bike', title: 'Task 2', xp: 20, money: 10, color: 'red'  }, { id: 3, icon: 'mdi-run', title: 'Task 3', xp: 20, money: 10, color: 'red'  },
      { id: 4, icon: 'mdi-bookshelf', title: 'Task 1', xp: 20, money: 10, description: 'va ler, vadio',  color: 'blue' }, { id: 5, icon: 'mdi-auto-fix', title: 'Task 2', xp: 20, money: 10, color: 'blue'  }, { id: 6, icon: 'mdi-head-snowflake-outline', title: 'Task 3', xp: 20, money: 10, color: 'blue'  },
      { id: 7, icon: 'mdi-forest', title: 'Task 1', xp: 20, money: 10, description: 'va pro mato, vadio',color: 'green' }, { id: 8, icon: 'mdi-bow-arrow', title: 'Task 1', xp: 20, money: 10, color: 'green' }
    ],
    tab: 0,
    tabs: [
      { icon: 'mdi-all-inclusive', description: 'todos' },
      { icon: 'mdi-sword', description: 'guerreiro' },
      { icon: 'mdi-wizard-hat', description: 'mago' },
      { icon: 'mdi-bow-arrow', description: 'ranger' }
    ]
  }),
}
</script>

<style lang="sass" scoped>
.cardtitle
  position: absolute
  top: -18px
  left: 0
  right: 0
  margin-left: auto
  margin-right: auto
  width: fit-content
</style>
  