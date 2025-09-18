<script setup lang="ts" generic="T = any">
    interface Props {
        isOpen: boolean
        title?: string
        size?: 'sm' | 'md' | 'lg' | 'xl'
    }
    interface Emits {
        (e: 'close'): void
        (e: 'confirm', data?: T): void
    }
    const props = withDefaults(defineProps<Props>(), {
        title: '',
        size: 'md'
    })
    const emit = defineEmits<Emits>()
    const handleKeydown = (e: KeyboardEvent) => {// Handle ESC key
        if (e.key === 'Escape') {
            emit('close')
        }
    }
    onMounted(() => {
        document.addEventListener('keydown', handleKeydown)
    })
    onUnmounted(() => {
        document.removeEventListener('keydown', handleKeydown)
    })
</script>
<template>
    <form action=""></form>
</template>