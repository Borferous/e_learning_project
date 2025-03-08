import { Card, Image, Text, Badge, Group } from "@mantine/core";

interface CourseCardProps {
  image?: string;
  title: string;
  category: string;
  price: string;
  students: string;
}

export const CourseCard = ({ image, title, category, price, students }: CourseCardProps) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" className="border">
      {image && <Image src={image} alt={title} height={140} radius="md" />}
      <Badge color="orange" variant="light" className="mt-2">
        {category}
      </Badge>
      <Text className="font-semibold mt-2">{title}</Text>
      <Group justify="space-between" className="mt-2"> {/* 🔥 Fixed this line */}
        <Text className="text-orange-500 font-bold">{price}</Text>
        <Text className="text-gray-500 text-sm">{students} students</Text>
      </Group>
    </Card>
  );
};
