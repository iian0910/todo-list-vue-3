<template>
  <div class="input-group mb-3">
    <input
      type="text"
      class="form-control"
      placeholder="請輸入代辦事項"
      v-model="newTodo"
      @keyup.enter="addTodo()"
    >
    <button
      class="btn btn-outline-secondary"
      type="button"
      id="button-addon2"
      @click="addTodo()"
    >
      新增
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup (props, { emit }) {
    const newTodo = ref('')

    function addTodo () {
      emit('addTodo', newTodo)
      newTodo.value = ''
    }

    return {
      newTodo,
      addTodo
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
