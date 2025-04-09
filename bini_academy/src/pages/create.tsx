import {
  Grid,
  Container,
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Center,
  Select,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { IconArrowRight } from '@tabler/icons-react';
import bapaLogo from '../assets/bapalogo.svg';
import campusImage from '../assets/campus.jpg';
import { Header } from '../components/header';
import { User, UserRole } from '../types';
import { signupUser } from '../supabase/api/user';

export const UserCreatePage = () => {
  const navigate = useNavigate();
  const form = useForm({  
    initialValues: {       
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      phone: '',
      address: '',
      email: '',
      password: '',
      confirmPass: '',
      agree: false,
    },
    validate: {
      firstName: (value) => (value.trim().length > 0 ? null : 'First name is required'),
      lastName: (value) => (value.trim().length > 0 ? null : 'Last name is required'),
      dob: (value) => (value ? null : 'Date of birth is required'),
      gender: (value) => (value ? null : 'Gender is required'),
      phone: (value) => (value ? null : 'Phone number is required'),
      address: (value) => (value.trim().length > 0 ? null : 'Address is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 6 ? null : 'Password must be at least 6 characters'),
      confirmPass: (value, values) => (value === values.password ? null : 'Passwords do not match'),
      agree: (value) => (value ? null : 'You must agree to the terms'),
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async () => {
      return signupUser({
        name: `${form.values.firstName} ${form.values.lastName}`,
        password: form.values.password,
        address: form.values.address,
        email: form.values.email,
        user_role: UserRole.Student,
        gender: form.values.gender,
        birth_date: new Date(form.values.dob),
        phone_number: form.values.phone,
        profile_picture: ''
      } as User);
    },
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'User Created Successfully',
        color: 'green',
      });
      navigate('/');
    },
    onError: (error: any) => {
      notifications.show({
        title: 'Error',
        message: error.message || 'Cannot create user, an error has occurred',
        color: 'red',
      });
    },
  });

  const createAccount = () => {
    form.validate();
    if (form.isValid()) {
      createUserMutation.mutate();
    }
  };

  return (
    <Container fluid style={{ height: '100vh', padding: 0 }}>
      <Header />
      <Grid gutter={0} style={{ height: '100vh' }}>
        {/* Left Side with Logo */}
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
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.86)',
            }}
          />
          <div style={{ textAlign: 'center', zIndex: 1 }}>
            <img src={bapaLogo} alt="BAPA Logo" width="400" />
          </div>
        </Grid.Col>

        {/* Right Side Form */}
        <Grid.Col
          span={{ base: 12, md: 6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <Paper p={20} radius="md" style={{ width: '100%', maxWidth: 450 }}>
            <Center>
              <Title order={2} mb="md">
                Create your account
              </Title>
            </Center>

            <Group grow>
              <TextInput
                label="Full Name"
                placeholder="First name"
                {...form.getInputProps('firstName')}
              />
              <TextInput
                label=" "
                placeholder="Last name"
                {...form.getInputProps('lastName')}
              />
            </Group>

            <Group grow mt="md">
              {/* Native React Date Input */}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <label style={{ marginBottom: 4, fontSize: '14px', fontWeight: 500 }}>
                  Date of Birth
                </label>
                <input
                  type="date"
                  max={new Date().toISOString().split('T')[0]}
                  value={form.values.dob ? new Date(form.values.dob).toISOString().split('T')[0] : ''}
                  onChange={(e) =>
                    form.setFieldValue('dob', e.target.value)
                  }
                  style={{
                    padding: '8px',
                    borderRadius: '4px',
                    border: form.errors.dob ? '1px solid red' : '1px solid #ced4da',
                  }}
                  required
                />
                {form.errors.dob && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{form.errors.dob}</span>
                )}
              </div>

              <Select
                label="Gender"
                placeholder="Select Gender"
                data={['Male', 'Female', 'Other']}
                {...form.getInputProps('gender')}
                required
              />
            </Group>

            <Group grow mt="md">
              <TextInput
                label="Phone Number"
                placeholder="+63"
                {...form.getInputProps('phone')}
              />
              <TextInput
                label="Address"
                placeholder="Current Address"
                {...form.getInputProps('address')}
              />
            </Group>

            <TextInput
              label="Email"
              placeholder="Email address"
              type="email"
              mt="md"
              {...form.getInputProps('email')}
              required
            />
            <Group grow mt="md">
              <PasswordInput
                label="Password"
                placeholder="Create password"
                {...form.getInputProps('password')}
                required
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm password"
                {...form.getInputProps('confirmPass')}
                required
              />
            </Group>

            <Checkbox
              mt="md"
              label={
                <>
                  I agree with all of your{' '}
                  <a href="#" style={{ color: 'blue' }}>
                    Terms & Conditions
                  </a>
                </>
              }
              {...form.getInputProps('agree', { type: 'checkbox' })}
              required
            />
            <Button
              fullWidth
              mt="xl"
              color="orange"
              rightSection={<IconArrowRight size={18} />}
              onClick={createAccount}
              loading={createUserMutation.status === 'pending'}
            >
              Create Account
            </Button>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
