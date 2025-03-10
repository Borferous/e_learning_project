import { useState } from "react";
import { Table, Button, Select, TextInput, Modal, Avatar, FileInput, PasswordInput } from "@mantine/core";

interface User {
  id: number;
  name: string;
  email: string;
  address: string;
  role: string;
  status: string;
  photo: string;
  password: string;
}

const dummyUsers: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", address: "123 Main St", role: "Admin", status: "Active", photo: "", password: "password123" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", address: "456 Elm St", role: "Instructor", status: "Inactive", photo: "", password: "password456" },
];

export const EditUsersTab = () => {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (selectedUser) {
      setUsers((prev) => prev.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
      setModalOpen(false);
    }
  };

  const handleDelete = () => {
    if (selectedUser) {
      setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
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
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">
                  <Avatar src={user.photo || "/default-avatar.png"} alt={user.name} radius="xl" />
                </td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.address}</td>
                <td className="p-3">{user.role}</td>
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
        <Select label="Role" data={["Admin", "Instructor", "Student"]} value={selectedUser.role} onChange={(value) => setSelectedUser({ ...selectedUser, role: value || "" })} />
        <Select label="Status" data={["Active", "Inactive"]} value={selectedUser.status} onChange={(value) => setSelectedUser({ ...selectedUser, status: value || "" })} />
      </div>

      {/* Right Side: Profile Photo */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <img
            src={selectedUser.photo || "/default-avatar.png"}
            alt="User Avatar"
            className="w-40 h-40 rounded-full cursor-pointer border border-gray-300 hover:shadow-md transition"
            onClick={() => {
              if (selectedUser.photo) {
                window.open(selectedUser.photo, "_blank");
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
              setSelectedUser({ ...selectedUser, photo: imageUrl });
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
