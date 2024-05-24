import {server} from './server.ts';
import  {agent} from 'supertest';
export const TestServer = server.listen()
export const appTesting = agent(TestServer)