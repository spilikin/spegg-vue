<template>
    <div class="pa-3">
      <div class="text-h3">Specification Navigator</div>



      <v-tabs v-model="activeTab">
        <v-tab v-for="title in ['Products', 'Providers']" :key="title">{{title}}</v-tab>
        <v-tab>Resources</v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTab">
        <v-tab-item v-for="type in ['Product', 'Provider']" :key="type">
          <v-card>
            <v-card-title>
              <v-container>
                  <v-row no-gutters>
                    <v-col>        
                      <v-switch
                        dense
                        light
                        prepend-icon="mdi-clock-outline"
                        right
                        v-model="showPending"
                        color="orange"
                        label="Pending versions"
                      ></v-switch>
                    </v-col>
                    <v-col>
                      <v-switch
                        right
                        v-model="showValidActive"
                        color="blue"
                        prepend-icon="mdi-check-decagram"
                        label="Active versions"
                      ></v-switch>
                    </v-col>
                    <v-col>
                      <v-switch
                        right
                        v-model="showValidFrozen"
                        color="blue"
                        prepend-icon="mdi-checkbox-blank-circle-outline"
                        label="Frozen versions"
                      ></v-switch>
                    </v-col>
                    <v-col>
                      <v-switch
                        right
                        v-model="showInvalid"
                        color="gray"
                        prepend-icon="mdi-cancel"
                        label="Invalid versions"
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
            :items="subjectsByType(type)"
            :search="searchSubjects"
            item-key="id"
            sort-by="id"
            class="ma-3"
            >

              <template v-slot:item.id="{ item }">
                <router-link :to="{ name: 'Subject', params: { id: item.id, version: item.latest_version }}">
                {{item.id}}
                </router-link>
                        
              </template>
              <template v-slot:item.versions="{ item }">
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
                        :color="subjectVersionColor(version)"
                        :text-color="subjectVersionTextColor(version)"
                        :to="{ name: 'Subject', params: { id: item.id, version: version.version }}"
                        outlined
                      >
                      <v-icon left>{{subjectVersionIcon(version)}}</v-icon>
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

        <v-tab-item>
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
          </v-card>
        </v-tab-item>

      </v-tabs-items>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import APIClient from '@/logic/Client'
import { SubjectResource, SubjectVersionValidity, SubjectVersionShortResource} from '@/logic/Resources'

const api = new APIClient()


@Component({
  components: {
  },
})
export default class Home extends Vue {
  private subjects = Array<SubjectResource>()
  private resources = []
  private activeTab = "products"
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

  subjectsByType(type: string) {
    return this.subjects.filter(subject => {
      return (subject.id.toLowerCase().includes(this.searchSubjects.toLowerCase())
                || subject.title.toLowerCase().includes(this.searchSubjects.toLowerCase()) )
        && subject.type == type
    })
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

  subjectVersionColor(subjectVersion: SubjectVersionShortResource) {

    switch(subjectVersion.validity) {
      case SubjectVersionValidity.Unspecified:
        return "disabled"
      case  SubjectVersionValidity.ValidFrozen:
      case  SubjectVersionValidity.ValidActive:
        return "primary"
      case SubjectVersionValidity.Invalid:
        return "disabled"
      default:
        return ""
    }
  }

  subjectVersionIcon(subjectVersion: SubjectVersionShortResource) {

    switch(subjectVersion.validity) {
      case  SubjectVersionValidity.Pending:
        return "mdi-circle-edit-outline"
      case  SubjectVersionValidity.ValidActive:
        return "mdi-check-decagram"
      case  SubjectVersionValidity.ValidFrozen:
        return "mdi-checkbox-blank-circle-outline"
      case  SubjectVersionValidity.Unspecified:
        return "mdi-help-circle-outline"
      case SubjectVersionValidity.Invalid:
        return "mdi-cancel"
      default:
        return ""
    }
  }

  subjectVersionTextColor(subjectVersion: SubjectVersionShortResource) {

    switch(subjectVersion.validity) {
      case  SubjectVersionValidity.Pending:
        return "orange"
      case  SubjectVersionValidity.Unspecified:
        return "grey"
      case  SubjectVersionValidity.Invalid:
        return "grey"
      default:
        return ""
    }
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
