import { Container, Flex, Button, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import bapaLogo from '../assets/bapalogo.svg'; // Import the logo

export const Header = () => {
  return (
    <Container fluid py="md" px="lg" style={{ borderBottom: '1px solid #EAEAEA' }}>
      <Flex justify="space-between" align="center">
        {/* Logo */}
        <Link to={'/'}><img src={bapaLogo} alt="BAPA Logo" style={{ height: 40 }}/></Link>

        {/* Right-side: "Don't have an account?" & Button */}
        <Flex align="center" gap="md">
          <Text size="sm" color="gray">Don't have an account?</Text>
          <Button 
            component={Link} 
            to="/usercreate" 
            variant="light" 
            color="orange" 
            radius="md"
          >
            Create Account
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};
