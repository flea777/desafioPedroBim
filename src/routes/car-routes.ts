import { FastifyInstance } from "fastify";
import { CarUseCase } from "../usecases/car-usecase";
import { CarCreate } from "../interfaces/car-interface";
import { verifyCategory } from "../utils/category-verify";
import { CheapestRent } from "../interfaces/rental-interface";

export async function carRoutes(fastify: FastifyInstance) {
    const carUseCase = new CarUseCase();

    fastify.get('/helloWorld', async (req, reply) => {
        reply.send({
          hello: 'world'  
        })
    });

    fastify.get('/', async (req, reply) => {
        try {
            const data = await carUseCase.listAllCars();
            return reply.status(200).send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.get<{Params: {category: string}}>('/:category', async (req, reply) => {
        const { category } = req.params;
        try {
            const data = await carUseCase.listCarsByCategory(category);
            return reply.status(200).send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.post<{Body: CheapestRent}>('/cheapest', async (req, reply) => {
        const { startDate, endDate, isLoyaltyMember } = req.body;
        try {
            const data = await carUseCase.findCheapestCar(startDate, endDate, isLoyaltyMember);
            return reply.status(200).send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.post<{ Body: CarCreate }>('/', async (req, reply) => {
        const
            {
                manufacturer,
                model,
                modelYear,
                category,
                weekdayPrice,
                weekendPrice,
                weekdayPriceLoyalty,
                weekendPriceLoyalty,
                rentals,
            } = req.body;

        if (!verifyCategory(category)) {
            return reply.status(400).send({
                error: 'Invalid category',
                message: 'Category must be one of the following: Compact Hatch, Medium Hatch, Sedan, Van, Pickup',
            })
        }

        try {
            const data = await carUseCase.create({
                manufacturer,
                model,
                modelYear,
                category,
                weekdayPrice,
                weekendPrice,
                weekdayPriceLoyalty,
                weekendPriceLoyalty,
                rentals,
            });
            return reply.status(201).send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    fastify.delete<{Params: {id: string}}>('/:id', async (req, reply) => {
        const { id } = req.params;

        try {
            const data = await carUseCase.delete(id);
            return reply.status(204).send(data);
        } catch (error) {
            reply.send(error);
        }
    });

}