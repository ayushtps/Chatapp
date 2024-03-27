import Grid from '@mui/material/Grid';
import React from 'react';
import Header from './Header';
// import Title from '../component/shared/Title'
import { useParams } from 'react-router-dom';
import ChatList from '../component/specific/ChatList';
import Profile from '../component/specific/Profile';
import { sampleChats } from '../constants/SampleData';

const AppLayout = () => (WrapperdComponent) => {
    return (props) => {
        const params = useParams()
        const chatId = params.chatId

        const handalDeleteChat = (e, _id, groupChat) => {
            e.preventDefault()
            console.log('jbj');
        }
        return (
            <>
                {/* <Title title='' description=''/> */}
                <Header />
                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid item sm={4} md={3} sx={{
                        display: { xs: 'none', sm: 'block' }
                    }} height={"100%"} >
                        <ChatList chats={sampleChats} chatId={chatId} handalDeleteChat={handalDeleteChat} />
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"} >
                        <WrapperdComponent {...props} />
                    </Grid>
                    <Grid item md={4} lg={3} sx={{
                        display: { xs: 'none', md: 'block' },
                        padding: '2rem',
                        bgcolor: 'rgba(0,0,0,0.85)'
                    }} height={"100%"} >
                        <Profile />
                    </Grid>
                </Grid>

            </>
        )
    }
};

export default AppLayout