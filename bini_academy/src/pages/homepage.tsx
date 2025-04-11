import { Container, SimpleGrid, Button, Text, Title, Grid, Image } from "@mantine/core";
import { CourseCard } from "../components/coursecard";
import bapaLogo from "../assets/bapalogo.svg";
import { HomeHeader } from "../components/homeheader";
import { Loading } from "../components/loading";
import { Footer } from "../components/footer";
import placeholderImg from "../assets/placeholder-image.svg";
import schoolBg from "../assets/school-bg.png";
import { getCoursesAndMajor } from "../supabase/api/course";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Major } from "../types";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [courseMajor, setCourseMajor] = useState<any[]>([]);
  const {isError, isLoading, refetch} = useQuery({
    queryKey: ["coursesAndMajors"],
    queryFn: async () => {
      const data = await getCoursesAndMajor();
      setCourseMajor(data as any[]);
      return data; // Ensure the query function returns the fetched data
    },
  })

  if (isError) {
    navigate('/error-page')
  }

  useEffect(() => {
    refetch();
  }, [refetch]);
  
  return (
    <>
      <HomeHeader />
      <Container className="py-6 sm:py-10">
        {/* Hero Section */}
        <div 
          className="p-4 sm:p-10 rounded-lg relative overflow-hidden"
          style={{
            backgroundImage: `url(${schoolBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Grid gutter={{ base: "md", sm: "xl" }} align="center">
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Title order={1} className="text-2xl sm:text-4xl font-extrabold leading-tight text-black">
                Unleash Your Inner Performer
              </Title>
              <Text className="text-xl sm:text-2xl italic text-gray-300 mt-2">
                Anywhere, Anytime!
              </Text>
              <Text className="mt-4 text-base sm:text-lg text-gray-200">
                Step into the spotlight with the <b>Bini Academy of Performing Arts'</b>
                cutting-edge online platform. Learn from industry legends, refine your craft,
                and connect with a vibrant community of artists – all from the comfort of your home.
              </Text>
              <Button 
                color="orange" 
                radius="md" 
                size="md" 
                className="mt-4 sm:mt-6 w-full sm:w-auto" 
                component="a" 
                href="/login"
              >
                Enroll Now
              </Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }} className="flex justify-center md:justify-end">
              <Image 
                src={bapaLogo} 
                alt="BAPA Logo" 
                className="max-w-[150px] sm:max-w-[250px]" 
              />
            </Grid.Col>
          </Grid>
        </div>

        {/* Bachelor’s Degrees Sections */}
        {isLoading ? <Loading/> : courseMajor.map((course, index) => (
          <GridComponent key={index} title={course.degree} loadingState={false}>
            {course.majors.map((major: Major, idx: number) => (
              <CourseCard
                key={idx}
                image={placeholderImg}
                title={major.title}
                category={course.degree}
                link={`/courseoverview/${major.id}`}
              />
            ))}
          </GridComponent>
        ))}
        

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
      <Title order={2} className="text-xl font-semibold text-center mt-6 sm:mt-10">
        {title}
      </Title>
      {loadingState ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500 text-center mt-4">Failed to load {title}. Please try again.</p>
      ) : (
        <SimpleGrid 
          cols={{ base: 1, sm: 2, md: 3 }} 
          spacing={{ base: "md", sm: "lg" }} 
          className="mt-4 sm:mt-5"
        >
          {children}
        </SimpleGrid>
      )}
    </div>
  );
};
