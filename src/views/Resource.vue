<template>
    <div class="pa-3">

        <div v-if='resource != null'>
            <v-breadcrumbs
                :items="breadcrumbs()"
                divider="/"
            ></v-breadcrumbs>
            <div>
                <span class="text-h4">{{resource.resource.title}}</span>
            </div>

            <div>
                <v-chip
                    v-for="version in resource.versions" 
                    :key="version.version"
                    :to="{ name: 'Resource', params: { resource_id: resource.resource_id, resource_version: version.version }}"
                    class="ma-2"
                    active-class="primary"
                >
                    {{version.version}}
                </v-chip>

            <v-data-table
            dense
            hide-default-footer
            disable-pagination
            :headers="subjectsHeaders"
            :items="resource.referenced_by_subjects"
            :search="searchSubjects"
            sort-by="subject_id"
            class="elevation-1 ma-3"
            @click:row="onClickSubjectReference"
            >
            </v-data-table>

            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import APIClient from '@/logic/Client'
import { ResourceVersionResource, SubjectReferenceResource} from '@/logic/Resources'
const api = new APIClient()

@Component({
  components: {
  },
})
export default class ReferenceView extends Vue {
    private resource: ResourceVersionResource | null = null
    private searchSubjects = ""
    private subjectsHeaders = [  {
          text: 'Referred by',
          value: 'title',
        },
        {
          text: 'Subject',
          value: 'subject_id',
        },
        {
          text: 'Version',
          value: 'version',
        },
        {
          text: 'Validity',
          value: 'validity',
        },
        ];

    @Watch('$route', { immediate: true, deep: true })
    onRoute() {
        api.getResourceVersion(
            this.$route.params['resource_id'], 
            this.$route.params['resource_version']
        ).then((response) => {
            this.resource = response.data
            if (this.resource != null) {
                this.resource.versions.sort( (a, b) => {
                    return a.version.localeCompare(b.version)
                })
            }
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
          to: '/#Resources',
        })
        if (this.resource != null) {
            items.push({
                text: this.resource.resource_id,
                to: `/Resource/${this.resource.resource_id}/${this.resource.version}`
            })
        }
        return items;
    }

    onClickSubjectReference(subject: SubjectReferenceResource) {
        this.$router.push({ name: 'Subject', params: { id: subject.subject_id, version: subject.version }})
    }
}
</script>
<style scoped>
</style>