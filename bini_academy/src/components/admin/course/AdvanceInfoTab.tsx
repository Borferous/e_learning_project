import { useState } from 'react';
import { TextInput, Group, Button, FileInput } from '@mantine/core';
import { TabProps } from '../../../types';
import { notifications } from '@mantine/notifications';

interface AdvanceFormData {
  thumbnail: File | null;
  trailerUrl: string;
}

export const AdvanceInfoTab = ({ setActiveTab, updateProgress, selection }: TabProps) => {
  const [formData, setFormData] = useState<AdvanceFormData>({
    thumbnail: null,
    trailerUrl: ''
  });

  const handleSubmit = () => {
    try {
      if (!formData.thumbnail) {
        throw new Error('Thumbnail is required');
      }
      if (!formData.trailerUrl) {
        throw new Error('Trailer URL is required');
      }

      updateProgress("advance", 8, 8);
      setActiveTab("curriculum");
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Something went wrong',
        color: 'red'
      });
    }
  };

  return (
    <div className="space-y-6">
      <FileInput
        label="Thumbnail Image"
        placeholder="Upload course thumbnail"
        accept="image/*"
        required
        onChange={(file) => setFormData({ ...formData, thumbnail: file })}
      />

      <TextInput
        label="Trailer Video URL"
        placeholder="Enter video URL"
        required
        value={formData.trailerUrl}
        onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
      />

      <Group justify="space-between">
        <Button variant="default" onClick={() => setActiveTab("basic")}>
          Previous Step
        </Button>
        <Button onClick={handleSubmit}>
          Next Step
        </Button>
      </Group>
    </div>
  );
};