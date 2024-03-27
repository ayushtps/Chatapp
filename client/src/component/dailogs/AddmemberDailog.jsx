import { Stack, Typography } from '@mui/material'
import { Modal } from 'antd'
import React, { useState } from 'react'
import { sampleUser } from '../../constants/SampleData'
import UserItem from '../shared/UserItem'

const AddmemberDailog = ({ addMember, isLoadingAddMember, chatId }) => {
    const [Open, setOpen] = useState(true)
    const [members, setmembers] = useState(sampleUser)
    const [selectedmembers, setselectedmembers] = useState([])

    const selectMemberHandler = (id) => {
        setselectedmembers(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    }



    const addMemberSubmitHandler = () => {
        closeHandler()
    }

    const closeHandler = () => {
        setselectedmembers([])
        setmembers([])
        setOpen(false)
    }
    return (
        <>
            <Modal
                title="Add Member"
                open={Open}
                centered
                onCancel={closeHandler}
                onOk={addMemberSubmitHandler}
            >
                <Stack spacing={'1rem'}>
                    {members.length > 0 ? members?.map((x, i) => (
                        <UserItem key={i} user={x} handler={selectMemberHandler} isAdded={selectedmembers.includes(x._id)} />
                    )) : <Typography textAlign={'center'}>No Friends</Typography>
                    }
                </Stack>

            </Modal >
        </>
    )
}

export default AddmemberDailog