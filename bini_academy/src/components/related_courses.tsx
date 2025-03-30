import { Text, Group, Card, Image, Badge, Button, Rating } from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';

const RelatedCourses = () => {
  const courses = [
    {
      id: 1,
      image: "/courses/vocal-techniques.jpg",
      title: "Mastering Vocal Techniques: From Beginner to Pro",
      category: "MUSIC",
      price: "₱5,000",
      rating: 5.0,
      students: "3.1K"
    },
    {
      id: 2,
      image: "/courses/hip-hop.jpg",
      title: "Hip-Hop Moves for Beginners",
      category: "DANCE",
      price: "₱3,000",
      rating: 5.0,
      students: "2.7K"
    },
    {
      id: 3,
      image: "/courses/recording.jpg",
      title: "Recording Vocals Like a Pro: Techniques for All Genres",
      category: "TECHNICAL SKILLS",
      price: "₱2,500",
      rating: 5.0,
      students: "4.3K"
    },
    {
      id: 4,
      image: "/courses/coaching.jpg",
      title: "Personalized Vocal Coaching for Aspiring Singers",
      category: "COACHING",
      price: "₱4,500",
      rating: 5.0,
      students: "1.7K"
    },
    {
      id: 5,
      image: "/courses/rondalla.jpg",
      title: "Rondalla Music: Basics of Playing Traditional Filipino Instruments",
      category: "PHILIPPINE ARTS",
      price: "₱500",
      rating: 5.0,
      students: "5.7K"
    }
  ];

  return (
    <div className="mb-6">
      <Group justify="space-between" className="mb-6">
        <Text component="h2" className="text-xl font-bold">
          Related Courses
        </Text>
        
        <Button 
          variant="subtle" 
          color="orange" 
          rightSection={<IconArrowRight size={16} />}
        >
          View All
        </Button>
      </Group>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {courses.map((course) => (
          <Card key={course.id} shadow="sm" padding="md" radius="md" className="h-full flex flex-col">
            <Card.Section>
              <Image
                src={course.image}
                height={160}
                alt={course.title}
              />
            </Card.Section>
            
            <Badge color="orange" className="mt-3 mb-1 w-fit">
              {course.category}
            </Badge>
            
            <Text fw={600} className="mb-2 flex-grow">
              {course.title}
            </Text>
            
            <Group justify="space-between">
              <Text fw={700} c="orange">
                {course.price}
              </Text>
              
              <Group gap={4}>
                <Rating value={course.rating} readOnly size="xs" />
                <Text size="xs" c="dimmed">({course.students} students)</Text>
              </Group>
            </Group>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedCourses;