import { Router } from "express";
import { TodosController } from "./controller";


export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const todosController = new TodosController();

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