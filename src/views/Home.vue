<template>
    <div class="pa-3">
      <div class="text-h3">Specification Navigator</div>

      <v-tabs v-model="activeTab">
        <v-tab v-for="tab in subjectTabs" :key="tab.type" :to="'#'+tab.type">{{tab.title}}</v-tab>
        <v-tab to="#Resource">Resources</v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTab">
        <v-tab-item v-for="tab in subjectTabs" :key="tab.type" :value="tab.type">
          <v-card>
            <v-card-title>
              <v-container>
                  <v-row no-gutters>
                    <v-col>        
                      <v-switch
                        :prepend-icon="subjectVersionValidityIcon('Pending')"
                        :color="subjectVersionValidityTextColor('Pending')"
                        right
                        v-model="showPending"
                        label="Pending"
                      ></v-switch>
                    </v-col>
                    <v-col>
                      <v-switch
                        :prepend-icon="subjectVersionValidityIcon('ValidActive')"
                        :color="subjectVersionValidityTextColor('ValidActive')"
                        right
                        v-model="showValidActive"
                        label="Active"
                      ></v-switch>
                    </v-col>
                    <v-col>
                      <v-switch
                        :prepend-icon="subjectVersionValidityIcon('ValidFrozen')"
                        :color="subjectVersionValidityTextColor('ValidFrozen')"
                        right
                        v-model="showValidFrozen"
                        label="Frozen"
                      ></v-switch>
                    </v-col>
                    <v-col>
                      <v-switch
                        :prepend-icon="subjectVersionValidityIcon('Invalid')"
                        :color="subjectVersionValidityTextColor('Invalid')"
                        right
                        v-model="showInvalid"
                        label="Invalid"
                      ></v-switch>
                    </v-col>
                    <v-col>
                      <v-spacer/>
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        v-model="searchSubjects"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-col>
                  </v-row>
              </v-container>

            </v-card-title>

            <v-data-table
            dense
            hide-default-footer
            disable-pagination
            :headers="subjectHeaders"
            :items="subjectsByType(tab.type)"
            :search="searchSubjects"
            item-key="id"
            sort-by="id"
            class="ma-3"
            >

              <template v-slot:[`item.id`]="{ item }">
                <router-link :to="{ name: 'Subject', params: { id: item.id, version: item.latest_version }}">
                {{item.id}}
                </router-link>
                        
              </template>
              <template v-slot:[`item.versions`]="{ item }">
                <table>
                  <tr>
                    <td
                      v-for="validity in activeValidities()"
                      v-bind:key="validity.toString()"
                      valign="top" 
                      >
                      <div 
                        v-for="version in subjectVersionsByValidity(item, validity)"
                        v-bind:key="version.version" 
                        >
                      <v-chip 
                        class="ma-1" 
                        :text-color="subjectVersionValidityTextColor(version.validity)"
                        :color="subjectVersionValidityColor(version.validity)"
                        
                        :to="{ name: 'Subject', params: { id: item.id, version: version.version }}"
                        outlined
                      >
                      <v-icon left>{{subjectVersionValidityIcon(version.validity)}}</v-icon>
                        {{ version.version }}
                      </v-chip>
                      </div>
                    </td>
                  </tr>
                </table>
              </template>
            </v-data-table>
          </v-card>

        </v-tab-item>

        <v-tab-item value="Resource">
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="searchResources"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

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

                <template v-slot:[`item.id`]="{ item }">
                  <router-link :to="{ name: 'Resource', params: { resource_id: item.id, resource_version: item.latest_version }}">
                  {{item.id}}
                  </router-link>
                        
                </template>

                <template v-slot:[`item.versions`]="{ item }">
                  <v-chip 
                    v-for="version in item.versions" 
                    :key="version.id" 
                    class="ma-1" 
                    color="primary"
                    outlined
                    :to="{ name: 'Resource', params: { resource_id: item.id, resource_version: version.version }}"
                  >
                    {{ version.version }}
                  </v-chip>
                </template>
              </v-data-table>
          </v-card>
        </v-tab-item>

      </v-tabs-items>

    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import APIClient from '@/logic/Client'
import { SubjectResource, SubjectVersionValidity, SubjectVersionShortResource} from '@/logic/Resources'
import { mixins } from 'vue-class-component'
import SubjectVersionValidityMixin from './SubjectVersionValidityMixin'

const api = new APIClient()


@Component
export default class Home extends mixins(SubjectVersionValidityMixin) {
  private subjects = Array<SubjectResource>()
  private resources = []
  private activeTab = 'Product'
  private searchSubjects = ""
  private searchResources = ""
  private showPending = true
  private showValidActive = true
  private showValidFrozen = true
  private showInvalid = false

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

  private subjectTabs = [
    {
      title: "Products",
      type: "Product",
    },
    {
      title: "Providers",
      type: "Provider",
    },
  ]

  subjectsByType(type: string) {
    return this.subjects.filter(subject => {
      return (subject.id.toLowerCase().includes(this.searchSubjects.toLowerCase())
                || subject.title.toLowerCase().includes(this.searchSubjects.toLowerCase()) )
        && subject.type == type
    })
  }

  @Watch('$route', { immediate: true, deep: true })
  onRoute() {
    if (window.location.hash == '#Resources') {
      this.activeTab = 'Resource'
    }
  }

  mounted() {
    api.getAllSubjects().then((response) => {
        const subjects: Array<SubjectResource> = response.data
        subjects.forEach(subject => {
          subject.versions.sort( (a, b) => 
            b.version.localeCompare(a.version)
          )
        });
        this.subjects = subjects

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

  subjectVersionsByValidity(subjectVersion: SubjectResource, validity: SubjectVersionValidity) {
    return subjectVersion.versions.filter( version => version.validity == validity)
  }

  activeValidities() {
    const result = Array<SubjectVersionValidity>()
    if (this.showPending) result.push(SubjectVersionValidity.Pending)
    if (this.showValidActive) result.push(SubjectVersionValidity.ValidActive)
    if (this.showValidFrozen) result.push(SubjectVersionValidity.ValidFrozen)
    if (this.showInvalid) {
      result.push(SubjectVersionValidity.Invalid)
      result.push(SubjectVersionValidity.Unspecified)
    }
    return result
  }

}
</script>
