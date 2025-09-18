export interface Todo {
    id: string
    title: string
    description?: string
    completed: boolean
    createdAt: Date
    updatedAt: Date
}
export interface CreateTodoDto {
    title: string
    description?: string
}
export interface UpdateTodoDto extends Partial<CreateTodoDto> {
    completed?: boolean
}
export interface ApiResponse<T> {
    data: T
    message?: string
    error?: string
}
export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
}
export interface TodoFilters {
    search?: string
    sortBy?: 'createdAt' | 'title'
    sortOrder?: 'asc' | 'desc'
}