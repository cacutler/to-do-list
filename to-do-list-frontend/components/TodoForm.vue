<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="title" class="form-label">Title *</label>
      <input
        id="title"
        v-model="formData.title"
        type="text"
        class="form-input"
        :class="{ 'error': errors.title }"
        placeholder="Enter todo title"
      />
      <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
    </div>

    <div class="form-group">
      <label for="description" class="form-label">Description</label>
      <textarea
        id="description"
        v-model="formData.description"
        class="form-textarea"
        placeholder="Enter todo description (optional)"
        rows="3"
      ></textarea>
    </div>

    <div class="form-actions">
      <button type="button" class="btn btn-secondary" @click="emit('cancel')">Cancel</button>
      <button type="submit" class="btn btn-primary">
        {{ mode === 'edit' ? 'Update' : 'Create' }} Todo
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Todo, CreateTodoDto, UpdateTodoDto } from '~/types'

interface Props {
  todo?: Todo
  mode: 'create' | 'edit'
}

interface Emits {
  (e: 'submit', data: CreateTodoDto | UpdateTodoDto): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  todo: undefined
})

const emit = defineEmits<Emits>()

// Form state with proper typing
const formData = reactive<CreateTodoDto>({
  title: props.todo?.title || '',
  description: props.todo?.description || ''
})

// Form validation
const errors = ref<Record<string, string>>({})

const validateForm = (): boolean => {
  errors.value = {}
  
  if (!formData.title.trim()) {
    errors.value.title = 'Title is required'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', { ...formData })
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #667eea;
}

.form-input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-primary {
  background: #667eea;
  color: white;
}

.btn-primary:hover {
  background: #5a67d8;
}
</style>