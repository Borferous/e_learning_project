import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Button,
  Group,
  Select,
} from '@mantine/core';

interface SettingsFormProps {
  initialData: {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    phone: string;
    address: string;
    email: string;
  };
  onSubmit: (values: any) => void;
}

export const SettingsForm = ({ initialData, onSubmit }: SettingsFormProps) => {
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
    },
    validate: {
      firstName: (value) => (value.trim().length > 0 ? null : 'First name is required'),
      lastName: (value) => (value.trim().length > 0 ? null : 'Last name is required'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      newPassword: (value) => (value.length === 0 || value.length >= 6 ? null : 'Password must be at least 6 characters'),
      confirmNewPassword: (value, values) => 
        (!value || !values.newPassword || value === values.newPassword ? null : 'Passwords do not match'),
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
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
        <PasswordInput
          label="Current Password"
          {...form.getInputProps('currentPassword')}
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

      <Button
        type="submit"
        fullWidth
        mt="xl"
        color="orange"
      >
        Save Changes
      </Button>
    </form>
  );
};