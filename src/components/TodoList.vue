<template>
  <transition-group class="todo-list" name="todos">
    <Todo
      v-for="todo in reverseTodoList"
      :todo="todo"
      :key="todo.id"
      :todoList="todoList"
      @change="$emit('change')"
      v-on:deleteTodo="id => $emit('deleteTodo', id )"
    />
  </transition-group>
</template>

<script>
  import Todo from "@/components/Todo.vue";
  export default {
    name: "TodoList",
    components: { Todo },
    props: ["todoList"],
    computed: {
      reverseTodoList() {
        return Array.from(this.todoList).reverse();
      }
    }
  };
</script>

<style scoped>
  .todos-move {
    transition: transform 0.3s ease;
  }
  .todos-enter-active {
    transition: all 0.3s ease;
  }
  .todos-leave-active {
    transition: all 0.3s ease;
    position: absolute;
    width: 100%;
  }
  .todos-enter,
  .todos-leave-to {
    transform: translateX(100%);
  }
  .todo-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 100px;
    max-height: calc(100vh - 320px);
  }
</style>