<template>
  <div>
    <v-navigation-drawer v-model="drawer" temporary absolute v-if="!this.$vuetify.breakpoint.smAndDown">
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
    <v-divider/>
    <v-list dense>
        <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.to"
        >
        <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
        </v-list-item>
    </v-list>
    </v-navigation-drawer>

    <!-- navegação mobile -->
    <v-bottom-navigation v-else v-model="tab" color="primary" fixed class="pixel-card-top pt-4">
      <v-btn value="avatar" to="/character">
        <v-icon> mdi-human-male-height </v-icon>
      </v-btn>
      <v-btn value="stats" to="/stats">
        <v-icon> mdi-chart-bar </v-icon>
      </v-btn>
      <v-btn value="home" to="/home">
        <v-icon> mdi-view-dashboard-outline </v-icon>
      </v-btn>
      <v-btn value="tasks" to="/tasks">
        <v-icon> mdi-format-list-checkbox </v-icon>
      </v-btn>
      <v-btn value="shop" to="/shop">
        <v-icon> mdi-basket </v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: 'NavigationProvider',

  props: {
    value: Boolean
  },

  watch: {
    value (value) {
      this.drawer = value
    },

    drawer (value) {
      this.$emit('input', value)
    }
  },

  data: () => ({
    tab: 'recent',
    drawer: false,
    items: [
      { title: 'Home', icon: 'mdi-view-dashboard', to: '/home' },
      { title: 'About', icon: 'mdi-forum', to: '/about' }
    ]
  })
}
</Script>

<style lang="sass">

</style>
