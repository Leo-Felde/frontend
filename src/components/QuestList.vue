<template>
    <v-list v-if="items.length">
        <v-list-item
        v-for="task in items"
        :key="task.id"
        class="my-2"
        >
        <StylizedCard paper :color="task.color" content-class="d-flex px-2" width="100%" :no-deco="false">
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
                <span class="orange--text text--accent-2" v-if="task.money"> {{ task.money }}<v-icon color="orange accent-2"> mdi-circle-multiple </v-icon></span>
            </v-list-item-action>
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