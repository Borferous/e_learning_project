import { Grid, Container, Paper, TextInput, PasswordInput, Checkbox, Button, Title, Center } from '@mantine/core';
import bapaLogo from '../assets/bapalogo.svg'; // Import logo
import campusImage from '../assets/campus.jpg'; // Import background image
import { Header } from '../components/header.tsx';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../supabase/api/user.ts';


export const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const loginMutation = useMutation({
    mutationFn: async () => {
      if (!email?.trim() || !password?.trim()) {
        throw new Error("Email and password are required");
      }
      await loginUser(email, password);
    },
    onSuccess: () => {
      notifications.show({ title: "Success", color: "green", message: "Login Successful"});
      navigate('/')
    },
    onError: () => {
      notifications.show({ title: "Error", color: "red", message: "Login Failed"});
    },
  });

  const attemptLogin = async () => {
    loginMutation.mutate()
  }

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

        {/* Right side - Signin Form */}
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
              <Title order={2} mb="md">Sign in to your account</Title>
            </Center>
            <TextInput label="Email" placeholder="Email address..." type="email" mt="md" required onChange={e => setEmail(e.target.value)} />
            <PasswordInput label="Password" placeholder="Create password" mt="md" required onChange={e => setPassword(e.target.value)} />
            <Checkbox label="Remember me" mt="md" required />
            <Button fullWidth mt="xl" color="orange" onClick={attemptLogin}>Sign In</Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
