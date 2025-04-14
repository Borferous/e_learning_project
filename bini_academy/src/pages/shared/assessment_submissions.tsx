import { useState, useMemo, useEffect } from 'react';
import { User } from "../../types";
import {
  Table,
  Button,
  Paper,
  Group,
  Text,
  ActionIcon,
  Title,
  Stack,
  Modal,
  TextInput,
  Card,
  Badge,
  Textarea,
  Select,
} from '@mantine/core';
import { Sidebar } from "../../components/sidebar";
import { HeaderAdmin } from "../../components/headeradmin";
import { UserRole } from "../../types";
import { IconEye, IconCheck } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

// Use existing interfaces
interface Submission {
  id: string;
  studentId: string;
  assessmentId: string;
  files: { name: string; url: string; size?: number }[];
  submittedAt: string;
  status: 'pending' | 'graded';
}

interface Grade {
  studentId: string;
  assessmentId: string;
  score: number;
  feedback: string;
  submittedAt: string;
}

// Add new interfaces for student and assessment info
interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Assessment {
  id: number;
  title: string;
  type: string;
  dueDate: string;
  totalScore: number;
  courseId: string;
  subjectId: string;
  degreeId: string;
  details: {
    description: string;
    criteria: {
      name: string;
      percentage: number;
      description: string;
    }[];
  };
  submissions: any[];
  grades: any[];
}

interface Course {
  id: string;
  title: string;
  degreeId: string;
}

// Dummy data
const dummyDegrees = [
  { value: 'degree-2', label: 'Bachelor of Arts' }
];

const dummyCourses = [
  { value: 'course-2', label: 'Music', degreeId: 'degree-2' }
];

const dummySubjects = [
  { value: 'subject-2', label: 'Music Theory', courseId: 'course-2' }
];

const dummyStudents: Student[] = [
  {
    id: 'student-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://example.com/avatar1.jpg'
  },
  {
    id: 'student-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://example.com/avatar2.jpg'
  }
];

const dummySubmissions: (Submission & { student: Student, assessment: Assessment })[] = [
  {
    id: 'submission-1',
    studentId: 'student-1',
    assessmentId: '1',
    files: [
      { 
        name: 'assignment1.pdf', 
        url: 'https://example.com/files/assignment1.pdf',
        size: 1024576
      }
    ],
    submittedAt: '2025-04-13T10:00:00Z',
    status: 'graded',
    student: dummyStudents[0],
    assessment: {
      id: 1,
      title: 'Music Theory Quiz 1',
      type: 'Quiz',
      dueDate: '2025-05-01',
      totalScore: 100,
      courseId: 'course-2',
      subjectId: 'subject-2',
      degreeId: 'degree-2',
      details: {
        description: 'Basic music notation quiz',
        criteria: [
          {
            name: 'Note Recognition',
            percentage: 50,
            description: 'Ability to identify notes on staff'
          },
          {
            name: 'Rhythm Reading',
            percentage: 50,
            description: 'Understanding of basic rhythm patterns'
          }
        ]
      },
      submissions: [],
      grades: [{
        studentId: 'student-1',
        score: 85,
        feedback: 'Good understanding of basic concepts. Need improvement in rhythm patterns.',
        submittedAt: '2025-04-14T09:00:00Z'
      }]
    }
  },
  {
    id: 'submission-2',
    studentId: 'student-2',
    assessmentId: '1',
    files: [
      { 
        name: 'assignment2.pdf', 
        url: 'https://example.com/files/assignment2.pdf',
        size: 2048576
      }
    ],
    submittedAt: '2025-04-13T11:00:00Z',
    status: 'pending',
    student: dummyStudents[1],
    assessment: {
      id: 1,
      title: 'Music Theory Quiz 1',
      type: 'Quiz',
      dueDate: '2025-05-01',
      totalScore: 100,
      courseId: 'course-2',
      subjectId: 'subject-2',
      degreeId: 'degree-2',
      details: {
        description: 'Basic music notation quiz',
        criteria: [
          {
            name: 'Note Recognition',
            percentage: 50,
            description: 'Ability to identify notes on staff'
          },
          {
            name: 'Rhythm Reading',
            percentage: 50,
            description: 'Understanding of basic rhythm patterns'
          }
        ]
      },
      submissions: [],
      grades: []
    }
  }
];

// Add this helper function at the top of your component
const formatScore = (score: number, total: number) => {
  const percentage = (score / total) * 100;
  return `${score}/${total} (${percentage.toFixed(1)}%)`;
};

export const SharedAssessmentSubmissions = ({ currentUser }: { currentUser: User }) => {
    const isTeacher = currentUser.user_role === 'teacher';
  const [submissions] = useState(dummySubmissions);
  const [selectedSubmission, setSelectedSubmission] = useState<typeof dummySubmissions[0] | null>(null);
  const [showGradingModal, setShowGradingModal] = useState(false);
  const [grade, setGrade] = useState<Grade | null>(null);
  const [filterDegree, setFilterDegree] = useState<string>('');
  const [filterCourse, setFilterCourse] = useState<string>('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });

  const handleGradeSubmission = (submission: typeof dummySubmissions[0]) => {
    setSelectedSubmission(submission);
    setGrade({
      studentId: submission.studentId,
      assessmentId: submission.assessmentId,
      score: 0,
      feedback: '',
      submittedAt: new Date().toISOString()
    });
    setShowGradingModal(true);
  };

  const handleSubmitGrade = () => {
    if (!grade || !selectedSubmission) return;

    // Here you would normally save to backend
    notifications.show({
      title: 'Success',
      message: 'Grade submitted successfully',
      color: 'green'
    });
    setShowGradingModal(false);
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(submission => {
      const matchesDegree = !filterDegree || submission.assessment.degreeId === filterDegree;
      const matchesCourse = !filterCourse || submission.assessment.courseId === filterCourse;
      const matchesSubject = !filterSubject || submission.assessment.subjectId === filterSubject;
      const matchesStatus = !filterStatus || submission.status === filterStatus;
      const matchesType = !filterType || submission.assessment.type === filterType;
      const matchesDate = !dateRange.start || !dateRange.end || (
        new Date(submission.submittedAt) >= new Date(dateRange.start) &&
        new Date(submission.submittedAt) <= new Date(dateRange.end)
      );
      return matchesDegree && matchesCourse && matchesSubject && matchesStatus && matchesType && matchesDate;
    });
  }, [submissions, filterDegree, filterCourse, filterSubject, filterStatus, filterType, dateRange]);

  const availableCourses = useMemo(() => {
    return dummyCourses.filter(course => !filterDegree || course.degreeId === filterDegree);
  }, [filterDegree]);

  const availableSubjects = useMemo(() => {
    return dummySubjects.filter(subject => !filterCourse || subject.courseId === filterCourse);
  }, [filterCourse]);

  const handleFilterChange = (type: string, value: string) => {
    try {
      switch (type) {
        case 'degree':
          setFilterDegree(value);
          setFilterCourse(''); // Reset dependent filters
          setFilterSubject('');
          break;
        case 'course':
          setFilterCourse(value);
          setFilterSubject(''); // Reset dependent filter
          break;
        case 'subject':
          setFilterSubject(value);
          break;
        case 'status':
          setFilterStatus(value);
          break;
        case 'type':
          setFilterType(value);
          break;
        default:
          throw new Error('Invalid filter type');
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to apply filter. Please try again.',
        color: 'red'
      });
    }
  };

  const renderFilters = () => (
    <Stack gap="md" mb="lg">
      <Group grow>
        <Select
          label="Degree Program"
          placeholder="All Degrees"
          value={filterDegree}
          data={[
            { value: '', label: 'All Degrees' },
            ...dummyDegrees
          ]}
          onChange={(value) => handleFilterChange('degree', value || '')}
        />

        <Select
          label="Course"
          placeholder="All Courses"
          value={filterCourse}
          data={[
            { value: '', label: 'All Courses' },
            ...availableCourses
          ]}
          onChange={(value) => handleFilterChange('course', value || '')}
          disabled={!filterDegree}
        />

        <Select
          label="Subject"
          placeholder="All Subjects"
          value={filterSubject}
          data={[
            { value: '', label: 'All Subjects' },
            ...availableSubjects
          ]}
          onChange={(value) => handleFilterChange('subject', value || '')}
          disabled={!filterCourse}
        />
      </Group>

      <Group grow>
        <Select
          label="Status"
          placeholder="All Statuses"
          value={filterStatus}
          data={[
            { value: '', label: 'All Statuses' },
            { value: 'pending', label: 'Pending' },
            { value: 'graded', label: 'Graded' }
          ]}
          onChange={(value) => handleFilterChange('status', value || '')}
        />

        <Select
          label="Assessment Type"
          placeholder="All Types"
          value={filterType}
          data={[
            { value: '', label: 'All Types' },
            { value: 'Quiz', label: 'Quiz' },
            { value: 'Assignment', label: 'Assignment' },
            { value: 'Midterm', label: 'Midterm' },
            { value: 'Final Exam', label: 'Final Exam' }
          ]}
          onChange={(value) => handleFilterChange('type', value || '')}
        />

        <Stack gap={3}>
          <Text size="sm" fw={500}>Submission Date Range</Text>
          <Group grow>
            <TextInput
              type="date"
              placeholder="Start date"
              value={dateRange.start}
              onChange={(e) => setDateRange(prev => ({
                ...prev,
                start: e.target.value
              }))}
            />
            <TextInput
              type="date"
              placeholder="End date"
              value={dateRange.end}
              onChange={(e) => setDateRange(prev => ({
                ...prev,
                end: e.target.value
              }))}
            />
          </Group>
        </Stack>
      </Group>
    </Stack>
  );

  const renderSubmissionDetails = () => (
    <Stack>
      <Card withBorder>
        <Group justify="space-between">
          <div>
            <Text fw={500}>{selectedSubmission?.student.name}</Text>
            <Text size="sm" c="dimmed">{selectedSubmission?.student.email}</Text>
          </div>
          <Badge>{selectedSubmission?.assessment.type}</Badge>
        </Group>
      </Card>

      <Card withBorder>
        <Title order={6}>Submitted Files</Title>
        <Stack mt="md">
          {selectedSubmission?.files.map((file, index) => (
            <Group key={index} justify="space-between">
              <Text size="sm">{file.name}</Text>
              <Group>
                {file.size && (
                  <Text size="xs" c="dimmed">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </Text>
                )}
                <Button
                  variant="light"
                  size="xs"
                  component="a"
                  href={file.url}
                  target="_blank"
                >
                  View
                </Button>
              </Group>
            </Group>
          ))}
        </Stack>
      </Card>

      {selectedSubmission?.status === 'graded' && selectedSubmission.assessment.grades[0] && (
        <Card withBorder>
          <Title order={6}>Grade Details</Title>
          <Stack mt="md">
            <Group justify="space-between">
              <Text fw={500}>Score:</Text>
              <Text 
                fw={500} 
                color={(selectedSubmission.assessment.grades[0].score / selectedSubmission.assessment.totalScore) >= 0.7 ? 'green' : 'red'}
              >
                {formatScore(selectedSubmission.assessment.grades[0].score, selectedSubmission.assessment.totalScore)}
              </Text>
            </Group>
            <div>
              <Text fw={500} mb="xs">Feedback:</Text>
              <Text size="sm">{selectedSubmission.assessment.grades[0].feedback}</Text>
            </div>
            <Text size="xs" c="dimmed" ta="right">
              Graded on: {new Date(selectedSubmission.assessment.grades[0].submittedAt).toLocaleString()}
            </Text>
          </Stack>
        </Card>
      )}

      <Card withBorder>
        <Title order={6}>Assessment Details</Title>
        <Stack mt="md">
          <Text fw={500}>{selectedSubmission?.assessment.title}</Text>
          <Text size="sm">{selectedSubmission?.assessment.details.description}</Text>
          
          <Title order={6} mt="md">Grading Criteria</Title>
          <div className="space-y-3">
            {selectedSubmission?.assessment.details.criteria.map((criterion, index) => (
              <Paper key={index} p="sm" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>{criterion.name}</Text>
                  <Badge>{criterion.percentage}%</Badge>
                </Group>
                <Text size="sm" color="dimmed">
                  {criterion.description}
                </Text>
              </Paper>
            ))}
          </div>
        </Stack>
      </Card>
    </Stack>
  );

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-gray-50">
        <HeaderAdmin title="Assessment Submissions" />
        
        <div className="p-8">
          <Paper p="md">
            <Title order={3} mb="lg">Pending Submissions</Title>
            
            {renderFilters()}

            <Text size="sm" c="dimmed" mb="md">
              Showing {filteredSubmissions.length} of {submissions.length} submissions
            </Text>
            
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Student</Table.Th>
                  <Table.Th>Assessment</Table.Th>
                  <Table.Th>Submitted</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Grade</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredSubmissions.map((submission) => (
                  <Table.Tr key={submission.id}>
                    <Table.Td>
                      <Group>
                        {submission.student.avatar && (
                          <img
                            src={submission.student.avatar}
                            alt={submission.student.name}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                        )}
                        <div>
                          <Text size="sm">{submission.student.name}</Text>
                          <Text size="xs" c="dimmed">{submission.student.email}</Text>
                        </div>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{submission.assessment.title}</Text>
                      <Badge size="sm" variant="light" color="blue">
                        {submission.assessment.type}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {new Date(submission.submittedAt).toLocaleString()}
                    </Table.Td>
                    <Table.Td>
                      <Badge 
                        color={submission.status === 'graded' ? 'green' : 'yellow'}
                      >
                        {submission.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      {submission.status === 'graded' && submission.assessment.grades[0] ? (
                        <Text 
                          fw={500} 
                          color={(submission.assessment.grades[0].score / submission.assessment.totalScore) >= 0.7 ? 'green' : 'red'}
                        >
                          {formatScore(submission.assessment.grades[0].score, submission.assessment.totalScore)}
                        </Text>
                      ) : (
                        <Text c="dimmed">Not graded</Text>
                      )}
                    </Table.Td>
                    <Table.Td>
                      <Group>
                        <ActionIcon
                          variant="subtle"
                          color="blue"
                          onClick={() => setSelectedSubmission(submission)}
                          title="View Details"
                        >
                          <IconEye size={16} />
                        </ActionIcon>
                        {submission.status !== 'graded' && (
                          <ActionIcon
                            variant="subtle"
                            color="green"
                            onClick={() => handleGradeSubmission(submission)}
                            title="Grade Submission"
                          >
                            <IconCheck size={16} />
                          </ActionIcon>
                        )}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>

          <Modal
            opened={!!selectedSubmission && !showGradingModal}
            onClose={() => setSelectedSubmission(null)}
            title="Submission Details"
            size="xl"
          >
            {selectedSubmission && renderSubmissionDetails()}
          </Modal>

          <Modal
            opened={showGradingModal}
            onClose={() => setShowGradingModal(false)}
            title="Grade Submission"
            size="lg"
          >
            {selectedSubmission && grade && (
              <Stack>
                <TextInput
                  label="Score"
                  type="number"
                  value={grade.score}
                  onChange={(e) => setGrade({
                    ...grade,
                    score: parseInt(e.target.value, 10)
                  })}
                  max={selectedSubmission.assessment.totalScore}
                  min={0}
                />

                <Textarea
                  label="Feedback"
                  value={grade.feedback}
                  onChange={(e) => setGrade({
                    ...grade,
                    feedback: e.target.value
                  })}
                  minRows={4}
                />

                <Group justify="flex-end">
                  <Button variant="subtle" onClick={() => setShowGradingModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmitGrade}>
                    Submit Grade
                  </Button>
                </Group>
              </Stack>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SharedAssessmentSubmissions;