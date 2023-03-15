<template>
    <v-list v-if="items.length" class="pt-0">
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

.v-list
  overflow-y: scroll
</style>