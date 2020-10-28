<template>

    <div class="pa-3">
        <v-skeleton-loader
            v-if="subject == null"
            type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
        ></v-skeleton-loader>
        <div v-if="subject">
            <v-breadcrumbs
                :items="breadcrumbs()"
                divider="/"
            ></v-breadcrumbs>
            <div>
                <span class="text-h4">{{subject.title}}</span>
            </div>
            <div>
                <v-chip
                    v-for="version in versions" 
                    :key="version"
                    :to="{ name: 'Subject', params: { id: subject.subject_id, version: version }}"
                    class="ma-2"
                    active-class="primary"
                >
                    {{version}}
                </v-chip>
            </div>

            <v-container fluid>
                <v-row>
                    <v-col cols="3">
                        <v-select
                            v-model="subject.version"
                            :items="versions"
                            menu-props="auto"
                            label="Select version"
                            hide-details
                            single-line
                        ></v-select>
                    </v-col>
                    <v-col cols="1" align="center">
                         <v-icon large>mdi-compare-horizontal</v-icon>
                    </v-col>
                    <v-col cols="3">
                        <v-select
                            v-model="compareVersion"
                            :items="versions"
                            menu-props="auto"
                            label="Select version"
                            hide-details
                            single-line
                        ></v-select>
                    </v-col>
                    <v-col>
                        <v-btn 
                            depressed 
                            @click="compare()"
                            :disabled="compareVersion == ''"
                        >Compare</v-btn>
                    </v-col>
                </v-row>
            </v-container>

            <v-data-table
            dense
            hide-default-footer
            disable-pagination
            :headers="resourcesHeaders"
            :items="subject.references"
            :search="searchResources"
            :item-class="referenceClass"
            item-key="subject_id"
            sort-by="subject_id"
            class="elevation-1 ma-3"
            >
            
                <template v-slot:item.requirements_count="{ item }">
                <v-chip
                    class="ma-2 pill"
                    color="orange"
                    outlined
                    pill
                    
                    v-if="item.requirements_count > 0"
                    :to="{ name: 'Reference', params: { 
                        subject_id: subject.subject_id, 
                        subject_version:  subject.version,
                        resource_id: item.resource.id
                        },
                        query: {compare: compareVersion}
                        
                    }"
                >
                    {{ item.requirements_count }} Requirements
                    <v-icon right>
                        mdi-chevron-right
                    </v-icon>
                </v-chip>
                </template>

                <template v-slot:item.resource.title="{ item }">
                    <span>{{ item.resource.title }}</span>
                </template>
                <template v-slot:item.resource.id="{ item }">
                    <a v-if="item.url.startsWith('http')" target="_blank" :href="item.url">{{ item.resource.id }}</a>
                    <span v-else>{{ item.resource.id }}</span>
                </template>
                <template v-slot:item.version="{ item }">
                    <span :class="{'RemovedVersion': item.diff && item.diff.type == 'Removed'}">{{item.version}}</span>
                    <span v-if="item.diff && item.diff.changes.version" class="RemovedVersion"> {{item.diff.changes.version}}</span>
                </template>

                <template v-slot:top>
                    <v-text-field
                    v-model="searchResources"
                    label="Search"
                    class="mx-4"
                    ></v-text-field>
                </template>

            </v-data-table>
        </div>
    </div>


</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import APIClient from '@/logic/Client'

const api = new APIClient()

@Component({
  components: {
  },
})
export default class SubjectView extends Vue {
    private searchResources = ""
    private subject: any = null
    private versions: string[] = []
    private compareVersion?: string

    private resourcesHeaders = [  {
          text: 'Reference',
          value: 'resource.title',
        },
        {
          text: 'Resource',
          value: 'resource.id',
        },
        {
          text: 'Requirements',
          value: 'requirements_count',
        },
        {
          text: 'Version',
          value: 'version',
        },
        ];

    @Watch('$route', { immediate: true, deep: true })
    onRoute() {
        this.subject = null
        this.compareVersion = this.$route.query.compare as string
        api.getSubjectVersion(this.$route.params.id, this.$route.params.version, this.compareVersion).then((response) => {
            this.subject = response.data
            this.versions = this.subject.all_versions.sort()
        })
        .catch((e) => {
            this.$emit('errorOccured', e.message)
            console.log(e);
        });
    }

    breadcrumbs() {
        const items = []
        items.push({
          text: 'Home',
          to: '/',
        })
        items.push({
          text: this.subject.subject_id,
          to: '/Subject/'+this.subject.subject_id,
        })
        return items;
    }

  compare() {
      if (this.$route.query['compare'] != this.compareVersion) {
        this.$router.push({
            name: 'Subject', 
            params: {'subject_id': this.subject['subject_id'], version: this.subject.version}, 
            query: {compare: this.compareVersion}})    
      }
  }

  referenceClass(ref: any) {
      if (ref.diff == null) {
        return ''
      } else if (ref.diff.type == 'Removed' ) {
          return 'red lighten-5 Removed'
      } else if (ref.diff.type == 'Changed' ) {
          return 'yellow lighten-4 Changed'
      } else if (ref.diff.type == 'Added' ) {
          return 'green lighten-4'
      }
  }
}
</script>
<style scoped>
.pill {
    min-width: 4em;
}
.RemovedVersion {
    color: red;
    text-decoration: line-through;
}
</style>