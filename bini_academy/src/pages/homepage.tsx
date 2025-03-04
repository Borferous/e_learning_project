import { Container, SimpleGrid, Button, Text, Title, Grid, Image } from "@mantine/core";
import { IconMusic, IconTheater, IconCertificate } from "@tabler/icons-react";
import { CategoryCard } from '../components/categorycard';
import { CourseCard } from '../components/coursecard';
import bapaLogo from "../assets/bapalogo.svg";
import { HomeHeader } from "../components/homeheader";

export const HomePage = () => {
    return (
        <>
            {/* Header Section */}
            <HomeHeader />

            <Container className="py-10">
                {/* Hero Section */}
                <div className="bg-gray-100 p-10 rounded-lg">
                    <Grid gutter="xl" align="center">
                        {/* Left Side: Text Content */}
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <Title order={1} className="text-4xl font-extrabold leading-tight">
                                Unleash Your Inner Performer
                            </Title>
                            <Text className="text-2xl italic text-gray-600 mt-2">Anywhere, Anytime!</Text>
                            <Text className="mt-4 text-lg text-gray-600">
                                Step into the spotlight with the <b>Bini Academy of Performing Arts'</b>
                                cutting-edge online platform. Learn from industry legends, refine your craft,
                                and connect with a vibrant community of artists – all from the comfort of your home.
                            </Text>
                            <Button color="orange" radius="md" size="lg" className="mt-6">
                                Enroll Now
                            </Button>
                        </Grid.Col>

                        {/* Right Side: Logo */}
                        <Grid.Col span={{ base: 12, md: 5 }} className="flex justify-center md:justify-end">
                            <Image src={bapaLogo} alt="BAPA Logo" className="max-w-[250px]" />
                        </Grid.Col>
                    </Grid>
                </div>

                {/* Browse Top Categories */}
                <Title order={2} className="text-xl font-semibold text-center mt-10">
                    Browse Top Category
                </Title>
                <SimpleGrid cols={3} spacing="lg" className="mt-5">
                    <CategoryCard title="Music" courses={500} icon={<IconMusic size={30} />} />
                    <CategoryCard title="Acting and Theater" courses={132} icon={<IconTheater size={30} />} />
                    <CategoryCard title="Certification & Diploma" courses={245} icon={<IconCertificate size={30} />} />
                    <CategoryCard title="Certification & Diploma" courses={245} icon={<IconCertificate size={30} />} />
                </SimpleGrid>

                {/* Best Selling Courses */}
                <Title order={2} className="text-xl font-semibold text-center mt-10">
                    Best Selling Courses
                </Title>
                <SimpleGrid cols={4} spacing="lg" className="mt-5">
                    <CourseCard
                        image="https://via.placeholder.com/200"
                        title="Mastering Vocal Techniques"
                        category="Music"
                        price="₱5,000"
                        students="3.7k"
                    />
                    <CourseCard
                        image="https://via.placeholder.com/200"
                        title="Hip-Hop Moves for Beginners"
                        category="Dance"
                        price="₱5,000"
                        students="5.7k"
                    />
                    <CourseCard
                        image="https://via.placeholder.com/200"
                        title="Audition Like a Star"
                        category="Acting"
                        price="₱5,000"
                        students="3.7k"
                    />
                    <CourseCard
                        image="https://via.placeholder.com/200"
                        title="Violin Essentials"
                        category="Music"
                        price="₱5,000"
                        students="5.7k"
                    />
                </SimpleGrid>
            </Container>
        </>
    );
};