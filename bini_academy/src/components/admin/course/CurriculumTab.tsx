import { useState } from 'react';
import { Button, TextInput, Textarea, Group, Stack, ActionIcon, Paper, Select, Text, Tabs, NumberInput, MultiSelect } from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import { Degree, TabProps, MajorSelection } from '../../../types';
import { notifications } from '@mantine/notifications';

interface Subject {
  id: string;
  name: string;
  description: string;
  credits: number;
  semester: number;
  instructorId: string | null;
  prerequisites?: string[]; // Add prerequisites
  status: 'pending' | 'active' | 'completed'; // Add status
}

// Temporary mock data for instructors
const mockInstructors = [
  { value: 'inst1', label: 'John Doe - Piano' },
  { value: 'inst2', label: 'Jane Smith - Voice' },
  { value: 'inst3', label: 'Mike Johnson - Theory' },
];

// Add constants for validation
const MAX_CREDITS_PER_SEMESTER = 12;
const MIN_CREDITS_PER_SEMESTER = 2;

export const CurriculumTab = ({ setActiveTab, updateProgress, selection, degrees }: TabProps) => {
  const selectedDegree = degrees.find(d => d.id === selection.degreeId);
  const selectedMajor = selectedDegree?.majors.find(m => m.id === selection.majorId);
  const [subjects, setSubjects] = useState<Subject[]>(
    (selectedMajor?.curriculum?.subjects || []).map(subject => ({
      ...subject,
      status: 'pending',
      prerequisites: []
    }))
  );
  const [activeYear, setActiveYear] = useState<string>("1");
  const [totalYears, setTotalYears] = useState(4); // Default 4 years

  // Calculate semesters based on years
  const totalSemesters = totalYears * 2;

  // Helper function to get year from semester
  const getYear = (semester: number) => Math.ceil(semester / 2);
  const getSemesterInYear = (semester: number) => semester % 2 === 0 ? 2 : 1;

  const addSubject = (semester: number) => {
    const semesterCredits = getTotalCredits(semester);
    
    if (semesterCredits >= MAX_CREDITS_PER_SEMESTER) {
      notifications.show({
        title: 'Credit Limit Exceeded',
        message: `Maximum ${MAX_CREDITS_PER_SEMESTER} credits allowed per semester`,
        color: 'red'
      });
      return;
    }

    const newSubject: Subject = {
      id: `subject-${Date.now()}`,
      name: '',
      description: '',
      credits: 0,
      semester,
      instructorId: null,
      prerequisites: [],
      status: 'pending'
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const updateSubject = (id: string, field: keyof Subject, value: any) => {
    setSubjects(subjects.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const getTotalCredits = (semester: number) => {
    return subjects
      .filter(subject => subject.semester === semester)
      .reduce((sum, subject) => sum + subject.credits, 0);
  };

  // Add validation functions
  const validateCredits = (semester: number): boolean => {
    const credits = getTotalCredits(semester);
    return credits >= MIN_CREDITS_PER_SEMESTER && credits <= MAX_CREDITS_PER_SEMESTER;
  };

  const validatePrerequisites = (subject: Subject): boolean => {
    if (!subject.prerequisites?.length) return true;
    
    const prerequisiteSubjects = subjects.filter(s => 
      subject.prerequisites?.includes(s.id)
    );

    // Check if all prerequisites are from previous semesters
    return prerequisiteSubjects.every(p => 
      p.semester < subject.semester && p.status === 'completed'
    );
  };

  const handleSubmit = () => {
    try {
      if (subjects.length === 0) {
        throw new Error('At least one subject is required');
      }

      // Validate credits for each semester
      for (let i = 1; i <= totalSemesters; i++) {
        if (!validateCredits(i)) {
          throw new Error(`Semester ${i} must have between ${MIN_CREDITS_PER_SEMESTER} and ${MAX_CREDITS_PER_SEMESTER} credits`);
        }
      }

      // Validate prerequisites
      const invalidSubjects = subjects.filter(s => !validatePrerequisites(s));
      if (invalidSubjects.length > 0) {
        throw new Error('Some subjects have invalid prerequisites');
      }

      updateProgress("curriculum", 3, 3);
      setActiveTab("publish");
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Something went wrong',
        color: 'red'
      });
    }
  };

  return (
    <Stack gap="md">
      <Group justify="space-between" mb="md">
        <Text size="xl" fw={500}>Course Curriculum</Text>
        <Group>
          <NumberInput
            label="Total Years"
            value={totalYears}
            onChange={(value) => setTotalYears(Number(value))}
            min={1}
            max={6}
            style={{ width: 100 }}
          />
        </Group>
      </Group>

      <Tabs value={activeYear} onChange={(value: string | null) => value && setActiveYear(value)}>
        <Tabs.List>
          {Array.from({ length: totalYears }, (_, i) => (
            <Tabs.Tab key={i + 1} value={(i + 1).toString()}>
              Year {i + 1}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {Array.from({ length: totalYears }, (_, yearIndex) => (
          <Tabs.Panel key={yearIndex + 1} value={(yearIndex + 1).toString()}>
            <Stack gap="xl" mt="md">
              {/* First Semester of Year */}
              <Paper p="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Text fw={500}>Year {yearIndex + 1} - First Semester</Text>
                  <Group>
                    <Text size="sm" c="dimmed">
                      Total Credits: {getTotalCredits(yearIndex * 2 + 1)}
                    </Text>
                    {getTotalCredits(yearIndex * 2 + 1) < MIN_CREDITS_PER_SEMESTER && (
                      <Text size="sm" c="red">
                        Min {MIN_CREDITS_PER_SEMESTER} credits required
                      </Text>
                    )}
                    {getTotalCredits(yearIndex * 2 + 1) > MAX_CREDITS_PER_SEMESTER && (
                      <Text size="sm" c="red">
                        Max {MAX_CREDITS_PER_SEMESTER} credits exceeded
                      </Text>
                    )}
                  </Group>
                </Group>

                {subjects
                  .filter(subject => subject.semester === yearIndex * 2 + 1)
                  .map((subject) => (
                    <Paper key={subject.id} p="md" withBorder mb="sm">
                      <Group justify="space-between" mb="xs">
                        <TextInput
                          placeholder="Subject Name"
                          value={subject.name}
                          onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <ActionIcon color="red" onClick={() => removeSubject(subject.id)}>
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                      
                      <Textarea
                        placeholder="Subject Description"
                        value={subject.description}
                        onChange={(e) => updateSubject(subject.id, 'description', e.target.value)}
                        minRows={2}
                        mb="xs"
                      />
                      
                      <Group align="flex-start" mb="xs">
                        <TextInput
                          type="number"
                          placeholder="Credits"
                          value={subject.credits || ''}
                          onChange={(e) => {
                            const newCredits = Number(e.target.value);
                            const totalCredits = getTotalCredits(subject.semester) - subject.credits + newCredits;
                            
                            if (totalCredits > MAX_CREDITS_PER_SEMESTER) {
                              notifications.show({
                                title: 'Credit Limit Exceeded',
                                message: `Maximum ${MAX_CREDITS_PER_SEMESTER} credits allowed per semester`,
                                color: 'red'
                              });
                              return;
                            }
                            
                            updateSubject(subject.id, 'credits', newCredits);
                          }}
                          style={{ width: 100 }}
                        />
                        
                        <Select
                          placeholder="Assign Instructor"
                          data={mockInstructors}
                          value={subject.instructorId}
                          onChange={(value) => updateSubject(subject.id, 'instructorId', value)}
                          clearable
                          style={{ flex: 1 }}
                        />

                        <Select
                          placeholder="Status"
                          data={[
                            { value: 'pending', label: 'Pending' },
                            { value: 'active', label: 'Active' },
                            { value: 'completed', label: 'Completed' }
                          ]}
                          value={subject.status}
                          onChange={(value: string | null) => {
                            if (value) {
                              updateSubject(subject.id, 'status', value as Subject['status']);
                            }
                          }}
                          style={{ width: 120 }}
                        />
                      </Group>

                      <MultiSelect
                        label="Prerequisites"
                        placeholder="Select prerequisites"
                        data={subjects
                          .filter(s => s.semester < subject.semester)
                          .map(s => ({
                            value: s.id,
                            label: s.name,
                            disabled: s.status !== 'completed'
                          }))}
                        value={subject.prerequisites}
                        onChange={(values) => updateSubject(subject.id, 'prerequisites', values)}
                        disabled={subject.semester === 1}
                      />
                    </Paper>
                  ))}

                <Button
                  leftSection={<IconPlus size={16} />}
                  variant="outline"
                  onClick={() => addSubject(yearIndex * 2 + 1)}
                  fullWidth
                  mt="sm"
                >
                  Add Subject to First Semester
                </Button>
              </Paper>

              {/* Second Semester of Year */}
              <Paper p="md" withBorder>
                <Group justify="space-between" mb="md">
                  <Text fw={500}>Year {yearIndex + 1} - Second Semester</Text>
                  <Group>
                    <Text size="sm" c="dimmed">
                      Total Credits: {getTotalCredits(yearIndex * 2 + 2)}
                    </Text>
                    {getTotalCredits(yearIndex * 2 + 2) < MIN_CREDITS_PER_SEMESTER && (
                      <Text size="sm" c="red">
                        Min {MIN_CREDITS_PER_SEMESTER} credits required
                      </Text>
                    )}
                    {getTotalCredits(yearIndex * 2 + 2) > MAX_CREDITS_PER_SEMESTER && (
                      <Text size="sm" c="red">
                        Max {MAX_CREDITS_PER_SEMESTER} credits exceeded
                      </Text>
                    )}
                  </Group>
                </Group>

                {subjects
                  .filter(subject => subject.semester === yearIndex * 2 + 2)
                  .map((subject) => (
                    <Paper key={subject.id} p="md" withBorder mb="sm">
                      <Group justify="space-between" mb="xs">
                        <TextInput
                          placeholder="Subject Name"
                          value={subject.name}
                          onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                          style={{ flex: 1 }}
                        />
                        <ActionIcon color="red" onClick={() => removeSubject(subject.id)}>
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                      
                      <Textarea
                        placeholder="Subject Description"
                        value={subject.description}
                        onChange={(e) => updateSubject(subject.id, 'description', e.target.value)}
                        minRows={2}
                        mb="xs"
                      />
                      
                      <Group align="flex-start" mb="xs">
                        <TextInput
                          type="number"
                          placeholder="Credits"
                          value={subject.credits || ''}
                          onChange={(e) => {
                            const newCredits = Number(e.target.value);
                            const totalCredits = getTotalCredits(subject.semester) - subject.credits + newCredits;
                            
                            if (totalCredits > MAX_CREDITS_PER_SEMESTER) {
                              notifications.show({
                                title: 'Credit Limit Exceeded',
                                message: `Maximum ${MAX_CREDITS_PER_SEMESTER} credits allowed per semester`,
                                color: 'red'
                              });
                              return;
                            }
                            
                            updateSubject(subject.id, 'credits', newCredits);
                          }}
                          style={{ width: 100 }}
                        />
                        
                        <Select
                          placeholder="Assign Instructor"
                          data={mockInstructors}
                          value={subject.instructorId}
                          onChange={(value) => updateSubject(subject.id, 'instructorId', value)}
                          clearable
                          style={{ flex: 1 }}
                        />

                        <Select
                          placeholder="Status"
                          data={[
                            { value: 'pending', label: 'Pending' },
                            { value: 'active', label: 'Active' },
                            { value: 'completed', label: 'Completed' }
                          ]}
                          value={subject.status}
                          onChange={(value: string | null) => {
                            if (value && ['pending', 'active', 'completed'].includes(value)) {
                              updateSubject(subject.id, 'status', value as Subject['status']);
                            }
                          }}
                          style={{ width: 120 }}
                        />
                      </Group>

                      <MultiSelect
                        label="Prerequisites"
                        placeholder="Select prerequisites"
                        data={subjects
                          .filter(s => s.semester < subject.semester)
                          .map(s => ({
                            value: s.id,
                            label: s.name,
                            disabled: s.status !== 'completed'
                          }))}
                        value={subject.prerequisites}
                        onChange={(values) => updateSubject(subject.id, 'prerequisites', values)}
                        disabled={subject.semester === 1}
                      />
                    </Paper>
                  ))}

                <Button
                  leftSection={<IconPlus size={16} />}
                  variant="outline"
                  onClick={() => addSubject(yearIndex * 2 + 2)}
                  fullWidth
                  mt="sm"
                >
                  Add Subject to Second Semester
                </Button>
              </Paper>
            </Stack>
          </Tabs.Panel>
        ))}
      </Tabs>

      <Group justify="space-between" mt="xl">
        <Button variant="default" onClick={() => setActiveTab("advance")}>
          Previous Step
        </Button>
        <Button onClick={handleSubmit}>
          Next Step
        </Button>
      </Group>
    </Stack>
  );
};