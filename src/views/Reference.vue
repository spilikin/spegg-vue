<template>
    <div class="pa-3">
        <div v-if='reference'>
            <v-breadcrumbs
                :items="breadcrumbs()"
                divider="/"
            ></v-breadcrumbs>            
            <div>
            <span class="text-h4">{{reference.title}}</span>
            </div>

            <v-card
            v-for="(req, i) in reference.requirements"
            :key="i"
            >
            <v-card-title>{{req.id}} {{req.title}}</v-card-title>
            <v-card-text><div v-html='req.html'/></v-card-text>

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
    private reference: any = null;
    @Watch('$route', { immediate: true, deep: true })
    onRoute() {
        api.getReference(this.$route.params.subject_id, 
        this.$route.params.subject_version, 
        this.$route.params.resource_id).then((response) => {
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
          text: this.reference.referred_by.subject_id,
          exact: true,
          to: 
            {
                name: 'Subject', 
                params: { 
                    id: this.reference.referred_by.subject_id, 
                    version: this.reference.referred_by.subject_version
                }
            }
        })
        items.push({
            text: this.reference.resource_id
        })
        return items;
    }

}
</script>