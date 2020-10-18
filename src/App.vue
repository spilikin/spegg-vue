<template>
  <v-app>
  <v-navigation-drawer app width="325">
    <SubjectsNavigation v-on:errorOccured="errorOccured($event)"/>
  </v-navigation-drawer>

  <v-app-bar app absolute>
    <v-spacer/>
    <span class="font-weight-black">Spegg</span>
    <v-avatar
      class="d-block text-center mx-auto mt-4"
      size="48"
    >
      <img src="@/assets/logo.png"/>
    </v-avatar>
  </v-app-bar>

  <v-main>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-main>

</v-app>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SubjectsNavigation from '@/views/SubjectsNavigation.vue';

@Component({
  components: {
    SubjectsNavigation
  },
})
export default class App extends Vue {
  private showingError = false;
  private error = "";
  private drawer = true;

  errorOccured(error: string) {
    this.error = error;
    this.showingError = true;
  }
}
</script>
