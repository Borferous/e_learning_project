import { Container, SimpleGrid, Button, Text, Title, Grid, Image } from "@mantine/core";
import { CourseCard } from "../components/coursecard";
import bapaLogo from "../assets/bapalogo.svg";
import { HomeHeader } from "../components/homeheader";
import { Loading } from "../components/loading";
import { Footer } from "../components/footer";
import { useQuery } from "@tanstack/react-query";
import { listEvents } from "../api/event";
import placeholderImg from "../assets/placeholder-image.svg";

const courses = [
  {
    degree: "Bachelor of Music",
    majors: [
      "Vocal Performance",
      "Instrumental Performance",
      "Music Production",
      "Composition",
    ],
  },
  {
    degree: "Bachelor of Fine Arts in Dance",
    majors: ["Contemporary", "Ballet", "Hip-Hop", "Folk Dance"],
  },
  {
    degree: "Bachelor of Arts in Acting",
    majors: ["Stage Acting", "Screen Acting", "Musical Theater"],
  },
];

export const HomePage = () => {
  const { data: events, isLoading: isEventsLoading, error: eventsError } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate delay
      return listEvents();
    },
  });

  return (
    <>
      <HomeHeader />
      <Container className="py-10">
        {/* Hero Section */}
        <div className="bg-gray-100 p-10 rounded-lg">
          <Grid gutter="xl" align="center">
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
            <Grid.Col span={{ base: 12, md: 5 }} className="flex justify-center md:justify-end">
              <Image src={bapaLogo} alt="BAPA Logo" className="max-w-[250px]" />
            </Grid.Col>
          </Grid>
        </div>

        {/* Bachelor’s Degrees Sections */}
        {courses.map((course, index) => (
          <GridComponent key={index} title={course.degree} loadingState={false}>
            {course.majors.map((major, idx) => (
              <CourseCard
                key={idx}
                image={placeholderImg}
                title={major}
                category={course.degree}
                // link={`/courses/${major.replace(/\s+/g, "-").toLowerCase()}`} // Generate a dynamic link
                link={`/courseoverview`} // Generate a dynamic link
              />
            ))}
          </GridComponent>
        ))}

        {/* Events Section */}
        <GridComponent title={"Events"} loadingState={isEventsLoading} error={eventsError}>
          {events &&
            events.map((event, key) => (
              <CourseCard 
                key={key} 
                image={placeholderImg} 
                title={event.event_title} 
                category={event.event_category} 
                link={`/events/${event.event_title.replace(/\s+/g, "-").toLowerCase()}`} // Navigate to event page
              />
            ))}
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
  children: React.ReactNode;
}

export const GridComponent = ({ loadingState, error, children, title }: GridProps) => {
  return (
    <div>
      <Title order={2} className="text-xl font-semibold text-center mt-10">{title}</Title>
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
