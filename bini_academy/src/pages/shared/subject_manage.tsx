import { useState, useMemo } from 'react';
import { User } from "../../types";
import {
  Table,
  Button,
  Paper,
  TextInput,
  Textarea,
  Group,
  Text,
  ActionIcon,
  Tabs,
  Title,
  Stack,
  FileInput,
  Card,
  Modal,
  Select,
  NumberInput,
} from '@mantine/core';
import { Sidebar } from "../../components/sidebar";
import { HeaderAdmin } from "../../components/headeradmin";
import { UserRole } from "../../types";
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

const dummyComments = [
  {
    id: 'comment-1',
    userId: 'user-1',
    content: 'Great lecture! Very informative.',
    createdAt: '2025-04-13T10:00:00Z',
    userName: 'John Doe',
    userAvatar: 'https://example.com/avatar1.jpg'
  },
  {
    id: 'comment-2',
    userId: 'user-2',
    content: 'Could you explain more about the third point?',
    createdAt: '2025-04-13T11:30:00Z',
    userName: 'Jane Smith',
    userAvatar: 'https://example.com/avatar2.jpg'
  }
];

interface Degree {
  id: string;
  name: string;
  majors: Major[];
}

interface Major {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  title: string;
  description: string;
  lectureCount: number;
  duration: string;
  degreeId: string;
  majorId: string;
  sections: Section[];
  assessments: Assessment[];
}

interface Section {
  id: number;
  title: string;
  expanded: boolean;
  lectureCount: number;
  duration: string;
  lectures: Lecture[];
  resources: Resource[];
}

interface Lecture {
  id: number;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  lastUpdated: string;
  commentCount: number;
  studentCount: number;
  notes: {
    content: string;
    attachments: {
      id: string;
      name: string;
      url: string;
      type: string;
      size?: string;
    }[];
  };
  comments: {
    id: string;
    userId: string;
    content: string;
    createdAt: string;
  }[];
  attachments: {
    id: string;
    name: string;
    url: string;
    type: 'assignment' | 'quiz' | 'resource';
    dueDate?: string;
    submissions?: {
      studentId: string;
      submittedAt: string;
      files: {
        name: string;
        url: string;
        size: number;
      }[];
      status: 'submitted' | 'unsubmitted';
    }[];
  }[];
  completed: boolean;
  timeframe: {
    start: string;
    end: string;
  };
}

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'document';
  url: string;
  fileSize?: string;
}

interface Assessment {
  id: number;
  title: string;
  type: 'Quiz' | 'Assignment' | 'Midterm' | 'Final Exam';
  dueDate: string;
  totalScore: number;
  details: {
    description: string;
    criteria: {
      name: string;
      percentage: number;
      description: string;
    }[];
  };
  submissions: Submission[];
  grades: Grade[];
}

interface Grade {
  studentId: string;
  assessmentId: string;
  score: number;
  feedback: string;
  submittedAt: string;
}

interface Submission {
  id: string;
  studentId: string;
  assessmentId: string;
  files: { name: string; url: string }[];
  submittedAt: string;
  status: 'pending' | 'graded';
}

const dummyDegrees: Degree[] = [
  {
    id: 'degree-2',
    name: 'Bachelor of Arts in Music',
    majors: [
      { id: 'major-4', name: 'Vocal Performance' },
      { id: 'major-5', name: 'Composition' },
      { id: 'major-6', name: 'Instrumental Performance' }
    ]
  }
];

const dummySubjects: Subject[] = [
  {
    id: 'subject-1',
    title: 'Introduction to Music Theory',
    description: 'Basic concepts of music theory and notation',
    lectureCount: 2,
    duration: '3 months',
    degreeId: 'degree-2',
    majorId: 'major-4',
    sections: [
      {
        id: 1,
        title: 'Basic Notation',
        expanded: true,
        lectureCount: 2,
        duration: '2 weeks',
        lectures: [
          {
            id: 1,
            title: 'Notes and Staff',
            description: 'Learn about musical notation basics',
            duration: '45:00',
            videoUrl: 'https://example.com/video1',
            lastUpdated: '2025-05-01',
            commentCount: 0,
            studentCount: 0,
            notes: {
              content: 'Introduction to musical notation...',
              attachments: [
                {
                  id: 'note1',
                  name: 'Staff Notation Guide.pdf',
                  url: 'https://example.com/notes1.pdf',
                  type: 'pdf'
                }
              ]
            },
            comments: [],
            attachments: [
              {
                id: 'att1',
                name: 'Week 1 Assignment',
                url: 'https://example.com/assignment1',
                type: 'assignment',
                dueDate: '2025-05-08'
              },
              {
                id: 'att2',
                name: 'Notation Quiz',
                url: 'https://example.com/quiz1',
                type: 'quiz'
              }
            ],
            completed: false,
            timeframe: {
              start: '2025-05-01',
              end: '2025-05-07'
            }
          },
          {
            id: 2,
            title: 'Rhythm Basics',
            description: 'Understanding rhythm and time signatures',
            duration: '50:00',
            videoUrl: 'https://example.com/video2',
            lastUpdated: '2025-05-08',
            commentCount: 0,
            studentCount: 0,
            notes: {
              content: 'Understanding time signatures...',
              attachments: [
                {
                  id: 'note2',
                  name: 'Rhythm Patterns.pdf',
                  url: 'https://example.com/notes2.pdf',
                  type: 'pdf'
                }
              ]
            },
            comments: [],
            attachments: [
              {
                id: 'att3',
                name: 'Rhythm Practice',
                url: 'https://example.com/resource1',
                type: 'resource'
              }
            ],
            completed: false,
            timeframe: {
              start: '2025-05-08',
              end: '2025-05-14'
            }
          }
        ],
        resources: []
      }
    ],
    assessments: [
      {
        id: 1,
        title: 'Music Theory Quiz 1',
        type: 'Quiz',
        dueDate: '2025-05-01',
        totalScore: 100,
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
    ]
  }
];

// Add validation function
const validateCriteria = (criteria: Assessment['details']['criteria']) => {
  const total = criteria.reduce((sum, criterion) => sum + criterion.percentage, 0);
  return total === 100;
};



export const SharedSubjectManage = ({ currentUser }: { currentUser: User }) => {
  const [subjects, setSubjects] = useState<Subject[]>(dummySubjects); // Initialize with dummy data
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [degrees] = useState<Degree[]>(dummyDegrees);
  const [selectedDegree, setSelectedDegree] = useState<string>('');
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const [filterDegree, setFilterDegree] = useState<string>('');
  const [filterMajor, setFilterMajor] = useState<string>('');

  const availableMajors = useMemo(() => {
    const degree = degrees.find(d => d.id === selectedDegree);
    return degree?.majors || [];
  }, [degrees, selectedDegree]);

  const filteredSubjects = useMemo(() => {
    return subjects.filter(subject => {
      const matchesDegree = !filterDegree || subject.degreeId === filterDegree;
      const matchesMajor = !filterMajor || subject.majorId === filterMajor;
      return matchesDegree && matchesMajor;
    });
  }, [subjects, filterDegree, filterMajor]);

  const handleSectionUpdate = (sectionId: number, field: string, value: any) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === selectedSubject?.id) {
        return {
          ...subject,
          sections: subject.sections.map(section =>
            section.id === sectionId ? { ...section, [field]: value } : section
          )
        };
      }
      return subject;
    }));
  };

  const handleAddSection = () => {
    if (!selectedSubject) return;
    
    const newSection: Section = {
      id: Date.now(),
      title: 'New Section',
      expanded: true,
      lectureCount: 0,
      duration: '0:00',
      lectures: [],
      resources: []
    };

    const updatedSubject = {
      ...selectedSubject,
      sections: [...selectedSubject.sections, newSection]
    };

    setSelectedSubject(updatedSubject);
    setSubjects(subjects.map(s => 
      s.id === selectedSubject.id ? updatedSubject : s
    ));
  };

  const handleLectureUpdate = (sectionId: number, lectureId: number, field: string, value: any) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === selectedSubject?.id) {
        return {
          ...subject,
          sections: subject.sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                lectures: section.lectures.map(lecture =>
                  lecture.id === lectureId ? { ...lecture, [field]: value } : lecture
                )
              };
            }
            return section;
          })
        };
      }
      return subject;
    }));
  };

  const handleAddLecture = (sectionId: number) => {
    if (!selectedSubject) return;
    
    const newLecture: Lecture = {
      id: Date.now(),
      title: 'New Lecture',
      description: '',
      duration: '00:00',
      videoUrl: '',
      lastUpdated: new Date().toISOString(),
      commentCount: 0,
      studentCount: 0,
      notes: {
        content: '',
        attachments: []
      },
      comments: [],
      attachments: [],
      completed: false,
      timeframe: {
        start: '',
        end: ''
      }
    };

    const updatedSubject = {
      ...selectedSubject,
      sections: selectedSubject.sections.map(section =>
        section.id === sectionId
          ? { 
              ...section, 
              lectures: [...section.lectures, newLecture],
              lectureCount: section.lectures.length + 1
            }
          : section
      )
    };

    setSelectedSubject(updatedSubject);
    setSubjects(subjects.map(s => 
      s.id === selectedSubject.id ? updatedSubject : s
    ));
  };

  const handleDeleteLecture = (sectionId: number, lectureId: number) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === selectedSubject?.id) {
        return {
          ...subject,
          sections: subject.sections.map(section =>
            section.id === sectionId
              ? { 
                  ...section, 
                  lectures: section.lectures.filter(l => l.id !== lectureId),
                  lectureCount: section.lectures.length - 1
                }
              : section
          )
        };
      }
      return subject;
    }));
  };

  const handleDeleteSection = (sectionId: number) => {
    setSubjects(subjects.map(subject =>
      subject.id === selectedSubject?.id
        ? { ...subject, sections: subject.sections.filter(s => s.id !== sectionId) }
        : subject
    ));
  };

  const handleAssessmentClick = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setShowAssessmentModal(true);
  };

  const updateAssessment = (assessment: Assessment) => {
    if (!selectedSubject) return;
    
    const updatedSubject = {
      ...selectedSubject,
      assessments: selectedSubject.assessments.map(a =>
        a.id === assessment.id ? assessment : a
      )
    };
    setSelectedSubject(updatedSubject);
    setSubjects(subjects.map(s =>
      s.id === selectedSubject.id ? updatedSubject : s
    ));
  };

  const handleCriterionUpdate = (index: number, field: string, value: any) => {
    if (!selectedAssessment) return;

    const updatedCriteria = [...selectedAssessment.details.criteria];
    updatedCriteria[index] = { ...updatedCriteria[index], [field]: value };

    if (field === 'percentage' && validateCriteria(updatedCriteria)) {
      const updatedAssessment = {
        ...selectedAssessment,
        details: { ...selectedAssessment.details, criteria: updatedCriteria }
      };
      setSelectedAssessment(updatedAssessment);
      updateAssessment(updatedAssessment);
    } else if (field !== 'percentage') {
      const updatedAssessment = {
        ...selectedAssessment,
        details: { ...selectedAssessment.details, criteria: updatedCriteria }
      };
      setSelectedAssessment(updatedAssessment);
      updateAssessment(updatedAssessment);
    } else {
      notifications.show({
        title: 'Error',
        message: 'Total percentage must equal 100%',
        color: 'red'
      });
    }
  };

  const addCriterion = () => {
    if (!selectedAssessment) return;

    const newCriterion = {
      name: '',
      percentage: 0,
      description: ''
    };

    const updatedAssessment = {
      ...selectedAssessment,
      details: {
        ...selectedAssessment.details,
        criteria: [...selectedAssessment.details.criteria, newCriterion]
      }
    };
    setSelectedAssessment(updatedAssessment);
    updateAssessment(updatedAssessment);
  };

  const removeCriterion = (index: number) => {
    if (!selectedAssessment) return;

    const updatedAssessment = {
      ...selectedAssessment,
      details: {
        ...selectedAssessment.details,
        criteria: selectedAssessment.details.criteria.filter((_, i) => i !== index)
      }
    };
    setSelectedAssessment(updatedAssessment);
    updateAssessment(updatedAssessment);
  };

  const handleRemoveNoteAttachment = (sectionId: number, lectureId: number, attachmentId: string) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === selectedSubject?.id) {
        return {
          ...subject,
          sections: subject.sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                lectures: section.lectures.map(lecture => {
                  if (lecture.id === lectureId) {
                    return {
                      ...lecture,
                      notes: {
                        ...lecture.notes,
                        attachments: lecture.notes.attachments.filter(att => att.id !== attachmentId)
                      }
                    };
                  }
                  return lecture;
                })
              };
            }
            return section;
          })
        };
      }
      return subject;
    }));
  };

  const handleAttachmentUpdate = (sectionId: number, lectureId: number, attachmentIndex: number, field: string, value: any) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === selectedSubject?.id) {
        return {
          ...subject,
          sections: subject.sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                lectures: section.lectures.map(lecture => {
                  if (lecture.id === lectureId) {
                    const updatedAttachments = [...lecture.attachments];
                    updatedAttachments[attachmentIndex] = {
                      ...updatedAttachments[attachmentIndex],
                      [field]: value
                    };
                    return { ...lecture, attachments: updatedAttachments };
                  }
                  return lecture;
                })
              };
            }
            return section;
          })
        };
      }
      return subject;
    }));
  };

  const handleRemoveAttachment = (sectionId: number, lectureId: number, attachmentId: string) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === selectedSubject?.id) {
        return {
          ...subject,
          sections: subject.sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                lectures: section.lectures.map(lecture => {
                  if (lecture.id === lectureId) {
                    return {
                      ...lecture,
                      attachments: lecture.attachments.filter(a => a.id !== attachmentId)
                    };
                  }
                  return lecture;
                })
              };
            }
            return section;
          })
        };
      }
      return subject;
    }));
  };

  const handleAddAttachment = (sectionId: number, lectureId: number) => {
    const newAttachment = {
      id: `att-${Date.now()}`,
      name: '',
      url: '',
      type: 'resource' as const,
    };

    handleLectureUpdate(
      sectionId,
      lectureId,
      'attachments',
      [...(subjects.find(s => s.id === selectedSubject?.id)
        ?.sections.find(s => s.id === sectionId)
        ?.lectures.find(l => l.id === lectureId)
        ?.attachments || []),
      newAttachment]
    );
  };

  const renderSectionsPanel = () => (
    <div>
      {selectedSubject?.sections.map((section) => (
        <Paper key={section.id} withBorder p="md" mb="sm">
          <Group justify="space-between">
            <TextInput
              value={section.title}
              onChange={(e) => handleSectionUpdate(section.id, 'title', e.target.value)}
              placeholder="Section Title"
              style={{ flex: 1 }}
            />
            <Button 
              color="red" 
              variant="subtle"
              leftSection={<IconTrash size={16} />}
              onClick={() => {
                const confirmDelete = window.confirm('Are you sure you want to delete this section?');
                if (confirmDelete) {
                  handleDeleteSection(section.id);
                  notifications.show({
                    title: 'Success',
                    message: 'Section deleted successfully',
                    color: 'green'
                  });
                }
              }}
            >
              Delete Section
            </Button>
          </Group>

          {/* Lectures list */}
          <Stack mt="md">
            {section.lectures.map((lecture) => (
              <Paper key={lecture.id} withBorder p="xs">
                <Tabs defaultValue="basic">
                  {/* ... existing tabs ... */}
                  <Tabs.Panel value="basic">
                    <Stack gap="md">
                      <Group justify="space-between">
                        <TextInput
                          value={lecture.title}
                          onChange={(e) => handleLectureUpdate(section.id, lecture.id, 'title', e.target.value)}
                          placeholder="Lecture Title"
                          style={{ flex: 1 }}
                        />
                        <Button 
                          color="red" 
                          variant="subtle"
                          leftSection={<IconTrash size={16} />}
                          onClick={() => handleDeleteLecture(section.id, lecture.id)}
                        >
                          Delete Lecture
                        </Button>
                      </Group>
                      
                      <Textarea
                        placeholder="Lecture Description"
                        value={lecture.description}
                        onChange={(e) => handleLectureUpdate(section.id, lecture.id, 'description', e.target.value)}
                        minRows={2}
                      />

                      <TextInput
                        type="time"
                        label="Duration"
                        value={lecture.duration}
                        onChange={(e) => handleLectureUpdate(section.id, lecture.id, 'duration', e.target.value)}
                      />
                    </Stack>
                  </Tabs.Panel>
                  
                  <Tabs.Panel value="comments">
                    <Stack gap="md">
                      {dummyComments.map((comment) => (
                        <Paper key={comment.id} p="sm" withBorder>
                          <Group gap="sm" mb="xs">
                            <img
                              src={comment.userAvatar}
                              alt={comment.userName}
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                objectFit: 'cover'
                              }}
                            />
                            <div>
                              <Text size="sm" fw={500}>{comment.userName}</Text>
                              <Text size="xs" c="dimmed">
                                {new Date(comment.createdAt).toLocaleString()}
                              </Text>
                            </div>
                          </Group>
                          <Text size="sm">{comment.content}</Text>
                        </Paper>
                      ))}
                    </Stack>
                  </Tabs.Panel>
                </Tabs>
              </Paper>
            ))}

            <Button
              leftSection={<IconPlus size={16} />}
              variant="light"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                handleAddLecture(section.id);
              }}
              fullWidth
            >
              Add New Lecture
            </Button>
          </Stack>
        </Paper>
      ))}

      <Button
        leftSection={<IconPlus size={16} />}
        onClick={(e) => {
          e.stopPropagation(); // Prevent event bubbling
          handleAddSection();
        }}
        fullWidth
        mt="md"
      >
        Add New Section
      </Button>
    </div>
  );

  const renderAssessmentsPanel = () => (
    <div>
      <Card shadow="sm" p="md" className="w-full mb-4">
        <Title order={5} className="mb-4">Assessments & Deadlines</Title>
        <div className="space-y-3">
          {selectedSubject?.assessments.map(assessment => (
            <div 
              key={assessment.id} 
              className="p-3 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <Group justify="space-between">
                <div style={{ flex: 1 }}>
                  <Text fw={500}>{assessment.title}</Text>
                  <Group gap="xs" className="mt-1">
                    <Text size="xs" className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                      {assessment.type}
                    </Text>
                    <Text size="xs" c="dimmed">Due: {assessment.dueDate}</Text>
                  </Group>
                </div>
                <Group>
                  <Button
                    variant="subtle"
                    color="blue"
                    onClick={() => handleAssessmentClick(assessment)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="subtle"
                    color="red"
                    onClick={() => {
                      const confirmed = window.confirm('Are you sure you want to delete this assessment?');
                      if (confirmed) {
                        const updatedSubject = {
                          ...selectedSubject,
                          assessments: selectedSubject.assessments.filter(a => a.id !== assessment.id)
                        };
                        setSelectedSubject(updatedSubject);
                        setSubjects(subjects.map(s =>
                          s.id === selectedSubject.id ? updatedSubject : s
                        ));
                        notifications.show({
                          title: 'Success',
                          message: 'Assessment deleted successfully',
                          color: 'green'
                        });
                      }
                    }}
                  >
                    Delete
                  </Button>
                </Group>
              </Group>
            </div>
          ))}
        </div>
      </Card>

      <Button
        leftSection={<IconPlus size={16} />}
        onClick={() => {
          const newAssessment: Assessment = {
            id: Date.now(),
            title: 'New Assessment',
            type: 'Quiz',
            dueDate: '',
            totalScore: 0,
            details: {
              description: '',
              criteria: []
            },
            submissions: [],
            grades: []
          };
          if (selectedSubject) {
            const updatedSubject = {
              ...selectedSubject,
              assessments: [...selectedSubject.assessments, newAssessment]
            };
            setSelectedSubject(updatedSubject);
            setSubjects(subjects.map(s =>
              s.id === selectedSubject.id ? updatedSubject : s
            ));
            handleAssessmentClick(newAssessment);
          }
        }}
      >
        Add New Assessment
      </Button>

      {/* Assessment Detail Modal */}
      <Modal
        opened={showAssessmentModal}
        onClose={() => setShowAssessmentModal(false)}
        title={selectedAssessment?.title || 'Assessment Details'}
        size="lg"
      >
        {selectedAssessment && (
          <Stack gap="md">
            <TextInput
              label="Assessment Title"
              value={selectedAssessment.title}
              onChange={(e) => {
                const updated = { ...selectedAssessment, title: e.target.value };
                setSelectedAssessment(updated);
                updateAssessment(updated);
              }}
            />

            <Select
              label="Assessment Type"
              value={selectedAssessment.type}
              data={[
                { value: 'Quiz', label: 'Quiz' },
                { value: 'Assignment', label: 'Assignment' },
                { value: 'Midterm', label: 'Midterm' },
                { value: 'Final Exam', label: 'Final Exam' }
              ]}
              onChange={(value) => {
                if (value && ['Quiz', 'Assignment', 'Midterm', 'Final Exam'].includes(value)) {
                  const updated = { ...selectedAssessment, type: value as Assessment['type'] };
                  setSelectedAssessment(updated);
                  updateAssessment(updated);
                }
              }}
            />

            <TextInput
              type="date"
              label="Due Date"
              value={selectedAssessment.dueDate}
              onChange={(e) => {
                const updated = { ...selectedAssessment, dueDate: e.target.value };
                setSelectedAssessment(updated);
                updateAssessment(updated);
              }}
            />

            <NumberInput
              label="Total Score"
              value={selectedAssessment.totalScore}
              onChange={(value) => {
                const updated = { ...selectedAssessment, totalScore: Number(value) };
                setSelectedAssessment(updated);
                updateAssessment(updated);
              }}
            />

            <Textarea
              label="Description"
              value={selectedAssessment.details.description}
              onChange={(e) => {
                const updated = {
                  ...selectedAssessment,
                  details: { ...selectedAssessment.details, description: e.target.value }
                };
                setSelectedAssessment(updated);
                updateAssessment(updated);
              }}
              minRows={3}
            />

            <div>
              <Text fw={500} mb="sm">Grading Criteria</Text>
              {selectedAssessment.details.criteria.map((criterion, index) => (
                <Paper key={index} p="sm" withBorder mb="sm">
                  <Group>
                    <TextInput
                      placeholder="Criterion name"
                      value={criterion.name}
                      onChange={(e) => handleCriterionUpdate(index, 'name', e.target.value)}
                      style={{ flex: 2 }}
                    />
                    <NumberInput
                      placeholder="%"
                      value={criterion.percentage}
                      onChange={(value) => handleCriterionUpdate(index, 'percentage', Number(value))}
                      min={0}
                      max={100}
                      style={{ width: 100 }}
                    />
                    <ActionIcon color="red" onClick={() => removeCriterion(index)}>
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                  <Textarea
                    placeholder="Criterion description"
                    value={criterion.description}
                    onChange={(e) => handleCriterionUpdate(index, 'description', e.target.value)}
                    mt="xs"
                  />
                </Paper>
              ))}
              <Button
                leftSection={<IconPlus size={16} />}
                variant="light"
                onClick={addCriterion}
                fullWidth
                mt="sm"
              >
                Add Criterion
              </Button>
            </div>
          </Stack>
        )}
      </Modal>
    </div>
  );

  const renderBasicInfo = () => (
    <Stack gap="md" mt="md">
      <Select
        label="Degree Program"
        placeholder="Select a degree"
        value={selectedSubject?.degreeId || selectedDegree}
        data={degrees.map(degree => ({
          value: degree.id,
          label: degree.name
        }))}
        onChange={(value) => {
          setSelectedDegree(value || '');
          setSelectedMajor(''); // Reset major when degree changes
          if (selectedSubject) {
            const updated = { 
              ...selectedSubject, 
              degreeId: value || '',
              majorId: '' 
            };
            setSelectedSubject(updated);
            setSubjects(subjects.map(s => 
              s.id === selectedSubject.id ? updated : s
            ));
          }
        }}
        required
      />

      <Select
        label="Major"
        placeholder="Select a major"
        value={selectedSubject?.majorId || selectedMajor}
        data={availableMajors.map(major => ({
          value: major.id,
          label: major.name
        }))}
        onChange={(value) => {
          setSelectedMajor(value || '');
          if (selectedSubject) {
            const updated = { 
              ...selectedSubject, 
              majorId: value || '' 
            };
            setSelectedSubject(updated);
            setSubjects(subjects.map(s => 
              s.id === selectedSubject.id ? updated : s
            ));
          }
        }}
        disabled={!selectedDegree}
        required
      />

      <TextInput
        label="Subject Title"
        value={selectedSubject?.title || ''}
        onChange={(e) => {
          if (selectedSubject) {
            const updated = { ...selectedSubject, title: e.target.value };
            setSelectedSubject(updated);
            setSubjects(subjects.map(s => 
              s.id === selectedSubject.id ? updated : s
            ));
          }
        }}
        required
      />
      
      <Textarea
        label="Description"
        value={selectedSubject?.description || ''}
        onChange={(e) => {
          if (selectedSubject) {
            const updated = { ...selectedSubject, description: e.target.value };
            setSelectedSubject(updated);
            setSubjects(subjects.map(s => 
              s.id === selectedSubject.id ? updated : s
            ));
          }
        }}
        minRows={3}
      />

      <TextInput
        label="Duration"
        value={selectedSubject?.duration || ''}
        onChange={(e) => {
          if (selectedSubject) {
            const updated = { ...selectedSubject, duration: e.target.value };
            setSelectedSubject(updated);
            setSubjects(subjects.map(s => 
              s.id === selectedSubject.id ? updated : s
            ));
          }
        }}
      />
    </Stack>
  );

  const renderFilters = () => (
    <Group mb="md">
      <Select
        label="Filter by Degree"
        placeholder="All Degrees"
        value={filterDegree}
        data={[
          { value: '', label: 'All Degrees' },
          ...degrees.map(degree => ({
            value: degree.id,
            label: degree.name
          }))
        ]}
        onChange={(value) => {
          setFilterDegree(value || '');
          setFilterMajor(''); // Reset major filter when degree changes
        }}
        style={{ width: 200 }}
      />

      <Select
        label="Filter by Major"
        placeholder="All Majors"
        value={filterMajor}
        data={[
          { value: '', label: 'All Majors' },
          ...(filterDegree 
            ? degrees.find(d => d.id === filterDegree)?.majors || []
            : degrees.flatMap(d => d.majors)
          ).map(major => ({
            value: major.id,
            label: major.name
          }))
        ]}
        onChange={(value) => setFilterMajor(value || '')}
        disabled={!filterDegree}
        style={{ width: 200 }}
      />
    </Group>
  );

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-gray-50">
        <HeaderAdmin title="Subject Management" />

        <div className="p-8">
          <Group justify="space-between" mb="xl">
          
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={() => {
                const newSubject: Subject = {
                  id: `subject-${Date.now()}`,
                  title: 'New Subject',
                  description: '',
                  lectureCount: 0,
                  duration: '',
                  degreeId: '',
                  majorId: '',
                  sections: [],
                  assessments: []
                };
                setSubjects([...subjects, newSubject]);
                setSelectedSubject(newSubject);
                setActiveTab('info');
              }}
            >
              Add New Subject
            </Button>
          </Group>

          <Paper p="md" mb="xl">
            {renderFilters()}
            <Text size="sm" c="dimmed" mb="sm">
              Showing {filteredSubjects.length} of {subjects.length} subjects
            </Text>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Title</Table.Th>
                  <Table.Th>Degree</Table.Th>
                  <Table.Th>Major</Table.Th>
                  <Table.Th>Duration</Table.Th>
                  <Table.Th>Lectures</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filteredSubjects.map((subject) => (
                  <Table.Tr 
                    key={subject.id}
                    style={{ 
                      cursor: 'pointer',
                      backgroundColor: selectedSubject?.id === subject.id ? '#f0f0f0' : undefined 
                    }}
                    onClick={() => {
                      setSelectedSubject(subject);
                      setSelectedDegree(subject.degreeId);
                      setSelectedMajor(subject.majorId);
                      setActiveTab('info');
                    }}
                  >
                    <Table.Td>{subject.title}</Table.Td>
                    <Table.Td>
                      {degrees.find(d => d.id === subject.degreeId)?.name}
                    </Table.Td>
                    <Table.Td>
                      {availableMajors.find(m => m.id === subject.majorId)?.name}
                    </Table.Td>
                    <Table.Td>{subject.duration}</Table.Td>
                    <Table.Td>{subject.lectureCount} lectures</Table.Td>
                    <Table.Td>
                      <Group>
                        <ActionIcon 
                          variant="subtle" 
                          color="blue"
                          onClick={() => {
                            setSelectedSubject(subject);
                            setActiveTab('info');
                          }}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon 
                          variant="subtle" 
                          color="red"
                          onClick={() => {
                            setSubjects(subjects.filter(s => s.id !== subject.id));
                            notifications.show({
                              title: 'Success',
                              message: 'Subject deleted successfully',
                              color: 'green'
                            });
                          }}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>

          {/* Subject Editor Tabs */}
          {selectedSubject && (
            <Paper p="md">
              <Text size="xl" fw={500} mb="md">
                Editing: {selectedSubject.title}
              </Text>
              
              <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                  <Tabs.Tab value="info">Basic Info</Tabs.Tab>
                  <Tabs.Tab value="sections">Sections</Tabs.Tab>
                  <Tabs.Tab value="assessments">Assessments</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="info">
                  {renderBasicInfo()}
                </Tabs.Panel>

                <Tabs.Panel value="sections">
                  {renderSectionsPanel()}
                </Tabs.Panel>

                <Tabs.Panel value="assessments">
                  {renderAssessmentsPanel()}
                </Tabs.Panel>
              </Tabs>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedSubjectManage;
