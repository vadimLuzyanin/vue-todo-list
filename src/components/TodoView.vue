<template>
  <div class="card todo-view" :class="{'todo-view-done': todo.done}">
    <div class="todo-view-title">{{todo.title}}</div>
    <div class="todo-view-status">{{todo.done ? 'Done!' : '...in progress'}}</div>
  </div>
</template>

<script>
  export default {
    name: "TodoView",
    props: ["todo"]
  };
</script>

<style scoped>
  .todo-view {
    padding: 1rem;
    color: blue;
  }
  .todo-view-done {
    background-color: greenyellow;
    color: green;
  }
</style>