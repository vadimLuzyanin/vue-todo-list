import Vue from "vue";
import Vuex from "vuex";

import cloneDeep from "lodash.clonedeep";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nextNoteId: 4,
    nextTodoId: 10,
    notes: [
      // {
      //   id: 1,
      //   title: "First note!",
      //   todoList: [
      //     { id: 1, title: "Todo 1", done: false },
      //     { id: 2, title: "Todo 2", done: false },
      //     { id: 3, title: "Todo 3", done: false },
      //   ],
      //   history: [],
      //   undone: [],
      // },
      // {
      //   id: 2,
      //   title: "Second note!",
      //   todoList: [
      //     { id: 4, title: "Todo 1", done: false },
      //     { id: 5, title: "Todo 2", done: false },
      //     { id: 6, title: "Todo 3", done: false },
      //   ],
      //   history: [],
      //   undone: [],
      // },
      // {
      //   id: 3,
      //   title: "Third note!",
      //   todoList: [
      //     { id: 7, title: "Todo 1", done: false },
      //     { id: 8, title: "Todo 2", done: false },
      //     { id: 9, title: "Todo 3", done: false },
      //   ],
      //   history: [],
      //   undone: [],
      // },
    ],
  },
  mutations: {
    CREATE_NEW_NOTE: (state, title) => {
      state.notes.push({
        id: ++state.nextNoteId,
        title,
        todoList: [],
        history: [],
        undone: [],
      });
    },
    DELETE_NOTE: (state, id) => {
      state.notes = state.notes.filter((note) => note.id !== id);
    },
    EDIT_NOTE_TITLE: (state, { id, title }) => {
      state.notes.find((note) => note.id === id).title = title;
    },
    COMMIT_NOTE_CHANGES: (state, { noteId, newTitle, newTodoList }) => {
      const note = state.notes.find((note) => note.id === noteId);
      const newNoteInHistory = {
        id: note.id,
        title: note.title,
        todoList: note.todoList,
      };

      note.history.push(newNoteInHistory);
      note.title = newTitle;
      note.todoList = newTodoList;
      note.undone = [];
    },
    GO_BACKWARDS: (state, noteId) => {
      const note = state.notes.find((note) => note.id === noteId);
      if (note.history.length) {
        note.undone.push({
          id: note.id,
          title: note.title,
          todoList: note.todoList,
        });
        const previous = { ...note.history[note.history.length - 1] };
        note.history.pop(note.history.length - 1);
        note.title = previous.title;
        note.todoList = previous.todoList;
      }
    },
    GO_FORWARDS: (state, noteId) => {
      const note = state.notes.find((note) => note.id === noteId);
      if (note.undone.length) {
        note.history.push({
          id: note.id,
          title: note.title,
          todoList: note.todoList,
        });
        const forward = { ...note.undone[note.undone.length - 1] };
        note.undone.pop(note.undone.length - 1);
        note.title = forward.title;
        note.todoList = forward.todoList;
      }
    },
  },
  actions: {},
  modules: {},
  getters: {
    getNoteList: (state) => {
      return state.notes;
    },
    getNote: (state) => (id) => {
      return state.notes.find((note) => note.id === id);
    },
    getTodosOfNote: (state) => (id) => {
      return state.notes.find((note) => note.id === id).todoList;
    },
    getCopyOfNote: (state) => (id) => {
      return cloneDeep(state.notes.find((note) => note.id === id));
    },
    canGoBackwards: (state) => (noteId) => {
      const note = state.notes.find((note) => note.id === noteId);
      return note.history.length;
    },
    canGoForwards: (state) => (noteId) => {
      const note = state.notes.find((note) => note.id === noteId);
      return note.undone.length;
    },
  },
  plugins: [createPersistedState()],
});
