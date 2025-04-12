import { Paper, Text, Switch, NumberInput, TextInput, Button, Group } from '@mantine/core';

export const EventSettings = () => {
  return (
    <Paper p="lg">
      <Text size="xl" fw={500} mb="lg">Event Settings</Text>

      <div className="space-y-6">
        <div>
          <Text fw={500} mb="md">Notifications</Text>
          <div className="space-y-4">
            <Switch
              label="Send email notifications for new events"
              defaultChecked
            />
            <Switch
              label="Send reminder notifications"
              defaultChecked
            />
            <NumberInput
              label="Reminder time (hours before event)"
              defaultValue={24}
              min={1}
              max={72}
            />
          </div>
        </div>

        <div>
          <Text fw={500} mb="md">Registration</Text>
          <div className="space-y-4">
            <Switch
              label="Enable automatic waitlist"
              defaultChecked
            />
            <Switch
              label="Allow cancellations"
              defaultChecked
            />
            <NumberInput
              label="Default event capacity"
              defaultValue={50}
              min={1}
            />
          </div>
        </div>

        <div>
          <Text fw={500} mb="md">Performance Submissions</Text>
          <div className="space-y-4">
            <TextInput
              label="Allowed file types"
              defaultValue=".mp4,.mov,.wav,.mp3"
            />
            <NumberInput
              label="Maximum file size (MB)"
              defaultValue={500}
              min={1}
            />
          </div>
        </div>

        <Group justify="flex-end" mt="xl">
          <Button color="blue">Save Settings</Button>
        </Group>
      </div>
    </Paper>
  );
};