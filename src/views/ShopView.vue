<template>
    <v-card class="pa-2 ma-5">
      <v-row cols="12">
        <v-col>
          <v-card class="grey lighten-3 d-flex" height="60px" elevation="0">
            <span class="ma-auto caption grey--text"> Loja </span>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="my-2"/>
      <v-row cols="12">
        <v-col cols="12" sm="3" v-for="i in 12" :key="i">
          <v-card class="grey lighten-3 d-flex" elevation="0" height="50px">
            <span class="ma-auto caption grey--text"> item </span>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </template>
  
<script>
// @ is an alias to /src
  
export default {
  name: 'tasksIndex',
  components: {
  }
}
</script>
  