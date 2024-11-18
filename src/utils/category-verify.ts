import { Category } from "../types/category-types";

export function verifyCategory(category: string): boolean {
    const validCategories: Category[] = ['Compact Hatch', 'Medium Hatch', 'Sedan', 'Van', 'Pickup'];
    return validCategories.includes(category as Category);
}
