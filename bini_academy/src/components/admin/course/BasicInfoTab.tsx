import { TextInput, Textarea, Select, Group, Button, NumberInput, Paper, Text } from '@mantine/core';
import { TabProps } from '../../../types';
import { useState } from 'react';

interface MajorSelection {
  degreeId: string | null;
  majorId: string | null;
}

import { Degree } from '../../../types';

interface BasicInfoTabProps extends TabProps {
  selection: MajorSelection;
  setSelection: (selection: MajorSelection) => void;
  degrees: Degree[];
}

interface BasicCourseInfo {
  title: string;
  subtitle: string;
  description: string;
  degrees: import("../../../types").Degree[];
  duration: string;
  price: number;
}

export const BasicInfoTab = ({ 
  setActiveTab, 
  updateProgress, 
  selection, 
  setSelection,
  degrees 
}: BasicInfoTabProps) => {
  const selectedDegree = degrees.find(d => d.id === selection.degreeId);
  
  const [courseInfo, setCourseInfo] = useState<BasicCourseInfo>({
    title: '',
    subtitle: '',
    description: '',
    degrees: [],
    duration: '',
    price: 0
  });

  return (
    <div className="space-y-6">
      <Group grow>
        <Select
          label="Select Degree"
          placeholder="Choose a degree"
          required
          value={selection.degreeId}
          onChange={(value) => setSelection({ degreeId: value, majorId: null })}
          data={degrees.map(d => ({ value: d.id, label: d.name }))}
        />
        
        <Select
          label="Select Major"
          placeholder="Choose a major"
          required
          disabled={!selection.degreeId}
          value={selection.majorId}
          onChange={(value) => {
            if (value) {
              setSelection({ ...selection, majorId: value });
            }
          }}
          data={selectedDegree?.majors.map(m => ({ 
            value: m.id, 
            label: m.name 
          })) || []}
        />
      </Group>

      {selection.majorId && (
        <>
          <Paper p="md" withBorder>
            <Text size="sm" fw={500} mb="xs">
              Selected Major Details
            </Text>
            <Text size="sm" c="dimmed" mb="lg">
              {selectedDegree?.majors.find(m => m.id === selection.majorId)?.description}
            </Text>

            {/* Course Information Fields */}
            <div className="space-y-4">
              <TextInput
                label="Course Title"
                placeholder="Enter course title"
                required
                value={courseInfo.title}
                onChange={(e) => setCourseInfo({ ...courseInfo, title: e.target.value })}
              />

              <TextInput
                label="Course Subtitle"
                placeholder="Enter course subtitle"
                required
                value={courseInfo.subtitle}
                onChange={(e) => setCourseInfo({ ...courseInfo, subtitle: e.target.value })}
              />

              <Textarea
                label="Course Description"
                placeholder="Enter course description"
                minRows={3}
                required
                value={courseInfo.description}
                onChange={(e) => setCourseInfo({ ...courseInfo, description: e.target.value })}
              />

              <Group grow>
                <TextInput
                  label="Duration"
                  placeholder="e.g., 4 years"
                  required
                  value={courseInfo.duration}
                  onChange={(e) => setCourseInfo({ ...courseInfo, duration: e.target.value })}
                />
                <NumberInput
                  label="Price"
                  placeholder="Enter price"
                  required
                  value={courseInfo.price}
                  onChange={(value) => setCourseInfo({ ...courseInfo, price: typeof value === 'number' ? value : 0 })}
                />
              </Group>

              <Group justify="flex-end" mt="xl">
                <Button
                  onClick={() => {
                    updateProgress("basic", 5, 5);
                    setActiveTab("advance");
                  }}
                >
                  Next Step
                </Button>
              </Group>
            </div>
          </Paper>
        </>
      )}
    </div>
  );
};