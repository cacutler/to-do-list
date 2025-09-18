import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class TodosService {
    private prisma;
    constructor(prisma: PrismaService);
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
    remove(id: number): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    toggleComplete(id: number): Promise<{
        title: string;
        description: string | null;
        completed: boolean;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
