import { Text, List, ThemeIcon } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';

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
      
      <Text className="mb-6">
        {description}
      </Text>
      
      <Text className="mb-4">
        In this comprehensive course, you'll master the essential techniques to project your voice, control your breathing, and move with purpose. Learn the same techniques used by professional performers, Broadway actors, and vocal coaches to captivate any audience.
      </Text>
      
      <Text className="font-bold mb-2">You'll explore:</Text>
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
      
      <Text>
        By the end of this course, you'll step onto any stage with the confidence and presence of a true performer!
      </Text>
    </div>
  );
};

export default CourseDescription;