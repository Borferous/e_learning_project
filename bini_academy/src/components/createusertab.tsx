import { useState } from "react";
import { Button, Select, TextInput, FileButton, Avatar, Modal, Image, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { GenderLabel, UserRoleLabel } from "../types";
import { useForm } from "@mantine/form";


export const CreateUserTab = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      address: "",
      status: "",
      gender: "",
      birthDate: ""
    },
    validate: {
      name: (value) => (value ? null : "This field is required"),
      email: (value) => (value ? null : "This field is required"),
      password: (value) => (value ? null : "This field is required"),
      role: (value) => (value ? null : "This field is required"),
      address: (value) => (value ? null : "This field is required"),
      status: (value) => (value ? null : "This field is required"),
      gender: (value) => (value ? null : "This field is required"),
      birthDate: (value) => (value ? null : "This field is required"),
    },
  });

  const createNewUser = async () => {

    try {
      notifications.show({
        title: 'Success',
        message: 'User Created Successfully',
        color: 'green'
      })
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Cannot Create user an error has occured',
        color: 'red'
      })
    } finally {
      setConfirmOpened(false)
    }
  }

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [previewOpened, setPreviewOpened] = useState(false);
  const [confirmOpened, setConfirmOpened] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    Object.keys(form.values).forEach((key) => {
      if (!form.values[key as keyof typeof form.values]) {
        newErrors[key] = true;
      }
    });
    if (!profileImage) newErrors["profileImage"] = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateUser = () => {
    if (validateForm()) {
      setConfirmOpened(true); // Open confirmation modal if no errors
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-sm flex gap-6">
      {/* Left Form Fields */}
      <div className="flex-1">
        <div className="grid grid-cols-1 gap-4">
          <TextInput
            label="Name"
            placeholder="Enter full name"
            maxLength={32}
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            error={errors.name ? "This field is required" : false}
          />
          <TextInput
            label="Email"
            placeholder="Enter email address"
            maxLength={32}
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={errors.email ? "This field is required" : false}
          />
          <TextInput
            label="Password"
            placeholder="Enter password"
            type="password"
            maxLength={32}
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={errors.password ? "This field is required" : false}
          />
          <Select
            label="User Role"
            placeholder="Select user role"
            data={UserRoleLabel}
            value={form.values.role}
            onChange={(value) => form.setFieldValue('role', value || "")}
            error={errors.role ? "This field is required" : false}
          />
          <TextInput
            label="Address"
            placeholder="Enter address"
            value={form.values.address}
            onChange={(event) => form.setFieldValue('address', event.currentTarget.value)}
            error={errors.address ? "This field is required" : false}
          />
          <Select
            label="Status"
            placeholder="Select status"
            data={["Active", "Inactive"]}
            value={form.values.status}
            onChange={(value) => form.setFieldValue('status', value || "")}
            error={errors.status ? "This field is required" : false}
          />
          <Select
            label='Gender'
            placeholder="Select Gender"
            data={GenderLabel}
            value={form.values.gender}
            onChange={(value) => form.setFieldValue('gender', value || "")}
            error={errors.status ? "This field is required" : false}
          ></Select>
          <Group grow mt="md">
            {/* Native React Date Input */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <label style={{ marginBottom: 4, fontSize: '14px', fontWeight: 500 }}>
                Date of Birth
              </label>
              <input
                type="date"
                max={new Date().toISOString().split('T')[0]}
                value={form.values.birthDate ? new Date(form.values.birthDate).toISOString().split('T')[0] : ''}
                onChange={(e) =>
                  form.setFieldValue('dob', e.target.value ? new Date(e.target.value) : null)
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
          </Group>
        </div>


        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <Button variant="outline" color="gray">
            Cancel
          </Button>
          <Button color="orange" onClick={handleCreateUser}>
            Create User
          </Button>
        </div>
      </div>

      {/* Profile Photo Upload & Preview */}
      <div className="flex flex-col items-center">
        <Avatar
          src={profileImage ? URL.createObjectURL(profileImage) : null}
          size={100}
          radius="xl"
          className={`border mb-3 cursor-pointer ${errors.profileImage ? "border-red-500" : ""
            }`}
          onClick={() => profileImage && setPreviewOpened(true)}
        />
        <FileButton onChange={setProfileImage} accept="image/png,image/jpeg">
          {(props) => (
            <Button {...props} variant="outline" color="orange">
              Upload Photo
            </Button>
          )}
        </FileButton>
        {errors.profileImage && <p className="text-red-500 text-sm mt-1">Profile image is required</p>}
      </div>

      {/* Image Preview Modal */}
      <Modal opened={previewOpened} onClose={() => setPreviewOpened(false)} title="Profile Image Preview">
        {profileImage ? (
          <Image src={URL.createObjectURL(profileImage)} alt="Profile Preview" radius="md" />
        ) : (
          <p>No image selected</p>
        )}
      </Modal>

      {/* Confirmation Modal */}
      <Modal opened={confirmOpened} onClose={() => setConfirmOpened(false)} title="Confirm User Creation">
        <p>Are you sure you want to create this user?</p>
        <div className="mt-4 flex justify-end gap-4">
          <Button variant="outline" color="gray" onClick={() => setConfirmOpened(false)}>
            Cancel
          </Button>
          <Button color="orange" onClick={createNewUser}>
            Confirm
          </Button>
        </div>
      </Modal>
    </div>
  );
};
