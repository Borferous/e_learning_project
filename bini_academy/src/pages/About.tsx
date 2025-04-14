import { Container, Title, Text, Image, Paper, List, ThemeIcon, Box, Button, Group } from '@mantine/core';
import { IconMicrophone, IconSchool, IconDeviceLaptop, IconUsers, IconMail } from '@tabler/icons-react';
import { HomeHeader } from '../components/homeheader';
import { Footer } from '../components/footer';
import bapaLogo from "../assets/bapalogo.svg";
import { useNavigate } from 'react-router-dom';

export const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <HomeHeader />
      
      <div 
        className="flex-1 bg-cover bg-center py-16" 
        style={{ backgroundImage: 'url(/src/assets/school-bg.png)' }}
      >
        <Container size="lg">
          {/* Logo Section */}
          <div className="flex justify-center mb-12">
            <Image
              src={bapaLogo}
              alt="BAPA Logo"
              width={300}
              className="transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* About Section */}
          <Paper 
            shadow="md" 
            radius="lg" 
            p="xl" 
            className="bg-white/90 backdrop-blur-sm"
          >
            <Title order={1} className="text-center mb-8 text-orange-600">
              About Bini Academy of Performing Arts
            </Title>

            {/* Mission and History */}
            <Text className="mb-8 text-gray-700 leading-relaxed">
              Founded in 2010, Bini Academy of Performing Arts (BAPA) stands as a premier 
              institution dedicated to nurturing the talents of aspiring Filipino performers. 
              Taking inspiration from world-renowned performing arts institutions, we've 
              established ourselves as a cornerstone of performing arts education in the Philippines.
            </Text>

            {/* Key Features */}
            <Title order={2} className="mb-6 text-orange-500">
              Our Key Features
            </Title>

            <List
              spacing="lg"
              size="lg"
              className="mb-8"
              center
            >
              <List.Item 
                icon={
                  <ThemeIcon color="orange" size={32} radius="xl">
                    <IconMicrophone size={18} />
                  </ThemeIcon>
                }
              >
                <Box>
                  <Text fw={700}>Expert-Led Training</Text>
                  <Text color="dimmed">Learn from industry professionals and experienced performers</Text>
                </Box>
              </List.Item>

              <List.Item 
                icon={
                  <ThemeIcon color="orange" size={32} radius="xl">
                    <IconDeviceLaptop size={18} />
                  </ThemeIcon>
                }
              >
                <Box>
                  <Text fw={700}>Cutting-edge E-Learning Platform</Text>
                  <Text color="dimmed">Access high-quality training from anywhere in the Philippines</Text>
                </Box>
              </List.Item>

              <List.Item 
                icon={
                  <ThemeIcon color="orange" size={32} radius="xl">
                    <IconUsers size={18} />
                  </ThemeIcon>
                }
              >
                <Box>
                  <Text fw={700}>Vibrant Community</Text>
                  <Text color="dimmed">Connect and collaborate with fellow aspiring artists</Text>
                </Box>
              </List.Item>

              <List.Item 
                icon={
                  <ThemeIcon color="orange" size={32} radius="xl">
                    <IconSchool size={18} />
                  </ThemeIcon>
                }
              >
                <Box>
                  <Text fw={700}>Proven Track Record</Text>
                  <Text color="dimmed">Alumni success in music, theater, and film industries</Text>
                </Box>
              </List.Item>
            </List>

            {/* Vision */}
            <Title order={2} className="mb-6 text-orange-500">
              Our Vision
            </Title>

            <Text className="mb-8 text-gray-700 leading-relaxed">
              BAPA envisions an innovative e-learning system that captures the energy and dynamism 
              of in-person classes while offering the flexibility of online learning. Our platform 
              is designed to deliver exceptional instructional content and foster a thriving online 
              community where students can grow together.
            </Text>

            {/* Commitment */}
            <Text className="text-gray-700 leading-relaxed italic text-center">
              "We are committed to leveraging technology to nurture the next generation of Filipino 
              performers and contribute to the continued growth and enrichment of the Philippine 
              performing arts scene."
            </Text>

            {/* Contact CTA Section */}
            <Box className="mt-12 text-center py-8 bg-orange-50 rounded-lg">
              <Title order={2} className="text-orange-600 mb-4">
                Get in Touch
              </Title>
              <Text className="text-gray-700 mb-6">
                Have questions about our programs? We'd love to hear from you!
              </Text>
              <Group justify="center" gap="md">
                <Button
                  component="a"
                  href="mailto:info@bapa.edu.ph"
                  size="lg"
                  color="orange"
                  leftSection={<IconMail size={20} />}
                >
                  Email Us
                </Button>
                <Button
                  size="lg"
                  variant="light"
                  color="orange"
                  onClick={() => navigate('/')}
                >
                  Back to Homepage
                </Button>
              </Group>
            </Box>
          </Paper>

          {/* Contact Information */}
          <Paper 
            shadow="sm" 
            radius="lg" 
            p="xl" 
            className="bg-white/90 backdrop-blur-sm mt-8"
          >
            <Group justify="space-around" wrap="wrap">
              <Box className="text-center p-4">
                <Title order={3} className="text-orange-600 mb-2">Location</Title>
                <Text>123 Arts Avenue</Text>
                <Text>Metro Manila, Philippines</Text>
              </Box>
              <Box className="text-center p-4">
                <Title order={3} className="text-orange-600 mb-2">Contact</Title>
                <Text>Email: info@bapa.edu.ph</Text>
                <Text>Phone: (02) 8123-4567</Text>
              </Box>
              <Box className="text-center p-4">
                <Title order={3} className="text-orange-600 mb-2">Hours</Title>
                <Text>Monday - Friday: 8:00 AM - 5:00 PM</Text>
                <Text>Saturday: 8:00 AM - 12:00 PM</Text>
              </Box>
            </Group>
          </Paper>
        </Container>
      </div>

      <Footer />
    </div>
  );
};