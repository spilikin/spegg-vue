<template>
    <div class="pa-3">
      <div class="text-h3">Home</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import APIClient from '@/logic/Client'

const api = new APIClient()

@Component({
  components: {
  },
})
export default class Home extends Vue {
  private subjects = []

  mounted() {
    api.getAllSubjects().then((response) => {
        this.subjects = response.data
      })
      .catch((e) => {
        console.log(e);
      });
  }

}
</script>
