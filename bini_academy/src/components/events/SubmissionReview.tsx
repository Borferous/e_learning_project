import { useState } from 'react';
import { 
  Modal, 
  Text, 
  Group, 
  Button, 
  Stack, 
  TextInput, 
  Textarea,
  Badge,
  Card 
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { EventSubmission } from '../../types/events';

interface SubmissionReviewProps {
  submission: EventSubmission;
  eventTitle: string;
  opened: boolean;
  onClose: () => void;
}

export const SubmissionReview = ({ submission, eventTitle, opened, onClose }: SubmissionReviewProps) => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendFeedback = async () => {
    if (!feedback.trim()) {
      notifications.show({
        title: 'Error',
        message: 'Please enter feedback before sending',
        color: 'red'
      });
      return;
    }

    setLoading(true);
    try {
      // Here you would integrate with your email service
      // Example: await sendEmail({
      //   to: submission.studentEmail,
      //   subject: `Feedback for ${eventTitle} Submission`,
      //   body: feedback
      // });

      notifications.show({
        title: 'Success',
        message: 'Feedback sent successfully',
        color: 'green'
      });
      onClose();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to send feedback. Please try again.',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Review Submission - ${submission.studentName}`}
      size="lg"
    >
      <Stack>
        <Card withBorder>
          <Stack gap="xs">
            <Group justify="space-between">
              <Text fw={500}>Piece:</Text>
              <Text>{submission.piece}</Text>
            </Group>
            <Group justify="space-between">
              <Text fw={500}>Submitted:</Text>
              <Text>{new Date(submission.submissionDate).toLocaleString()}</Text>
            </Group>
            <Group justify="space-between">
              <Text fw={500}>Status:</Text>
              <Badge 
                color={submission.status === 'approved' ? 'green' : 'yellow'}
              >
                {submission.status}
              </Badge>
            </Group>
          </Stack>
        </Card>

        <div>
          <Text fw={500} mb="xs">Video Submission:</Text>
          <video
            src={submission.videoUrl}
            controls
            style={{ width: '100%', borderRadius: '4px' }}
          />
        </div>

        <Textarea
          label="Feedback"
          placeholder="Enter your feedback for the student..."
          minRows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />

        <Group justify="flex-end">
          <Button variant="subtle" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendFeedback} 
            loading={loading}
            disabled={!feedback.trim()}
          >
            Send Feedback
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};