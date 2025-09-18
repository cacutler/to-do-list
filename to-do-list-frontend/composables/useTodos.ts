import type { Todo, CreateTodoDto, UpdateTodoDto, TodoFilters } from '~/types'
import { useApi } from './useApi'
import { ref, readonly, computed } from 'vue'
export const useTodos = () => {
  const todos = ref<Todo[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const api = useApi()

  const fetchTodos = async (filters?: TodoFilters) => {
    try {
      loading.value = true
      error.value = null
      const response = await api.getTodos(filters)
      console.log("here is the response from getTodos:", response)
      // Handle both paginated and array responses
      if (Array.isArray(response)) {
        todos.value = response
      } else if (response && Array.isArray(response.data)) {
        todos.value = response.data
      } else {
        todos.value = []
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch todos'
      console.error('Error fetching todos:', err)
      todos.value = []
    } finally {
      loading.value = false
    }
  }

  const createTodo = async (todoData: CreateTodoDto): Promise<Todo | null> => {
    try {
      loading.value = true
      const response = await api.createTodo(todoData)
      if (response.data) {
        todos.value.unshift(response.data)
        return response.data
      }
      return null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create todo'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTodo = async (id: string, updates: UpdateTodoDto): Promise<Todo | null> => {
    try {
      const response = await api.updateTodo(id, updates)
      if (response.data) {
        const index = todos.value.findIndex(todo => todo.id === id)
        if (index !== -1) {
          todos.value[index] = response.data
        }
        return response.data
      }
      return null
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update todo'
      throw err
    }
  }

  const deleteTodo = async (id: string): Promise<void> => {
    try {
      await api.deleteTodo(id)
      todos.value = todos.value.filter(todo => todo.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete todo'
      throw err
    }
  }

  return {
    todos: computed(() => todos.value),
    loading: readonly(loading),
    error: readonly(error),
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo
  }
}