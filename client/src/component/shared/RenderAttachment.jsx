import React from 'react'
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { transformImage } from '../../lib/Features';

const RenderAttachment = (file, url) => {
    switch (file) {
        case "video":
           return <video src={url} preload='none' width={"200px"} controls />
           
        case "image":
           return <img src={transformImage(url,200)} alt='Attachment' width={"200px"} height={'150px'} style={{objectFit:'contain'}}/>
           
        case "audio":
           return <audio src={url} preload='none' controls />
           

        default:
           <FileOpenIcon/>
    }
}

export default RenderAttachment