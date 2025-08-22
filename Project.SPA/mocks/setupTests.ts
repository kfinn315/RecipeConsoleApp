import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import { handlers as automockHandlers } from "./mock";

// Start the mock server
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
 