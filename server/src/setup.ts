import {app} from './server';
import request from 'supertest';

export const appTesting = request(app)