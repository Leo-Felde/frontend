<template>
    <v-list v-if="items.length">
        <v-list-item
        v-for="task in items"
        :key="task.id"
        class="my-2 px-1"
        >
        <StylizedCard paper :color="task.color" content-class="d-flex px-3" width="100%" :no-deco="false">
            <v-list-item-content class="mb-2">
                <v-list-item-title class="d-flex justify-start"> {{ task.title }} <v-icon v-if="task.icon" class="ml-2"> {{ task.icon }} </v-icon> </v-list-item-title>
                <span class="caption d-flex justify-start">Lorem ipsum dolor sit amet.</span>
            </v-list-item-content>

            
            <span class="d-flex justify-start expiration" v-if="task.expiration">
              {{ formatarData(task.expiration) }}
              <PixelIcon v-if="aboutToExpire(task.expiration)" icon="clock-alert" small />
              <PixelIcon v-else icon="clock" small />
            </span>
            <div class="rewards caption d-flex">
                <span class="green--text" v-if="task.xp">+{{ task.xp }}xp</span>
                <span class="orange--text ml-1 text--accent-2 d-flex" v-if="task.money"> {{ task.money }}<PixelIcon icon="coin-stack" x-small class="ml-1"/></span>
            </div>
        </StylizedCard>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
  name: 'QuestList',

  data: () => ({

  }),

  props: {
    items: { type: Array, required: true} 
  },

  methods: {
    formatarData (date) {
      const dateString = new Date(date).toLocaleDateString('pt-PT')
      return dateString.slice(0, 5)
    },

    aboutToExpire (date) {
      const date1 = new Date(date)
      var now = new Date()
      
      var timeDiff = Math.abs(date1.getTime() - now.getTime())
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) 

      return diffDays <= 1
    }
  }
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
</style>