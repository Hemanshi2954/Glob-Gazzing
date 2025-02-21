import { useState, useEffect, useContext } from 'react';
import { getAccessToken } from '../../utils/common-utils';
import { Box, Typography, styled } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom' 

import { API } from '../../service/api';

import { DataContext } from '../../context/DataProvider';
import axios from 'axios';
// components
import Comments from './comments/Comments';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    marginTop: '60px'
});

const EditIcon = styled(Edit)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const DeleteIcon = styled(Delete)`
    margin: 5px;
    padding: 5px;
    border: 1px solid #878787;
    border-radius: 10px;
`;

const Heading = styled(Typography)`
    font-size: 38px;
    font-weight: 600;
    text-align: center;
    margin: 50px 0 10px 0;
`;

const Author = styled(Box)(({ theme }) => ({
    color: '#878787',
    display: 'flex',
    margin: '20px 0',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    },
}));

//added
const DescriptionContainer = styled(Box)`
    font-size: 16px;
    line-height: 1.6;
    word-break: break-word;
    text-align: justify;
    margin: 20px 0;

    & p {
        margin: 8px 0;
    }

    & br {
        line-height: 1.6;
    }
`;
const DetailView = () => {
    const url = 'https://cdn.pixabay.com/photo/2023/11/29/18/03/ai-generated-8420101_1280.jpg';
    
    const [post, setPost] = useState({});
    const { account } = useContext(DataContext);

    //const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        }
        fetchData();
    }, [id]);

    const deleteBlog = async () => {  
        if (!post._id) {
            console.error('Post ID is undefined');
            return;
        }
        try {
            const response = await axios.delete(`http://glob-gazzing-backend.onrender.com/delete/${post._id}`,{
                headers:{
                    authorization : getAccessToken(),
                },
            });
            console.log('post deleted successfully:',response);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
     }

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />
            <Box style={{ float: 'right' }}>
                {   
                    account.username === post.username && 
                    <>  
                        <Link to={`/update/${post._id}`}><EditIcon color="primary" /></Link>
                        <DeleteIcon onClick={() => deleteBlog()} color="error" />
                    </>
                }
            </Box>
            <Heading>{post.title}</Heading>

            <Author>
                <Link to={`/?username=${post.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography>Author: <span style={{fontWeight: 600}}>{post.username}</span></Typography>
                </Link>
                <Typography style={{marginLeft: 'auto'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Author>

            <DescriptionContainer    dangerouslySetInnerHTML={{ __html: post.description }}/>
            <Comments post={post} />
        </Container>
    )
}

export default DetailView;
