<template>
  <StylizedCard class="pa-2" brown>
    <StylizedCard black class="px-3 py-2 cardtitle"> Hábitos </StylizedCard>
    <div class="py-2 mt-10" id="habits-container" v-if="!loadingHabits">
      <v-btn fab class="mx-2" elevation="0" @click="showNewHabitDialog = true"> 
        <v-icon color="light-green darken-2">mdi-plus</v-icon> 
      </v-btn>
      <v-btn text id="editarHabitos" v-if="habits.length >= 1" @click="showEditHabitDialog = true">
        <v-icon> mdi-circle-edit-outline </v-icon>
        editar
      </v-btn>
      
      <div v-for="item in habits" :key="item.id" class="habit-container pb-12">
        <v-btn fab class="mx-2 darken-2" elevation="0" :color="item.color" v-longclick="() => longPress(item)">
          <v-progress-circular :value="item.value ? 100 : 0" :color="`${item.color} lighten-2`" class="habit-progress" size="60" />
          <v-icon color="white">{{ item.icon }}</v-icon> 
        </v-btn>
        <span class="habit-title caption">{{ item.title }}</span>
      </div>
    </div>
    <div class="loading-habits mt-10 py-2" v-else>
      <div class="d-flex">
        <v-skeleton-loader v-for="i in 2" :key="i" type="chip" class="mb-2" />
      </div>
      <v-progress-linear indeterminate width="100%" />
    </div>

    <v-divider class="mt-6 mb-10"/>

    <StylizedCard black class="px-3 py-2 cardsubtitle"> Missões ativas </StylizedCard>

    <QuestList :loading="loadingTasks" :items="tasks" @click="concluirTarefa">
      <div v-if="!tasks.length" class="caption mb-1">
          nenhuma tarefa ativa
      </div>
    </QuestList>
    <HabitForm v-model="showNewHabitDialog" @newHabit="carregarHabitos" :habito="habitoSelecionado" />

    <v-dialog v-model="showEditHabitDialog">
      <StylizedCard class="pa-4 card-icones pt-10" brown>
        <StylizedCard black class="cardtitle px-3 pt-1">
          <span> Seus hábitos </span>
          <v-btn icon class="ml-auto" @click="showEditHabitDialog = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </StylizedCard>
        <v-list>
          <v-list-item v-for="item in habits" :key="`h${item.id}`" @click="editarHabito(item)">
            <v-list-item-avatar :color="item.color" size="50">
              <v-icon
                dark
              >
                {{ item.icon }}
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text-left"> {{ item.title }} </v-list-item-title>

              <!-- <v-list-item-subtitle v-text="folder.subtitle"></v-list-item-subtitle> -->
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </StylizedCard>
    </v-dialog>

    <ConfirmDialog ref="confirm" />
  </StylizedCard>
</template>

<script>
import Tarefas from '@/Api/Geral/Tarefas'
import Habitos from '@/Api/Geral/Habitos'

import HabitForm from './habits/Form.vue'
import QuestList from '@/components/QuestList.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'

export default {
  name: 'HomeView',
  data: () => ({
    showEditHabitDialog: false,
    showNewHabitDialog: false,
    loadingHabits: true,
    loadingTasks: true,
    habitoSelecionado: null,
    taerfaSelecionada: null,
    tasks: [],
    habits: []
  }),

  components: {
    QuestList,
    HabitForm,
    ConfirmDialog
  },

  async mounted () {
    await this.carregarHabitos()
    await this.carregarTarefas()
    this.mostrarNotificacoes()
  },

  methods: {
    async concluirTarefa (tarefa) {
      if (!await this.$refs.confirm.open(
        'Concluir tarefa',
        'Deseja concluir essa tarefa?'
      )) return

      this.tarefaSelecionada = tarefa
      const params = { 
        id_tarefa: this.tarefaSelecionada.id_tarefa,
        id_usuario: this.tarefaSelecionada.id_usuario,
        status: !this.tarefaSelecionada.status
      }
      await Tarefas.concluirTarefa(params)
      await this.carregarTarefas()

    },

    async longPress (item) {
      const index = this.habits.findIndex(habit => habit.id === item.id)
      if (index < 0) return
      this.habits[index].value = !this.habits[index].value

      try {
        const params = {
          id: item.id,
          value: this.habits[index].value
        }
        
        await Habitos.salvar(params)
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao editar Hábito', color: 'error' })
      }
    },

    async carregarHabitos () {
      this.loadingHabits = true
      try {
        const resp = await Habitos.listar(this.$store.state.usuario.dados.id)
        this.habits = resp.data.content
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao carregar habitos', color: 'error' })
      } finally {
        this.loadingHabits = false
      }
    },

    async carregarTarefas () {
      this.loadingTasks = true
      try {
        const idUsuario = this.$store.state.usuario.dados.id
        const resp = await Tarefas.carregar(idUsuario)
        this.tasks = resp.data.content.tarefas
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao carregar tarefas', color: 'error' })
      } finally {
        this.loadingTasks = false
      }
    },

    editarHabito (habito) {
      this.showEditHabitDialog = false
      this.habitoSelecionado = habito

      this.showNewHabitDialog = true
    },

    mostrarNotificacoes () {
      const mostrouNotificacao = this.$store.state.usuario.mostrouNotificacao
      if (mostrouNotificacao) return

      let monstrarNotificacao = false
      const dataAtual = new Date()
      const diaHoje = dataAtual.getDay()
      const horaAgora = dataAtual.getHours()

      this.habits.forEach(habit => {
        if (!habit.days.includes(diaHoje)) {
          return
        }

        switch (habit.period) {
        case 3: // qqr
          monstrarNotificacao = true
          break
        case 2: // noite
          monstrarNotificacao = horaAgora <= 0 && horaAgora > 18
          break
        case 1: // dia 
          monstrarNotificacao = horaAgora < 18 && horaAgora >= 12
          break
        case 0: // manhã
          monstrarNotificacao = horaAgora < 12 && horaAgora > 6
          break
        }
      })

      if (monstrarNotificacao) {
        Notification.requestPermission().then(perm => {
          if (perm === 'granted') {
            new Notification('MyPath', {
              body: 'Não esqueça de seus hábitos',
              data: {},
              icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGFBMVEX///9sPEoUFSmzdUvqt4Dk6NowKzvgIBgKNGdDAAAAAXRSTlMAQObYZgAAAHhJREFUeNq10dEKwkAMRFFvE+P//7E7liDz1G3Eeb2HlKWPfwyO4xcAEZkiMwC59lyDCQDFE2TCXQAKDTS4A6BDRAM99xr4+Qaer0HVN7/WwPIlqIq1/CziBJlVanvAPwGe94A/0/Mu0Gf8N+8DJ31+BkR0fgjmewOtmwbp/d5eZgAAAABJRU5ErkJggg==',
              tag: 'habito'
            })
          }
        })
      }

      this.$store.commit('usuario/setNotificacao', true)
    }
  }
}
</script>

<style lang="sass" scoped>
#habits-container
  display: flex
  min-height: 80px !important
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
  top: 140px
  left: 0
  right: 0
  margin-left: auto
  margin-right: auto
  width: fit-content

.loading-habits
  width: 100%
  :deep(.v-skeleton-loader__chip)
    width: 64px
    height: 64px
    border-radius: 50%
    margin-right: 10px


#editarHabitos
  position: absolute
  top: 20px
  left: 0px

.v-dialog
  .cardtitle
    z-index: 2
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    display: flex
    justify-content: space-between
</style>
