import { setupServer } from 'msw/node'
import { handlers } from './handlers'
import { overrideHandlers } from './overrideHandlers'

export const server = setupServer(...overrideHandlers, ...handlers)