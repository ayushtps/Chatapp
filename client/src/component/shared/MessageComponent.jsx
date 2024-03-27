import { Box, Typography } from '@mui/material'
import moment from 'moment'
import React, { memo } from 'react'
import { fileFormate } from '../../lib/Features'
import RenderAttachment from './RenderAttachment'

const MessageComponent = ({ message, user }) => {
    const { sender, attachments = [], createdAt, content } = message

    const sameSender = sender?._id === user._id
    const timeAgo = moment(createdAt).fromNow()
    return (
        <div style={{
            alignSelf: sameSender ? 'flex-end' : 'flex-start',
            backgroundColor: 'white',
            color: 'black',
            borderRadius: '5px',
            padding: '0.5rem',
            width: 'fit-content'
        }}>
            {
                !sameSender && <Typography color={"#2694ab"} fontWeight={600} variant='caption'>{sender.name}</Typography>
            }
            {
                content && <Typography>{content}</Typography>
            }
            {attachments.length > 0 && attachments.map((x, i) => {
                const url = x.url
                const file = fileFormate(url);
                return <Box key={i}>
                    <a href={url} target='blank' download style={{
                        color:'black'
                    }}> 
                        {RenderAttachment(file,url)}
                    </a>
                </Box>
            })}
            <Typography variant='caption' color={'Text.secondary'}>{timeAgo}</Typography>
        </div>
    )
}

export default memo(MessageComponent)