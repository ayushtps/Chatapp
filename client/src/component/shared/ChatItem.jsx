import React, { memo } from 'react'
import { Links } from '../styles/StyledComponent'
import { Box, Stack, Typography } from '@mui/material'
import AvatarCard from './AvatarCard'
import { SameSender } from '../../color'

const ChatItem = ({
    avatar = [],
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handalDeleteChat
}) => {
    return (
        <>
            <Links
                sx={{ padding: '0' }}
                to={`/chat/${_id}`} onContextMenu={(e) => handalDeleteChat(e, _id, groupChat)}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem',
                    backgroundColor: sameSender ? SameSender : "unset",
                    color: sameSender ? "black" : "black",
                    gap: '1rem',
                    position: 'relative'
                }}>
                    <AvatarCard avatar={avatar} />
                    <Stack>
                        <Typography>{name}</Typography>
                        {
                            newMessageAlert && <Typography>{newMessageAlert.count}+ New Messages</Typography>
                        }
                    </Stack>
                    {
                        isOnline && (
                            <Box sx={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: 'green',
                                position: 'absolute',
                                top: '50%',
                                right: '1rem',
                                transform: 'translateY(-50%)'
                            }} />
                        )
                    }

                </div>
            </Links>
        </>
    )
}

export default memo(ChatItem)