import { Container, Group, Button, Text, Avatar, Rating } from '@mantine/core';
import { IconCalendar, IconUsers, IconChartBar, IconCheck, IconPlayerPlay } from '@tabler/icons-react';
import { HomeHeader } from '../components/homeheader';
import { Footer } from '../components/footer';
import CourseDescription from '../components/course_description';
import CourseCurriculum from '../components/course_curriculum';
import CourseInstructor from '../components/course_instructor';
import StudentFeedback from '../components/student_feedback';
import RelatedCourses from '../components/related_courses';

export const CourseOverview = () => {
  // You would fetch this data from an API in a real application
  const courseData = {
    title: "How to Own the Stage: Voice and Movement Techniques",
    subtitle: "Teaching you how to project your voice, control your breathing, and move with purpose.",
    instructor: {
      name: "Joel Revarera",
      title: "Professional Performer & Coach",
      avatar: "/path/to/instructor-avatar.jpg",
      followers: 258568,
      courses: 12,
      bio: "Is a seasoned performer with years of experience in theatre, voice coaching, and movement training. Having trained professional actors and singers, he will guide you through proven techniques for voice projection, stage presence, and effective communication.",
    },
    price: "₱5,000",
    rating: 5.0,
    ratingCount: 5932,
    duration: "6 Month",
    level: "Beginner and Intermediate",
    features: [
      "Lifetime access",
      "30-day money-back guarantee",
      "Free exercises file & supplementary resources",
      "Shareable certificate of completion",
      "Access on mobile, tablet and TV",
      "100% online course"
    ],
    keyPoints: [
      "Voice projection & resonance - Make your voice powerful without straining",
      "Breath control & support - Learn to breathe properly for sustained vocal power",
      "Body language & stage movement - Use movement to enhance your storytelling",
      "Practical performance techniques - Apply what you learn to real performance scenarios"
    ]
  };

  return (
    
    <div >
      <HomeHeader />
      
      <main className="flex-grow">
        <Container size="xl" py="xl">
          {/* Course Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            {/* Left Content - Video and Details */}
            <div className="w-full md:w-2/3">
              <Text component="h1" className="text-2xl font-bold mb-2">
                {courseData.title}
              </Text>
              <Text c="dimmed" className="mb-4">
                {courseData.subtitle}
              </Text>

              <Group className="mb-4">
                <Avatar src={courseData.instructor.avatar} radius="xl" size="md" />
                <div>
                  <Text fw={600}>{courseData.instructor.name}</Text>
                  <Text size="sm" c="dimmed">{courseData.instructor.title}</Text>
                </div>
              </Group>

              <Group className="mb-4">
                <Rating value={courseData.rating} readOnly />
                <Text size="sm">({courseData.ratingCount})</Text>
              </Group>
              
              {/* Course Video Preview */}
              <div className="relative w-full aspect-video bg-gray-100 rounded overflow-hidden mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button variant="filled" radius="xl" className="bg-white text-orange-500">
                    <IconPlayerPlay size={24} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Content - Price and Enrollment */}
            <div className="w-full md:w-1/3 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <Text fw={700} size="xl" className="mb-4">
                {courseData.price}
              </Text>

              <Group className="mb-4">
                <IconCalendar size={16} />
                <Text size="sm">Course Duration:</Text>
                <Text size="sm" fw={500}>{courseData.duration}</Text>
              </Group>

              <Group className="mb-4">
                <IconChartBar size={16} />
                <Text size="sm">Course Level:</Text>
                <Text size="sm" fw={500}>{courseData.level}</Text>
              </Group>

              <Group className="mb-4">
                <IconUsers size={16} />
                <Text size="sm">Students Enrolled:</Text>
                <Text size="sm" fw={500}>{courseData.instructor.followers.toLocaleString()}</Text>
              </Group>

              <Button color="orange" fullWidth className="mb-4">
                Enroll Now
              </Button>

              <Text size="xs" c="dimmed" className="mb-4 text-center">
                30-day money-back guarantee
              </Text>

              <Text fw={600} className="mb-2">
                This course includes:
              </Text>

              <div className="space-y-2">
                {courseData.features.map((feature, index) => (
                  <Group key={index} className="text-sm">
                    <IconCheck size={16} className="text-orange-500" />
                    <Text>{feature}</Text>
                  </Group>
                ))}
              </div>
            </div>
          </div>

          {/* Course Content Sections */}
          <CourseDescription 
            description="Do you dream of commanding the stage with confidence, poise, and charisma? Whether you're a singer, actor, public speaker, or teacher, projecting your voice and movement is essential for a compelling stage presence." 
            keyPoints={courseData.keyPoints} 
          />
          
          <CourseCurriculum />
          <CourseInstructor instructor={courseData.instructor} />
          <StudentFeedback />
          <RelatedCourses />
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default CourseOverview;