import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: [
      {id: 1, title: 'First note!', todoList: [
        {id: 1, title: 'Todo 1', done: false},
        {id: 2, title: 'Todo 2', done: false},
        {id: 3, title: 'Todo 3', done: false},
      ], history: []},
      {id: 2, title: 'Second note!', todoList: [
        {id: 4, title: 'Todo 1', done: false},
        {id: 5, title: 'Todo 2', done: false},
        {id: 6, title: 'Todo 3', done: false},
      ], history: []},
      {id: 3, title: 'Third note!', todoList: [
        {id: 7, title: 'Todo 1', done: false},
        {id: 8, title: 'Todo 2', done: false},
        {id: 9, title: 'Todo 3', done: false},
      ], history: []},
    ]
  },
  mutations: {
    CREATE_NEW_NOTE: (state, title) => {
      state.notes.push({id: state.notes.length + 1, title, todoList: []})
    },
    DELETE_NOTE: (state, id) => {
      state.notes = state.notes.filter(note => note.id !== id)
    },
    EDIT_NOTE_TITLE: (state, {id, title}) => {
      state.notes.find(note => note.id === id).title = title
    },
    COMMIT_NOTE_CHANGES: (state, {noteId, newTltle, newTodoList}) => {
      const note = state.notes.find(note => note.id === noteId)
      note.history.push({...note})
      note.title = newTltle
      note.todoList = newTodoList
    }
  },
  actions: {},
  modules: {},
  getters: {},
});
