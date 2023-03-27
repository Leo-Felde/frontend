<template>
  <div>
    <div v-if="loading" class="loading-tasks">
      <v-skeleton-loader v-for="i in 2" :key="i" type="text" class="mb-2" />
    </div>
    <v-list v-else-if="items.length" class="pt-0">
      <v-list-item v-if="usuarioAdmin && listaPrincipal" class="my-2 px-1" @click="newTaskDialog = true">
        <StylizedCard paper color="blue" content-class="d-flex px-3" width="100%" :no-deco="false">
          <v-list-item-content class="mb-2">
                <v-list-item-title class="d-flex justify-center"> Nova tarefa </v-list-item-title>
                <span class="caption d-flex justify-center"> <v-icon color="blue"> mdi-plus-circle </v-icon> </span>
            </v-list-item-content>
        </StylizedCard>
      </v-list-item>
      <v-list-item
        v-for="task in items"
        :key="task.id"
        class="my-2 px-1"
        @click="$emit('click', task)">
        <StylizedCard paper :color="!task.color ? getColorById(task.id_category) : 'yellow'" content-class="d-flex px-3" width="100%" :no-deco="false">
            <v-list-item-content class="mb-2">
                <v-list-item-title class="d-flex justify-start"> {{ task.title }} <v-icon v-if="task.icon" class="ml-2"> {{ task.icon }} </v-icon> </v-list-item-title>
                <span class="caption d-flex justify-start">{{ task.description }}</span>
            </v-list-item-content>

            
            <span class="d-flex justify-start expiration" v-if="task.deadline">
              {{ formatarData(task.deadline) }}
              <PixelIcon v-if="aboutToExpire(task.deadline)" icon="clock-alert" small />
              <PixelIcon v-else icon="clock" small />
            </span>
            <div class="rewards caption d-flex">
                <span class="green--text" v-if="task.reward_exp">+{{ task.reward_exp }}xp</span>
                <span class="orange--text ml-1 text--accent-2 d-flex" v-if="task.reward_gold"> {{ task.reward_gold }}<PixelIcon icon="coin-stack" x-small class="ml-1"/></span>
            </div>
        </StylizedCard>
        </v-list-item>
    </v-list>
    <div v-else>
      <slot />
    </div>

    <v-dialog v-model="newTaskDialog" max-width="400px">
      <StylizedCard content-class="habit-wrapper" brown>
          <StylizedCard black class="d-flex mb-1 card-title" height="50px">
            <span class="ml-5 my-auto"> {{ title }} tarefa </span>
            <v-btn icon class="ml-auto my-auto mr-2" @click="cancelarNovaTarefa">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </StylizedCard>
          <v-divider />

          <v-row no-gutters class="mx-8 mt-4">
            <v-col cols="12" md="12">
              <SelectField
                v-model="form.category"
                :items="categorias"
                ref="title"
                label="categoria"
                required
                :hide-details="false"
              />
            </v-col>

            <v-col cols="12" md="12">
              <TextField
                v-model="form.title"
                ref="title"
                label="título"
                required
                :hide-details="false"
              />
            </v-col>

            <v-col cols="12" md="12">
              <TextField
                v-model="form.description"
                ref="description"
                label="Descrição"
                required
                :hide-details="false"
              />
            </v-col>

            <v-col cols="12" md="12">
              <TextField
                v-model="form.reward_gold"
                ref="gold"
                label="Recompensa - gold"
                required
                :hide-details="false"
              />
            </v-col>

            <v-col cols="12" md="12">
              <TextField
                v-model="form.reward_exp"
                ref="gold"
                label="Recompensa - exp"
                required
                :hide-details="false"
              />
            </v-col>

            <v-col cols="12" md="12">
              <TextField
                v-model="form.deadline"
                ref="deadline"
                label="prazo"
                required
                mask="##/##/####"
                :hide-details="false"
                appendIcon="mdi-calendar-clock"
              />
            </v-col>
          </v-row>

          <div class="d-flex justify-space-around mt-2">
              <StylizedButton color="red" v-if="tarefaSelecionada" @click="excluirTarefa" :loading="loadingTarefa" :disabled="loadingTarefa"> Excluir </StylizedButton>
              <StylizedButton color="blue" @click="adicionarTarefa" :loading="loadingTarefa" :disabled="loadingTarefa"> {{ tarefaSelecionada ? 'Editar': 'Adicionar' }} </StylizedButton>
            </div>
            <v-btn text @click="cancelarNovaTarefa" class="my-2"> cancelar </v-btn>
          </StylizedCard>
    </v-dialog>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import StylizedButton from './StylizedButton.vue'
import Tarefas from '@/Api/Geral/Tarefas'
import SelectField from './SelectField.vue'

export default {
  name: 'QuestList',
  data: () => ({
    newTaskDialog: false,
    form: {},
    loadingTarefa: false,
    categorias: [
      { value: '1', text: 'Guerreiro' },
      { value: '2', text: 'Mago' },
      { value: '3', text: 'Druída' },
    ]
  }),
  
  props: {
    items: { type: Array, required: true },
    listaPrincipal: Boolean,
    loading: Boolean,
    tarefaSelecionada: { type: Object, default: () => {} },
  },

  validations: {
    title: {
      required,
      minLength: minLength(5)
    },
    description: {
      required
    },
    gold: {
      required
    },
    exp: {
      required
    }
  },
  computed: {
    title() {
      return this.tarefaSelecionada ? 'Editar' : 'Criar'
    },

    usuario () {
      return this.$store.state.usuario.dados
    },

    usuarioAdmin () {
      return this.usuario.admin
    }
  },
  methods: {
    formatarData(date) {
      const dateString = new Date(date).toLocaleDateString('pt-PT')
      return dateString.slice(0, 5)
    },

    aboutToExpire(date) {
      const date1 = new Date(date)
      var now = new Date()
      var timeDiff = Math.abs(date1.getTime() - now.getTime())
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
      return diffDays <= 1
    },

    getColorById(id) {
      switch (id) {
      case 1:
        return 'red'
      case 2:
        return 'blue'
      case 3:
        return 'green'
      case 4:
        return 'yellow'
      default:
        return 'black'
      }
    },
    excluirTarefa() {
      //
    },

    async adicionarTarefa() {
      this.loadingTarefa = true
      try {
        await Tarefas.salvar(this.form)
        this.$snackbar.showMessage({ content: 'Tarefa cadastrado com sucesso', color: 'green' })
        this.carregarItens()
        this.cancelarNovaTarefa()
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao cadastrar Tarefa', color: 'error' })
      } finally {
        this.loadingTarefa = false
      }
    },

    cancelarNovaTarefa() {
      this.form = {}
      this.newTaskDialog = false
    }
  },
  components: { StylizedButton, SelectField }
}
</script>

<style lang="sass" scoped>
.rewards
    position: absolute
    bottom: 0px
    right: 10px
.expiration
    position: absolute
    top: 0px
    right: 5px
    font-size: 0.9rem

.v-list
  overflow-y: scroll

.loading-tasks
  :deep(.v-skeleton-loader__text)
    height: 79px
    margin-left: 5px
    margin-right: 5px

</style>