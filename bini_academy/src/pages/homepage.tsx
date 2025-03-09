import { Container, SimpleGrid, Button, Text, Title, Grid, Image } from "@mantine/core";
import { CategoryCard } from '../components/categorycard';
import { CourseCard } from '../components/coursecard';
import bapaLogo from "../assets/bapalogo.svg";
import { HomeHeader } from "../components/homeheader";
import { CourseCategory, CourseCategoryLabel } from "../types";
import { getCourseCount } from "../api/course";
import { useEffect, useState } from "react";
import { Loading } from "../components/loading";
import { IconBook } from "@tabler/icons-react";
import { Footer } from "../components/footer";


export const HomePage = () => {

    const [isLoading, setLoading] = useState<boolean>(false);
    const [courses, setCourses] = useState<{ category: CourseCategory, course_count: number }[] | null>(null);

    useEffect(() => {
        setLoading(true);

        const fetchCourseCount = async () => {
            try {
                // Wait 5 seconds before making the API call
                await new Promise(resolve => setTimeout(resolve, 5000));
                const response = await getCourseCount()
                console.table(response)
                setCourses(response);
            } catch (error) {
                console.error("Failed to fetch course count", error);
            } finally {
                setLoading(false); // Ensure loading stops even if an error occurs
            }
        };

        fetchCourseCount();
    }, []);

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
                    Programs Category
                </Title>

                {isLoading ? (
                    <Loading width={64} height={64} />
                ) : (
                    <SimpleGrid cols={3} spacing="lg" className="mt-5">
                        {courses &&
                            courses.map((course) => {
                                const categoryData = CourseCategoryLabel.find(
                                    (c) => c.value === course.category
                                );

                                if (categoryData) {
                                    return <CategoryCard
                                        key={course.category}
                                        title={categoryData.label}
                                        courses={course.course_count}
                                        icon={<categoryData.icon size={30} />}
                                    />
                                } else {
                                    return <CategoryCard
                                        key={course.category}
                                        title={course.category}
                                        courses={course.course_count}
                                        icon={<IconBook size={30} />}
                                    />
                                }
                            })}
                    </SimpleGrid>
                )}




                {/* Best Selling Courses */}
                <Title order={2} className="text-xl font-semibold text-center mt-10">
                    Best Selling Courses
                </Title>
                <SimpleGrid cols={4} spacing="lg" className="mt-5">
                    <CourseCard
                        image="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/637627ca9eebde45ae5f394c_Underwater-Nun.jpeg"
                        title="Mastering Vocal Techniques"
                        category="Music"
                        price="₱5,000"
                        students="3.7k"
                    />
                    <CourseCard
                        image="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/637627ca9eebde45ae5f394c_Underwater-Nun.jpeg"
                        title="Hip-Hop Moves for Beginners"
                        category="Dance"
                        price="₱5,000"
                        students="5.7k"
                    />
                    <CourseCard
                        image="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/637627ca9eebde45ae5f394c_Underwater-Nun.jpeg"
                        title="Audition Like a Star"
                        category="Acting"
                        price="₱5,000"
                        students="3.7k"
                    />
                    <CourseCard
                        image="https://cdn.prod.website-files.com/62d84e447b4f9e7263d31e94/637627ca9eebde45ae5f394c_Underwater-Nun.jpeg"
                        title="Violin Essentials"
                        category="Music"
                        price="₱5,000"
                        students="5.7k"
                    />
                </SimpleGrid>
            </Container>
            <Footer />
        </>
    );
};
