<template>
  <v-app id="inspire">

    <v-app-bar
      app
      clipped-right
      flat
      height="72"
    >
      <v-alert :value="error != ''" type="error" icon="mdi-alert" dismissible>{{error}}</v-alert>
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

      <SubjectsNavigation v-on:errorOccured="error = $event"/>
    </v-navigation-drawer>

<!--
    <v-navigation-drawer
      app
      clipped
      right
    >
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          link
        >
          <v-list-item-content>
            <v-list-item-title>Item {{ n }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
-->
    <v-main>
      <router-view/>
    </v-main>

<!--
    <v-footer
      app
      color="transparent"
      height="72"
      inset
    >
      <v-text-field
        background-color="grey lighten-1"
        dense
        flat
        hide-details
        rounded
        solo
      ></v-text-field>
    </v-footer>
-->
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
  private error = "";
  private drawer = true;
}
</script>
