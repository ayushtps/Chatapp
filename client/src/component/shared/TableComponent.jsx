import { Avatar, Container, Typography } from '@mui/material';
import { Table } from 'antd';
import React from 'react';
import { dashBoardData } from '../../constants/SampleData';

const TableComponent = ({ heading, columns, data }) => {
    return (
        <>
            <Container>
                <Typography sx={{
                    textAlign: "center",
                    padding: '2rem 0',
                    fontWeight: '600',
                    fontSize: '20px',
                    textTransform: 'capitalize'
                }}>
                    {heading}
                </Typography>
                <Table columns={columns} dataSource={data} />
            </Container>
        </>
    )
}

export default TableComponent