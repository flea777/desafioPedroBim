import { Category } from "../types/category-types";
import { Rental } from "./rental-interface";

export interface Car {
    id: string;
    manufacturer: string;
    model: string;
    modelYear: string;
    category: Category;
    rentals: Rental[];
    createdAt: Date;
    updatedAt: Date;
}

export interface CarCreate {
    manufacturer: string;
    model: string;
    modelYear: string;
    category: Category;
    weekdayPrice: number,
    weekendPrice: number,
    weekdayPriceLoyalty: number,
    weekendPriceLoyalty: number,
    rentals: Rental[];
}

export interface CarRepository {
    delete(id: string): Promise<boolean>;
    create(data: CarCreate): Promise<Car>;
    findAllCars(): Promise<Car[]>;
}