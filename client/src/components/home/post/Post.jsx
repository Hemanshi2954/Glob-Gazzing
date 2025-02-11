import { styled, Box, Typography } from '@mui/material';

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 20px;
    display: flex;
    flex-direction: column;
    height: 350px;
    overflow: hidden;
    & > img, & > p {
        padding: 0 0 0 0;
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '12px 12px 0 0',
    height: 150,
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
    text-align: center;
    margin: 5px 0;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    margin: 5px 0;
    text-align:center;
`;

const Details = styled(Typography)`
    margin-top: 10px;
    color: #4a4a4a;
    font-size: 14px;
    line-height: 1.5;
    word-break: break-word; /* Break long words */
    overflow: hidden; /* Hide overflowing content */
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limit to 3 lines */
    -webkit-box-orient: vertical;
    text-overflow: ellipsis; /* Add ... for overflowing text */
    height: 80px; /* Adjust height for consistency */
    text-align: center; /* Center-align text */
`;

const Post = ({ post }) => {
    const url = post.picture || 'https://img.freepik.com/premium-photo/travel-content-creator-locat_917213-186772.jpg?w=360';

    const addEllipsis = (str, limit) => (str.length > limit ? `${str.substring(0, limit)}...` : str);

    return (
        <Container
            sx={{
                transition: 'transform 0.3s ease, background-color 0.3s ease',
                '&:hover': { transform: 'scale(1.05)' },
            }}
        >
            <Image src={url} alt="post" />
            <Text>{decodeURIComponent(post.categories)}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details dangerouslySetInnerHTML={{ __html: post.description }} />
        </Container>
    );
};

export default Post;
