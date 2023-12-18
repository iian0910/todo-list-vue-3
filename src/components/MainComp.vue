<template>
  <div class="container">
    <div class="row">
      <div class="offset-2 col-8">
        <h1 class="text-center py-4 mb-0 text-secondary">TODO</h1>
        <div class="content">
          <InputCtrl
            @addTodo="addTodo"
          />
          <TodoList
            :filterTodo="filterTodo"
            @deleteItem="deleteItem"
          />
          <div class="row d-flex justify-between">
            <div class="col-6 text-start align-self-center">{{countTodo}} 項代辦</div>
            <div class="col-6 text-end">
              <ActiveBtn
                @chooseActive="chooseActive"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import InputCtrl from './InputCtrl.vue'
import TodoList from './TodoList.vue'
import ActiveBtn from './ActiveBtn.vue'
export default {
  components: {
    InputCtrl,
    TodoList,
    ActiveBtn
  },
  setup () {
    // 新增
    const todos = ref([])

    function addTodo (text) {
      const txt = text.value && text.value.trim()
      if (!txt) {
        return false
      }
      todos.value.push({
        id: Math.floor(Date.now()),
        title: txt,
        completed: false
      })
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

    function chooseActive (active) {
      visibility.value = active
    }

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
      addTodo,
      visibility,
      filterTodo,
      deleteItem,
      chooseActive
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

</style>
