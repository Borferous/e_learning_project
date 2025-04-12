import { useState } from 'react';
import { Table, ActionIcon, Badge, Menu, Text, Group, Select, Button } from "@mantine/core";
import { IconEdit, IconTrash, IconDotsVertical, IconUsers, IconCalendar } from "@tabler/icons-react";
import { EventType } from "../../types/events";
import { RegistrationReview } from './RegistrationReview';

interface EventsListProps {
  onEdit: (event: EventType) => void;
}

export const EventsList = ({ onEdit }: EventsListProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Mock data for testing
  const events: EventType[] = [
    {
      eventId: '1',
      title: 'Piano Masterclass',
      subtitle: 'Advanced piano techniques',
      description: 'Advanced piano techniques and interpretation',
      registrationDate: '2025-04-20',
      startDate: '2025-04-20',
      endDate: '2025-04-20',
      time: '14:00',
      duration: 120, // 2 hours duration
      mediaType: 'Live Streamed',
      category: 'Workshop',
      thumbnail: 'placeholder.jpg',
      trailerUrl: 'placeholder.mp4',
      welcomeMessage: 'Welcome to the Piano Masterclass!',
      isRegistered: false,
      registrationStatus: 'none',
      instructors: ['INS001', 'INS002'],
      streamingPlatform: 'zoom',
      streamingLink: 'https://zoom.us/j/123456789'
    },
    {
      eventId: '2',
      title: 'Spring Recital 2025',
      subtitle: 'Annual Student Performance Showcase',
      description: 'Join us for an evening of exceptional performances featuring our talented students across various instruments. The program includes classical, contemporary, and original compositions.',
      registrationDate: '2025-03-15',
      startDate: '2025-04-15',
      endDate: '2025-04-15',
      time: '19:00',
      duration: 180, // 3 hours duration
      mediaType: 'Live Streamed',
      category: 'Performance',
      thumbnail: 'recital-placeholder.jpg',
      trailerUrl: 'recital-trailer.mp4',
      welcomeMessage: 'Welcome to our Spring Recital! Please submit your performance video for review.',
      isRegistered: false,
      registrationStatus: 'none',
      instructors: ['INS003'],
      streamingPlatform: 'teams',
      streamingLink: 'https://teams.microsoft.com/l/meetup-join/...',
      submissions: [
        {
          studentId: 'STU001',
          studentName: 'Alice Johnson',
          piece: 'Moonlight Sonata - Beethoven',
          submissionDate: '2025-03-20',
          videoUrl: 'submission1.mp4',
          status: 'pending'
        },
        {
          studentId: 'STU002',
          studentName: 'Bob Smith',
          piece: 'Rhapsody in Blue - Gershwin',
          submissionDate: '2025-03-21',
          videoUrl: 'submission2.mp4',
          status: 'approved'
        },
        {
          studentId: 'STU003',
          studentName: 'Carol White',
          piece: 'Claire de Lune - Debussy',
          submissionDate: '2025-03-22',
          videoUrl: 'submission3.mp4',
          status: 'pending'
        }
      ]
    }
  ];

  const getFilteredEvents = () => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      const dateMatch = selectedDate ? 
        eventDate.toDateString() === selectedDate.toDateString() : true;
      const categoryMatch = selectedCategory === 'all' ? 
        true : event.category === selectedCategory;
      
      return dateMatch && categoryMatch;
    });
  };

  return (
    <>
      <Group justify="space-between" mb="lg">
        <Group>
          <input
            type="date"
            className="p-2 border rounded"
            value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
          />
          <Button 
            variant="subtle"
            onClick={() => setSelectedDate(null)}
          >
            Clear Date
          </Button>
        </Group>
        <Select
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value || 'all')}
          data={[
            { value: 'all', label: 'All Categories' },
            { value: 'Performance', label: 'Performance' },
            { value: 'Workshop', label: 'Workshop' },
            { value: 'Seminar', label: 'Seminar' }
          ]}
          w={200}
        />
      </Group>

      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th>Category</Table.Th>
            <Table.Th>Date & Time</Table.Th>
            <Table.Th>Media Type</Table.Th>
            <Table.Th>Submissions</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {getFilteredEvents().map((event) => (
            <Table.Tr key={event.eventId}>
              <Table.Td>
                <div>
                  <Text fw={500}>{event.title}</Text>
                  <Text size="sm" c="dimmed">{event.subtitle}</Text>
                </div>
              </Table.Td>
              <Table.Td>
                <Badge color="blue">{event.category}</Badge>
              </Table.Td>
              <Table.Td>
                <Text>{new Date(event.startDate).toLocaleDateString()}</Text>
                <Text size="sm" c="dimmed">{event.time}</Text>
              </Table.Td>
              <Table.Td>
                <Badge 
                  color={event.mediaType === 'Live Streamed' ? 'green' : 'orange'}
                >
                  {event.mediaType}
                </Badge>
              </Table.Td>
              <Table.Td>
                {event.category === 'Performance' && event.submissions && (
                  <Badge color="violet">
                    {event.submissions.length} submissions
                  </Badge>
                )}
              </Table.Td>
              <Table.Td>
                <Menu>
                  <Menu.Target>
                    <ActionIcon variant="subtle">
                      <IconDotsVertical size={16} />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item 
                      leftSection={<IconUsers size={14} />}
                      onClick={() => {
                        setSelectedEvent(event);
                        setShowReviewModal(true);
                      }}
                    >
                      Review Registrations
                    </Menu.Item>
                    <Menu.Item 
                      leftSection={<IconEdit size={14} />}
                      onClick={() => onEdit(event)}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item 
                      leftSection={<IconTrash size={14} />}
                      color="red"
                    >
                      Delete
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {selectedEvent && (
        <RegistrationReview
          event={selectedEvent}
          opened={showReviewModal}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </>
  );
};