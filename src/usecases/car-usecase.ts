import { Car, CarCreate, CarRepository } from "../interfaces/car-interface";
import { CarRepositoryPrisma } from "../repositories/car-repository"

export class CarUseCase {
    private carRepository: CarRepository;
    constructor() {
        this.carRepository = new CarRepositoryPrisma();
    }

    async create({manufacturer, model, modelYear, category, prices, rentals}: CarCreate): Promise<Car> {
        const result = this.carRepository.create({manufacturer, model, modelYear, category, prices, rentals});

        return result;
    }
}