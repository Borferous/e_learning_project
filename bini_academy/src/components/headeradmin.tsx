import { Input, Avatar } from "@mantine/core";
import { IconBell, IconSearch } from "@tabler/icons-react";


export const HeaderAdmin = ({ title }: { title: string }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      {/* Title */}
      <h2 className="text-lg font-semibold">{title}</h2>

      
      <div className="flex items-center gap-4">
       
        {/* Avatar - Replace with dynamic user profile image */}
        <Avatar
          src="../assets/user-avatar.png" // Placeholder avatar, replace with real profile image URL
          alt="User Avatar"
          radius="xl"
          className="cursor-pointer"
        />
      </div>
    </header>
  );
};
