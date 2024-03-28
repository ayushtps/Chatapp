import { styled } from "@mui/material";
import { Link as LinkComponent } from "react-router-dom";
import { ContrastColor, grayColor, matBlack } from "../../color";

export const VisuallyHiddenInput = styled('input')({
    border: 0,
    clip: 'react(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
})

export const Links = styled(LinkComponent)`
    text-decoration:none;
    color:black;
    padding:1rem;
    margin:7px 0;
    &:hover{
        background-color:#f0f0f0;
        color:black;
    }
`

export const InputBox = styled('input')`
    width:100%;
    height:100%;
    border:none;
    outline:none;
    padding:0 3rem;
    border-radius:1.5rem;
    background-color:rgba(247,247,247,1);
`;

export const SearchFeild = styled('input')`
    width:20vmax;
    border:none;
    outline:none;
    padding:1rem 1rem;
    border-radius:1.5rem;
    background-color:${grayColor};
    font-size:1.1rem
`

export const CurveButton = styled('button')`
    cursor:pointer;
    border:none;
    outline:none;
    padding:1rem 2rem; 
    border-radius:1.5rem;
    background-color:${ContrastColor};
    color:white;
    font-size:1.1rem;
    transition: all 0.3s ease-in-out;
    &:hover{
        outline: 1px solid white;
        outline-offset: -5px;
    }
`