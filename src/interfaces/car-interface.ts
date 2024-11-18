import { Category } from "../types/category-types";
import { Price } from "./price-interface";
import { Rental } from "./rental-interface";

export interface Car {
    id: string;
    manufacturer: string;
    model: string;
    modelYear: string;
    category: Category;
    prices: Price[];
    rentals: Rental[];
}

export interface CarCreate {
    manufacturer: string;
    model: string;
    modelYear: string;
    category: Category;
    prices: Price[];
    rentals: Rental[];
}

export interface CarRepository {
    create(data: CarCreate): Promise<Car>;
}