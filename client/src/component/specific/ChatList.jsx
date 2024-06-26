import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'
import { bgGradient } from '../../color'
import { useParams } from 'react-router-dom'

const ChatList = ({
    w = '100%',
    chats = [],
    onlineuser = [],
    newMessagesAlert = [
        {
            chatId: '',
            count: 0,
        }
    ], handalDeleteChat,
}) => {
    const { chatId } = useParams()
    return (
        <>
            <Stack width={w} direction={'column'} overflow={'auto'} height={'100%'} sx={{
            }}>
                {
                    chats?.map((data, index) => {
                        const { avatar, _id, name, groupChat, members } = data

                        const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id)

                        const isOnline = members?.some(() => onlineuser.includes(_id))

                        return <ChatItem index={index} newMessageAlert={newMessageAlert} isOnline={isOnline} avatar={avatar} name={name} _id={_id} key={index}
                            gropChat={groupChat} sameSender={chatId === _id} handalDeleteChat={handalDeleteChat}
                        />
                    })
                }
            </Stack>
        </>
    )
}

export default ChatList