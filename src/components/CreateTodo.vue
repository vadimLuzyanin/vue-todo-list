<template>
  <form @submit.prevent="create">
    <input class="text-input" type="text" placeholder="Title for a new todo" v-model="todoTitle" />
    <button class="button button-blue" type="submit">Create todo</button>
  </form>
</template>

<script>
  export default {
    name: "CreateTodo",
    props: ["note"],
    data() {
      return {
        todoTitle: ""
      };
    },
    methods: {
      create() {
        this.note.todoList.push({
          id: ++this.$store.state.nextTodoId,
          title: this.todoTitle || "Untitled todo",
          done: false
        });
        this.$emit("change");
        this.todoTitle = "";
      }
    }
  };
</script>

<style scoped>
</style>