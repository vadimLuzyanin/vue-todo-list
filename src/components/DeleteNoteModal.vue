<template>
  <transition name="modal-fade">
    <div v-if="isDeleteModalVisible" class="overlay">
      <div class="modal" v-on-clickaway="closeModal">
        <div class="modal-title">
          Sure to delete note
          <br />
          '{{note.title}}'?
        </div>
        <div class="modal-actions">
          <button @click="closeModal" class="button button-blue">No</button>
          <button @click="deleteNote" class="button button-red">Yes</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mixin as clickaway } from "vue-clickaway";
  export default {
    name: "DeleteNoteModal",
    props: ["note", "isDeleteModalVisible"],
    mixins: [clickaway],
    methods: {
      deleteNote() {
        this.$emit("deleteModalClosed");
        setTimeout(() => {
          this.$store.commit("DELETE_NOTE", this.note.id);
        }, 300);
      },
      closeModal() {
        this.$emit("deleteModalClosed");
      }
    }
  };
</script>

<style scoped>
  .overlay {
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 1;
    width: 100vw;
    height: 100vh;
    position: absolute;
    opacity: 1;
    top: 0;
    left: 0;
  }
  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }
  .modal {
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 1rem;
    border-radius: 5px;
  }
  .modal-title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    max-height: 80vh;
    overflow: auto;
  }
</style>