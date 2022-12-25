<template>
    <StylizedCard brown class="pa-2 ma-3">
      <v-card-title class="justify-center"> Missões </v-card-title>

      <PixelTabs big-tabs :items="tabs" v-model="tab" content-class="d-flex justify-space-around"/>

      <!-- <StylizedCard brown-light content-class="d-flex ma-5" height="60px" elevation="0">
        <span class="ma-auto caption"> testetete </span>
      </StylizedCard> -->

      <v-divider class="my-2"/>
      <v-card-subtitle class="justify-center pb-0"> Missões do {{ tabs[tab].description }}</v-card-subtitle>
      <QuestList :items="tasks[tab]" />

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
      [{ id: 1, icon: 'mdi-arm-flex', title: 'Task 1', xp: 20, money: 10, color: 'red' }, { id: 2, icon: 'mdi-bike', title: 'Task 2', xp: 20, money: 10, color: 'red'  }, { id: 3, icon: 'mdi-run', title: 'Task 3', xp: 20, money: 10, color: 'red'  },],
      [{ id: 1, icon: 'mdi-bookshelf', title: 'Task 1', xp: 20, money: 10, color: 'blue' }, { id: 2, icon: 'mdi-auto-fix', title: 'Task 2', xp: 20, money: 10, color: 'blue'  }, { id: 3, icon: 'mdi-head-snowflake-outline', title: 'Task 3', xp: 20, money: 10, color: 'blue'  },],
      [{ id: 1, icon: 'mdi-bow-arrow', title: 'Task 1', xp: 20, money: 10, color: 'green' }, { id: 1, icon: 'mdi-forest', title: 'Task 1', xp: 20, money: 10, color: 'green' }]
    ],
    tab: 0,
    tabs: [
      { icon: 'mdi-sword', description: 'guerreiro' },
      { icon: 'mdi-wizard-hat', description: 'mago' },
      { icon: 'mdi-bow-arrow', description: 'ranger' }
    ]
  }),
}
</script>
  