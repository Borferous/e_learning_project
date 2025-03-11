import { useState } from "react";
import { Button, Select, TextInput, FileButton, Avatar, Modal, Image } from "@mantine/core";
import { createUser } from "../api/user";
import { notifications } from "@mantine/notifications";
import { UserRoleLabel } from "../types";

export const CreateUserTab = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    address: "",
    status: "",
  });

  const createNewUser = async() => {
    
    try {
        await createUser({
          name: formData.name,
          password: formData.password,
          address: formData.address,
          email: formData.email,
          user_role: formData.role
        })
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
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData]) {
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
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name ? "This field is required" : false}
          />
          <TextInput
            label="Email"
            placeholder="Enter email address"
            maxLength={32}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email ? "This field is required" : false}
          />
          <TextInput
            label="Password"
            placeholder="Enter password"
            type="password"
            maxLength={32}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={errors.password ? "This field is required" : false}
          />
          <Select
            label="User Role"
            placeholder="Select user role"
            data={UserRoleLabel}
            value={formData.role}
            onChange={(value) => setFormData({ ...formData, role: value || "" })}
            error={errors.role ? "This field is required" : false}
          />
          <TextInput
            label="Address"
            placeholder="Enter address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            error={errors.address ? "This field is required" : false}
          />
          <Select
            label="Status"
            placeholder="Select status"
            data={["Active", "Inactive"]}
            value={formData.status}
            onChange={(value) => setFormData({ ...formData, status: value || "" })}
            error={errors.status ? "This field is required" : false}
          />
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
          className={`border mb-3 cursor-pointer ${
            errors.profileImage ? "border-red-500" : ""
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
