<template>
  <div class="container">
    <div class="row">
      <div class="offset-2 col-8">
        <h1 class="text-center py-4 mb-0 text-secondary">TODO</h1>
        <div class="content">
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
          <div class="row d-flex justify-between">
            <div class="col-6 text-start align-self-center">{{countTodo}} 項代辦</div>
            <div class="col-6 text-end">
              <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                <label class="btn btn-outline-secondary" for="btnradio1" @click="visibility = 'all'">全部</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                <label class="btn btn-outline-secondary" for="btnradio2" @click="visibility = 'active'">執行</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
                <label class="btn btn-outline-secondary" for="btnradio3" @click="visibility = 'completed'">完成</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
export default {
  setup () {
    // 新增
    const newTodo = ref('')
    const todos = ref([])

    function addTodo () {
      const txt = newTodo.value && newTodo.value.trim()
      if (!txt) {
        return false
      }
      todos.value.push({
        id: Math.floor(Date.now()),
        title: txt,
        completed: false
      })
      newTodo.value = ''
    }

    // 檢查代辦筆數
    const countTodo = computed(() => {
      let count = 0
      todos.value.forEach((item) => {
        if (!item.completed) {
          count++
        }
      })

      return count
    })

    // 過濾條件
    const visibility = ref('all')

    const filterTodo = computed(() => {
      let newTodo = ref([])
      if (visibility.value === 'all') {
        newTodo = todos.value
      } else if (visibility.value === 'active') {
        newTodo = todos.value.filter((item) => {
          return !item.completed
        })
      } else if (visibility.value === 'completed') {
        newTodo = todos.value.filter((item) => {
          return item.completed
        })
      }

      return newTodo
    })

    // 清除項目
    function deleteItem (todo) {
      const newIndex = todos.value.findIndex((item, key) => {
        return todo.id === item.id
      })

      todos.value.splice(newIndex, 1)
    }

    // 讀取資料
    onMounted(() => {
      const storageData = localStorage.getItem('todo')
      todos.value = JSON.parse(storageData) ? JSON.parse(storageData) : []
    })

    // 監控 todo
    watch(todos, () => {
      localStorage.setItem('todo', JSON.stringify(todos.value))
    },
    { deep: true }
    )

    return {
      todos,
      countTodo,
      newTodo,
      addTodo,
      visibility,
      filterTodo,
      deleteItem
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  padding: 20px;
  box-shadow: 0 0 5px 3px rgba(0 0 0 /8%);
}
</style>

<style lang="scss" scoped>
.completed {
  text-decoration: line-through;
}
.deleteIcon {
  width: 15px;
  cursor: pointer;
}
</style>
