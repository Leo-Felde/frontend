<template>
    <v-list v-if="items.length">
        <v-list-item
        v-for="task in items"
        :key="task.id"
        :class="`quest-item-${task.color} my-2 py-0`"
        >
            <v-img :src="require(`@/assets/img/${task.color}border.svg`)" v-for="n in 4" :key="n" :id="`sm-border-deco-${n}`" />
            <v-list-item-avatar>
                <v-icon>
                    {{ task.icon }}
                </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title class="d-flex justify-start"> {{ task.title }} </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
                <span class="green--text" v-if="task.xp">+{{ task.xp }}xp</span>
                <span class="orange--text" v-if="task.money"> {{ task.money }}<v-icon color="orange"> mdi-circle-multiple </v-icon></span>
            </v-list-item-action>
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
::v-deep
    .v-list-item
        background: #fbf2eb
</style>