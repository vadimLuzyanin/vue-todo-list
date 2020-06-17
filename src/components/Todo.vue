<template>
  <div class="card" :class="{'todo-view-done': todo.done}">
    <input
      class="hidden-checkbox"
      type="checkbox"
      :id="todo.id"
      v-model="todo.done"
      @change="emitChange"
    />
    <label class="done-checkbox" :for="todo.id" />
    <div class="todo-title" v-if="!editMode" @click="editMode=true">{{todo.title}}</div>
    <input
      class="todo-title-change"
      v-if="editMode"
      type="text"
      v-focus
      @keypress.enter="editMode=false"
      v-model="todo.title"
      v-on-clickaway="handleClickAway"
      @change="emitChange"
    />
    <button class="button button-red" @click="deleteTodo">X</button>
  </div>
</template>

<script>
  import { mixin as clickaway } from "vue-clickaway";
  import { focus } from "@/mixins/focus-directive";
  export default {
    name: "Todo",
    props: ["todo"],
    mixins: [clickaway, focus],
    data() {
      return {
        editMode: false
      };
    },
    methods: {
      emitChange() {
        this.$emit("change");
      },
      deleteTodo() {
        this.$emit("deleteTodo", this.todo.id);
      },
      handleClickAway() {
        this.editMode = false;
      }
    }
  };
</script>

<style scoped>
  .todo-view-done {
    background-color: greenyellow;
  }
  .todo-view-status-done {
    color: green;
  }
  .todo-title {
    cursor: pointer;
    width: 75%;
    overflow: auto;
    font-size: 1.5rem;
    padding: 3px;
    outline: 1px solid green;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: green;
  }
  .todo-title-change {
    font-size: 1.5rem;
    text-align: center;
    width: 75%;
  }
  .hidden-checkbox {
    display: none;
  }
  .done-checkbox {
    display: block;
    height: 2rem;
    width: 2rem;
    border: 1px solid blue;
    margin: 0.5rem;
    cursor: pointer;
    background-color: #fff;
    transition: 0.3s ease;
  }
  .done-checkbox:hover {
    border-color: red;
  }
  .done-checkbox::after {
    display: block;
    content: "✓";
    font-size: 3rem;
    color: blue;
    position: relative;
    pointer-events: none;
    top: -1.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .hidden-checkbox:checked + .done-checkbox::after {
    opacity: 1;
  }
</style>