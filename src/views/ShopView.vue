<template>
    <StylizedCard brown class="pa-2 ma-3">
      <v-card-title class="justify-center"> Lojinha </v-card-title>
      <v-row cols="12">
        <v-col cols="4">
          <StylizedCard brown-light content-class="d-flex" width="100%" height="80px" no-borders>
            <span class="ma-auto caption grey--text"> foto agui </span>
          </StylizedCard>
        </v-col>
        <v-col cols="8" class="text-start">
          <span class="caption"> Oi, bem vindo a lojinha do Predo </span>
          <div>
            <span class="orange--text text--accent-2 caption"> 2 <v-icon small color="orange accent-2"> mdi-circle-multiple </v-icon></span>
          </div>
        </v-col>
      </v-row>
      <v-divider class="my-2"/>
      <v-row cols="12">
        <v-col cols="4" v-for="i in 12" :key="i">
          <StylizedCard black content-class="d-flex" height="50px">
            <span class="ma-auto caption grey--text"> item </span>
          </StylizedCard>
        </v-col>
      </v-row>
    </StylizedCard>
  </template>
  
<script>
// @ is an alias to /src
  
export default {
  name: 'tasksIndex',
  components: {
  }
}
</script>
  