import { useState } from 'react';
import { TextInput, Textarea, Select, Button, Group, Paper, FileInput, Stack, MultiSelect, NumberInput } from '@mantine/core';
import { IconUpload } from '@tabler/icons-react';
import { EventType } from '../../types/events';

// Add interface for instructor
interface Instructor {
  id: string;
  name: string;
  expertise: string;
}

// Mock instructors data - replace with actual data fetch
const INSTRUCTORS: Instructor[] = [
  { id: 'INS001', name: 'Dr. Sarah Wilson', expertise: 'Piano Performance' },
  { id: 'INS002', name: 'Prof. James Miller', expertise: 'Music Theory' },
  { id: 'INS003', name: 'Ms. Emily Chen', expertise: 'Vocal Performance' },
  { id: 'INS004', name: 'Mr. Robert Davis', expertise: 'Jazz Studies' },
];

const DEFAULT_EVENT: Omit<EventType, 'eventId'> = {
  title: '',
  subtitle: '',
  description: '',
  mediaType: 'Live Streamed',
  category: 'Workshop',
  registrationDate: '',
  startDate: '',
  endDate: '',
  time: '',
  duration: 60,
  welcomeMessage: '',
  isRegistered: false,
  registrationStatus: 'none',
  thumbnail: '',
  trailerUrl: '',
  instructors: [],
  streamingPlatform: undefined,
  streamingLink: undefined,
  recordedVideoUrl: undefined
};

interface CreateEventProps {
  event?: EventType | null;
  onSubmit: (event: EventType) => void;
  onCancel: () => void;
}

export const CreateEvent = ({ event, onSubmit, onCancel }: CreateEventProps) => {
  const [formData, setFormData] = useState<EventType>({
    ...DEFAULT_EVENT,
    eventId: event?.eventId || `event-${Date.now()}`,
    ...event
  });

  const showStreamingFields = formData.mediaType === 'Live Streamed';
  const showRecordingFields = formData.mediaType === 'Recorded';

  return (
    <Paper p="lg">
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData as EventType);
      }}>
        <Stack gap="md" m="md">
          <Group grow>
            <TextInput
              label="Event Title"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextInput
              label="Subtitle"
              required
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </Group>

          <Textarea
            label="Description"
            required
            minRows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <Group grow>
            <Select
              label="Media Type"
              required
              data={[
                { value: 'Live Streamed', label: 'Live Streamed' },
                { value: 'Recorded', label: 'Recorded' }
              ]}
              value={formData.mediaType}
              onChange={(value: string | null) => {
                if (value && (value === 'Live Streamed' || value === 'Recorded')) {
                  setFormData({ 
                    ...formData, 
                    mediaType: value,
                    streamingPlatform: undefined,
                    streamingLink: undefined,
                    recordedVideoUrl: undefined
                  });
                }
              }}
            />
            <Select
              label="Category"
              required
              data={[
                { value: 'Workshop', label: 'Workshop' },
                { value: 'Seminar', label: 'Seminar' },
                { value: 'Performance', label: 'Performance' }
              ]}
              value={formData.category}
              onChange={(value) => value && setFormData({ ...formData, category: value as EventType['category'] })}
            />
          </Group>

          <Group grow>
            <div>
              <label className="text-sm">Registration Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={formData.registrationDate}
                onChange={(e) => setFormData({ ...formData, registrationDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm">Start Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm">End Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="text-sm">Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </div>
          </Group>

          <Group grow>
            <NumberInput
              label="Duration (minutes)"
              required
              min={1}
              max={480}
              value={formData.duration}
              onChange={(value) => setFormData({ ...formData, duration: value as number })}
            />
          </Group>

          {showStreamingFields && (
            <Group grow>
              <Select
                label="Streaming Platform"
                required
                data={[
                  { value: 'zoom', label: 'Zoom' },
                  { value: 'teams', label: 'Microsoft Teams' },
                  { value: 'gmeet', label: 'Google Meet' },
                ]}
                value={formData.streamingPlatform}
                onChange={(value) => value && setFormData({ ...formData, streamingPlatform: value as "zoom" | "teams" | "gmeet" })}
              />
              <TextInput
                label="Streaming Link"
                required
                value={formData.streamingLink}
                onChange={(e) => setFormData({ ...formData, streamingLink: e.target.value })}
                placeholder="Enter meeting link"
              />
            </Group>
          )}

          {showRecordingFields && (
            <FileInput
              label="Recorded Video"
              accept="video/*"
              placeholder="Upload recorded video"
              leftSection={<IconUpload size={14} />}
              onChange={(file) => {
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setFormData({ ...formData, recordedVideoUrl: e.target?.result as string });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          )}

          <MultiSelect
            label="Assign Instructors"
            required
            data={INSTRUCTORS.map(instructor => ({
              value: instructor.id,
              label: `${instructor.name} (${instructor.expertise})`
            }))}
            value={formData.instructors}
            onChange={(values) => setFormData({ ...formData, instructors: values })}
            searchable
            nothingFoundMessage="No instructors found"
            placeholder="Select instructors"
          />

          <Textarea
            label="Welcome Message"
            required
            value={formData.welcomeMessage}
            onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
          />

          <FileInput
            label="Thumbnail Image"
            accept="image/*"
            placeholder="Upload thumbnail"
            leftSection={<IconUpload size={14} />}
            onChange={(file) => {
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setFormData({ ...formData, thumbnail: e.target?.result as string });
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          <FileInput
            label="Trailer Video"
            accept="video/*"
            placeholder="Upload trailer"
            leftSection={<IconUpload size={14} />}
            onChange={(file) => {
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setFormData({ ...formData, trailerUrl: e.target?.result as string });
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          <Group justify="flex-end" mt="xl">
            <Button variant="light" onClick={onCancel}>Cancel</Button>
            <Button type="submit" color="blue">
              {event ? 'Update Event' : 'Create Event'}
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};