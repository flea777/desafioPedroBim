import { Car } from "./car-interface";

export interface Price {
    id: string;
    weekdayPrice: number;
    weekendPrice: number;
    weekdayPriceLoyalty: number;
    weekendPriceLoyalty: number;
    carId: string;
    car: Car;
}