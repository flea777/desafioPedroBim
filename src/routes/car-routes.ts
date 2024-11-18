import { FastifyInstance } from "fastify";
import { CarUseCase } from "../usecases/car-usecase";
import { CarCreate } from "../interfaces/car-interface";

export async function carRoutes(fastify: FastifyInstance) {
    const carUseCase = new CarUseCase();

    fastify.get('/helloWorld', (req, reply) => {
        reply.send({
            hello: 'world',
        })
    });

    fastify.post<{Body: CarCreate}>('/', async (req, reply) => {
        const
            {
                manufacturer,
                model,
                modelYear,
                category,
                prices,
                rentals,
            } = req.body;
        try {
            const data = await carUseCase.create({
                manufacturer,
                model,
                modelYear,
                category,
                prices,
                rentals,
            });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

}