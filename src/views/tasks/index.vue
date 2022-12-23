<template>
    <StylizedCard brown class="pa-2 ma-3">
      <v-card-title class="justify-center"> Missões </v-card-title>
      <StylizedCard brown-light content-class="d-flex ma-5" height="60px" elevation="0">
        <span class="ma-auto caption"> Oi, eu sou um teste </span>
      </StylizedCard>

      <v-divider class="my-2"/>

      <QuestList :items="tasks" />

    </StylizedCard>
  </template>
  
<script>
import QuestList from '@/components/QuestList.vue'

export default {
  name: 'tasksIndex',
  components: { QuestList },
  data: () => ({
    tasks: [{ id: 1, icon: 'mdi-sword', title: 'Task 1', xp: 20, money: 10, color: 'red' }, { id: 2, icon: 'mdi-sword', title: 'Task 2', xp: 20, money: 10, color: 'red'  }, { id: 3, icon: 'mdi-sword', title: 'Task 3', xp: 20, money: 10, color: 'red'  }],
    
  }),
}
</script>
  