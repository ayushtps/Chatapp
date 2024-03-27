import { Menu } from '@mui/material'
import React from 'react'

function FileMenu({ anchorE1 }) {
    return (
        <>
            <Menu  anchorE1={anchorE1} open={false}>
                <div style={{
                    width:'10rem'
                }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                     Veniam minima sapiente illo molestias, porro eius unde harum rerum atque.
                      Fugit veritatis molestiae magni hic inventore? Reiciendis, perferendis hic! Facere, non.
                </div>
            </Menu>
        </>
    )
}

export default FileMenu