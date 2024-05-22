import {server} from './server';
import request from 'supertest';

export const appTesting = request(server)