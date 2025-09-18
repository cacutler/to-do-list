<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <div class="todo-header">
      <div class="todo-content">
        <h3 class="todo-title">{{ todo.title }}</h3>
        <p v-if="todo.description" class="todo-description">{{ todo.description }}</p>
      </div>
      <div class="todo-actions">
        <div 
          class="checkbox" 
          :class="{ checked: todo.completed }"
          @click="$emit('toggle-complete')"
        >
          <i v-if="todo.completed" class="fas fa-check"></i>
        </div>
        <button class="action-btn edit-btn" @click="$emit('edit')" title="Edit">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn delete-btn" @click="$emit('delete')" title="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '~/types'

interface Props {
  todo: Todo
}

interface Emits {
  (e: 'edit'): void
  (e: 'delete'): void
  (e: 'toggle-complete'): void
}

defineProps<Props>()
defineEmits<Emits>()

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.todo-item {
  background: white;
  border: 2px solid #f1f3f4;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.todo-item:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.todo-item.completed {
  background: #f8f9fa;
  opacity: 0.8;
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: #6c757d;
}

.todo-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
}

.todo-content {
  flex: 1;
}

.todo-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}

.todo-description {
  color: #6c757d;
  line-height: 1.5;
  margin-bottom: 10px;
}

.todo-meta {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.priority-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
}

.priority-high {
  background: #fee;
  color: #dc3545;
  border: 1px solid #f8d7da;
}

.priority-medium {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #faeeba;
}

.priority-low {
  background: #d1ecf1;
  color: #0c5460;
  border: 1px solid #b8daff;
}

.due-date {
  color: #6c757d;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
}

.todo-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: white;
}

.checkbox.checked {
  background: #28a745;
  border-color: #28a745;
  color: white;
}

.action-btn {
  padding: 8px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6c757d;
}

.action-btn:hover {
  background: #f8f9fa;
}

.edit-btn:hover {
  color: #007bff;
  background: #e7f3ff;
}

.delete-btn:hover {
  color: #dc3545;
  background: #ffeaea;
}

@media (max-width: 768px) {
  .todo-header {
    flex-direction: column;
    gap: 15px;
  }

  .todo-actions {
    align-self: flex-start;
  }
  
  .todo-item {
    padding: 15px;
  }
}
</style>