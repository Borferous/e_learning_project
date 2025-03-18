import { Container, SimpleGrid, Button, Text, Title, Grid, Image } from "@mantine/core";
import { CategoryCard } from '../components/categorycard';
import { CourseCard } from '../components/coursecard';
import bapaLogo from "../assets/bapalogo.svg";
import { HomeHeader } from "../components/homeheader";
import { Course, CourseCategory, CourseCategoryLabel } from "../types";
import { getCourseCount, listCourse } from "../api/course";
import { ReactNode, useEffect, useState } from "react";
import { Loading } from "../components/loading";
import { IconBook } from "@tabler/icons-react";
import { Footer } from "../components/footer";
import placeholderImg from '../assets/placeholder-image.svg'
import { listEvents } from "../api/event";
import { ProgramEvent } from "../types";

export const HomePage = () => {

    const [isCourseCountLoading, setCourseCountLoading] = useState<boolean>(false);
    const [courseCount, setCourseCount] = useState<{ program_category: CourseCategory, course_count: number }[] | null>(null);

    const [isCoursesLoading, setCoursesLoading] = useState<boolean>(false);
    const [courses, setCourses] = useState<Course[] | null>(null)

    const [isEventsLoading, setEventsLoading] = useState<boolean>(false)
    const [events, setEvents] = useState<ProgramEvent[] | null>(null);

    const fetchCourseCount = async () => {
        setCourseCountLoading(true);
        try {
            // Wait 5 seconds before making the API call
            await new Promise(resolve => setTimeout(resolve, 5000));
            const response = await getCourseCount()
            setCourseCount(response);
        } catch (error) {
            console.error("Failed to fetch course count", error);
        } finally {
            setCourseCountLoading(false); // Ensure loading stops even if an error occurs
        }
    };

    const fetchCourses = async () => {
        setCoursesLoading(true)
        try {
            await new Promise(resolve => setTimeout(resolve, 5000));
            const response = await listCourse()
            console.table(response)
            setCourses(response)
        } catch (error) {
            console.error("Failed to fetch courses", error);
        } finally {
            setCoursesLoading(false)
        }
    }

    const fetchEvents = async () => {
        try {
            setEventsLoading(true)
            await new Promise(resolve => setTimeout(resolve, 5000));
            const response = await listEvents();
            console.table(response)
            setEvents(response)
        } catch (error) {
            console.log('Error BUllshit')
        } finally {
            setEventsLoading(false)
        }
    }

    useEffect(() => {
        fetchCourseCount();
        fetchCourses();
        fetchEvents();
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

                <GridComponent title={"Programs Category"} loadingState={isCourseCountLoading}>
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

                <GridComponent loadingState={isCoursesLoading} title="Best Selling Courses">
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

                <GridComponent title={"Events"} loadingState={isEventsLoading}>
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
    children: ReactNode;
}

// Custom Component for grouping title, loading and fetched data
export const GridComponent = ({ loadingState, children, title }: GridProps) => {
    return (
        <div>
            <Title order={2} className="text-xl font-semibold text-center mt-10">
                {title}
            </Title>
            {loadingState ? <Loading /> : <SimpleGrid cols={3} spacing="lg" className="mt-5">{children}</SimpleGrid>}
        </div>
    );
};
