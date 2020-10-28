<template>
    <div class="pa-3">
      <div class="text-h3">Specification Navigator</div>

      <v-tabs v-model="activeTab">
        <v-tab v-for="title in ['Products', 'Providers']" :key="title">{{title}}</v-tab>
        <v-tab>Resources</v-tab>
      </v-tabs>
      <v-tabs-items v-model="activeTab">
        <v-tab-item v-for="type in ['Product', 'Provider']" :key="type">
            <v-data-table
            dense
            hide-default-footer
            disable-pagination
            :headers="subjectHeaders"
            :items="subjectsByType(type)"
            :search="searchSubjects"
            item-key="id"
            sort-by="id"
            class="elevation-1 ma-3"
            >
              <template v-slot:item.versions="{ item }">
                <v-chip 
                  v-for="version in item.versions" 
                  v-bind:key="version" 
                  class="ma-1" 
                  color="primary"
                  outlined
                  :to="{ name: 'Subject', params: { id: item.id, version: version }}"

                >
                  {{ version }}
                </v-chip>
              </template>
            </v-data-table>
        </v-tab-item>

        <v-tab-item>
            <v-data-table
            dense
            hide-default-footer
            disable-pagination
            :headers="resourceHeaders"
            :items="resources"
            :search="searchResources"
            item-key="id"
            sort-by="id"
            class="elevation-1 ma-3"
            >
              <template v-slot:item.versions="{ item }">
                <v-chip 
                  v-for="version in item.versions" 
                  :key="version.id" 
                  class="ma-1" 
                  color="primary"
                  outlined
                >
                  {{ version.version }}
                </v-chip>
              </template>
            </v-data-table>
        </v-tab-item>

      </v-tabs-items>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import APIClient from '@/logic/Client'

const api = new APIClient()

@Component({
  components: {
  },
})
export default class Home extends Vue {
  private subjects = []
  private resources = []
  private activeTab = "products"
  private searchSubjects = ""
  private searchResources = ""

  private subjectHeaders = [
    {
      text: 'Id',
      value: 'id',
    },
    {
      text: 'Title',
      value: 'title',
    },
    {
      text: 'Versions',
      value: 'versions',
    },
  ];
  private resourceHeaders = [
    {
      text: 'Id',
      value: 'id',
    },
    {
      text: 'Title',
      value: 'title',
    },
    {
      text: 'Versions',
      value: 'versions',
    },
  ];

  subjectsByType(type: string) {
    return this.subjects.filter(subject => {
      return (subject.id.toLowerCase().includes(this.searchSubjects.toLowerCase())
                || subject.title.toLowerCase().includes(this.searchSubjects.toLowerCase()) )
        && subject.type == type
    })
  }

  mounted() {
    api.getAllSubjects().then((response) => {
        this.subjects = response.data
      })
      .catch((e) => {
        console.log(e);
      })
    api.getAllResources().then((response) => {
        this.resources = response.data
      })
      .catch((e) => {
        console.log(e);
      })
    
  }

}
</script>
