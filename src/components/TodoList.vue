<template>
  <ul class="list-group mb-3">
    <li
      class="list-group-item"
      v-for="todo in filterTodo"
      :key="todo.id"
    >
      <div
        class="d-flex justify-content-between align-items-center"
        v-if="!isEditor"
      >
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            :id="todo.id"
            v-model="todo.completed"
          >
          <label
            class="form-check-label"
            :for="todo.id"
            :class="{'completed': todo.completed}"
          >
            {{ todo.title }}
          </label>
        </div>
        <div class="active_icon_group d-flex">
          <img
            src="../assets/images/trash-can-solid.svg"
            class="me-3 d-block deleteIcon"
            alt="刪除"
            @click="deleteItem(todo)"
          >
          <img
            src="../assets/images/pencil-solid.svg"
            class="d-block deleteIcon"
            alt="編輯"
            @click="openEditor(todo)"
          >
        </div>
      </div>
      <div v-else>
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            v-model="todoItem.title"
          >
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            @click="saveEditor()"
          >
            儲存
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    filterTodo: {
      type: Array,
      default: () => ([])
    }
  },
  setup (props, { emit }) {
    // 刪除內容
    function deleteItem (todo) {
      emit('deleteItem', todo)
    }

    // 編輯內容
    const isEditor = ref(false)
    const todoItem = ref(null)
    function openEditor (todo) {
      isEditor.value = true
      todoItem.value = todo
    }

    // 儲存編輯
    function saveEditor () {
      emit('saveEditor', todoItem)
      isEditor.value = false
    }

    return {
      isEditor,
      deleteItem,
      openEditor,
      saveEditor,
      todoItem
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
