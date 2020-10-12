<template>
  <div class="pl-14">
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

      <v-list dense>
        <v-list-item-group
          v-model="subject"
          color="primary"
          shaped
        >
          <v-list-item
            v-for="(subject, i) in filteredSubjects()"
            :key="i"
            :to="{ name: 'Subject', params: { id: subject.id, version: subject.latest_version }}"
          >
            <v-list-item-icon>
              <v-icon v-text="icon(subject)"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="subject.id"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import APIClient from '@/logic/Client'

const api = new APIClient()

interface Subject {
    id: string;
}

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
  private subjects: Array<Subject> = []
  private search = ""
  private subject = ""

  mounted() {
    api.getAllSubjects().then((response) => {
        this.subjects = response.data
      })
      .catch((e) => {
        this.$emit('errorOccured', e)
        console.log(e);
      });
  }

  icon(subject: Subject) {
    if (subject.id.startsWith('gemProdT')) {
      return 'mdi-server'
    } else {
      return 'mdi-domain'
    }
  }

  filteredSubjects() {
    return this.subjects.filter(subject => {
      return subject.id.toLowerCase().includes(this.search.toLowerCase());
    })
  }
}
</script>
