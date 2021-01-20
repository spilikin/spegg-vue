<template>
  <v-app>
  <v-navigation-drawer app width="325">
    <SubjectsNavigation v-on:errorOccured="errorOccured($event)"/>
  </v-navigation-drawer>

  <v-app-bar app absolute>
    <div v-if="info != undefined">
      <strong>{{ productInfo.versions }}</strong> versions of <strong>{{ productInfo.count }}</strong> products.
      <strong>{{ providerInfo.versions }}</strong> versions of <strong>{{ providerInfo.count }}</strong> providers.
    </div>
    <v-spacer/>
    <span class="font-weight-black">Spegg <strong v-if="info != undefined">v{{ info.version }}</strong></span>
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
import APIClient from './logic/Client';
import { InfoResource, InfoSubjectTypeResource } from './logic/Resources';

const api = new APIClient()

@Component({
  components: {
    SubjectsNavigation
  },
})
export default class App extends Vue {
  private showingError = false;
  private error = "";
  private drawer = true;
  private info: InfoResource | null = null;
  private productInfo: InfoSubjectTypeResource | undefined
  private providerInfo: InfoSubjectTypeResource | undefined

  mounted () {
    api.info().then((response) => {
        this.info = response.data
        this.productInfo = this.info?.subjects.find(subj => subj.type == 'Product');
        this.providerInfo = this.info?.subjects.find(subj => subj.type == 'Provider');
    })
    .catch((e) => {
        this.$emit('errorOccured', e.message)
        console.error(e);
    });    
  }

  errorOccured(error: string) {
    this.error = error;
    this.showingError = true;
  }
}
</script>
