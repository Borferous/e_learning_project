import { Card, Text } from "@mantine/core";

interface CategoryCardProps {
  title: string;
  courses: number;
  icon: JSX.Element;
}

export const CategoryCard = ({ title, courses, icon }: CategoryCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" className="flex items-center gap-3 border">
      {icon}
      <div>
        <Text className="font-semibold">{title}</Text>
        <Text className="text-gray-500 text-sm">{courses} courses</Text>
      </div>
    </Card>
  );
};
