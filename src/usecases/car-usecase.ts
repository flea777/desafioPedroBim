import { Car, CarCreate, CarRepository } from "../interfaces/car-interface";
import { CarRepositoryPrisma } from "../repositories/car-repository"

export class CarUseCase {
    private carRepository: CarRepository;
    constructor() {
        this.carRepository = new CarRepositoryPrisma();
    }
    
    async create({ manufacturer, model, modelYear, category, weekdayPrice, weekendPrice, weekdayPriceLoyalty, weekendPriceLoyalty, rentals }: CarCreate): Promise<Car> {
        const data = this.carRepository.create({
            manufacturer, model, modelYear, category, weekdayPrice, weekendPrice, weekdayPriceLoyalty, weekendPriceLoyalty, rentals
        });
        
        return data;
    }
    
    async listAllCars() {
        const data = await this.carRepository.findAllCars();
        return data;
    }

    async delete(id: string) {
        const data = await this.carRepository.delete(id);
        return data;
    }
}