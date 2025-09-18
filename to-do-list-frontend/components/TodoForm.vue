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