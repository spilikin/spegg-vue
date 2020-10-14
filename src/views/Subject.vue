<template>

    <div class="pa-3">
        <v-skeleton-loader
            v-if="subject == null"
            type="list-item-avatar, divider, list-item-three-line, card-heading, image, actions"
        ></v-skeleton-loader>
        <div v-if="subject">
            <div>
                <span class="text-h4">{{subject.subject_id}}</span>
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
            <v-data-table
            dense
            hide-default-footer
            disable-pagination
            :headers="resourcesHeaders"
            :items="subject.references"
            :search="searchResources"
            item-key="subject_id"
            sort-by="subject_id"
            class="elevation-1 ma-3"
            >
            
                <template v-slot:item.requirements_count="{ item }">
                <v-chip
                    class="ma-2"
                    color="orange"
                    outlined
                >
                    {{ item.requirements_count }}
                </v-chip>
                </template>

                <template v-slot:item.resource.id="{ item }">
                    <a v-if="item.url.startsWith('http')" target="_blank" :href="item.url">{{ item.resource.id }}</a>
                    <span v-else>{{ item.resource.id }}</span>
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
    private resourcesHeaders = [  {
          text: 'Reference',
          value: 'resource.description',
        },
        {
          text: 'Resource',
          value: 'resource.id',
        },
        {
          text: 'Reqs',
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
        api.getSubjectVersion(this.$route.params.id, this.$route.params.version).then((response) => {
            this.subject = response.data
            this.versions = this.subject.all_versions.sort()
            console.log(this.subject)
        })
        .catch((e) => {
            this.$emit('errorOccured', e.message)
            console.log(e);
        });
    }

}
</script>
