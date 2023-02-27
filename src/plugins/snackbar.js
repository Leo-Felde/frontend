const snackbarPlugin = {
  install: (Vue, { store }) => {
    Vue.prototype.$snackbar = {
      showMessage: function ({
        content = '',
        color = ''
      }) {
        store.commit(
          'snackbar/showMessage',
          { content, color },
          { root: true }
        )
      }
    }
  },
}
export default snackbarPlugin
