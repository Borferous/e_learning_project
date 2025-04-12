// components/HomeHeader.tsx
import { useState } from "react";
import { Flex, Button, Burger, Drawer, Stack, Divider, Menu, Avatar } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IconUser, IconLogout, IconSettings } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useProfile } from '../contexts/ProfileContext';
import bapaLogo from "../assets/bapalogo.svg";

export const HomeHeader = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const isUserLoggedIn = true; // Replace with actual auth state
  const { profilePicUrl } = useProfile();

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  const renderAuthSection = () => {
    if (isUserLoggedIn) {
      return (
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar 
              src={profilePicUrl} 
              size="md" 
              className="cursor-pointer ring-2 ring-orange-500 ring-offset-2 hover:ring-4 transition-all"
              radius="xl"
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item
              leftSection={<IconUser size={14} />}
              component={Link}
              to="/profile"
            >
              Profile
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={14} />}
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <>
        <Button 
          component={Link} 
          to="/usercreate" 
          variant="light" 
          color="orange" 
          radius="md"
        >
          Create Account
        </Button>
        <Button 
          component={Link} 
          to="/login" 
          color="orange" 
          radius="md"
        >
          Sign In
        </Button>
      </>
    );
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      className="border-b border-gray-200 py-4 px-6"
    >
      {/* Left Side: Logo & Mobile Menu */}
      <Flex align="center" gap="md">
        <img src={bapaLogo} alt="BAPA Logo" className="h-10" />
        <Burger opened={opened} onClick={toggle} className="lg:hidden" />
      </Flex>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-6">
        <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium">Home</Link>
        <Link to="/subjectlist" className="text-gray-700 hover:text-orange-500 font-medium">Courses</Link>
        <Link to="/events" className="text-gray-700 hover:text-orange-500 font-medium">Events</Link>
        <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium">About</Link>
      </div>

      {/* Right Side: Auth Section */}
      <div className="hidden lg:flex items-center gap-4">
        {renderAuthSection()}
      </div>

      {/* Update Mobile Drawer Menu */}
      <Drawer opened={opened} onClose={close} padding="md" title="Menu" position="left" size="xs">
        <Stack gap="sm">
          <Link to="/" className="text-orange-500 font-medium py-2" onClick={close}>Home</Link>
          <Link to="/subjectlist" className="text-gray-500 font-medium py-2" onClick={close}>Courses</Link>
          <Link to="/events" className="text-gray-500 font-medium py-2" onClick={close}>Events</Link>
          <Link to="/about" className="text-gray-500 font-medium py-2" onClick={close}>About</Link>

          <Divider my="sm" />

          {isUserLoggedIn ? (
            <>
              <Button 
                leftSection={<IconUser size={14} />}
                variant="light" 
                color="orange" 
                radius="md" 
                fullWidth 
                component={Link} 
                to="/profile"
                onClick={close}
              >
                Profile
              </Button>
              <Button 
                leftSection={<IconLogout size={14} />}
                color="red" 
                radius="md" 
                fullWidth
                onClick={() => {
                  handleLogout();
                  close();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                component={Link} 
                to="/usercreate" 
                variant="light" 
                color="orange" 
                radius="md" 
                fullWidth
                onClick={close}
              >
                Create Account
              </Button>
              <Button 
                component={Link} 
                to="/login" 
                color="orange" 
                radius="md" 
                fullWidth
                onClick={close}
              >
                Sign In
              </Button>
            </>
          )}
        </Stack>
      </Drawer>
    </Flex>
  );
};
