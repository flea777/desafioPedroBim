import { Car } from "./car-interface";

export interface Rental {
    id: string;
    startDate: Date;
    endDate: Date;
    isLoyaltyMember: boolean;
    carId: string;
    car: Car;
}