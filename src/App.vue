<template>
  <v-app>
  <v-navigation-drawer app width="325">
    <SubjectsNavigation v-on:errorOccured="errorOccured($event)"/>
  </v-navigation-drawer>

  <v-app-bar app>
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

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>

  <!--
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-right
      flat
      height="72"
    >
      <v-alert v-model="showingError" type="error" icon="mdi-alert" dismissible>{{error}}</v-alert>
      <v-spacer></v-spacer>

      <v-responsive max-width="156">
        <v-text-field
          dense
          flat
          hide-details
          rounded
          solo-inverted
        ></v-text-field>
      </v-responsive>
    </v-app-bar>

    
    <v-navigation-drawer
      app
      width="22em"
    >

     <v-navigation-drawer
        v-model="drawer"
        absolute
        color="grey lighten-3"
        mini-variant
      >
        <v-avatar
          class="d-block text-center mx-auto mt-4"
          size="48"
        >
          <img src="@/assets/logo.png"/>
        </v-avatar>

        <v-divider class="mx-3 my-5"></v-divider>
    
        <v-icon
          large
          class="d-block text-center mx-auto mb-9"
          color="primary darken-2"
        >
          mdi-domain
        </v-icon>

        <v-icon
          large
          class="d-block text-center mx-auto mb-9"
          color="green darken-2"
        >
          mdi-file-tree-outline
        </v-icon>

        <v-icon
          large
          class="d-block text-center mx-auto mb-9"
          color="red darken-2"
        >
          mdi-file-document-edit
        </v-icon>

      </v-navigation-drawer>

      <SubjectsNavigation v-on:errorOccured="errorOccured($event)"/>
    </v-navigation-drawer>

    <v-main>
      <router-view v-on:errorOccured="errorOccured($event)"/>
    </v-main>

  </v-app>
  -->
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
