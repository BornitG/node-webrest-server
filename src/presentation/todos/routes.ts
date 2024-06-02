import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.imp';


export class TodoRoutes {

    static get routes(): Router {

        const router = Router();

        const todoDatasource = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImpl( todoDatasource );

        const todosController = new TodosController( todoRepository );

        // Gets
        router.get('/', todosController.getTodos );
        router.get('/:id', todosController.getTodoById );

        // Posts
        router.post('/', todosController.createTodo );

        // PUT
        router.put('/:id', todosController.updateTodo );

        // Delete
        router.delete('/:id', todosController.deleteTodo );



        return router;
    }



}