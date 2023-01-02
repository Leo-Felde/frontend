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

            <span class="caption d-flex justify-start expiration" v-if="task.expiration"> 26/12 <v-icon x-small>mdi-clock</v-icon> </span>
            <div class="rewards caption">
                <span class="green--text" v-if="task.xp">+{{ task.xp }}xp</span>
                <span class="orange--text text--accent-2" v-if="task.money"> {{ task.money }}<v-icon color="orange accent-2" small> mdi-circle-multiple </v-icon></span>
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
    bottom: 0px
    left: 5px
</style>