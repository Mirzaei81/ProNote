import {server} from './server.js';
import  {agent} from 'supertest';

export const TestServer = server.listen()
export const appTesting = agent(TestServer)