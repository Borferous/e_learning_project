import { Switch, Group, Button, Stack, Text, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { TabProps } from '../../../types';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export const PublishTab = ({ setActiveTab, updateProgress, selection, degrees }: TabProps) => {
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateProgress("publish", 2, 2);
      notifications.show({
        title: 'Success',
        message: 'Course published successfully',
        color: 'green'
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to publish course',
        color: 'red'
      });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Stack gap="xl">
      <Alert icon={<IconAlertCircle size={16} />} title="Before Publishing" color="blue">
        Please review all information before publishing the course. Once published, 
        students will be able to view and enroll in this course.
      </Alert>

      <div className="space-y-4">
        <Switch
          label="Enable Course Registration"
          description="Allow students to register for this course"
        />

        <Switch
          label="Featured Course"
          description="Show this course in featured section"
        />

        <Switch
          label="Certificate Available"
          description="Enable certificate generation upon completion"
        />
      </div>

      <Group justify="space-between" mt="xl">
        <Button variant="default" onClick={() => setActiveTab("curriculum")}>
          Previous Step
        </Button>
        <Button 
          onClick={handlePublish}
          loading={isPublishing}
        >
          Publish Course
        </Button>
      </Group>
    </Stack>
  );
};