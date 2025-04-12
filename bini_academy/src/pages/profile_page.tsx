import { useState, useEffect } from 'react';
import { Tabs, Container, Paper, Avatar, Text, Group, Button, FileInput, Select, Menu, ActionIcon, Badge, Modal, TextInput, Textarea } from '@mantine/core';
import { IconUser, IconSchool, IconClipboardList, IconSettings, IconUpload, IconFilter, IconExternalLink, IconMail, IconCheck, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { HomeHeader } from '../components/homeheader';
import { Footer } from '../components/footer';
import { SettingsForm } from '../components/settings_form';
import { notifications } from '@mantine/notifications';

interface Subject {
  id: string;
  name: string;
  grade: number;
  teacher: string;
  semester: string;
  progress: number; // Add progress field
}

interface Assignment {
  submitted: any;
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
}

interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  profilePic: string;
  courses: string[];
  major: string;
  bio?: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  degree: string;
  currentSemester: string;
  profilePic?: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  status: 'upcoming' | 'completed';
  performanceSubmitted?: boolean;
  recording?: string;
}

interface EmailModalProps {
  teacher: Teacher;
  opened: boolean;
  onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ teacher, opened, onClose }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = () => {
    const mailtoLink = `mailto:${teacher.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Message ${teacher.name}`}
      size="md"
    >
      <div className="space-y-4">
        <TextInput
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.currentTarget.value)}
          placeholder="Enter email subject"
          required
        />
        <Textarea
          label="Message"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="Type your message here..."
          minRows={4}
          required
        />
        <Group justify="flex-end">
          <Button variant="light" onClick={onClose}>Cancel</Button>
          <Button 
            color="blue" 
            onClick={handleSendEmail}
            disabled={!subject || !message}
          >
            Send Email
          </Button>
        </Group>
      </div>
    </Modal>
  );
};

const TeacherProfileModal: React.FC<{
  teacher: Teacher;
  opened: boolean;
  onClose: () => void;
  onEmailClick: () => void;
}> = ({ teacher, opened, onClose, onEmailClick }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Teacher Profile"
      size="lg"
    >
      <div className="space-y-6">
        <Group>
          <Avatar src={teacher.profilePic} size={120} />
          <div>
            <Text size="xl" fw={700}>{teacher.name}</Text>
            <Text size="sm" c="dimmed">{teacher.email}</Text>
            <Badge color="blue" variant="light" mt={4}>{teacher.major}</Badge>
          </div>
        </Group>

        {teacher.bio && (
          <div>
            <Text fw={500} size="sm" mb={2}>About</Text>
            <Text size="sm" c="dimmed">{teacher.bio}</Text>
          </div>
        )}

        <div>
          <Text fw={500} size="sm" mb={2}>Courses</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {teacher.courses.map((course, index) => (
              <Paper key={index} p="xs" withBorder>
                <Text size="sm">{course}</Text>
              </Paper>
            ))}
          </div>
        </div>

        <Group justify="flex-end">
          <Button 
            variant="light" 
            leftSection={<IconMail size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              onEmailClick();
            }}
          >
            Send Email
          </Button>
        </Group>
      </div>
    </Modal>
  );
};

export const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicUrl, setProfilePicUrl] = useState<string | undefined>("https://placekitten.com/200/200");
  const [assignmentFilter, setAssignmentFilter] = useState<'all' | 'missing' | 'pending' | 'graded'>('all');
  const [eventFilter, setEventFilter] = useState<'upcoming' | 'past' | 'all'>('all');
  const [selectedSemester, setSelectedSemester] = useState('1st Semester 2025');
  const [emailModalOpened, setEmailModalOpened] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [teacherProfileModalOpened, setTeacherProfileModalOpened] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Mock data - replace with actual data from your backend
  const subjects: Subject[] = [
    { 
      id: '1', 
      name: 'Music Theory I', 
      grade: 95, 
      teacher: 'John Doe', 
      semester: '1st Semester 2025',
      progress: 80 // Add progress percentage
    },
    { 
      id: '2', 
      name: 'Piano Performance', 
      grade: 88, 
      teacher: 'Jane Smith', 
      semester: '1st Semester 2025',
      progress: 65
    },
  ];

  const assignments: Assignment[] = [
    {
        id: '1',
        title: 'Theory Fundamentals Quiz',
        subject: 'Music Theory I',
        dueDate: '2025-04-15',
        status: 'graded',
        score: 95,
        submitted: undefined
    },
    // Add more assignments...
  ];

  const teachers: Teacher[] = [
    {
      id: '1',
      name: 'John Doe',
      subject: 'Music Theory I',
      email: 'john.doe@example.com',
      profilePic: 'https://placekitten.com/100/100',
      major: 'Music Theory',
      courses: [
        'Music Theory I',
        'Advanced Harmony',
        'Composition Basics',
        'Ear Training'
      ],
      bio: 'Dr. John Doe has over 15 years of experience teaching music theory and composition...'
    },
    // Add more teachers...
  ];

  // Add user profile data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'student@example.com',
    degree: 'Bachelor of Music',
    currentSemester: '1st Semester 2025',
    profilePic: undefined
  });

  // Add dummy user data
  const currentUserData = {
    firstName: 'John',
    lastName: 'Doe',
    dob: '2000-01-01',
    gender: 'Male',
    phone: '+1234567890',
    address: '123 Music Street, Harmony City',
    email: 'student@example.com',
  };

  // Add mock events data
  const events: Event[] = [
    {
      id: '1',
      title: 'Student Recital Showcase',
      date: '2025-05-20',
      category: 'Performance',
      status: 'upcoming',
      performanceSubmitted: true
    },
    {
      id: '2',
      title: 'Jazz Ensemble Masterclass',
      date: '2025-04-01',
      category: 'Workshop',
      status: 'completed',
      recording: 'recording_url_here'
    }
  ];

  const handleSettingsSubmit = async (values: any) => {
    try {
      // Show loading notification
      const notificationId = notifications.show({
        loading: true,
        title: 'Saving changes',
        message: 'Please wait while we update your profile...',
        autoClose: false,
        withCloseButton: false,
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update local state
      setUserProfile(prev => ({
        ...prev,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      }));

      // Update loading notification with success
      notifications.update({
        id: notificationId,
        title: 'Success',
        message: 'Your profile has been updated successfully',
        color: 'green',
        loading: false,
        autoClose: 3000,
        icon: <IconCheck size={16} />,
      });

    } catch (error) {
      // Show error notification
      notifications.show({
        title: 'Error',
        message: 'Failed to update profile. Please try again.',
        color: 'red',
        icon: <IconX size={16} />,
      });
    }
  };

  const handleProfilePicChange = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setProfilePic(file);
      setProfilePicUrl(url);

      // Show success notification for profile picture update
      notifications.show({
        title: 'Profile Picture Updated',
        message: 'Your profile picture has been changed successfully',
        color: 'green',
        icon: <IconCheck size={16} />,
      });
    }
  };

  useEffect(() => {
    return () => {
      if (profilePicUrl && profilePicUrl.startsWith('blob:')) {
        URL.revokeObjectURL(profilePicUrl);
      }
    };
  }, [profilePicUrl]);

  // Group subjects by semester
  const groupedSubjects = subjects.reduce((acc, subject) => {
    if (!acc[subject.semester]) {
      acc[subject.semester] = [];
    }
    acc[subject.semester].push(subject);
    return acc;
  }, {} as Record<string, Subject[]>);

  // Filter assignments based on selected filter
  const filteredAssignments = assignments.filter(assignment => {
    switch (assignmentFilter) {
      case 'missing':
        return !assignment.submitted && new Date(assignment.dueDate) < new Date();
      case 'pending':
        return assignment.status === 'pending';
      case 'graded':
        return assignment.status === 'graded';
      default:
        return true;
    }
  });

  // Filter events based on selected filter
  const filteredEvents = events.filter(event => {
    switch (eventFilter) {
      case 'upcoming':
        return event.status === 'upcoming';
      case 'past':
        return event.status === 'completed';
      default:
        return true;
    }
  });

  // Update the main container structure
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <HomeHeader />
      
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Paper shadow="sm" radius="md" p="md">
            {/* Profile Header */}
            <Group className="mb-6 flex-col sm:flex-row">
              <Avatar size={120} src={profilePicUrl} className="mx-auto sm:mx-0" />
              <div className="text-center sm:text-left mt-4 sm:mt-0">
                <Text size="xl" fw={700}>{userProfile.firstName} {userProfile.lastName}</Text>
                <Text size="sm" c="dimmed">{userProfile.email}</Text>
                <Group gap="xs" mt={4} className="justify-center sm:justify-start">
                  <Text size="sm" fw={500}>{userProfile.degree}</Text>
                  <Text size="sm" c="dimmed">•</Text>
                  <Text size="sm" c="dimmed">{userProfile.currentSemester}</Text>
                </Group>
              </div>
            </Group>

            {/* Update Tabs container */}
            <Tabs value={activeTab} onChange={(value) => value && setActiveTab(value)}>
              <Tabs.List className="overflow-x-auto">
                <Tabs.Tab value="dashboard" leftSection={<IconClipboardList size={16} />}>
                  Dashboard
                </Tabs.Tab>
                <Tabs.Tab value="grades" leftSection={<IconSchool size={16} />}>
                  Grades
                </Tabs.Tab>
                <Tabs.Tab value="teachers" leftSection={<IconUser size={16} />}>
                  Teachers
                </Tabs.Tab>
                <Tabs.Tab value="settings" leftSection={<IconSettings size={16} />}>
                  Settings
                </Tabs.Tab>
              </Tabs.List>

              {/* Update tab panels with responsive grids */}
              <Tabs.Panel value="dashboard" pt="xl">
                <div className="space-y-6">
                  {/* Assignments Section */}
                  <div>
                    <Group justify="space-between" className="mb-4 flex-col sm:flex-row">
                      <Text fw={700} size="lg">Recent Assignments & Quizzes</Text>
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <Button variant="light" leftSection={<IconFilter size={16} />}>
                            {assignmentFilter.charAt(0).toUpperCase() + assignmentFilter.slice(1)}
                          </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item onClick={() => setAssignmentFilter('all')}>All</Menu.Item>
                          <Menu.Item onClick={() => setAssignmentFilter('missing')}>Missing</Menu.Item>
                          <Menu.Item onClick={() => setAssignmentFilter('pending')}>Pending</Menu.Item>
                          <Menu.Item onClick={() => setAssignmentFilter('graded')}>Graded</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                    <div className="grid gap-4">
                      {filteredAssignments.map(assignment => (
                        <Paper 
                          key={assignment.id} 
                          p="md" 
                          withBorder 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => navigate(`/subject/${assignment.subject.toLowerCase().replace(' ', '-')}`)}
                        >
                          <Group justify="apart">
                            <div>
                              <Group gap="xs">
                                <Text fw={500}>{assignment.title}</Text>
                                <ActionIcon 
                                  size="sm" 
                                  variant="subtle"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/subject/${assignment.subject.toLowerCase().replace(' ', '-')}`);
                                  }}
                                >
                                  <IconExternalLink size={16} />
                                </ActionIcon>
                              </Group>
                              <Text size="sm" c="dimmed">{assignment.subject}</Text>
                            </div>
                            <div className="text-right">
                              <Text size="sm">Due: {new Date(assignment.dueDate).toLocaleDateString()}</Text>
                              <Text 
                                size="sm" 
                                c={assignment.status === 'graded' ? 'green' : 'orange'}
                              >
                                {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                                {assignment.score ? ` - ${assignment.score}` : ''}
                              </Text>
                            </div>
                          </Group>
                        </Paper>
                      ))}
                    </div>
                  </div>

                  {/* Events Section */}
                  <div>
                    <Group justify="space-between" className="mb-4 flex-col sm:flex-row">
                      <Text fw={700} size="lg">My Events</Text>
                      <Menu shadow="md" width={200}>
                        <Menu.Target>
                          <Button variant="light" leftSection={<IconFilter size={16} />}>
                            {eventFilter.charAt(0).toUpperCase() + eventFilter.slice(1)}
                          </Button>
                        </Menu.Target>

                        <Menu.Dropdown>
                          <Menu.Item onClick={() => setEventFilter('all')}>All Events</Menu.Item>
                          <Menu.Item onClick={() => setEventFilter('upcoming')}>Upcoming</Menu.Item>
                          <Menu.Item onClick={() => setEventFilter('past')}>Past Events</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                    <div className="grid gap-4">
                      {filteredEvents.map(event => (
                        <Paper 
                          key={event.id} 
                          p="md" 
                          withBorder 
                          className="cursor-pointer hover:bg-gray-50"
                          onClick={() => navigate(`/events/${event.id}`)}
                        >
                          <Group justify="apart">
                            <div>
                              <Group gap="xs">
                                <Text fw={500}>{event.title}</Text>
                                <Badge 
                                  color={event.status === 'upcoming' ? 'blue' : 'green'}
                                  variant="light"
                                >
                                  {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                                </Badge>
                              </Group>
                              <Group gap="xs" mt={4}>
                                <Text size="sm" c="dimmed">
                                  {new Date(event.date).toLocaleDateString()}
                                </Text>
                                <Text size="sm" c="dimmed">•</Text>
                                <Text size="sm" c="dimmed">{event.category}</Text>
                              </Group>
                            </div>
                            <div className="text-right">
                              {event.status === 'upcoming' && event.category === 'Performance' && (
                                <Badge 
                                  color={event.performanceSubmitted ? 'green' : 'yellow'}
                                  variant="light"
                                >
                                  {event.performanceSubmitted ? 'Video Submitted' : 'Video Required'}
                                </Badge>
                              )}
                              {event.status === 'completed' && event.recording && (
                                <Button
                                  variant="light"
                                  size="xs"
                                  leftSection={<IconExternalLink size={14} />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(event.recording, '_blank');
                                  }}
                                >
                                  View Recording
                                </Button>
                              )}
                            </div>
                          </Group>
                        </Paper>
                      ))}
                    </div>
                  </div>
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="grades" pt="xl">
                <Group justify="space-between" mb="xl" className="flex-col sm:flex-row">
                  <Text fw={700} size="lg">My Grades</Text>
                  <Select
                    value={selectedSemester}
                    onChange={(value) => value && setSelectedSemester(value)}
                    data={Array.from(new Set(subjects.map(s => s.semester)))}
                    placeholder="Select semester"
                    className="w-full sm:w-[200px]"
                  />
                </Group>
                <div className="grid gap-4">
                  {subjects
                    .filter(subject => subject.semester === selectedSemester)
                    .map(subject => (
                      <Paper 
                        key={subject.id} 
                        p="md" 
                        withBorder 
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => navigate(`/subject/${subject.name.toLowerCase().replace(' ', '-')}`)}
                      >
                        <Group justify="space-between" mb={12}>
                          <div>
                            <Group gap="xs">
                              <Text fw={500}>{subject.name}</Text>
                              <ActionIcon 
                                size="sm" 
                                variant="subtle"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/subject/${subject.name.toLowerCase().replace(' ', '-')}`);
                                }}
                              >
                                <IconExternalLink size={16} />
                              </ActionIcon>
                            </Group>
                            <Text size="sm" c="dimmed">Teacher: {subject.teacher}</Text>
                          </div>
                          <Text fw={700} size="lg" c={subject.grade >= 75 ? 'green' : 'red'}>
                            {subject.grade}
                          </Text>
                        </Group>
                        
                        <div>
                          <Group justify="space-between" mb={4}>
                            <Text size="sm">Course Progress</Text>
                            <Text size="sm" c="dimmed">{subject.progress}%</Text>
                          </Group>
                          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-blue-500 h-full transition-all duration-300"
                              style={{ width: `${subject.progress}%` }}
                            />
                          </div>
                        </div>
                      </Paper>
                    ))}
                </div>
              </Tabs.Panel>

              <Tabs.Panel value="teachers" pt="xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {teachers.map(teacher => (
                    <Paper 
                      key={teacher.id} 
                      p="md" 
                      withBorder
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setSelectedTeacher(teacher);
                        setShowProfileModal(true);
                      }}
                    >
                      <Group>
                        <Avatar src={teacher.profilePic} size="lg" />
                        <div className="flex-grow">
                          <Text fw={500}>{teacher.name}</Text>
                          <Text size="sm">{teacher.subject}</Text>
                          <Text size="sm" c="dimmed">{teacher.email}</Text>
                        </div>
                        <ActionIcon 
                          variant="light" 
                          color="blue"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTeacher(teacher);
                            setShowEmailModal(true);
                          }}
                        >
                          <IconMail size={16} />
                        </ActionIcon>
                      </Group>
                    </Paper>
                  ))}
                </div>

                {/* Email Modal */}
                {selectedTeacher && (
                  <EmailModal
                    teacher={selectedTeacher}
                    opened={showEmailModal}
                    onClose={() => {
                      setShowEmailModal(false);
                      setSelectedTeacher(null);
                    }}
                  />
                )}

                {/* Teacher Profile Modal */}
                {selectedTeacher && (
                  <TeacherProfileModal
                    teacher={selectedTeacher}
                    opened={showProfileModal}
                    onClose={() => {
                      setShowProfileModal(false);
                      setSelectedTeacher(null);
                    }}
                    onEmailClick={() => {
                      setShowProfileModal(false);
                      setShowEmailModal(true);
                    }}
                  />
                )}
              </Tabs.Panel>

              <Tabs.Panel value="settings" pt="xl">
                <div className="max-w-3xl mx-auto">
                  <Text size="xl" fw={700} className="mb-6">Account Settings</Text>
                  
                  <Paper shadow="xs" p="md" className="mb-6">
                    <Text fw={500} size="sm" className="mb-4">Profile Picture</Text>
                    <Group>
                      <Avatar size={100} src={profilePicUrl} />
                      <div>
                        <FileInput
                          placeholder="Change profile picture"
                          accept="image/*"
                          onChange={handleProfilePicChange}
                          leftSection={<IconUpload size={16} />}
                          size="sm"
                        />
                        <Text size="xs" c="dimmed" mt={8}>
                          Recommended: Square image, at least 200x200px
                        </Text>
                      </div>
                    </Group>
                  </Paper>

                  <SettingsForm 
                    initialData={currentUserData}
                    onSubmit={handleSettingsSubmit}
                  />
                </div>
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </div>
      </main>

      <Footer />

      {selectedTeacher && (
        <TeacherProfileModal
          teacher={selectedTeacher}
          opened={teacherProfileModalOpened}
          onClose={() => setTeacherProfileModalOpened(false)}
          onEmailClick={() => {
            setTeacherProfileModalOpened(false);
            setEmailModalOpened(true);
          }}
        />
      )}

      {selectedTeacher && (
        <EmailModal
          teacher={selectedTeacher}
          opened={emailModalOpened}
          onClose={() => setEmailModalOpened(false)}
        />
      )}
    </div>
  );
};