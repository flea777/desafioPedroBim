import fastify, { FastifyInstance } from "fastify";
import { carRoutes } from "./routes/car-routes";
const app: FastifyInstance = fastify({ logger: true });

app.register(carRoutes, {
    prefix: '/cars',
});

app.listen(
    {
        port: 3000
    },
    () => console.log('Server is running on port 3000!')
);