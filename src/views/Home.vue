<template>
  <div>
    <CreateNote />
    <NoteList />
  </div>
</template>

<script>

import CreateNote from '@/components/CreateNote.vue'
import NoteList from '@/components/NoteList.vue'

export default {
  name: 'Home',
  components: {
    CreateNote,
    NoteList
  }
}
</script>
