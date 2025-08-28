import { server } from "./node"

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
