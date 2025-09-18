import type { Todo, CreateTodoDto, UpdateTodoDto, ApiResponse, PaginatedResponse } from '~/types'
export const useApi = () => {
  const config = useRuntimeConfig()
  const baseURL = (config.public.apiBaseUrl as string) || 'http://localhost:3001'
  const getTodos = async (params?: Record<string, any>): Promise<PaginatedResponse<Todo>> => {
    return await $fetch('/api/todos', {
      baseURL,
      params,
      headers: {'Content-Type': 'application/json'}
    })
  }
  const getTodo = async (id: string): Promise<ApiResponse<Todo>> => {
    return await $fetch(`/api/todos/${id}`, {
      baseURL,
      headers: {'Content-Type': 'application/json'}
    })
  }
  const createTodo = async (todo: CreateTodoDto): Promise<ApiResponse<Todo>> => {
    return await $fetch('/api/todos', {
      baseURL,
      method: 'POST',
      body: todo,
      headers: {'Content-Type': 'application/json'}
    })
  }
  const updateTodo = async (id: string, todo: UpdateTodoDto): Promise<ApiResponse<Todo>> => {
    return await $fetch(`/api/todos/${id}`, {
      baseURL,
      method: 'PUT',
      body: todo,
      headers: {'Content-Type': 'application/json'}
    })
  }
  const deleteTodo = async (id: string): Promise<ApiResponse<void>> => {
    return await $fetch(`/api/todos/${id}`, {
      baseURL,
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
  }
  return {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
  }
}