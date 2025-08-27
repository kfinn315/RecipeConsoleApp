// // import { setupServer } from "msw/node"
// // import { handlers } from "../mocks/handlers";
// // import { handlers as automockHandlers } from "./mock";
// import { fromOpenApi } from '@mswjs/source/open-api';
// import { setupServer } from 'msw/node';
// // import { handlers_openapi } from '../mocks/handlers_openapi';
// import apiSpec from './openapi.json'; 

// export async function getServer() {
//     const handlers_openapi = await fromOpenApi(apiSpec);

//     // Start the mock server
//     const server = setupServer(...handlers_openapi);
//     return server;
// }
// // beforeAll(() => server.listen());
// // afterEach(() => server.resetHandlers());
// // afterAll(() => server.close());
