import { Avatar, Stack, Typography } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TelegramIcon from '@mui/icons-material/Telegram';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from 'moment';
import { TextColor } from '../../color';

const Profile = () => {
    return (
        <Stack spacing={'2rem'} direction={'column'} alignItems={'center'}>
            <Avatar sx={{
                width: 200,
                height: 200,
                objectFit: 'contain',
                marginBottom: '1rem',
                border: '2px solid white'
            }} />
            <ProfileCard heading={'Bio'} text={'asvh jhav'} />
            <ProfileCard heading={'Username'} text={'@ayushpaghadal'} Icon={<AccountCircleIcon />} />
            <ProfileCard heading={'Name'} text={'ayush paghadal'} Icon={<TelegramIcon />} />
            <ProfileCard heading={'Joined'} text={moment().fromNow()} Icon={<CalendarMonthIcon />} />
        </Stack>
    )
}

const ProfileCard = ({ text, Icon, heading }) => (
    <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={'1rem'}
        textAlign={'center'}
        color={TextColor}
    >
        <Stack>{Icon && Icon}</Stack>
        <Stack>
            <Typography variant='body1'>{text}</Typography>
            <Typography color={'gray'} variant='caption'>{heading}</Typography>
        </Stack>
    </Stack>
)

export default Profile