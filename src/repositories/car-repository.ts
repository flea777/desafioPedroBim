import { prisma } from "../database/prisma-client";
import { Car, CarCreate, CarRepository } from "../interfaces/car-interface";

class CarRepositoryPrisma implements CarRepository {

    async create(data: CarCreate): Promise<Car> {
        const result = await prisma.car.create({
            data: {
                manufacturer: data.manufacturer,
                model: data.model,
                modelYear: data.modelYear,
                category: data.category,
                prices:
                {
                    create: data.prices
                },
                rentals:
                {
                    create: data.rentals
                },
            },
        });

        return result;
    }

}

export { CarRepositoryPrisma };