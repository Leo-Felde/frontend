<template>
  <v-dialog
    v-model="dialog"
    :max-width="maxWidth"
    @keydown.esc="cancel"
  >
    <StylizedCard brown no-borders>
      <StylizedCard black class="py-2">
          {{ title }}
      </StylizedCard>
      <v-card-text
        v-show="!!message"
        class="pa-4 black--text"
      >
      {{ message }}
    </v-card-text>

    <slot />
    
    <v-card-actions class="pt-3">
      <v-spacer></v-spacer>
      <v-btn
        v-if="!options.noconfirm && !okEntendi"
        text
        class="body-2 font-weight-bold mr-2"
        @click.native="cancel"
        >Cancelar</v-btn
      >
      <StylizedButton
        v-if="!okEntendi"
        color="blue"
        class="body-2 font-weight-bold"
        outlined
        @click.native="agree"
        >Confirmar</StylizedButton
      >
      <v-btn
        v-else
        text
        class="body-2 font-weight-bold mr-2"
        @click.native="cancel"
        >Ok, entendi</v-btn
      >
    </v-card-actions>
    </StylizedCard>
  </v-dialog>
</template>

<script>
import StylizedButton from './StylizedButton.vue'

export default {
  props: {
    persistent: { type: Boolean, default: true },
    maxWidth: { type: String, default: '280' },
    okEntendi: Boolean
  },
  data() {
    return {
      dialog: false,
      title: null,
      message: null,
      options: {
        color: 'grey lighten-3',
        noconfirm: false
      }
    }
  },
  methods: {
    open(title, message, options) {
      this.dialog = true
      this.title = title
      this.message = message
      this.options = Object.assign(this.options, options)
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    agree() {
      this.resolve(true)
      this.dialog = false
    },
    cancel() {
      this.resolve(false)
      this.dialog = false
    }
  },
  components: { StylizedButton }
}
</script>