import { Container, SimpleGrid, Button, Text, Title, Grid, Image } from "@mantine/core";
import { CategoryCard } from '../components/categorycard';
import { CourseCard } from '../components/coursecard';
import bapaLogo from "../assets/bapalogo.svg";
import { HomeHeader } from "../components/homeheader";
import { CourseCategory, CourseCategoryLabel } from "../types";
import { getCourseCount, listCourse } from "../api/course";
import { ReactNode } from "react";
import { Loading } from "../components/loading";
import { IconBook } from "@tabler/icons-react";
import { Footer } from "../components/footer";
import placeholderImg from '../assets/placeholder-image.svg'
import { listEvents } from "../api/event";
import { useQuery } from "@tanstack/react-query";

interface CountCourse {
    program_category: CourseCategory, course_count: number 
}

export const HomePage = () => {

    const { data: courseCount, isLoading: isCourseCountLoading, error: courseCountError } = useQuery({
        queryKey: ["courseCount"],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate delay
            return getCourseCount() as Promise<CountCourse[]>;
        }
    });

    const { data: courses , isLoading: isCoursesLoading, error: coursesError } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate delay
            return listCourse();
        }
    });

    const { data: events, isLoading: isEventsLoading, error: eventsError } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate delay
            return listEvents();
        },
    });

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

                <GridComponent title={"Programs Category"} loadingState={isCourseCountLoading} error={coursesError}>
                    {courseCount && courseCount.length > 0 &&
                        courseCount.map((course) => {
                            const categoryData = CourseCategoryLabel.find(
                                (c) => c.value === course.program_category
                            );

                            if (categoryData) {
                                return <CategoryCard
                                    key={course.program_category}
                                    title={categoryData.label}
                                    courses={course.course_count}
                                    icon={<categoryData.icon size={30} />}
                                />
                            } else {
                                return <CategoryCard
                                    key={course.program_category}
                                    title={course.program_category}
                                    courses={course.course_count}
                                    icon={<IconBook size={30} />}
                                />
                            }
                        })
                    }
                </GridComponent>

                <GridComponent loadingState={isCoursesLoading} title="Best Selling Courses" error={courseCountError}>
                    {courses && courses.length > 0 && courses.map((course, key) => (
                        <CourseCard
                            key={key}
                            image={placeholderImg}
                            title={course.course_title}
                            category={course.course_topic}
                            price={`₱${new Intl.NumberFormat("en-PH").format(Number(course.price))}`}
                            students={"100"}
                        />
                    ))}
                </GridComponent>

                <GridComponent title={"Events"} loadingState={isEventsLoading} error={eventsError}>
                    {events && events.map((ee, key) => {
                        return (
                            <CourseCard
                                key={key}
                                image={placeholderImg}
                                title={ee.event_title}
                                category={ee.event_category}
                            />
                        );
                    })}
                </GridComponent>

            </Container>
            <Footer />
        </>
    );
};

interface GridProps {
    title: string;
    loadingState: boolean;
    error?: unknown;
    children: ReactNode;
}

export const GridComponent = ({ loadingState, error, children, title }: GridProps) => {
    return (
        <div>
            <Title order={2} className="text-xl font-semibold text-center mt-10">
                {title}
            </Title>

            {loadingState ? (
                <Loading />
            ) : error ? (
                <p className="text-red-500 text-center mt-5">Failed to load {title}. Please try again.</p>
            ) : (
                <SimpleGrid cols={3} spacing="lg" className="mt-5">
                    {children}
                </SimpleGrid>
            )}
        </div>
    );
};
