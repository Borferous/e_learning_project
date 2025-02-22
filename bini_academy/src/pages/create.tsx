import { Grid, Container, Paper, TextInput, PasswordInput, Checkbox, Button, Title, Center } from '@mantine/core';
import bapaLogo from '../assets/bapalogo.svg'; // Import logo
import campusImage from '../assets/campus.jpg'; // Import background image
import { Header } from '../components/header.tsx';
import { Link } from 'react-router-dom';

export const UserCreatePage = () => {
  return (
    
    <Container fluid style={{ height: '100vh', padding: 0 }}>
        <Header />
      <Grid gutter={0} style={{ height: '100vh' }}>
        {/* Left side - Background with Logo */}
        <Grid.Col 
          span={{ base: 12, md: 6 }} 
          style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url(${campusImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* White overlay */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.86)', // White overlay
            }}
          />
          
          {/* Logo (Ensuring it's above the overlay) */}
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <img src={bapaLogo} alt="BAPA Logo" width="400" />
          </div>
        </Grid.Col>

        {/* Right side - Signup Form */}
        <Grid.Col 
          span={{ base: 12, md: 6 }} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh' 
          }} 
        >
          <Paper p={20} radius="md" style={{ width: '100%', maxWidth: 400 }}>
            <Center>
              <Title order={2} mb="md">Create your account</Title>
            </Center>
            <TextInput label="Full Name" placeholder="Full name..." required />
            <TextInput label="Email" placeholder="Email address..." type="email" mt="md" required />
            <PasswordInput label="Password" placeholder="Create password" mt="md" required />
            <PasswordInput label="Confirm Password" placeholder="Confirm password" mt="md" required />
            <Checkbox label="I agree with all of your Terms & Conditions" mt="md" required />
            <Button fullWidth mt="xl" color="orange" component={Link} to="/">Create Account</Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
