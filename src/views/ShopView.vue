<template>
    <StylizedCard brown class="px-4 pb-2 pt-7">
      <StylizedCard black class="px-3 py-2 cardtitle"> Lojinha </StylizedCard>
      <v-row cols="12">
        <v-col cols="4">
          <StylizedCard brown-light content-class="d-flex" width="100%" height="80px" no-borders>
            <v-img
              :src="require('../assets/img/penguino.png')"
              class="my-3"
              contain
              height="61"
            />
          </StylizedCard>
        </v-col>
        <v-col cols="8" class="text-start">
          <div class="caption"> bem vindo a lojinha, aqui você pode trocar seu dinheirinho por items</div>
           <div class="d-flex mt-auto caption"> Você possui<span class="ml-1 yellow--text text--accent-2 d-flex"> {{ gold }} <PixelIcon icon="coins-pile" x-small class="ml-1"/></span> <p /></div>
        </v-col>
      </v-row>
      <v-divider class="my-2"/>

    
      <PixelTabs v-model="tab" :items="tabs" content-class="d-flex justify-space-around"/>

      <v-row v-if="loadingItens" cols="12" class="ma-0 mb-3 loading-items">
        <v-progress-linear indeterminate width="100%" />
        <v-col cols="4" v-for="i in 12" :key="i">
        <v-skeleton-loader  type="chip" class="mb-2" />
      </v-col>
    </v-row>
    <v-row v-else cols="12" class="ma-0 mb-3">
      <v-col>
        <StylizedCard light content-class="d-flex justify-center" height="50px" v-if="usuarioAdmin">
         <v-icon large color="primary" @click="newItemDialog = true"> mdi-plus-circle </v-icon>
        </StylizedCard>
      </v-col>

      <v-col cols="4" v-for="i in 12" :key="`inv-${i}`" @click="currentTabItems[i - 1] ? BuyDialog(currentTabItems[i - 1]) : null" :class="{'pointer': currentTabItems[i - 1]}">
        <StylizedCard light content-class="d-flex" height="50px">
          <v-img v-if="currentTabItems[i - 1]" :src="require(`@/assets/character/${tabs[tab].value}/icon/${currentTabItems[i - 1].referencia}.png`)" height="30px" contain class="self-align-center" />
        </StylizedCard>
      </v-col>
    </v-row>

    <v-dialog v-model="newItemDialog" max-width="400px">
      <StylizedCard content-class="habit-wrapper" brown>
          <StylizedCard black class="d-flex mb-1 card-title" height="50px">
            <span class="ml-5 my-auto"> {{ title }} item </span>
            <v-btn icon class="ml-auto my-auto mr-2" @click="cancelarNovoitem">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </StylizedCard>
          <v-divider />

          <v-row no-gutters class="mx-8 mt-4">
            <v-col cols="12" md="12">
              <TextField
                v-model="form.nome"
                ref="title"
                label="Nome"
              />
            </v-col>

            <v-col cols="12" md="12" class="mt-4">
              <TextField
                v-model="form.valor"
                ref="gold"
                label="Valor"
              />
            </v-col>

            <v-col cols="12" md="12" class="mt-4">
              <TextField
              v-model="form.referencia"
                label="Referência"
              />
            </v-col>

            <v-col cols="12" md="12" class="mt-4">
              <TextField
              v-model="form.categoria"
                label="Categoria"
              />
            </v-col>
          </v-row>
          <div class="d-flex justify-space-around mt-4">
              <StylizedButton color="red" v-if="itemSelecionado" @click="excluiritem" :loading="loadingItem" :disabled="loadingItem"> Excluir </StylizedButton>
              <StylizedButton color="blue" @click="adicionarItem" :loading="loadingItem" :disabled="loadingItem">{{ itemSelecionado ? 'Editar': 'Adicionar' }} </StylizedButton>
            </div>
            <v-btn text @click="cancelarNovoitem" class="my-2"> cancelar </v-btn>
          </StylizedCard>
    </v-dialog>
    <ConfirmDialog ref="confirmBuy">
      <div class="pa-5">
        <v-img v-if="comprandoItem.referencia" :src="require(`@/assets/character/${comprandoItem.categoria}/icon/${comprandoItem.referencia}.png`)" height="50px" contain class="self-align-center" />
        <span> Comprar {{ comprandoItem.nome }} por </span> <span class="yellow--text"> {{ comprandoItem.valor }} ouros </span>
      </div>
    </ConfirmDialog>

    <ConfirmDialog ref="cantBuy" ok-entendi>
      <div class="pa-5">
        <v-img v-if="comprandoItem.referencia" :src="require(`@/assets/character/${comprandoItem.categoria}/icon/${comprandoItem.referencia}.png`)" height="50px" contain class="self-align-center" />
        <span> Você não possui dinheiro para comprar este item <span class="yellow--text"> {{ comprandoItem.valor }} ouros </span> </span>
      </div>
    </ConfirmDialog>
    </StylizedCard>
  </template>
  
<script>
// @ is an alias to /src

import Itens from '@/Api/Geral/Itens'
import Usuario from '@/Api/Geral/Usuario'

import PixelTabs from '@/components/pixelTab.vue'
import StylizedButton from '@/components/StylizedButton.vue'
import ConfirmDialog from '@/components/ConfirmDialog.vue'
  
export default {
  name: 'tasksIndex',

  components: {
    PixelTabs,
    StylizedButton,
    ConfirmDialog
  },

  computed: {
    title() {
      return this.itemSelecionado ? 'Editar' : 'Criar'
    },

    currentTabItems () {
      return this.items[this.tabs[this.tab].value] || []
    },

    usuario () {
      return this.$store.state.usuario.dados
    },

    usuarioAdmin () {
      return this.usuario.admin
    },

    gold () {
      return this.usuario.gold
    }
  },
    
  data: () => ({
    tab: 0,
    tabs: [{ title: 'cabeça', value: 'head' },{ title: 'Corpo', value: 'top' },{ title: 'pernas', value: 'bottom' }],
    itens: {
      head: [ 'gladiator', 'wizards-hat', 'templar', 'fox-mask'],
      top: ['gladiator', 'templar', 'red-armor', 'tuxedo', 'red-jacket'],
      bottom: ['gladiator', 'templar', 'wills']
    },
    loadingItens: false,
    items: {
      head: [],
      top: [],
      bottom: []
    },
    form: {},
    itemSelecionado: null,
    newItemDialog: false,
    loading: false,
    loadingItem: false,
    comprandoItem: {},
    showBuyDialog: false
  }),

  async mounted () {
    await this.carregarUsuario()
    await this.carregarItens()
  },

  methods: {
    async BuyDialog (item) {
      this.comprandoItem = item
      this.showBuyDialog = true

      if (this.usuario.gold < item.valor) {
        await this.$refs.cantBuy.open(
          'Comprar item', null
        )
        return
      }


      if (!await this.$refs.confirmBuy.open(
        'Comprar item', null
      )) return
      
      const options = {
        id_usuario: this.$store.state.usuario.dados.id,
        id_item: item.id
      }

      try {
        await Usuario.comprarItem(options)
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao comprar item', color: 'error' })
      }
    },

    async carregarItens() {
      this.loadingItens = true
      try {
        const resp = await Itens.listar(this.usuario.id)
        const todosItems = resp.data.content

        todosItems.forEach(item => {
          this.items[item.categoria].push(item)
        })
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao carregar Itens', color: 'error' })
      } finally {
        this.loadingItens = false
      }
    },

    async carregarUsuario () {
      this.loading = true
      try {
        const resp = await Usuario.carregar(this.usuario.id)
        this.$store.commit('usuario/setUsuario', resp.data.content.usuario)
      } catch (err) {
        this.$snackbar.showMessage({ content: 'Falha ao carregar usuário', color: 'error' })
      } finally {
        this.loading = false
      }
    },

    async adicionarItem () {
      console.log(this.form)
      const resp = await Itens.salvar(this.form)
      console.log(resp)
    },

    cancelarNovoitem() {
      this.newItemDialog = false
    }
  },
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

.loading-items
  width: 100%
  :deep(.v-skeleton-loader__chip)
    width: 120px
    height: 50px
    border-radius: 10%


</style>
  