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
            {{  tabs[tab].descrition }}
          </span>
        </span>
      </StylizedCard>
      

      <v-divider class="my-4"/>

      <QuestList :loading="loadingTasks" :items="currentTabTasks" @click="vincularTarefa" listaPrincipal @refresh="carregarTarefas" />


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
      
      <ConfirmDialog ref="confirm" />
    </StylizedCard>
  </template>
  
<script>
import QuestList from '@/components/QuestList.vue'
import PixelTabs from '@/components/pixelTab.vue'
import Tarefas from '@/Api/Geral/Tarefas'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

export default {
  name: 'tasksIndex',

  components: {
    QuestList,
    PixelTabs,
    ConfirmDialog
  },

  computed: {
    currentTabQuests () {
      return this.tasks[this.tab].quests
    }
  },

  data: () => ({
    tab: 0,
    tabs: [
      { icon: 'sword', name: 'Guerreiro', descrition: 'Tarefas relacionadas a saúde física' },
      { icon: 'wizards-hat', name: 'Mago', descrition: 'Tarefas relacionadas a saúde mental' },
      { icon: 'bow-and-arrow', name: 'Druída', descrition: 'Tarefas relacionadas ao contato com a natureza' }
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
        const resp = await Tarefas.listar(this.$store.state.usuario.dados.id)
        this.tasks = resp.data.content
        this.filterTasks()
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao carregar tarefas', color: 'error' })
      } finally {
        this.loadingTasks = false
      }
    },

    async vincularTarefa(task){

      if (!await this.$refs.confirm.open(
        'Ativar Tarefa',
        'Deseja ativar essa tarefa?'
      )) return

      const params = {
        id_usuario: this.$store.state.usuario.dados.id,
        id_tarefa: task.id,
        status: false
      }
      try {
        await Tarefas.vincularTarefa(params)
        const index = this.tasks.findIndex(t => t.id_tarefa === task.id_tarefa)
        this.tasks.splice(index, 1)
        const indexTab = this.currentTabTasks.findIndex(t => t.id_tarefa === task.id_tarefa)
        this.currentTabTasks.splice(indexTab, 1)
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao vincular Tarefa', color: 'error' })
      }
    },

    filterTasks() {
      this.currentTabTasks = this.tasks.filter(p => p.id_category === this.tab + 1)
    }
  }
  

  
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
  