<template>
  <div class="note-list">
    <hr />
    <transition name="todo-list" mode="out-in">
      <transition-group v-if="notes.length" name="notes" tag='div'>
        <NoteView class="note" v-for="note in notes.slice().reverse()" :note="note" :key="note.id"></NoteView>
      </transition-group>
      <div v-else class="card note-list-empty">No notes were made yet</div>
    </transition>
  </div>
</template>

<script>
  import NoteView from "@/components/NoteView.vue";
  export default {
    name: "NoteList",
    components: { NoteView },
    computed: {
      notes() {
        return this.$store.getters.getNoteList;
      }
    }
  };
</script>

<style scoped>
  .note-list {
    max-height: calc(100vh - 100px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fafafa;
  }
  .notes-enter-active {
    transition: all 0.3s ease;
  }
  .notes-leave-active {
    transition: all 0.3s ease;
    width: 100%;
    position: absolute;
  }
  .notes-enter,
  .notes-leave-to {
    transform: translateX(100%);
  }
  .notes-move {
    transition: transform 0.3s ease;
  }

  .note-list-empty {
    display: flex;
    justify-content: center;
    background-color: white;
    border: 1px solid blue;
    color: blue;
    margin: 1rem auto;
    padding: 1rem;
  }
  .todo-list-enter-active,
  .todo-list-leave-active {
    transition: all 0.3s ease;
  }
  .todo-list-enter,
  .todo-list-leave-to {
    transform: translateX(100%);
  }
</style>