<template>
  <div>
      <v-sheet
        color="grey lighten-5"
        width="100%"
        
      >
          <v-text-field
            v-model="search"
            label="Filter"
            class="mx-3"
            >
          </v-text-field>
      
      </v-sheet>

     <v-list-group
        :value="providersOpen"
        prepend-icon="mdi-domain"
      >
        <template v-slot:activator>
          <v-list-item-title>Anbieter</v-list-item-title>
        </template>

      <v-list dense>
        <v-list-item-group
          v-model="subject"
          color="primary"
          shaped
        >
          <v-list-item
            v-for="(subject, i) in filteredSubjects('Provider')"
            :key="i"
            :to="{ name: 'Subject', params: { id: subject.id, version: subject.latest_version }}"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subject.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

     </v-list-group>

     <v-list-group
        :value="productsOpen"
        prepend-icon="mdi-server-security"
      >
        <template v-slot:activator>
          <v-list-item-title>Produkttypen</v-list-item-title>
        </template>

      <v-list dense>
        <v-list-item-group
          v-model="subject"
          color="primary"
          shaped
          active='false'
        >
          <v-list-item
            v-for="(subject, i) in filteredSubjects('Product')"
            :key="i"
            :to="{ name: 'Subject', params: { id: subject.id, version: subject.latest_version }}"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subject.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

     </v-list-group>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import APIClient from '@/logic/Client'
import { SubjectResource } from '@/logic/Resources'

const api = new APIClient()

@Component({
  components: {
  },
})
export default class SubjectsNavigation extends Vue {
  private headers = [
        {
          text: 'Subject',
          align: 'start',
          value: 'id',
        },
      ]
  private subjects: Array<SubjectResource> = []
  private search = ""
  private subject = ""
  private productsOpen = false
  private providersOpen = false

  mounted() {
    api.getAllSubjects().then((response) => {
        const regex = /^\S+\s+(.+)$/
        this.subjects = response.data
      })
      .catch((e) => {
        this.$emit('errorOccured', e)
        console.log(e);
      });
  }

  icon(subject: SubjectResource) {
    if (subject.id.startsWith('gemProdT')) {
      return 'mdi-server'
    } else {
      return 'mdi-domain'
    }
  }

  filteredSubjects(type: string) {
    if (this.search.trim() != "") {
      this.productsOpen = true
      this.providersOpen = true
    }
    return this.subjects.filter(subject => {
      return (subject.id.toLowerCase().includes(this.search.toLowerCase())
                || subject.title.toLowerCase().includes(this.search.toLowerCase()) )
        && subject.type == type
    })
  }

}
</script>
