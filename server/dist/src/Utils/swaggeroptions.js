const port = process.env.PORT || 3000;
const address = process.env.LOCALADDRESS || '0.0.0.0';
export const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description: "This is a CRUD API for Pro Note  application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html"
            }
        },
        servers: [
            {
                url: `http://${address}:${port}`
            }
        ]
    },
    apis: [
        "./../routes/*.js"
    ]
};

//# sourceMappingURL=swaggeroptions.js.map