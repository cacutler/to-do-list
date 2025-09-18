<template>
  <div>
    <!-- Header -->
    <AppHeader />
    
    <!-- Controls -->
    <TodoControls 
      @add-todo="openModal"
      @filter-change="handleFilterChange"
      @search="handleSearch"
    />
    
    <!-- Todo List -->
    <TodoListContainer
      :todos="filteredTodos"
      :loading="loading"
      :error="error"
      @edit="editTodo"
      @delete="deleteTodo"
      @toggle-complete="toggleComplete"
    />
    
    <!-- Modal -->
    <Modal
      :is-open="isModalOpen"
      :title="modalTitle"
      @close="closeModal"
    >
      <TodoForm
        :todo?="selectedTodo"
        :mode="formMode"
        @submit="handleSubmit"
        @cancel="closeModal"
      />
    </Modal>
  </div>
</template>

<script setup lang="ts">
import type { Todo, TodoFilters } from '~/types'

// State
const {todos, loading, error, fetchTodos, createTodo, updateTodo, deleteTodo: removeTodo } = useTodos()
console.log("todos from useTodos:", todos)
console.log("todos.value initial:", todos.value)
console.log("todos is ref?", isRef(todos))
const isModalOpen = ref(false)
const selectedTodo = ref<Todo | null>(null)
const filters = ref<TodoFilters>({})
const searchTerm = ref('')
// Computed
const formMode = computed(() => selectedTodo.value ? 'edit' : 'create')
const modalTitle = computed(() => formMode.value === 'edit' ? 'Edit Todo' : 'Add New Todo')



const filteredTodos = computed(() => {
  let filtered = [...todos.value] as Todo[]
  console.log("value of filtered:", filtered)
  
  // Apply search
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter((todo: Todo) =>
      todo.title.toLowerCase().includes(search) || 
      todo.description?.toLowerCase().includes(search)
    )
  }
  
  return filtered
})

// Methods
const openModal = () => {
 selectedTodo.value = null
 isModalOpen.value = true
}

const closeModal = () => {
 isModalOpen.value = false
 selectedTodo.value = null
}

const editTodo = (todo: Todo) => {
 selectedTodo.value = todo
 isModalOpen.value = true
}

const deleteTodo = async (id: string) => {
 if (confirm('Are you sure you want to delete this todo?')) {
   await removeTodo(id)
 }
}

const toggleComplete = async (id: string, completed: boolean) => {
 await updateTodo(id, { completed })
}

const handleSubmit = async (data: any) => {
 try {
   if (formMode.value === 'edit' && selectedTodo.value) {
     await updateTodo(selectedTodo.value.id, data)
   } else {
     await createTodo(data)
   }
   closeModal()
 } catch (error) {
   console.error('Error saving todo:', error)
 }
}

const handleFilterChange = (newFilters: TodoFilters) => {
 filters.value = newFilters
}

const handleSearch = (search: string) => {
 searchTerm.value = search
}

// Lifecycle
onMounted(() => {
 fetchTodos()
})
</script>

<style scoped>
/* Global app styles */
body {
 font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
 background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 min-height: 100vh;
 padding: 20px;
}
</style>