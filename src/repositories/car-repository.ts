import { prisma } from "../database/prisma-client";
import { Car, CarCreate, CarRepository } from "../interfaces/car-interface";
import { Category } from "../types/category-types";

class CarRepositoryPrisma implements CarRepository {
    
    async create(data: CarCreate): Promise<Car> {
        const result = await prisma.car.create({
            data: {
                manufacturer: data.manufacturer,
                model: data.model,
                modelYear: data.modelYear,
                category: data.category,
                weekdayPrice: data.weekdayPrice,
                weekendPrice: data.weekendPrice, 
                weekdayPriceLoyalty: data.weekdayPriceLoyalty, 
                weekendPriceLoyalty: data.weekendPriceLoyalty,
                rentals: {
                    create: data.rentals,
                },
            },
        });

        return {
            ...result,
            category: result.category as Category,
        };
    }
    
    async findAllCars(): Promise<Car[]> {
        const result = await prisma.car.findMany();

        return result.map(car => ({
            ...car,
            category: car.category as Category,
        }));
    }

    async findCarsByCategory(category: string): Promise<Car[]> {
        const result = await prisma.car.findMany({
            where: {
                category,
            },
        });

        return result.map(car => ({
            ...car,
            category: car.category as Category,
        }));
    }
    
    async delete(id: string): Promise<boolean> {
        const result = await prisma.car.delete({
            where: {
                id,
            },
        });

        return result ? true : false;
    }
}

export { CarRepositoryPrisma };
