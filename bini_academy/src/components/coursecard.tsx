import { Card, Image, Text, Badge } from "@mantine/core";
import { Link } from "react-router-dom";

interface CourseCardProps {
  image?: string;
  title: string;
  category: string;
  students?: string;
  link: string; // Add a link prop to navigate
}

export const CourseCard = ({ image, title, category, students, link }: CourseCardProps) => {
  return (
    <Link to={link} className="no-underline">
      <Card shadow="sm" padding="lg" radius="md" className="border hover:shadow-lg transition duration-300">
        {image && <Image src={image} alt={title} height={140} radius="md" />}
        <Badge color="orange" variant="light" className="mt-2">
          {category}
        </Badge>
        <Text className="font-semibold mt-2">{title}</Text>
        {students && <Text className="text-gray-500 text-sm mt-2">{students} students</Text>}
      </Card>
    </Link>
  );
};
