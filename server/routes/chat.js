import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addmembers, deleteChat, getChatDetails, getMyChats, getMyGroup, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachment } from '../controllers/chat.js';
import { attachmentsMulter } from '../middlewares/multer.js';

const app = express.Router()


app.use(isAuthenticated)

app.post('/new',newGroupChat)
app.get('/my',getMyChats)
app.get('/my/groups',getMyGroup)
app.put('/addmembers',addmembers)
app.put('/removemembers',removeMembers)
app.delete('/leave/:id',leaveGroup)
app.post('/message',attachmentsMulter,sendAttachment)
app.route('/:id').get(getChatDetails).put(renameGroup).delete(deleteChat)


export default app;