import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import { useState } from 'react'; // Ensure useState is imported
import backgroundImage from './contact.png';
import './ContactForm.css';

//navu
import { API } from '../../service/api.js';  // Adjust the path accordingly

const Banner = styled(Box)`
    background-image: url(${backgroundImage});
    width: 100%;
    height: 80vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h2 {
        margin-top: 20px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
    font-family: 'Lovelo';
    margin-top: 20px;
`;

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await API.submitContactForm(formData);
            if (response.isSuccess) {
                console.log('Message stored in database:', response.data);
                alert('Your message has been sent successfully!');
                setFormData({ name: '', email: '', message: '' }); // Reset the form
            } else {
                console.error('Error storing message:', response.msg);
                alert('Failed to send your message. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="contact-form-container">
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="message">Message:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper>
                <Typography variant="h2">Getting in touch is easy!</Typography>
                <ContactForm />
                <Text variant="h5">
                    Reach out to me on{' '}
                    <Link href="https://github.com/Hemanshi2954" color="inherit" target="_blank">
                        <GitHub />
                    </Link>
                    , <br />
                    or send me an email at{' '}
                    <Link href="mailto:hemanship00@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
};

export default Contact;
