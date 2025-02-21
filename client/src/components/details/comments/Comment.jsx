import { useContext } from "react";
import { getAccessToken } from '../../../utils/common-utils';
import axios from 'axios';
import { Typography, Box, styled } from "@mui/material";
import { Delete } from '@mui/icons-material';

import { DataContext } from "../../../context/DataProvider";

const Component = styled(Box)`
    margin-top: 30px;
    background: #F5F5F5;
    padding: 10px;
`;

const Container = styled(Box)`
    display: flex;
    margin-bottom: 5px;
`;

const Name = styled(Typography)`
    font-weight: 600,
    font-size: 18px;
    margin-right: 20px;
`;

const StyledDate = styled(Typography)`
    font-size: 14px;
    color: #878787;
`;

const DeleteIcon = styled(Delete)`
    margin-left: auto;
`;

const Comment = ({ comment, setToggle }) => {

    const { account } = useContext(DataContext);
    if (!account || !account.username) {
        return null; 
    }
    
    const removeComment = async () => {
        try {
            // const response = await API.deleteComment(comment._id);
            // if (response.isSuccess) {
            //     setToggle(prev => !prev);
            // } else {
            //     console.error("Failed to delete comment:", response.error);
            // }
            const response = await axios.delete(`http://glob-gazzing-backend.onrender.com/comment/delete/${comment._id}`,{
                headers:{
                    authorization : getAccessToken(),
                },
            });
            console.log('comment deleted successfully:',response);
            setToggle(prev => !prev); 
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return (
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
                { comment.name === account.username && <DeleteIcon onClick={() => removeComment()} /> }
            </Container>
            <Typography>{comment.comments}</Typography>
        </Component>
    )
}

export default Comment;
