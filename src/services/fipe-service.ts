import axios from 'axios';

export const FipeService = {

    async verifyIfBrandExists(brandToVerify: string): Promise<boolean> {
        const response = await axios.get('https://fipe.parallelum.com.br/api/v2/cars/brands')
            .catch(err => {
                throw new Error('Error getting data from FIPE');
            });

        return response.data.some((brand: { name: string }) => brandToVerify === brand.name);
    },

    async verifyIfModelExists(modelToVerify: string, brandToVerify: string): Promise<boolean> {
        const response = await axios.get(`https://fipe.parallelum.com.br/api/v2/cars/brands/${brandToVerify}/models`)
            .catch(err => {
                throw new Error('Error getting data from FIPE');
            });
    
        return response.data.some((model: { name: string }) => modelToVerify.trim().toLowerCase() === model.name.trim().toLowerCase());
    },
    

    async getBrandCode(brand: string): Promise<string> {
        const response = await axios.get('https://fipe.parallelum.com.br/api/v2/cars/brands')
            .catch(err => {
                throw new Error('Error getting data from FIPE');
            });
    
        const foundBrand = response.data.find((item: { name: string, code: string }) => item.name === brand);
    
        if (foundBrand) {
            return foundBrand.code;
        } else {
            throw new Error('Brand not found');
        }
    },
    
}