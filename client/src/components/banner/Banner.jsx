import { styled, Box, Typography } from '@mui/material';
import backgroundImage  from './homepage.jpg';
const Image = styled(Box)`
    width: 100%;
    background: url(${backgroundImage}) center/55% repeat-x #000;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
`;

const Heading = styled(Typography)`
    font-size: 90px;
    font-family: 'Lovelo';
    color: #336B87;
    text-shadow: 2px 2px #ffffff;
    line-height: 1
`;

const SubHeading = styled(Typography)`
    font-size: 20px;
    font-family: 'Lovelo';
    color: #336B87;
    text-shadow: 2px 2px #ffffff;
`;

const Banner = () => {
    
    return (
        <Image>
            <Heading>GLOB GAZZING</Heading>
            <SubHeading>Travel Dream Phasing....</SubHeading>
        </Image>
    )
}

export default Banner;