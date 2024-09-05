
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import backgroundImage  from './about.png';

const Banner = styled(Box)`
    background-image: url(${backgroundImage});
    width: 100%;
    height: 80vh;
    background-position: left 0px bottom 0px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h2">Glob Gazzing: Travel Dreams Phasing</Typography>
                <Text variant="h5">"Glob Gazzing: Travel Dreams Phasing" is your gateway to global adventures. 
                    Join us as we explore stunning destinations, share inspiring travel stories, 
                    and offer practical tips for your journeys...<br />
                    Embrace the wanderlust and let your travel dreams evolve with every new horizon. 
                    Discover the world, one phase at a time.
                    
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on  
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Hemanshi2954" color="inherit" target="_blank">
                            <GitHub />
                        </Link>
                    </Box>
                       or send me an Email
                    <Link href="mailto:hemanship00@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;