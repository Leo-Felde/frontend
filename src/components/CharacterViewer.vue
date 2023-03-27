<template>
  <div>
    <!-- INFO -->
    <div id="user-info" class="mt-6">
      <span class="subtitle-2">
        <v-btn icon @click="$emit('logout')"> <v-icon> mdi-logout </v-icon> sair </v-btn>
        {{ usuario.nome }} lvl.{{ usuario.level }} </span>
      <v-progress-linear :value="usuario.xp" height="10px" />
    </div>

    <div id="character_wrapper">
      <!-- PERSONAGEM -->
      <canvas id="canvas-body"> ERRO </canvas>
      <img id="source-body" style="display:none;" :src="require('@/assets/character/body.png')" width="100px"/>
      
      <v-img src="@/assets/character/eye.png" id="char-eye-whites" contain width="100px"/>
      <canvas id="canvas-eye"> ERRO </canvas>
      <img id="source-eye" style="display:none;" :src="require('@/assets/character/eyec.png')" width="100px"/>
      
      <canvas id="canvas-hair"> ERRO </canvas>
      <img id="source-hair" style="display:none;" :src="require(`@/assets/character/hair/hair-${charHair}.png`)" width="100" />

      <!-- ITEMS -->
      <v-img v-if="charHead" :src="require(`@/assets/character/head/${charHead}.png`)" id="char-head" contain width="100px"/>
      <v-img v-if="charTop" :src="require(`@/assets/character/top/${charTop}.png`)" id="char-top" contain width="100px"/>
      <v-img v-if="charBottom" :src="require(`@/assets/character/bottom/${charBottom}.png`)" id="char-bottom" contain width="100px"/>
    </div>

    
    <!-- INVENTARIO -->
    <PixelTabs v-model="inventoryTab" :items="inventoryTabs" content-class="d-flex justify-space-around"/>
    <v-row cols="12" class="ma-0 mb-3">
      <v-col cols="4" v-for="i in 12" :key="`inv-${i}`" @click="currentTabItems[i - 1] ? selectItem(inventoryTabs[inventoryTab].value, currentTabItems[i - 1]) : null" :class="{'pointer': currentTabItems[i - 1]}">
        <StylizedCard light content-class="d-flex" height="50px">
          <v-img v-if="currentTabItems[i - 1]" :src="require(`@/assets/character/${inventoryTabs[inventoryTab].value}/icon/${currentTabItems[i - 1]}.png`)" height="30px" contain class="self-align-center" />
        </StylizedCard>
      </v-col>
    </v-row>


    <!--  CUSTOMIZAÇÃO -->
      <v-btn icon id="hair-previous" @click="changeHair('prev')"> <v-icon> mdi-chevron-left </v-icon> </v-btn>
      <v-btn icon id="hair-next" @click="changeHair('next')"> <v-icon> mdi-chevron-right </v-icon> </v-btn>

      <div class="d-flex-column" id="color-btns">
        <div class="d-flex mb-1"><v-btn fab x-small :color="bodyColor" elevation="0" @click="colorPick('body')"/> <span class="caption colortitle">Pele</span></div>
        <div class="d-flex mb-1"><v-btn fab x-small :color="hairColor" elevation="0" @click="colorPick('hair')"/> <span class="caption colortitle">Cabelo</span> </div>
        <div class="d-flex"><v-btn fab x-small :color="eyeColor" elevation="0" @click="colorPick('eye')"/> <span class="caption colortitle">Olhos</span></div>
      </div>

    <v-dialog v-model="showPicker" max-width="300px">
      <v-color-picker v-if="currentPicker === 0" v-model="bodyColor" hide-inputs mode="hexa" @update:color="renderCanvas('body')" class="mx-auto" />
      <v-color-picker v-else-if="currentPicker === 1" v-model="hairColor" hide-inputs mode="hexa" @update:color="renderCanvas('hair')" class="mx-auto" />
      <v-color-picker v-else-if="currentPicker === 2" v-model="eyeColor"  hide-inputs mode="hexa" @update:color="renderCanvas('eye')" class="mx-auto" />
    </v-dialog>
  </div>
</template>

<script>
import Usuario from '@/Api/Geral/Usuario'
import PixelTabs from '@/components/pixelTab.vue'

export default {
  name: 'CharacterViewer',

  components: {
    PixelTabs
  },
  
  props: {
    ShowInventory: Boolean,
    id: { type: [Number, String], default: undefined } // usar pra carregar as configs dps
  },

  created () {
    this.carregarPersonagem()

    setTimeout(() => {
      this.renderCanvas('hair')
      this.renderCanvas('body')
      this.renderCanvas('eye')
    }, 500)

  },

  computed: {
    currentTabItems () {
      return this.ownedItems[this.inventoryTabs[this.inventoryTab].value] || []
    },

    usuario () {
      return this.$store.state.usuario.dados
    },

    personagem () {
      return JSON.parse(this.$store.state.usuario.dados.personagem)
    }
  },

  data: () => ({
    showPicker: false,
    bodyColor: null,
    eyeColor: null,
    hairColor: null,
    charHair: null,
    charHead: null,
    charTop: null,
    charBottom: null,
    ownedItems: {
      head: [ 'cultist', 'blue-armor', 'red-armor', 'wills'],
      top: ['cultist', 'blue-armor', 'red-armor', 'wills', 'shirt'],
      bottom: ['blue-armor', 'red-armor', 'wills', 'black-pants']
    },
    currentPicker: 0,
    colorPickers: ['body', 'hair', 'eye'],
    inventoryTab: 0,
    inventoryTabs: [{ title: 'cabeça', value: 'head' },{ title: 'Corpo', value: 'top' },{ title: 'pernas', value: 'bottom' }],
  }),

  watch: {
    showPicker (value) {
      if (!value) {
        this.salvarPersonagem()
      }
    }
  },

  methods: {
    carregarPersonagem () {
      const keys = Object.keys(this.personagem)
      keys.forEach(key => {
        this[key] = this.personagem[key]
      })
    },

    async salvarPersonagem () {
      const personagem = {
        bodyColor: this.bodyColor,
        eyeColor: this.eyeColor,
        hairColor: this.hairColor,
        charHair: this.charHair,
        charHead: this.charHead,
        charTop: this.charTop,
        charBottom: this.charBottom,
      }
      const options = { personagem: JSON.stringify(personagem), id:this.usuario.id }
      try {
        await Usuario.salvar(options)
      } catch (error) {
        // n faz nada
      }
    },

    selectHair (number) {
      if (this.charHair === number) return
      this.charHair = number

      setTimeout(() => {
        this.renderCanvas('hair')
      }, 100)
    },

    changeHair (action) {
      if (action === 'next') {
        if (this.charHair === 22) {
          this.charHair = 1
        } else {
          this.charHair += 1
        }
      } else {
        if (parseInt(this.charHair) === 1) {
          this.charHair = 22
        } else {
          this.charHair -= 1
        }
      }

      setTimeout(() => {
        this.renderCanvas('hair')
      }, 100)
      this.salvarPersonagem()
    },

    colorPick (which) {
      this.currentPicker = this.colorPickers.indexOf(which)
      this.showPicker = true
    },
    
    selectItem (bPart, item) {
      const capitalizedBP = bPart.charAt(0).toUpperCase() + bPart.slice(1)
      if (this[`char${capitalizedBP}`] === item) this[`char${capitalizedBP}`] = null
      else this[`char${capitalizedBP}`] = item
      this.salvarPersonagem()
    },

    renderCanvas (name) {
      const spritefont = document.getElementById(`source-${name}`)
      const fontCanvas = document.getElementById(`canvas-${name}`)
      const fontContext = fontCanvas.getContext('2d')
      const color = this[`${name}Color`]

      fontCanvas.width = 300
      fontCanvas.height = spritefont.height

      fontContext.fillStyle = 'black'
      fontContext.fillRect(0, 0, fontCanvas.width, fontCanvas.height)
      fontContext.drawImage(spritefont, 0, 0)
        
      fontContext.globalCompositeOperation = 'multiply'
      fontContext.fillStyle = color
      fontContext.fillRect(0, 0, fontCanvas.width, fontCanvas.height)

      fontContext.globalCompositeOperation = 'destination-atop'
      fontContext.drawImage(spritefont, 0, 0)

    }
  }
}
</script>

<style lang="sass" scoped>
.lvl-bar
  display: flex
  margin-left: auto
  margin-right: auto

#user-info
  width: 100%
  position: relative
  margin-left: auto
  margin-right: auto
  .v-progress-linear
    width: 200px !important
    margin-left: auto
    margin-right: auto
  .v-btn
    position: absolute
    left: 20px
    top: -7px

#color-btns
  position: absolute
  top: 80px
  left: 150px
    
#hair
  position: absolute
  top: 80px
  left: 0px
  z-index: 4
  &-next
    @extend #hair
    left: 110px
  &-previous
    @extend #hair
    left: 8px

#inventory-btn
  position: absolute
  top: 130px
  left: 130px

#char
  position: absolute
  z-index: 2
  top: 0px
  left: 22px
  &-eye-whites
    @extend #char
    left: 21px
  &-head // capacete ou chapeu
    @extend #char
    z-index: 4
  &-top // armadura ou roupa
    @extend #char
    z-index: 3
  &-bottom // pernas
    @extend #char
    z-index: 2

#canvas
  position: absolute
  left: 25px
  top: 0px
  z-index: 2
  width: 100px
  height: 135px
  &-hair
    @extend #canvas
    z-index: 4
  &-body
    @extend #canvas
  &-eye
    @extend #canvas

#character_wrapper
  width: 180px
  height: 170px
  position: relative

.vertical-slider
  display: flex
  max-width: inherit
  overflow: hidden
  overflow-x: scroll
  scrollbar-width: none
  &::-webkit-scrollbar
    display: none
:deep(.v-color-picker__alpha)
  display: none !important

:deep(.v-color-picker__preview:not(.v-color-picker__preview--hide-alpha) .v-color-picker__hue)
  margin-bottom: 0px !important

.colortitle
  align-self: center !important
  margin-left: 5px
</style>