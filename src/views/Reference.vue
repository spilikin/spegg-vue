<template>
    <div class="pa-3">
        <div v-if='loaded'>

            <v-breadcrumbs
                :items="breadcrumbs()"
                divider="/"
            ></v-breadcrumbs>            
            <p class="text-h4">Requirements <b>{{reference.subject_id}} v{{reference.subject_version}}</b> </p>
            
            <div>
                <v-chip
                    v-for="version in subjectVersion.versions" 
                    :key="version.version"
                    :to="{ name: 'Reference', params: { 
                        subject_id: reference.subject_id, 
                        subject_version:  version.version,
                        resource_id: reference.resource.id
                    }}"
                    class="ma-2"
                    active-class="primary"
                >
                    <v-icon left>{{subjectVersionValidityIcon(version.validity)}}</v-icon>
                    {{version.version}}
                </v-chip>
            </div>
            
            <v-expansion-panels multiple  v-model="panel">
                <v-expansion-panel>
                    <v-expansion-panel-header class="text-h6">Resource</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-container fluid>
                            <v-row>
                                <v-col cols="5">
                                    <v-select
                                        :items="references()"
                                        label="References"
                                        solo
                                        v-model="selectedReference"
                                        v-on:change="changeReference"                

                                    ></v-select>
                                    Link: <a target="_blank" :href="reference.url">{{reference.resource.id}} v{{reference.version}}</a>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="5" align="center">
                                    
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                    <v-expansion-panel-header class="text-h6">Compare</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-container fluid>
                            <v-row>
                                <v-col cols="5">
                                    <v-combobox
                                        v-model="compareSubject"
                                        :items="subjects"
                                        item-text="id"
                                        menu-props="auto"
                                        label="Subject"
                                        @change="onChangeCompareSubjectId()"
                                    ></v-combobox>
                                </v-col>
                                <v-col>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="5">
                                    <v-select
                                        v-model="compareVersion"
                                        :items="compareVersions"
                                        menu-props="auto"
                                        label="Subject version"
                                    ></v-select>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn 
                                        depressed 
                                        @click="compare()"
                                        :disabled="compareVersion == ''"
                                    >Compare</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>

            <v-card
            :id="req.id"
            v-for="(req, i) in reference.requirements"
            :ref="req.id"
            :key="i"
            :class="requirementClasses(req)"
            >
            <v-card-title>{{req.id}} {{req.title}}</v-card-title>
            <v-card-text>
                <div v-html='req.html'/>

                <div class="RemovedText" v-if="req.diff != null && req.diff.type == 'Changed'" v-html='req.diff.changes.html'/>
            </v-card-text>

            </v-card>

        </div>
    </div>
</template>


<script lang="ts">
import { Component, Mixins, Vue, Watch } from 'vue-property-decorator';
import APIClient from '@/logic/Client'
import { SubjectResource, SubjectVersionResource, SubjectVersionShortResource } from '@/logic/Resources';
import SubjectVersionValidityMixin from './SubjectVersionValidityMixin';

const api = new APIClient()

@Component
export default class ReferenceView extends Mixins(SubjectVersionValidityMixin) {
    private loaded = false
    private subjectVersion: SubjectVersionResource | null = null
    private subjects: Array<SubjectResource> = []
    private reference: any = null
    private selectedReference = ""
    private compareVersion = ""
    private compareVersions: { value: string; text: string }[] = []
    private compareSubject?: SubjectResource
    private compareSubjectId?: string
    private compareResourceId?: string
    private panel: Array<number> = []

    @Watch('$route', { immediate: true, deep: true })
    onRoute() {
        this.selectedReference = this.$route.params.resource_id
        this.compareVersion = this.$route.query.compare_version as string
        this.compareSubjectId = this.$route.query.compare_subject_id as string
        this.compareResourceId = this.$route.query.compare_resource_id as string

        if (this.compareVersion) {
            console.log(this.compareVersion)
            this.panel = [1]
        }

        api.getSubjectVersion(
            this.$route.params.subject_id, 
            this.$route.params.subject_version
        ).then((response) => {
            this.subjectVersion = response.data
            this.subjectVersion!.versions.sort( (a, b) => {
                return a.version.localeCompare(b.version)
            })
            return api.getReference(
            this.subjectVersion!.subject.id, 
            this.subjectVersion!.version, 
            this.$route.params.resource_id,
            this.compareVersion,
            this.compareSubjectId,
            this.compareResourceId)
        })
        .then((response) => {
            this.reference = response.data;
            this.$nextTick(() => {
                this.goto(this.anchor())
            });

            return api.getAllSubjects()
        })
        .then((response) => {
            this.subjects = response.data
            let compareSubjectId: string
            if (this.compareSubjectId) {
                compareSubjectId = this.compareSubjectId!
            } else {
                compareSubjectId = this.subjectVersion!.subject.id
            }
            this.subjects.forEach( (subject) => {
                if (subject.id == compareSubjectId) {
                    this.compareSubject = subject
                    this.compareSubjectId = subject.id
                }
          })
          this.updateCompareVersions()
          this.loaded = true
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
          text: this.subjectVersion!.subject.id + " v" + this.subjectVersion!.version,
          exact: true,
          to: 
            {
                name: 'Subject', 
                params: { 
                    id: this.reference.subject_id, 
                    version: this.reference.subject_version
                }
            }
        })
        items.push({
            text: this.reference.resource.id
        })
        return items;
    }

    anchor() {
        return window.location.hash
    }

    references() {
        return this.subjectVersion!.references.map( (ref: any) => { 
            return {
                value: ref.resource.id,
                text: `${ref.resource.id} - ${ref.resource.title}`
            }
        })

    }

    changeReference(resourceId: string) {
        this.$router.push({ params: {'resource_id': resourceId} })
    }

    compare() {
        if (this.$route.query['compare_version'] != this.compareVersion 
            || this.$route.query['compare_subject_id'] != this.compareSubjectId) {
            this.$router.push({ 
                name: 'Reference', 
                params: { 
                    'subject_id': this.subjectVersion!.subject.id, 
                    'subject_version': this.subjectVersion!.version,
                    'resource_id': this.reference.resource.id,
                },
                query: {
                    'compare_version': this.compareVersion,
                    'compare_subject_id': this.compareSubjectId,
                    'compare_resource_id': this.compareResourceId,
                }
            })
        }
    }

    requirementClasses(req: any) {
        if (this.anchor().endsWith(req.id)) {
            return 'blue lighten-4'
        } else if (req.diff == null) {
            return ''
        } else if (req.diff.type == 'Removed' ) {
            return 'RemovedRequirement'
        } else if (req.diff.type == 'Changed' ) {
            return 'ChangedRequirement'
        } else if (req.diff.type == 'Added' ) {
            return 'AddedRequirement'
        }
    }

    goto(anchor: string) {
        if (!anchor.startsWith('#')) {
            return
        }

        const req = anchor.substring(1)

        if (!(req in this.$refs)) {
            return
        }

        const refs = this.$refs[req] as Array<Vue>
        this.$vuetify.goTo(refs[0])
    }

    updateCompareVersions() {
        this.compareVersions = this.compareSubject!.versions.map( (v: SubjectVersionShortResource) => { 
            return {
                value: v.version,
                text: v.version
            }
        })        
    }

    onChangeCompareSubjectId() {
        this.compareSubjectId = this.compareSubject?.id
        this.compareVersion = ""
        this.updateCompareVersions()
    }

}
</script>
<style scoped>
.RemovedText {
    color: red;
    background-color: #FFCDD2;
}
.RemovedRequirement {
    border-left: 15px #F44336 solid;
    background-color: #FFCDD2;
}
.ChangedRequirement {
    border-left: 15px #FFD600 solid;
    background-color: #FFF9C4;
}
.AddedRequirement {
    border-left: 15px #4CAF50 solid;
    background-color: #C8E6C9;
}
</style>