import { Container, Group, Button, Text } from "@mantine/core";
import { IconCalendar, IconCheck } from "@tabler/icons-react";
import { HomeHeader } from "../components/homeheader";
import { Footer } from "../components/footer";
import StudentFeedback from "../components/student_feedback";
import { useNavigate, useParams } from "react-router-dom";
import { getMajor } from "../supabase/api/course";
import { useEffect, useState } from "react";
import { Major, Subject, UserRole } from "../types";
import { getSubjects } from "../supabase/api/subjects";
import { List, ThemeIcon } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { getCurrentUser } from "../supabase/api/user";

export const CourseOverview = () => {

  const features = [
    "Lifetime access",
    "30-day money-back guarantee",
    "Supplementary learning materials",
    "Access on mobile and PC",
    "100% online course",
  ]

  const [courseData, setCourseData] = useState<Major | null>(null)
  const [courseSubjects, setCourseSubjects] = useState<any[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async() => {
    const user = await getCurrentUser();
    if (user) {
      if (user.user_role === UserRole.Student) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }

  const { majorId } = useParams();
  const fetchMajor = async () => {
    const majorData = await getMajor(majorId as string);
    setCourseData(majorData[0] || null);
  }

  const fetchCurriculumn = async () => {
    const subjectsData = await getSubjects(majorId as string);
    setCourseSubjects(subjectsData);
  }

  useEffect(() => {
    fetchMajor();
    fetchCurriculumn();
    checkLoggedIn();
  }, [courseData, courseSubjects, isLoggedIn]);

  const navigate = useNavigate()

  return (
    <div>
      <HomeHeader />
      <main className="flex-grow">
        <Container size="xl" py="xl">
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-2/3">
              {courseData && (
                <>
                  <Text fw={700} component="h1" className="text-2xl font-bold mb-2">
                    {courseData.title}
                  </Text>
                  <Text c="dimmed" className="mb-4">
                    {courseData.subtitle}
                  </Text>
                </>
              )}

              {courseData?.trailer_link && courseData.trailer_link.includes("youtube.com/embed") && (
                <div className="relative w-full aspect-video bg-gray-100 rounded overflow-hidden mb-6">
                  <iframe
                    width="100%"
                    height="100%"
                    src={courseData.trailer_link}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <Text fw={700} size="xl" className="mb-4">
                P {courseData?.price}
              </Text>
              <Group className="mb-4">
                <IconCalendar size={16} />
                <Text size="sm">Course Duration:</Text>
                <Text size="sm" fw={500}>
                  {courseData?.duration}
                </Text>
              </Group>

              <Button color="orange" fullWidth className="mb-4" onClick={() => navigate(`/payment-information/${majorId}`)} disabled={!isLoggedIn}>
                Enroll Now
              </Button>

              <Text size="xs" c="dimmed" className="mb-4 text-center">
                30-day money-back guarantee
              </Text>

              <Text fw={600} className="mb-2">
                This course includes:
              </Text>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <Group key={index} className="text-sm">
                    <IconCheck size={16} className="text-orange-500" />
                    <Text>{feature}</Text>
                  </Group>
                ))}
              </div>
            </div>
          </div>

          <CourseDescription
            description={courseData?.description || ""}
            keyPoints={courseData?.key_points || []}
          />

          <div className="mb-8">
            <p className="text-2xl">Curriculumn</p>
            {courseSubjects.length > 0 && (
              <ul className="list-disc pl-5">
                {courseSubjects.map((subject: Subject, index: number) => (
                  <li key={index}>
                    <Text>{subject.title}</Text>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <StudentFeedback />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

interface CourseDescriptionProps {
  description: string;
  keyPoints: string[];
}

const CourseDescription = ({ description, keyPoints }: CourseDescriptionProps) => {
  return (
    <div className="mb-12">
      <Text component="h2" className="text-xl font-bold mb-4">
        Description
      </Text>
      
      <Text className="mb-6 text-gray-500">
        {description}
      </Text>
      
      <Text className="font-bold mb-8">You'll explore:</Text>
      <List
        spacing="xs"
        size="sm"
        className="mb-6"
        icon={<ThemeIcon><IconCircleCheck size={16} /></ThemeIcon>}
      >
        {keyPoints.map((point: string, index: number) => (
          <List.Item key={index}>{point}</List.Item>
        ))}
      </List>

    </div>
  );
};

export default CourseOverview;
