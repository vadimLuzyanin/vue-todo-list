export const focus = {
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  }
}