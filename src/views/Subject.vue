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

            <div>
            </div>

            <div class="d-flex flex-wrap">
                <v-card elevation="0" >
                    <v-card-text>
                        <div class="fieldLabel">Subject ID</div>
                        <div class="fieldValue">{{subjectVersion.subject.id}}</div>
                    </v-card-text>
                </v-card>
                <v-card elevation="0" >
                    <v-card-text>
                        <div class="fieldLabel">Type</div>
                        <div class="fieldValue">{{subjectVersion.subject.type}}</div>
                    </v-card-text>
                </v-card>
                <v-card elevation="0" >
                    <v-card-text>
                        <div class="fieldLabel">Version</div>
                        <div class="fieldValue">{{subjectVersion.version}}</div>
                    </v-card-text>
                </v-card>
                <v-card elevation="0" >
                    <v-card-text>
                        <div class="fieldLabel">Validity</div>
                        <div class="fieldValue"><v-icon :color="subjectVersionValidityTextColor(subjectVersion.validity)">{{subjectVersionValidityIcon(subjectVersion.validity)}}</v-icon> {{subjectVersion.validity}}</div>
                    </v-card-text>
                </v-card>
                <v-card elevation="0" >
                    <v-card-text>
                        <div class="fieldLabel">References</div>
                        <div class="fieldValue">{{subjectVersion.references.length}}</div>
                    </v-card-text>
                </v-card>
                <v-card elevation="0" >
                    <v-card-text>
                        <div class="fieldLabel">Requirements</div>
                        <div class="fieldValue">{{totalRequirementCount}}</div>
                    </v-card-text>
                </v-card>
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
            :sort-by="['resource.type', 'resource.title']"
            class="elevation-1 ma-3"
            @click:row="onClickResourceReference"
            >
            
                <template v-slot:[`item.resource.type`]="{ item }">
                     <v-icon :color="resourceTypeColor(item.resource)">{{resourceTypeIcon(item.resource)}}</v-icon>
                </template>

                <template v-slot:[`item.requirements_count`]="{ item }">
                    <span v-if="item.requirements_count > 0">{{ item.requirements_count }}</span>
                </template>

                <template v-slot:[`item.resource.title`]="{ item }">
                    <span>{{ item.resource.title }}</span>
                </template>
                <template v-slot:[`item.resource.id`]="{ item }">
                    <a onclick="event.stopPropagation()" v-if="item.url != null" target="_blank" :href="item.url">{{ item.resource.id }}</a>
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
import { ReferenceShortResource, Resource, ResourceType, SubjectVersionResource } from '@/logic/Resources'
import SubjectVersionValidityMixin from './SubjectVersionValidityMixin';

const api = new APIClient()

@Component
export default class SubjectView extends Mixins(SubjectVersionValidityMixin) { 
    private searchResources = ""
    private subjectVersion: SubjectVersionResource | null = null
    private compareVersion?: string

    private resourcesHeaders = [  {
          text: 'Type',
          value: 'resource.type',
        },
        {
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

    get totalRequirementCount(): number { 
        return this.subjectVersion!.references.map(ref => ref.requirements_count).reduce( (total, count) => total = total + count )
    }

    @Watch('$route', { immediate: true, deep: true })
    onRoute() {
        this.subjectVersion = null
        this.compareVersion = this.$route.query.compare_version as string
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
        if (this.subjectVersion != null && this.$route.query['compare_version'] != this.compareVersion) {
        this.$router.push({
            name: 'Subject', 
            params: {'subject_id': this.subjectVersion.subject.id, version: this.subjectVersion.version}, 
            query: {'compare_version': this.compareVersion}})    
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
                'compare_version': this.compareVersion
            }
        }
        this.$router.push(link)
    }

    resourceTypeIcon(resource: Resource) {
        switch(resource.type) {
            case ResourceType.DescriptorDocument:
                return "mdi-file-certificate-outline"
            case ResourceType.InternalDocument:
                return "mdi-file-document-outline"
            default:
                return "mdi-file-outline"
        }        
    }
    resourceTypeColor(resource: Resource) {
        switch(resource.type) {
            case ResourceType.DescriptorDocument:
                return "blue"
            case ResourceType.InternalDocument:
                return "blue"
            default:
                return "disabled"
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
.fieldLabel {
    font-size: 0.8rem;
}
.fieldValue {
    font-size: 1.1rem;
    font-weight: 500 !important;    
}

</style>