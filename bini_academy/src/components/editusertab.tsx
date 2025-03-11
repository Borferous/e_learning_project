import { useEffect, useState } from "react";
import { Table, Button, Select, TextInput, Modal, Avatar, FileInput, PasswordInput } from "@mantine/core";
import { ActiveStatusLabel, User, UserRoleLabel } from "../types";
import { deleteUser, getAllUser, updateUser } from "../api/user";
import { notifications } from "@mantine/notifications";

export const EditUsersTab = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const fetchUsers = async () => {
    try {
      const response = await getAllUser()
      setUsers(response)
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Error Loading Users',
        color: 'red'
      })
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async() => {
    if (selectedUser) {
      try {
        await updateUser(selectedUser)
        await fetchUsers()  
        notifications.show({
          title: 'Success',
          message: 'Updated user successfully',
          color: 'green'
        })
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Error updating user',
          color: 'red'
        })
      }
      setModalOpen(false);
    }
  };

  const handleDelete = async() => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser.user_id)
        await fetchUsers()  
        notifications.show({
          title: 'Success',
          message: 'Successfully deleted user',
          color: 'green'
        })
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'Error deleting user',
          color: 'red'
        })
      }
      setModalOpen(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-md shadow">
      <h3 className="text-xl font-semibold mb-4">Edit Users</h3>

      <div className="overflow-x-auto">
        <Table striped highlightOnHover>
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="p-3">Photo</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Address</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user.user_id} className="border-b">
                <td className="p-3">
                  <Avatar src={user.profile_picture || "/default-avatar.png"} alt={user.name} radius="xl" />
                </td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.address}</td>
                <td className="p-3">{user.user_role}</td>
                <td className="p-3">{user.status}</td>
                <td className="p-3 text-center">
                  <Button color="orange" size="xs" onClick={() => handleEditClick(user)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Edit User Modal */}
      <Modal
        opened={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Edit User"
        size="lg" // Makes it bigger
        centered
        className="w-[700px]" // Adjust width as needed
      >
        {selectedUser && (
          <div className="grid grid-cols-3 gap-6">
            {/* Left Side: User Details */}
            <div className="col-span-2 space-y-4">
              <TextInput label="Name" value={selectedUser.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />
              <TextInput label="Email" value={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
              <PasswordInput label="Password" value={selectedUser.password} onChange={(e) => setSelectedUser({ ...selectedUser, password: e.target.value })} />
              <TextInput label="Address" value={selectedUser.address} onChange={(e) => setSelectedUser({ ...selectedUser, address: e.target.value })} />
              <Select label="Role" data={UserRoleLabel} value={selectedUser.user_role} onChange={(value) => setSelectedUser({ ...selectedUser, user_role: value || "" })} />
              <Select label="Status" data={ActiveStatusLabel} value={selectedUser.status} onChange={(value) => setSelectedUser({ ...selectedUser, status: value || "1"})} />                            
            </div>

            {/* Right Side: Profile Photo */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <img
                  src={selectedUser.profile_picture || "/default-avatar.png"}
                  alt="User Avatar"
                  className="w-40 h-40 rounded-full cursor-pointer border border-gray-300 hover:shadow-md transition"
                  onClick={() => {
                    if (selectedUser.profile_picture) {
                      window.open(selectedUser.profile_picture, "_blank");
                    }
                  }}
                />
              </div>
              <FileInput
                label="Change Photo"
                className="mt-3"
                classNames={{ label: "font-semibold text-center text-blue-600 cursor-pointer hover:underline" }}
                accept="image/*"
                onChange={(file) => {
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setSelectedUser({ ...selectedUser, profile_picture: imageUrl });
                  }
                }}
              />
            </div>

            {/* Buttons: Delete & Save */}
            <div className="col-span-3 flex justify-between mt-4">
              <Button color="red" onClick={handleDelete}>Delete</Button>
              <Button color="orange" onClick={handleSave}>Save</Button>
            </div>
          </div>
        )}
      </Modal>


    </div>
  );
};
