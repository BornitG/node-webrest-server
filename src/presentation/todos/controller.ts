
import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos/todos';

export class TodosController {

    //* DI
    constructor() {}

    //* get /
    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany(); 
        return res.json( todos );
    };

    //* get /:id
    public getTodoById = async ( req: Request, res: Response ) => {
        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findUnique({
            where: {
                id: id,
            },
        });

        ( todo )
            ? res.json( todo )
            : res.status(404).json({ error: `TODO with id ${ id} not found` });
    };

    //* post /
    public createTodo = async ( req: Request, res: Response ) => {

        const [ error, createTodoDto ] = CreateTodoDto.create( req.body );
        if ( error ) return res.status(400).json({ error });

        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        res.json( todo );

    };

    //* put /:id
    public updateTodo = async ( req: Request, res: Response ) => {

        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
        if ( error ) return res.status(400).json({ error });

        const todo = await prisma.todo.findUnique({
            where: { id },
        });

        if ( !todo ) return res.status(404).json({ error: `TODO with id ${ id } not found!` });

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        }); 

        res.json( updatedTodo );

            

    }

    //* delete /:id
    public deleteTodo = async ( req: Request, res: Response ) => {

        const id = +req.params.id;
        if ( isNaN( id ) ) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findUnique({
            where: {
                id: id,
            },
        });
        if ( !todo ) return res.status(404).json({ error: `TODO with id ${ id } not found!` });

        const deleted = await prisma.todo.delete({
            where: {
                id: id
            }
        });

        ( deleted )
            ? res.json({ deleted, message: 'Todo deleted successfully!' })
            : res.status(400).json({ error: `TODO with id ${ id } not found!` })

        
            


    }


}
