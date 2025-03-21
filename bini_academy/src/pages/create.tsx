import { Grid, Container, Paper, TextInput, PasswordInput, Checkbox, Button, Title, Center } from '@mantine/core';
import bapaLogo from '../assets/bapalogo.svg'; // Import logo
import campusImage from '../assets/campus.jpg'; // Import background image
import { Header } from '../components/header.tsx';
import { useState } from 'react';
import { createUser } from '../api/user.tsx';
import { UserRole } from '../types.tsx';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';


export const UserCreatePage = () => {

  const navigate = useNavigate()
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPass, setConfirmPass] = useState<string | null>(null);
  const [address,] = useState<string | null>('myaddress123');
  const [role,] = useState<UserRole>(UserRole.Student)
  const [agree, setAgree] = useState<boolean>(false)

  const createUserMutation = useMutation({
    mutationFn: async () => {
      if (!name?.trim() || !email?.trim() || !password?.trim() || !address?.trim()) {
        throw new Error("Please fill out all required fields");
      }
      if (password !== confirmPass) {
        throw new Error("Error Confirming password");
      }

      return createUser({ name, password, address, email, user_role: role });
    },
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "User Created Successfully",
        color: "green",
      });
      navigate('/')
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message || "Cannot create user, an error has occurred",
        color: "red",
      });
    },
  });

  const createAccount = () => {
    createUserMutation.mutate();
  };

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
            <TextInput label="Full Name" placeholder="Full name..." required onChange={e => setName(e.target.value)} />
            <TextInput label="Email" placeholder="Email address..." type="email" mt="md" required onChange={e => setEmail(e.target.value)} />
            <PasswordInput label="Password" placeholder="Create password" mt="md" required onChange={e => setPassword(e.target.value)} />
            <PasswordInput label="Confirm Password" placeholder="Confirm password" mt="md" required onChange={e => { setConfirmPass(e.target.value) }} />
            <Checkbox label="I agree with all of your Terms & Conditions" mt="md" required onChange={e => setAgree(e.target.checked)} />
            <Button fullWidth mt="xl" color="orange" onClick={() => createAccount()} disabled={!agree}>Create Account</Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
