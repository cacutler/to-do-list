<template>
  <div class="todo-list-container">
    <!-- Loading State -->
    <div v-if="loading" class="loading">
      <i class="fas fa-spinner"></i>
      <h3>Loading todos...</h3>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-message">
      <i class="fas fa-exclamation-triangle"></i>
      {{ error }}
    </div>

    <!-- Empty State -->
    <div v-else-if="todos.length === 0" class="empty-state">
      <i class="fas fa-clipboard-list"></i>
      <h3>No todos yet</h3>
      <p>Add your first todo to get started!</p>
    </div>

    <!-- Todo List -->
    <div v-else class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @edit="$emit('edit', todo)"
        @delete="$emit('delete', todo.id)"
        @toggle-complete="$emit('toggle-complete', todo.id, !todo.completed)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '~/types'

interface Props {
  todos: Todo[]
  loading: boolean
  error: string | null
}

interface Emits {
  (e: 'edit', todo: Todo): void
  (e: 'delete', id: string): void
  (e: 'toggle-complete', id: string, completed: boolean): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.todo-list-container {
  padding: 30px;
  min-height: 400px;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.loading, .empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
}

.loading i, .empty-state i {
  font-size: 3rem;
  margin-bottom: 20px;
  opacity: 0.5;
}

.loading i {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
}

@media (max-width: 480px) {
  .todo-list-container {
    padding: 20px;
  }
}
</style>