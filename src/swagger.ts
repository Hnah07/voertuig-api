import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Voertuig API",
            version: "1.0.0",
            description: "Voertuig API",
        },
        servers:[
            process.env.NODE_ENV !== "production" 
            ? {    
                url:"http://localhost:3000/api",
                description:"Development server"
            }
            :
            {
                url:"https://nodejs-ex-voertuigen.onrender.com/api",
                description:"Production server"
            },
        ],
        components: {
            schemas: {
                Voertuig: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },    
                        merk: { type: "string" },
                        model: { type: "string" },
                        bouwjaar: { type: "string" },
                        prijs: { type: "string" },
                        type: { type: "number" },
                        cilinderinhoud: { type: "string" },
                        enum: {type: "string"},
                    },
                    required: ["merk", "model", "bouwjaar", "prijs", "type", "cilinderinhoud"],
                },
                Error: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                    },
                    required: ["message"],
                },
            },
        },
        tags: [
            {
                name: "Voertuigen",
                description: "Endpoints for voertuigen"
            }
        ]
    },
    apis: ["**/*.ts"],
};

export const specs = swaggerJSDoc(options);
