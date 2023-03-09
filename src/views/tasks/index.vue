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
        <QuestList :items="currentTabTasks" @click="vincularTarefa"/>
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
import Tarefas from '@/Api/Geral/Tarefas'

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
    tab: 0,
    tabs: [
      { icon: 'sword', name: 'Guerreiro' },
      { icon: 'wizards-hat', name: 'Mago' },
      { icon: 'bow-and-arrow', name: 'Teste' }
    ],
    loadingTasks: true,
    tasks: [],
    currentTabTasks: []
  }),

  async mounted () {
    await this.carregarTarefas()
  },

  watch: {
    tab () {
      this.filterTasks()
    }
  },

  methods: {
    async carregarTarefas() {
      this.loadingTasks = true
      try {
        const resp = await Tarefas.listar()
        this.tasks = resp.data.content
        this.filterTasks()
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao carregar tarefas', color: 'error' })
      } finally {
        this.loadingTasks = false
      }
    },

    async vincularTarefa(task){
      console.log(task)
      if (confirm("Vincular tarefa?")==true){
        const params = {
        id_usuario: this.$store.state.usuario.dados.id,
        id_tarefa: task.id,
        status: false
        }
        const resp = await Tarefas.vincularTarefa(params)
        console.log(resp)
      }
    },

    filterTasks() {
      this.currentTabTasks = this.tasks.filter(p => p.id_category === this.tab + 1)
    }
  }
  

  
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
  