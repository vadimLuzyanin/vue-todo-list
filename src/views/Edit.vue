<template>
  <div>
    <Note v-if="note" :note="note" />
    <div class="not-found" v-else>
      Note with id {{id}} is not found.
      <br>
      <router-link to="/">Want to see full list of notes?</router-link>
    </div>
  </div>
</template>

<script>
  import Note from "@/components/Note.vue";
  export default {
    name: "Edit",
    components: {
      Note
    },
    data() {
      return {
        id: this.$route.params.id
      };
    },
    computed: {
      note() {
        return this.$store.getters.getNote(+this.id);
      }
    },
  };
</script>

<style scoped>
  .not-found {
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>