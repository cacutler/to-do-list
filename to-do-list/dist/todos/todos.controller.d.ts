import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    create(createTodoDto: CreateTodoDto): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: number, updateTodoDto: UpdateTodoDto): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePut(id: number, updateTodoDto: UpdateTodoDto): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
