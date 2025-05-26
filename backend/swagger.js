// backend/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Beer Store API',
        version: '1.0.0',
        description: 'API documentation for Beer ordering system',
    },
    servers: [
        {
            url: 'http://localhost:4000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', './models/*.js'], // rutele tale
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec, swaggerUi };
