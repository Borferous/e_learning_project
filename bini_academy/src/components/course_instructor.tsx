import { Text, Group, Avatar, Badge } from '@mantine/core';
import { IconUsers, IconBook } from '@tabler/icons-react';

interface Instructor {
  avatar: string;
  name: string;
  title: string;
  followers: number;
  courses: number;
  bio: string;
}

const CourseInstructor = ({ instructor }: { instructor: Instructor }) => {
  return (
    <div className="mb-12">
      <Text component="h2" className="text-xl font-bold mb-6">
        Course Instructor
      </Text>
      
      <Group align="flex-start" gap={24} className="mb-6">
        <Avatar src={instructor.avatar} size={100} radius="md" />
        
        <div className="flex-grow">
          <Text fw={700} size="lg" className="mb-1">
            {instructor.name}
          </Text>
          
          <Text c="dimmed" className="mb-3">
            {instructor.title}
          </Text>
          
          <Group className="mb-4">
            <Badge color="gray" variant="filled" size="sm">
              <Group gap={4}>
                <IconUsers size={14} />
                <Text size="xs">{instructor.followers} followers</Text>
              </Group>
            </Badge>
            
            <Badge color="gray" variant="filled" size="sm">
              <Group gap={4}>
                <IconBook size={14} />
                <Text size="xs">{instructor.courses} Courses</Text>
              </Group>
            </Badge>
          </Group>
          
          <Text size="sm" className="text-gray-700">
            {instructor.bio}
          </Text>
        </div>
      </Group>
    </div>
  );
};

export default CourseInstructor;