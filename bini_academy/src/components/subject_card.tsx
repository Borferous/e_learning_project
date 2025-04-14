import { Card, Text } from '@mantine/core';

interface SubjectCardProps {
  title: string;
  units: number;
  instructor: string;
}

const SubjectCard = ({ title, units, instructor }: SubjectCardProps) => {
  return (
    <Card shadow="sm" padding="lg" className="h-full">
      {/* Subject color banner */}
      <div className={`bg-orange-500 h-2 -mx-4 -mt-4 mb-4 rounded-t`} />
      
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
      </div>
    </Card>
  );
};

export default SubjectCard;
