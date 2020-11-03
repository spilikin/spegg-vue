<template>

    <div class="pa-3">
        <v-skeleton-loader
            v-if="subjectVersion == null"
            type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
        ></v-skeleton-loader>
        <div v-if="subjectVersion">
            <v-breadcrumbs
                :items="breadcrumbs()"
                divider="/"
            ></v-breadcrumbs>
            <div>
                <span class="text-h4">{{subjectVersion.subject.title}}</span>
            </div>
            <div>
                <v-chip
                    v-for="version in subjectVersion.versions" 
                    :key="version.version"
                    :to="{ name: 'Subject', params: { id: subjectVersion.subject.id, version: version.version }}"
                    active-class="primary"
                    class="ma-2"
                >
                 <v-icon left>{{subjectVersionValidityIcon(version.validity)}}</v-icon>
                    {{version.version}}
                </v-chip>
            </div>

            <v-container fluid>
                <v-row>
                    <v-col cols="3">
                        <v-select
                            v-model="subjectVersion.version"
                            :items="subjectVersion.versions"
                            item-text="version"
                            item-value="version"                            
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
                            :items="subjectVersion.versions"
                            item-text="version"
                            item-value="version"                            
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
            :items="subjectVersion.references"
            :search="searchResources"
            :item-class="referenceClass"
            item-key="subject.id"
            sort-by="subject.id"
            class="elevation-1 ma-3"
            @click:row="onClickResourceReference"
            >
            
                <template v-slot:[`item.requirements_count`]="{ item }">
                <v-chip
                    class="ma-2 pill"
                    color="orange"
                    outlined
                    pill
                    v-if="item.requirements_count > 0"
                >
                    {{ item.requirements_count }} Requirements
                    <v-icon right>
                        mdi-chevron-right
                    </v-icon>
                </v-chip>
                </template>

                <template v-slot:[`item.resource.title`]="{ item }">
                    <span>{{ item.resource.title }}</span>
                </template>
                <template v-slot:[`item.resource.id`]="{ item }">
                    <a v-if="item.url != null" target="_blank" :href="item.url">{{ item.resource.id }}</a>
                    <span v-else>{{ item.resource.id }}</span>
                </template>
                <template v-slot:[`item.version`]="{ item }">
                    <span :class="{'RemovedVersion': item.diff && item.diff.type == 'Removed'}">{{item.version}}</span>
                    <span v-if="item.diff && item.diff.changes && item.diff.changes.version" class="RemovedVersion"> {{item.diff.changes.version}}</span>
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
import { Component, Mixins, Vue, Watch } from 'vue-property-decorator';
import APIClient from '@/logic/Client'
import { ReferenceShortResource, SubjectVersionResource } from '@/logic/Resources'
import SubjectVersionValidityMixin from './SubjectVersionValidityMixin';

const api = new APIClient()

@Component
export default class SubjectView extends Mixins(SubjectVersionValidityMixin) { 
    private searchResources = ""
    private subjectVersion: SubjectVersionResource | null = null
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
        this.subjectVersion = null
        this.compareVersion = this.$route.query.compare as string
        api.getSubjectVersion(this.$route.params.id, this.$route.params.version, this.compareVersion).then((response) => {
            this.subjectVersion = response.data
            this.subjectVersion!.versions.sort( (a, b) => {
                return a.version.localeCompare(b.version)
            })
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
        if (this.subjectVersion != null) {
            items.push({
            text: this.subjectVersion.subject.id,
            to: '/Subject/'+this.subjectVersion.subject.id,
            })
        }
        return items;
    }

  compare() {
      if (this.subjectVersion != null && this.$route.query['compare'] != this.compareVersion) {
        this.$router.push({
            name: 'Subject', 
            params: {'subject_id': this.subjectVersion.subject.id, version: this.subjectVersion.version}, 
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

  onClickResourceReference(reference: ReferenceShortResource ) {
    if (this.subjectVersion == null) return;
    if ( (reference.diff && (reference.diff.type == 'Removed' || reference.diff.type == 'Added') ) ) return;
    const link = { 
        name: 'Reference', 
        params: {
            'subject_id': this.subjectVersion.subject.id, 
            'subject_version':  this.subjectVersion.version,
            'resource_id': reference.resource.id
        },
        query: {
            compare: this.compareVersion
        }
    }
    this.$router.push(link)
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