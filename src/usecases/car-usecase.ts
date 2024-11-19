import { Car, CarCreate, CarRepository } from "../interfaces/car-interface";
import { CarRepositoryPrisma } from "../repositories/car-repository";
import { categoryRank } from "../types/category-types";
import { FipeService } from "../services/fipe-service";

export class CarUseCase {
    private carRepository: CarRepository;
    constructor() {
        this.carRepository = new CarRepositoryPrisma();
    }
    
    async create({ manufacturer, model, modelYear, category, weekdayPrice, weekendPrice, weekdayPriceLoyalty, weekendPriceLoyalty, rentals }: CarCreate): Promise<Car> {
        const brandExists = await FipeService.verifyIfBrandExists(manufacturer);
        if (brandExists) {
            const brandCode = await FipeService.getBrandCode(manufacturer);
            
            const modelExists = await FipeService.verifyIfModelExists(model, brandCode);
            if (modelExists) {
                const data = await this.carRepository.create({
                    manufacturer, model, modelYear, category, weekdayPrice, weekendPrice, weekdayPriceLoyalty, weekendPriceLoyalty, rentals
                });
                return data;
            } else {
                throw new Error('This model does not exist');
            }
        } else {
            throw new Error('This brand does not exist');
        }
    }
    
    
    async listAllCars() {
        const data = await this.carRepository.findAllCars();
        return data;
    }

    async listCarsByCategory(category: string) {
        const data = await this.carRepository.findCarsByCategory(category);
        return data;
    }

    async delete(id: string) {
        const data = await this.carRepository.delete(id);
        return data;
    }

    async findCheapestCar(startDate: string, endDate: string, loyalty: boolean) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const dayCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

        if(dayCount <= 0) throw new Error('Invalid date range');

        const cars = await this.carRepository.findAllCars();

        const rentals = cars.map(car => {
            const weekdayCount = this.getWeekDaysCount(start, end);
            const weekendCount = dayCount - weekdayCount;

            let price = 0.0;

            if(!loyalty) price = weekdayCount * car.weekdayPrice + weekendCount * car.weekendPrice;
            else price = weekdayCount * car.weekdayPriceLoyalty + weekendCount * car.weekendPriceLoyalty;

            return { car, price };
        });

        rentals.sort((a, b) => {
            if (a.price !== b.price) return a.price - b.price;

            return categoryRank[b.car.category] - categoryRank[a.car.category];
        });

        return {
            car: rentals[0].car,
            price: rentals[0].price.toFixed(2),
        };
    }

    private getWeekDaysCount(start: Date, end: Date): number {
        let count = 0;
        for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
            const day = d.getDay();
            if (day >= 1 && day <= 5) count++;
        }
        return count;
    }
}