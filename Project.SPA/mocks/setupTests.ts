import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Start the mock server
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
