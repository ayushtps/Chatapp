import express from 'express';
import { allUser } from '../controllers/admin.js';

const app = express.Router()


app.get('/')
app.post('/verify');
app.get('/logout')
app.get('/users',allUser)
app.get('/message')
app.get('/statsf')
export default app;