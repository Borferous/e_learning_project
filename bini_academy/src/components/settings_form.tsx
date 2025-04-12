import { useState } from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Select,
  Paper,
  Text,
} from '@mantine/core';
import { SocialMediaSection } from './social_media';
interface SocialMedia {
  id: string;
  platform: string;
  url: string;
}

interface SettingsFormProps {
  initialData: {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    phone: string;
    address: string;
    email: string;
    socialMedia?: SocialMedia[];
  };
  onSubmit: (values: any) => void;
}

export const SettingsForm = ({ initialData, onSubmit }: SettingsFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const form = useForm({
    initialValues: {
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      dob: initialData.dob,
      gender: initialData.gender,
      phone: initialData.phone,
      address: initialData.address,
      email: initialData.email,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      socialMedia: initialData.socialMedia || [],
    },
    validate: {
      firstName: (value) => (value.trim().length > 0 ? null : 'First name is required'),
      lastName: (value) => (value.trim().length > 0 ? null : 'Last name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      newPassword: (value) => (value.length === 0 || value.length >= 6 ? null : 'Password must be at least 6 characters'),
      confirmNewPassword: (value, values) => 
        (!value || !values.newPassword || value === values.newPassword ? null : 'Passwords do not match'),
      currentPassword: (value) => 
        value === 'password123' ? null : 'Current password is incorrect',
    },
  });

  const handleSubmit = async (values: any) => {
    setPasswordError('');
    
    if (values.currentPassword !== 'password123') {
      setPasswordError('Current password is incorrect');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(values);
      form.setValues({
        ...values,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      });
    } catch (error) {
      console.error('Error updating settings:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper shadow="xs" p="md">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Group grow>
          <TextInput
            label="First Name"
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label="Last Name"
            {...form.getInputProps('lastName')}
          />
        </Group>

        <Group grow mt="md">
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <label>Date of Birth</label>
            <input
              type="date"
              {...form.getInputProps('dob')}
              style={{
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ced4da',
              }}
            />
          </div>

          <Select
            label="Gender"
            data={['Male', 'Female', 'Other']}
            {...form.getInputProps('gender')}
          />
        </Group>

        <Group grow mt="md">
          <TextInput
            label="Phone Number"
            {...form.getInputProps('phone')}
          />
          <TextInput
            label="Address"
            {...form.getInputProps('address')}
          />
        </Group>

        <TextInput
          label="Email"
          {...form.getInputProps('email')}
          mt="md"
        />

        <div className="mt-6 border-t pt-6">
          <Text size="lg" fw={500} className="mb-4">Change Password</Text>
          <PasswordInput
            label="Current Password"
            {...form.getInputProps('currentPassword')}
            error={passwordError}
            required
          />
          <Group grow mt="md">
            <PasswordInput
              label="New Password (optional)"
              {...form.getInputProps('newPassword')}
            />
            <PasswordInput
              label="Confirm New Password"
              {...form.getInputProps('confirmNewPassword')}
            />
          </Group>
        </div>

        <div className="mt-6">
          <SocialMediaSection
            socialMedia={form.values.socialMedia}
            onChange={(value) => form.setFieldValue('socialMedia', value)}
          />
        </div>

        <Group justify="flex-end" mt="xl">
          <Button
            type="submit"
            color="orange"
            loading={isSubmitting}
          >
            {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </Group>
      </form>
    </Paper>
  );
};