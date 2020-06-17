<template>
  <div>
    <div class="note-header">
      <router-link class="button button-green" to="/">Home</router-link>
      <div
        class="note-title"
        v-if="!titleEditMode"
        @click="titleEditMode=true"
      >{{temporalNoteState.title}}</div>
      <input
        class="note-title-change"
        v-if="titleEditMode"
        type="text"
        v-model="temporalNoteState.title"
        v-focus
        v-on-clickaway="handleClickAway"
        @change="didChanged=true"
      />
      <CreateTodo :note="temporalNoteState" @change="didChanged = true" />
    </div>
    <transition name="todo-list" mode="out-in">
      <TodoList
        v-if="temporalNoteState.todoList.length"
        :todoList="temporalNoteState.todoList"
        @change="didChanged = true"
        v-on:deleteTodo="deleteTodo"
      />
      <div v-else class="card todo-list-empty">No todos in this list</div>
    </transition>
    <div class="note-actions">
      <button class="button button-blue" @click="undo" :disabled="!canUndo">undo</button>
      <button class="button button-blue" @click="redo" :disabled="!canRedo">redo</button>
      <button class="button button-green" @click="save" :disabled="!didChanged">save</button>
      <button class="button button-blue" @click="askForDiscard" :disabled="!didChanged">discard</button>
      <button class="button button-red" @click="deleteNote">Delete note</button>
    </div>
    <DiscardNoteModal
      :note="temporalNoteState"
      :isDiscardModalVisible="isDiscardModalVisible"
      v-on:discardModalClosed="closeDiscardModal"
      v-on:discard="confirmDiscard"
    />
    <DeleteNoteModal
      :note="temporalNoteState"
      :isDeleteModalVisible="isDeleteModalVisible"
      v-on:deleteModalClosed="closeDeleteModal"
    />
  </div>
</template>

<script>
  import TodoList from "@/components/TodoList.vue";
  import CreateTodo from "@/components/CreateTodo.vue";
  import DiscardNoteModal from "@/components/DiscardNoteModal.vue";
  import DeleteNoteModal from "@/components/DeleteNoteModal.vue";

  import { mixin as clickaway } from "vue-clickaway";
  import { focus } from "@/mixins/focus-directive";

  import cloneDeep from "lodash.clonedeep";

  export default {
    name: "Note",
    props: ["note"],
    mixins: [clickaway, focus],
    components: { TodoList, CreateTodo, DiscardNoteModal, DeleteNoteModal },
    data() {
      return {
        temporalNoteState: this.$store.getters.getCopyOfNote(this.note.id),
        didChanged: false,
        titleEditMode: false,
        isDiscardModalVisible: false,
        isDeleteModalVisible: false
      };
    },
    methods: {
      undo() {
        this.$store.commit("GO_BACKWARDS", this.note.id);
        this.temporalNoteState = this.$store.getters.getCopyOfNote(this.note.id);
      },
      redo() {
        this.$store.commit("GO_FORWARDS", this.note.id);
        this.temporalNoteState = this.$store.getters.getCopyOfNote(this.note.id);
      },
      save() {
        this.$store.commit("COMMIT_NOTE_CHANGES", {
          noteId: this.note.id,
          newTitle: this.temporalNoteState.title,
          newTodoList: cloneDeep(this.temporalNoteState.todoList)
        });
        this.didChanged = false;
      },
      askForDiscard() {
        this.isDiscardModalVisible = true;
      },
      confirmDiscard() {
        this.temporalNoteState = this.$store.getters.getCopyOfNote(this.note.id);
        this.didChanged = false;
      },
      deleteNote() {
        this.isDeleteModalVisible = true;
      },
      deleteTodo(id) {
        this.temporalNoteState.todoList = this.temporalNoteState.todoList.filter(
          item => item.id !== id
        );
        this.didChanged = true;
      },
      handleClickAway() {
        this.titleEditMode = false;
      },
      closeDiscardModal() {
        this.isDiscardModalVisible = false;
      },
      closeDeleteModal() {
        this.isDeleteModalVisible = false;
      }
    },
    computed: {
      canUndo() {
        return this.$store.getters.canGoBackwards(this.note.id);
      },
      canRedo() {
        return this.$store.getters.canGoForwards(this.note.id);
      }
    }
  };
</script>

<style scoped>
  .home-link {
    margin-bottom: 0.5rem;
  }
  .note-header {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    height: 180px;
  }
  .note-title {
    font-size: 1.5rem;
    outline: 1px solid blue;
    color: blue;
    width: 80%;
    cursor: pointer;
    margin-bottom: 0.5rem;
    padding: 3px;
  }
  .note-title-change {
    font-size: 1.5rem;
    text-align: center;
    width: 80%;
    margin-bottom: 0.5rem;
  }
  .note-title-change-transition-enter-active,
  .note-title-change-transition-leave-active {
    transition: all 0.3s ease;
  }
  .note-title-change-transition-enter,
  .note-title-change-transition-leave-to {
    opacity: 0;
  }
  .todo-list-empty {
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
  .note-actions {
    height: 110px;
  }
</style>