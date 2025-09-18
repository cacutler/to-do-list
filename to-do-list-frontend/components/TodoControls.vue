<template>
  <div class="controls">
    <div class="controls-row">
      <button class="add-todo-btn" @click="$emit('add-todo')">
        <i class="fas fa-plus"></i>
        Add New Todo
      </button>
      
      <div class="filters">
        
        
        <input 
          v-model="searchValue"
          type="text" 
          class="search-input" 
          placeholder="Search todos..."
          @input="$emit('search', searchValue)"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoFilters } from '~/types'

interface Emits {
  (e: 'add-todo'): void
  (e: 'filter-change', filters: TodoFilters): void
  (e: 'search', search: string): void
}

const emit = defineEmits<Emits>()


const searchValue = ref('')

</script>

<style scoped>
.controls {
  padding: 30px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.controls-row {
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
}

.add-todo-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-todo-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.filters {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
  margin-left: auto;
}

.filter-select, .search-input {
  padding: 8px 12px;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.filter-select:focus, .search-input:focus {
  border-color: #667eea;
}

.search-input {
  min-width: 200px;
  background: white url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23999" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><Path d="21 21l-4.35-4.35"></Path></svg>') no-repeat 12px center;
  background-size: 16px;
  padding-left: 40px;
}

@media (max-width: 768px) {
  .controls {
    padding: 20px;
  }
  
  .controls-row {
    flex-direction: column;
    align-items: stretch;
  }

  .filters {
    margin-left: 0;
    justify-content: stretch;
  }

  .search-input {
    min-width: auto;
  }
}
</style>