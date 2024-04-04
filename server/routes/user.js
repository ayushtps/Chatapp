import express from 'express';
import { acceptFriendRequest, getMyProfile, login, logout, newUser, searchUser, sendFriendRequest } from '../controllers/user.js';
import { acceptReqestValidator, loginValidator, registerValidator, sendReqestValidator, validateHandler } from '../lib/validators.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { singleAvtar } from '../middlewares/multer.js';

const app = express.Router()

app.post('/new', singleAvtar, registerValidator(), validateHandler, newUser)
app.post('/login', loginValidator(), validateHandler, login)

app.use(isAuthenticated)

app.get('/me', getMyProfile)
app.get('/logout', logout)
app.get('/search', searchUser)
app.put('/sendrequest', sendReqestValidator(), validateHandler, sendFriendRequest)
app.put('/acceptrequest', acceptReqestValidator(), validateHandler, acceptFriendRequest)

export default app;