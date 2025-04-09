import { Card, Text, Progress, Group } from '@mantine/core';

interface SubjectCardProps {
  title: string;
  units: number;
  instructor: string;
  bgColor: string;
  progress: number; // Add progress prop
}

const SubjectCard = ({ title, units, instructor, bgColor, progress }: SubjectCardProps) => {
  return (
    <Card shadow="sm" padding="lg" className="h-full">
      {/* Subject color banner */}
      <div className={`${bgColor} h-2 -mx-4 -mt-4 mb-4 rounded-t`} />
      
      <div className="space-y-4">
        {/* Title and units */}
        <div>
          <Text fw={700} size="lg" className="line-clamp-2 min-h-[3.6rem]">
            {title}
          </Text>
          <Text size="sm" c="dimmed">{units} Units</Text>
        </div>

        {/* Instructor */}
        <Text size="sm" c="dimmed">
          {instructor}
        </Text>

        {/* Progress section */}
        <div>
          <Group justify="space-between" className="mb-1">
            <Text size="sm" fw={500}>Progress</Text>
            <Text size="sm" c={progress === 100 ? 'green' : 'blue'} fw={500}>
              {progress}%
            </Text>
          </Group>
          <Progress 
            value={progress} 
            size="sm" 
            color={progress === 100 ? 'green' : 'blue'}
          />
        </div>
      </div>
    </Card>
  );
};

export default SubjectCard;
