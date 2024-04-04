import express from 'express';
import { addmembers, deleteChat, getChatDetails, getMessages, getMyChats, getMyGroup, leaveGroup, newGroupChat, removeMembers, renameGroup, sendAttachment } from '../controllers/chat.js';
import { ChatIdValidator, addMemberValidator, newGroupChatValidator, removeMemberValidator, renameValidator, sendAttachmentValidator, validateHandler } from '../lib/validators.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { attachmentsMulter } from '../middlewares/multer.js';

const app = express.Router()


app.use(isAuthenticated)

app.post('/new', newGroupChatValidator(), validateHandler, newGroupChat)
app.get('/my', getMyChats)
app.get('/my/groups', getMyGroup)
app.put('/addmembers', addMemberValidator(), validateHandler, addmembers)
app.put('/removemembers', removeMemberValidator(), validateHandler, removeMembers)
app.delete('/leave/:id', ChatIdValidator(), validateHandler, leaveGroup)
app.post('/message', attachmentsMulter, sendAttachmentValidator(), validateHandler, sendAttachment)
app.get("/message/:id", ChatIdValidator(), validateHandler, getMessages)
app.route('/:id')
    .get(ChatIdValidator(), validateHandler, getChatDetails)
    .put(renameValidator(), validateHandler, renameGroup)
    .delete(ChatIdValidator(), validateHandler,deleteChat)


export default app;