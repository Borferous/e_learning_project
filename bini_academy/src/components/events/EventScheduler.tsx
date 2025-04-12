import { useState } from 'react';
import { Paper, Text, Select, Group, Badge, Modal, Button, Stack } from '@mantine/core';
import { IconCalendar, IconClock, IconUsers } from '@tabler/icons-react';
import { EventType } from '../../types/events';

export const EventScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [showEventDetails, setShowEventDetails] = useState(false);

  // Mock data for testing
  const events: EventType[] = [
    {
      eventId: 'evt-001',
      title: 'Piano Masterclass',
      subtitle: 'Advanced Techniques Workshop',
      description: 'Learn advanced piano techniques from master pianists',
      registrationDate: '2025-04-15',
      startDate: '2025-04-20',
      endDate: '2025-04-20',
      time: '10:00',
      duration: 120,
      mediaType: 'Live Streamed',
      category: 'Workshop',
      thumbnail: 'piano-workshop.jpg',
      trailerUrl: 'piano-trailer.mp4',
      welcomeMessage: 'Welcome to the Piano Masterclass!',
      isRegistered: false,
      registrationStatus: 'none',
      instructors: ['INS001']
    },
    {
      eventId: 'evt-002',
      title: 'Spring Concert',
      subtitle: 'Annual Performance Showcase',
      description: 'Annual spring concert featuring our talented students',
      registrationDate: '2025-04-16',
      startDate: '2025-04-20',
      endDate: '2025-04-20',
      time: '14:00',
      duration: 180,
      mediaType: 'Live Streamed',
      category: 'Performance',
      thumbnail: 'spring-concert.jpg',
      trailerUrl: 'concert-trailer.mp4',
      welcomeMessage: 'Welcome to our Spring Concert!',
      isRegistered: false,
      registrationStatus: 'none',
      instructors: ['INS002', 'INS003']
    },
    {
      eventId: 'evt-003',
      title: 'Music Theory Seminar',
      subtitle: 'Advanced Harmony and Composition',
      description: 'Deep dive into advanced music theory concepts',
      registrationDate: '2025-04-21',
      startDate: '2025-04-25',
      endDate: '2025-04-25',
      time: '09:00',
      duration: 240,
      mediaType: 'Recorded',
      category: 'Workshop',
      thumbnail: 'theory-seminar.jpg',
      trailerUrl: 'theory-trailer.mp4',
      welcomeMessage: 'Welcome to Music Theory Seminar!',
      isRegistered: false,
      registrationStatus: 'none',
      instructors: ['INS004']
    },
    {
      eventId: 'evt-004',
      title: 'Jazz Ensemble Workshop',
      subtitle: 'Improvisation Techniques',
      description: 'Learn jazz improvisation with our expert ensemble',
      registrationDate: '2025-04-22',
      startDate: '2025-04-25',
      endDate: '2025-04-25',
      time: '15:00',
      duration: 180,
      mediaType: 'Live Streamed',
      category: 'Workshop',
      thumbnail: 'jazz-workshop.jpg',
      trailerUrl: 'jazz-trailer.mp4',
      welcomeMessage: 'Welcome to Jazz Workshop!',
      isRegistered: false,
      registrationStatus: 'none',
      instructors: ['INS005'],
      streamingPlatform: 'zoom',
      streamingLink: 'https://zoom.us/j/123456789'
    }
  ];

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startDate);
      return eventDate.toDateString() === date.toDateString() &&
        (selectedCategory === 'all' || event.category === selectedCategory);
    });
  };

  const handleDateChange = (dateString: string) => {
    const newDate = new Date(dateString);
    setSelectedDate(newDate);
    setShowDatePicker(false);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Paper p="lg">
      <Group justify="space-between" mb="md">
        <Group>
          <Text size="xl" fw={500}>Event Schedule</Text>
          <Button
            variant="light"
            leftSection={<IconCalendar size={16} />}
            onClick={() => setShowDatePicker(true)}
          >
            {selectedDate.toLocaleDateString()}
          </Button>
        </Group>
        <Select
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value || 'all')}
          data={[
            { value: 'all', label: 'All Categories' },
            { value: 'performance', label: 'Performance' },
            { value: 'workshop', label: 'Workshop' },
            { value: 'masterclass', label: 'Masterclass' },
            { value: 'competition', label: 'Competition' }
          ]}
          w={200}
        />
      </Group>

      <Modal
        opened={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        title="Select Date"
        centered
        size="sm"
      >
        <div className="p-4">
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>
      </Modal>

      <div className="mt-6">
        <Text fw={500} mb="md">Events on {selectedDate.toLocaleDateString()}</Text>
        <div className="space-y-2">
          {getEventsForDate(selectedDate).map((event) => (
            <Group 
              key={event.eventId} 
              p="md" 
              className="border rounded hover:bg-gray-50 cursor-pointer"
              onClick={() => {
                setSelectedEvent(event);
                setShowEventDetails(true);
              }}
            >
              <div className="flex-1">
                <Text fw={500}>{event.title}</Text>
                <Text size="sm" c="dimmed">{event.time}</Text>
              </div>
              <Badge color="blue">{event.category}</Badge>
            </Group>
          ))}
          {getEventsForDate(selectedDate).length === 0 && (
            <Text c="dimmed" ta="center" py="xl">
              No events scheduled for this date
            </Text>
          )}
        </div>
      </div>

      <Modal
        opened={showEventDetails}
        onClose={() => {
          setShowEventDetails(false);
          setSelectedEvent(null);
        }}
        title="Event Details"
        size="lg"
      >
        {selectedEvent && (
          <Stack>
            <div>
              <Text size="xl" fw={700}>{selectedEvent.title}</Text>
              <Text size="sm" c="dimmed">{selectedEvent.subtitle}</Text>
            </div>

            <div className="border-t pt-4">
              <Group mb="xs">
                <IconCalendar size={16} />
                <Text>
                  {new Date(selectedEvent.startDate).toLocaleDateString()} - {new Date(selectedEvent.endDate).toLocaleDateString()}
                </Text>
              </Group>
              <Group mb="xs">
                <IconClock size={16} />
                <Text>{selectedEvent.time} ({formatDuration(selectedEvent.duration)})</Text>
              </Group>
              <Group mb="xs">
                <IconUsers size={16} />
                <Text>Instructors: {selectedEvent.instructors.join(', ')}</Text>
              </Group>
            </div>

            <div className="border-t pt-4">
              <Text fw={500} mb="xs">Description</Text>
              <Text>{selectedEvent.description}</Text>
            </div>

            <div className="border-t pt-4">
              <Group justify="apart">
                <div>
                  <Badge color={selectedEvent.mediaType === 'Live Streamed' ? 'green' : 'orange'}>
                    {selectedEvent.mediaType}
                  </Badge>
                  {selectedEvent.streamingPlatform && (
                    <Badge ml="xs" color="blue">
                      {selectedEvent.streamingPlatform}
                    </Badge>
                  )}
                </div>
                <Badge>{selectedEvent.category}</Badge>
              </Group>
            </div>

            {selectedEvent.streamingLink && (
              <div className="border-t pt-4">
                <Text fw={500} mb="xs">Meeting Link</Text>
                <Text component="a" href={selectedEvent.streamingLink} target="_blank" c="blue">
                  {selectedEvent.streamingLink}
                </Text>
              </div>
            )}

            <Button 
              fullWidth 
              mt="md"
              disabled={selectedEvent.isRegistered}
            >
              {selectedEvent.isRegistered ? 'Already Registered' : 'Register for Event'}
            </Button>
          </Stack>
        )}
      </Modal>
    </Paper>
  );
};