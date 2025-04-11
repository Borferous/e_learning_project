import { Container, Group, Button, Text } from "@mantine/core";
import { IconCalendar, IconCheck } from "@tabler/icons-react";
import { HomeHeader } from "../components/homeheader";
import { Footer } from "../components/footer";
import CourseDescription from "../components/course_description";
import CourseCurriculum from "../components/course_curriculum";
import StudentFeedback from "../components/student_feedback";
import { useNavigate, useParams } from "react-router-dom";
import { getMajor } from "../supabase/api/course";
import { useEffect, useState } from "react";
import { Major } from "../types";

export const CourseOverview = () => {

  const features = [
    "Lifetime access",
    "30-day money-back guarantee",
    "Supplementary learning materials",
    "Access on mobile and PC",
    "100% online course",
  ]

  const keyPoints = [
    "Advanced vocal techniques for stage and studio",
    "Breath control and endurance for sustained performance",
    "Mastering stage presence and audience engagement",
    "Understanding vocal health and longevity",
  ]

  const duration = "6 Months";

  // const courseData = {
  //   title: "Bachelor of Music in Vocal Performance",
  //   subtitle:
  //     "Develop your voice, master performance techniques, and take center stage.",
  //   price: "₱5,000",
  // };

  const [courseData, setCourseData] = useState<Major | null>(null)

  const { majorId } = useParams();
  const fetchMajor = async () => {
    const majorData = await getMajor(majorId as string);
    setCourseData(majorData[0] || null);
  }
  useEffect(() => {
    fetchMajor();
  }, [majorId])

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

              <div className="relative w-full aspect-video bg-gray-100 rounded overflow-hidden mb-6">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/_L70tC-YRb4"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <Text fw={700} size="xl" className="mb-4">
                {courseData?.price}
              </Text>
              <Group className="mb-4">
                <IconCalendar size={16} />
                <Text size="sm">Course Duration:</Text>
                <Text size="sm" fw={500}>
                  {duration}
                </Text>
              </Group>

              <Button color="orange" fullWidth className="mb-4" onClick={() => navigate('/payment-information')}>
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
            keyPoints={keyPoints}
          />

          <CourseCurriculum />
          <StudentFeedback />
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default CourseOverview;
