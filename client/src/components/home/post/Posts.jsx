import { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../../service/api';
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = decodeURIComponent(searchParams.get('category') || '');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.getAllPosts({ category: '' }); 

                console.log("API Response:", response);

                if (response.isSuccess) {
                    const allPosts = response.data;
                    console.log("All Posts:", allPosts);

                    const filteredPosts = category
                        ? allPosts.filter(post => {
                            const categoriesArray = Array.isArray(post.categories) ? post.categories : [post.categories];
                            return categoriesArray.some(cat => {
                                const decodedCategory = decodeURIComponent(cat); // Decode API category
                                // console.log(`"${decodedCategory}" == "${category}"`);
                                return decodedCategory.trim().toLowerCase() === category.trim().toLowerCase();
                            });
                        })
                        : allPosts;


                    console.log("Filtered Posts:", filteredPosts);
                    setPosts(filteredPosts);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchData();
    }, [category]);

    return (
        <div style={{ marginBottom: "300px" }}>
            <Grid container spacing={3}>
                {posts?.length ? (
                    posts.map(post => (
                        <Grid item lg={3} sm={4} xs={12} key={post._id}>
                            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                                <Post post={post} />
                            </Link>
                        </Grid>
                    ))
                ) : (
                    <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                        No data is available for selected category
                    </Box>
                )}
            </Grid>
        </div>

    );
};

export default Posts;
