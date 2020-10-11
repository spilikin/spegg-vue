<template>
    <div class="pa-3">
        <div>
            <span class="text-h4">{{subject.subject_id}}</span>
            <v-chip
                class="ma-2"
                color="primary"
            >
            {{subject.version}}
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
        
        <template v-slot:top>
            <v-text-field
            v-model="searchResources"
            label="Search"
            class="mx-4"
            ></v-text-field>
        </template>

        </v-data-table>

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
    private subject = ""
    private resourcesHeaders = [  {
          text: 'Reference',
          value: 'resource.description',
        },
        {
          text: 'Resource',
          value: 'resource.id',
        },
        {
          text: 'Version',
          value: 'version',
        },
        ];

    @Watch('$route', { immediate: true, deep: true })
    onRoute() {
     api.getSubjectVersion(this.$route.params.id, this.$route.params.version).then((response) => {
        this.subject = response.data
      })
      .catch((e) => {
        console.log(e);
      });
    }

}
</script>
