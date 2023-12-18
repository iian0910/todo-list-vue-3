<template>
  <ul class="list-group mb-3">
    <li
      class="list-group-item d-flex justify-content-between align-items-center"
      v-for="todo in filterTodo"
      :key="todo.id"
    >
      <div class="form-check">
        <input type="checkbox" class="form-check-input" :id="todo.id" v-model="todo.completed">
        <label class="form-check-label" :for="todo.id" :class="{'completed': todo.completed}">{{todo.title}}</label>
      </div>
      <img
        src="../assets/images/trash-can-solid.svg"
        class="d-block deleteIcon"
        alt="刪除"
        @click="deleteItem(todo)"
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    filterTodo: {
      type: Array,
      default: () => ([])
    }
  },
  setup (props, { emit }) {
    function deleteItem (todo) {
      emit('deleteItem', todo)
    }

    return {
      deleteItem
    }
  }
}
</script>

<style lang="scss" scoped>
.completed {
  text-decoration: line-through;
}
.deleteIcon {
  width: 15px;
  cursor: pointer;
}
</style>
