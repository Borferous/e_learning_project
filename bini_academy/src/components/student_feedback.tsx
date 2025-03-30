import { useState } from 'react';
import { Text, Group, Avatar, Rating, Button, Divider } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

const StudentFeedback = () => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  const reviews = [
    {
      name: "Ava Hopkins",
      avatar: "/avatars/ava.jpg",
      date: "1 month ago",
      rating: 5,
      review: "I appreciate the positive direct videos! Its one-on-one approach seems more like a personal mentoring relationship, which I appreciate. The instructor has an easy to follow flow, and breaks things down quite nicely. These were so easy to practice and inspiring. Thank you!"
    },
    {
      name: "Ethan Sanchez",
      avatar: "/avatars/ethan.jpg",
      date: "3 weeks ago",
      rating: 5,
      review: "This course is just amazing! It has great content, the best practices, and a lot of real-world knowledge. I love the way of giving exercises and the best tips by the instructor, which are memorable and implementable. I have got tools throughout the course, which I can now use in my performance directly. Thank you very much to our excellent instructor! Highly recommend this course! (like for real!!!!)"
    },
    {
      name: "Sophie Cooper",
      avatar: "/avatars/sophie.jpg",
      date: "2 weeks ago",
      rating: 5,
      review: "This course was great—it covers techniques, warmups, and tips to help build confidence and stage presence. I enjoyed the course, and it helped me add essential skills to my performance toolbox. Thank you!"
    },
    {
      name: "Nikhil Patel",
      avatar: "/avatars/nikhil.jpg",
      date: "1 week ago",
      rating: 5,
      review: "I appreciate the positive direct videos! Its one-on-one approach seems more like a personal mentoring relationship, which I appreciate. The instructor has an easy to follow flow, and breaks things down quite nicely. These were so easy to practice and inspiring. Thank you!"
    },
    {
      name: "Kelan Edwards",
      avatar: "/avatars/kelan.jpg",
      date: "3 days ago",
      rating: 5,
      review: "GREAT course! The instructor was very descriptive and professional. I learned a TON that I can apply immediately to real-life performances. Thanks so much—can't wait for the next one!"
    },
    {
      name: "Ariana McElroy",
      avatar: "/avatars/ariana.jpg",
      date: "1 week ago",
      rating: 5,
      review: "This should be one of the best courses ever made on voice and movement techniques. Highly recommend it to anyone looking to improve their stage presence and confidence!"
    }
  ];
  
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <div className="mb-12">
      <Text component="h2" className="text-xl font-bold mb-6">
        Students Feedback
      </Text>
      
      <div className="space-y-6">
        {displayedReviews.map((review, index) => (
          <div key={index}>
            {index > 0 && <Divider className="mb-6" />}
            <Group align="flex-start" gap={16} className="mb-2">
              <Avatar src={review.avatar} size="md" radius="xl" />
              <div>
                <Group justify="space-between" className="w-full">
                  <Text fw={600}>{review.name}</Text>
                  <Text size="xs" color="dimmed">{review.date}</Text>
                </Group>
                <Rating value={review.rating} readOnly size="sm" className="mb-2" />
                <Text size="sm">{review.review}</Text>
              </div>
            </Group>
          </div>
        ))}
      </div>
      
      {!showAllReviews && reviews.length > 3 && (
        <Button 
          variant="subtle" 
          color="orange" 
          fullWidth 
          onClick={() => setShowAllReviews(true)}
          className="mt-6"
          rightSection={<IconChevronDown size={16} />}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default StudentFeedback;