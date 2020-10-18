<template>
    <div class="pa-3">
        <div v-if='reference'>
            <v-breadcrumbs
                :items="breadcrumbs()"
                divider="/"
            ></v-breadcrumbs>            
            <p class="text-h4">Requirements <b>{{reference.subject_id}} v{{reference.subject_version}}</b> </p>
            
            <div>
                <v-chip
                    v-for="version in versions" 
                    :key="version"
                    :to="{ name: 'Reference', params: { 
                        subject_id: reference.subject_id, 
                        subject_version:  version,
                        resource_id: reference.resource.id
                    }}"
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

            <v-container fluid align="right">
                <v-row>
                    <v-col cols="7">
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
                    <v-col cols="7" align="center">
                        
                    </v-col>
                </v-row>
            </v-container>



            <v-card
            v-for="(req, i) in reference.requirements"
            :ref="req.id"
            :key="i"
            :class="requirementClasses(req)"
            >
            <v-card-title>{{req.id}} {{req.title}}</v-card-title>
            <v-card-text>
                <div v-html='req.html'/>
                <div v-if="req.diff != null && req.diff.type == 'Changed'" v-html='req.diff.changes.html'/>
            </v-card-text>

            </v-card>

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
export default class ReferenceView extends Vue {
    private subject: any = null
    private reference: any = null
    private versions: string[] = []
    private selectedReference = ""
    private compareVersion?: string
    @Watch('$route', { immediate: true, deep: true })
    onRoute() {
        this.selectedReference = this.$route.params.resource_id
        this.compareVersion = this.$route.query.compare as string

        api.getSubjectVersion(
            this.$route.params.subject_id, 
            this.$route.params.subject_version
        ).then((response) => {
            this.subject = response.data
            this.versions = this.subject.all_versions.sort()
            return api.getReference(
            this.subject.subject_id, 
            this.subject.version, 
            this.$route.params.resource_id,
            this.compareVersion)
        })
        .then((response) => {
            this.reference = response.data;
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
          text: this.subject.subject_id + " v" + this.subject.version,
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

        if (this.subject == null) {
            return []
        }
        

        return this.subject.references.map( (ref: any) => { 
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
        if (this.$route.query['compare'] != this.compareVersion) {
            this.$router.push({ 
                name: 'Reference', 
                params: { 
                    'subject_id': this.subject.subject_id, 
                    'subject_version': this.subject.version,
                    'resource_id': this.reference.resource.id,
                },
                query: {    
                    compare: this.compareVersion
                }
            })
        }
    }

    requirementClasses(req: any) {
        //{ 'blue lighten-4': anchor() == req.id }

        console.log(req)
      if (req.diff == null) {
        return ''
      } else if (req.diff.type == 'Removed' ) {
          return 'red lighten-5 Removed'
      } else if (req.diff.type == 'Changed' ) {
          return 'yellow lighten-4 Changed'
      } else if (req.diff.type == 'Added' ) {
          return 'green lighten-4'
      }
  }

}
</script>