import { useState } from 'react';
import { Table, ActionIcon, Badge, Menu, Text, Group, Select, Button, Modal } from "@mantine/core";
import { IconEdit, IconTrash, IconDotsVertical, IconUsers, IconCalendar, IconFileCheck } from "@tabler/icons-react";
import { EventType, EventSubmission, SubmissionStatus } from '../../types/events';
import { RegistrationReview } from './RegistrationReview';
import { SubmissionReview } from './SubmissionReview';

interface EventsListProps {
  onEdit: (event: EventType) => void;
}

export const EventsList = ({ onEdit }: EventsListProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<EventSubmission | null>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showSubmissionsListModal, setShowSubmissionsListModal] = useState(false);

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
          studentEmail: 'alice@example.com',
          piece: 'Moonlight Sonata - Beethoven',
          submissionDate: '2025-03-20',
          videoUrl: 'submission1.mp4',
          status: 'pending' as SubmissionStatus
        },
        {
          studentId: 'STU002',
          studentName: 'Bob Smith',
          studentEmail: 'bob@example.com',
          piece: 'Rhapsody in Blue - Gershwin',
          submissionDate: '2025-03-21',
          videoUrl: 'submission2.mp4',
          status: 'approved' as SubmissionStatus
        },
        {
          studentId: 'STU003',
          studentName: 'Carol White',
          studentEmail: 'carol@example.com',
          piece: 'Claire de Lune - Debussy',
          submissionDate: '2025-03-22',
          videoUrl: 'submission3.mp4',
          status: 'pending' as SubmissionStatus
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
                    {event.submissions && (
                      <Menu.Item 
                        leftSection={<IconFileCheck size={14} />}
                        onClick={() => {
                          setSelectedEvent(event);
                          setShowSubmissionsListModal(true);
                        }}
                      >
                        Review Submissions ({event.submissions.length})
                      </Menu.Item>
                    )}
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

      {selectedEvent && selectedEvent.submissions && (
        <Modal
          opened={showSubmissionsListModal}
          onClose={() => setShowSubmissionsListModal(false)}
          title={`Submissions for ${selectedEvent.title}`}
          size="lg"
        >
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Student</Table.Th>
                <Table.Th>Piece</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {selectedEvent.submissions.map((submission) => (
                <Table.Tr key={submission.studentId}>
                  <Table.Td>
                    <Text fw={500}>{submission.studentName}</Text>
                    <Text size="xs" c="dimmed">{submission.studentEmail}</Text>
                  </Table.Td>
                  <Table.Td>{submission.piece}</Table.Td>
                  <Table.Td>
                    <Badge 
                      color={
                        submission.status === 'approved' 
                          ? 'green' 
                          : submission.status === 'rejected'
                          ? 'red'
                          : 'yellow'
                      }
                    >
                      {submission.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Button
                      variant="light"
                      size="xs"
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setShowSubmissionsListModal(false);
                        setShowSubmissionModal(true);
                      }}
                    >
                      Review
                    </Button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Modal>
      )}

      {selectedEvent && selectedSubmission && (
        <SubmissionReview
          submission={selectedSubmission}
          eventTitle={selectedEvent.title}
          opened={showSubmissionModal}
          onClose={() => {
            setShowSubmissionModal(false);
            setSelectedSubmission(null);
          }}
        />
      )}
    </>
  );
};