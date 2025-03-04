import { useState } from "react";
import { Container, Flex, Button, TextInput, Group, Burger, Drawer, Stack, Divider } from "@mantine/core";
import { Link } from "react-router-dom";
import { IconSearch, IconBell, IconUser } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import bapaLogo from "../assets/bapalogo.svg"; // Adjust path if needed

export const HomeHeader = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [search, setSearch] = useState("");

  return (
    <Container fluid py="md" px="lg" className="border-b border-gray-200">
      <Flex justify="space-between" align="center">
        {/* Left Side: Logo & Mobile Menu */}
        <Flex align="center" gap="md">
          <img src={bapaLogo} alt="BAPA Logo" className="h-10" />
          <Burger opened={opened} onClick={toggle} className="lg:hidden" />
        </Flex>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium">Home</Link>
          <Link to="/courses" className="text-gray-700 hover:text-orange-500 font-medium">Courses</Link>
          <Link to="/events" className="text-gray-700 hover:text-orange-500 font-medium">Events</Link>
          <Link to="/about" className="text-gray-700 hover:text-orange-500 font-medium">About</Link>
          <Link to="/contact" className="text-gray-700 hover:text-orange-500 font-medium">Contact</Link>
        </div>

        {/* Center: Search Bar (Hidden on Mobile) */}
        <TextInput
          placeholder="What do you want to learn..."
          leftSection={<IconSearch size={18} className="text-gray-500" />}
          radius="md"
          size="md"
          className="hidden w-72 lg:block"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />

        {/* Right Side: Icons & Buttons (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center gap-4">
          <IconBell size={24} className="text-gray-500 cursor-pointer" />
          <IconUser size={24} className="text-gray-500 cursor-pointer" />
          <Button component={Link} to="/register" variant="light" color="orange" radius="md">
            Create Account
          </Button>
          <Button component={Link} to="/" color="orange" radius="md">
            Sign In
          </Button>
        </div>
      </Flex>

      {/* Mobile Drawer Menu */}
      <Drawer opened={opened} onClose={close} padding="md" title="Menu" position="left" size="xs">
        <Stack gap="sm">
          <Link to="/" className="text-orange-500 font-medium py-2" onClick={close}>Home</Link>
          <Link to="/courses" className="text-gray-500 font-medium py-2" onClick={close}>Courses</Link>
          <Link to="/events" className="text-gray-500 font-medium py-2" onClick={close}>Events</Link>
          <Link to="/about" className="text-gray-500 font-medium py-2" onClick={close}>About</Link>
          <Link to="/contact" className="text-gray-500 font-medium py-2" onClick={close}>Contact</Link>

          <Divider my="sm" />

          <Button component={Link} to="/register" variant="light" color="orange" radius="md" fullWidth>
            Create Account
          </Button>

          <Button component={Link} to="/" color="orange" radius="md" fullWidth>
            Sign In
          </Button>
        </Stack>
      </Drawer>
    </Container>
  );
};
