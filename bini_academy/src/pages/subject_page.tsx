import React, { useState } from 'react';
import {
  ActionIcon,
  Button,
  Card,
  Divider,
  FileButton,
  Group,
  Text,
  Title,
  Modal,
  Alert
} from '@mantine/core';
import {
  IconArrowLeft,
  IconDownload,
  IconFileUpload,
} from '@tabler/icons-react';
import { HomeHeader } from "../components/homeheader";
import { Footer } from "../components/footer";
import { CourseStructure } from '../components/course_structure';
import { useNavigate } from 'react-router-dom';

// Types
interface Lecture {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

interface Section {
  id: number;
  title: string;
  expanded: boolean;
  lectureCount: number;
  duration: string;
  lectures: Lecture[];
  progress: number;
}

interface AssessmentDetails {
  description: string;
  criteria: {
    name: string;
    percentage: number;
    description: string;
  }[];
}

interface Assessment {
  id: number;
  title: string;
  type: 'Quiz' | 'Assignment' | 'Midterm' | 'Final Exam';
  dueDate: string;
  totalScore: number;
  score?: number;
  submitted?: boolean;
  submittedAt?: Date;
  completed: boolean;
  details: AssessmentDetails;
}

interface ActiveLecture {
  id: number;
  title: string;
  videoUrl: string;
  notes: string;
  sectionId: number;
}

const SubjectPage: React.FC = () => {
  const navigate = useNavigate();
  // State for file upload
  const [file, setFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<'description' | 'lectureNotes' | 'attachFile' | 'comments'>('lectureNotes');
  const [activeLecture, setActiveLecture] = useState<ActiveLecture>({
    id: 101,
    title: "Introduction to Music Theory",
    videoUrl: "https://www.youtube.com/embed/_L70tC-YRb4",
    notes: `Stage fright is a common challenge for performers...`, // Your existing notes content
    sectionId: 1
  });
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);

  // Add new state for submission preview
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Mock data for sections
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      title: "Getting Started",
      expanded: true,
      lectureCount: 4,
      duration: "51m",
      progress: 25,
      lectures: [
        { id: 101, title: "Introduction to Music Theory", duration: "07:31", completed: true },
        { id: 102, title: "Understanding Musical Notation", duration: "07:31", completed: false },
        { id: 103, title: "Basic Rhythm Concepts", duration: "07:31", completed: false },
        { id: 104, title: "Pitch and Scales Overview", duration: "07:31", completed: false }
      ]
    },
    {
      id: 2,
      title: "Part 1: The Foundations of Stage Presence",
      expanded: false,
      lectureCount: 6,
      duration: "1h 5m",
      progress: 0,
      lectures: [
        { id: 201, title: "Defining Stage Presence", duration: "07:31", completed: false },
        { id: 202, title: "Historical Perspectives on Performance", duration: "10:25", completed: false },
        { id: 203, title: "Psychology of Audience Connection", duration: "12:15", completed: false },
        { id: 204, title: "Building Stage Confidence", duration: "09:45", completed: false },
        { id: 205, title: "Body Language Basics", duration: "08:20", completed: false },
        { id: 206, title: "Foundation Practice Exercises", duration: "11:50", completed: false }
      ]
    },
    {
      id: 3,
      title: "Part 2: Conquering Stage Fright with Confidence Techniques",
      expanded: false,
      lectureCount: 8,
      duration: "1h 30m",
      progress: 0,
      lectures: [
        { id: 301, title: "Understanding Stage Fright", duration: "07:31", completed: false },
        { id: 302, title: "Cognitive Approaches to Anxiety", duration: "10:45", completed: false },
        { id: 303, title: "Breathing and Relaxation Techniques", duration: "12:30", completed: false },
        { id: 304, title: "Visualization and Mental Rehearsal", duration: "11:20", completed: false },
        { id: 305, title: "Building Pre-Performance Rituals", duration: "08:45", completed: false },
        { id: 306, title: "Handling Mistakes Gracefully", duration: "09:15", completed: false },
        { id: 307, title: "Practice Scenarios", duration: "10:30", completed: false },
        { id: 308, title: "Confidence Building Exercises", duration: "12:15", completed: false }
      ]
    },
    {
      id: 4,
      title: "Part 3: Engaging Your Audience Through Expression and Movement",
      expanded: false,
      lectureCount: 7,
      duration: "1h 15m",
      progress: 0,
      lectures: [
        { id: 401, title: "Principles of Audience Engagement", duration: "07:31", completed: false },
        { id: 402, title: "Emotional Expression in Performance", duration: "11:20", completed: false },
        { id: 403, title: "Stage Movement Fundamentals", duration: "09:45", completed: false },
        { id: 404, title: "Using Space Effectively", duration: "08:30", completed: false },
        { id: 405, title: "Connecting with Different Audience Types", duration: "10:15", completed: false },
        { id: 406, title: "Interactive Performance Techniques", duration: "12:30", completed: false },
        { id: 407, title: "Practical Movement Exercises", duration: "09:15", completed: false }
      ]
    },
    {
      id: 5,
      title: "Part 4: From Practice to Performance: Perfecting Your Stage Presence",
      expanded: false,
      lectureCount: 6,
      duration: "1h 10m",
      progress: 0,
      lectures: [
        { id: 501, title: "Creating a Practice Plan", duration: "07:31", completed: false },
        { id: 502, title: "Recording and Self-Assessment", duration: "11:45", completed: false },
        { id: 503, title: "Peer Feedback Strategies", duration: "09:30", completed: false },
        { id: 504, title: "Pre-Performance Preparation", duration: "12:15", completed: false },
        { id: 505, title: "Performance Day Strategies", duration: "10:45", completed: false },
        { id: 506, title: "Post-Performance Analysis", duration: "08:30", completed: false }
      ]
    },
    {
      id: 6,
      title: "Vocal Mastery",
      expanded: false,
      lectureCount: 52,
      duration: "5h 49m",
      progress: 0,
      lectures: [
        { id: 601, title: "Introduction to Vocal Techniques", duration: "07:31", completed: false },
        // Additional lectures would be listed here
      ]
    },
    {
      id: 7,
      title: "Body in Motion",
      expanded: false,
      lectureCount: 43,
      duration: "5h 1m",
      progress: 0,
      lectures: [
        { id: 701, title: "Introduction to Movement", duration: "07:31", completed: false },
        // Additional lectures would be listed here
      ]
    },
    {
      id: 8,
      title: "Expressive Performance",
      expanded: false,
      lectureCount: 137,
      duration: "10h 6m",
      progress: 0,
      lectures: [
        { id: 801, title: "Introduction to Expression", duration: "07:31", completed: false },
        // Additional lectures would be listed here
      ]
    },
    {
      id: 9,
      title: "Final Showcase",
      expanded: false,
      lectureCount: 21,
      duration: "3h 8m",
      progress: 0,
      lectures: [
        { id: 901, title: "Showcase Preparation", duration: "07:31", completed: false },
        // Additional lectures would be listed here
      ]
    },
    {
      id: 10,
      title: "What's Next",
      expanded: false,
      lectureCount: 7,
      duration: "1h 17m",
      progress: 0,
      lectures: [
        { id: 1001, title: "Career Opportunities", duration: "07:31", completed: false },
        // Additional lectures would be listed here
      ]
    },
    {
      id: 11,
      title: "Exams and Assessments",
      expanded: false,
      lectureCount: 5,
      duration: "30m",
      progress: 0,
      lectures: [
        { id: 1101, title: "Assessment Overview", duration: "07:31", completed: false },
        { id: 1102, title: "Assessment Criteria", duration: "07:31", completed: false },
        { id: 1103, title: "Submission Guidelines", duration: "05:20", completed: false },
        { id: 1104, title: "Final Performance Guidelines", duration: "06:45", completed: false },
        { id: 1105, title: "Grading Rubric Review", duration: "04:15", completed: false }
      ]
    }
  ]);

  // Mock data for assessments
  const [assessments, setAssessments] = useState<Assessment[]>([
    { 
      id: 1, 
      title: "Theory Fundamentals Quiz", 
      type: "Quiz", 
      dueDate: "Week 2 (May 15, 2025)", 
      totalScore: 100,
      submitted: false,
      completed: false,
      details: {
        description: "This quiz will test your understanding of basic music theory concepts covered in the first two weeks.",
        criteria: [
          { name: "Note Recognition", percentage: 30, description: "Ability to identify notes on the staff" },
          { name: "Rhythm Understanding", percentage: 30, description: "Understanding of basic rhythm patterns" },
          { name: "Terms & Concepts", percentage: 40, description: "Knowledge of musical terms and theoretical concepts" }
        ]
      }
    },
    { 
      id: 2, 
      title: "Stage Presence Analysis", 
      type: "Assignment", 
      dueDate: "Week 4 (May 29, 2025)", 
      totalScore: 100,
      submitted: false,
      completed: false,
      details: {
        description: "Analyze a recorded performance and evaluate the stage presence of the performer.",
        criteria: [
          { name: "Observation Skills", percentage: 25, description: "Ability to observe and note key aspects of performance" },
          { name: "Analytical Skills", percentage: 50, description: "Depth of analysis and understanding of stage presence" },
          { name: "Presentation", percentage: 25, description: "Clarity and organization of the analysis" }
        ]
      }
    },
    { 
      id: 3, 
      title: "Midterm Performance", 
      type: "Midterm", 
      dueDate: "Week 6 (June 12, 2025)", 
      totalScore: 100,
      submitted: false,
      completed: false,
      details: {
        description: "Perform a piece of your choice demonstrating the techniques learned so far.",
        criteria: [
          { name: "Technical Skill", percentage: 40, description: "Accuracy and proficiency in performance" },
          { name: "Stage Presence", percentage: 30, description: "Confidence and engagement with the audience" },
          { name: "Expression", percentage: 30, description: "Emotional expression and interpretation of the piece" }
        ]
      }
    },
    { 
      id: 4, 
      title: "Technique Application Project", 
      type: "Assignment", 
      dueDate: "Week 9 (July 3, 2025)", 
      totalScore: 100,
      submitted: false,
      completed: false,
      details: {
        description: "Apply the techniques learned in a creative project of your choice.",
        criteria: [
          { name: "Creativity", percentage: 40, description: "Originality and creativity in the project" },
          { name: "Application", percentage: 40, description: "Effective application of techniques learned" },
          { name: "Presentation", percentage: 20, description: "Clarity and organization of the project" }
        ]
      }
    },
    { 
      id: 5, 
      title: "Final Showcase Performance", 
      type: "Final Exam", 
      dueDate: "Week 12 (July 24, 2025)", 
      totalScore: 100,
      submitted: false,
      completed: false,
      details: {
        description: "Perform a final piece demonstrating all the skills and techniques learned throughout the course.",
        criteria: [
          { name: "Technical Skill", percentage: 30, description: "Accuracy and proficiency in performance" },
          { name: "Stage Presence", percentage: 30, description: "Confidence and engagement with the audience" },
          { name: "Expression", percentage: 40, description: "Emotional expression and interpretation of the piece" }
        ]
      }
    }
  ]);

  // Toggle section expansion
  const toggleSection = (sectionId: number) => {
    setSections(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? { ...section, expanded: !section.expanded }
          : section
      )
    );
  };

  const handleLectureComplete = (sectionId: number, lectureId: number, completed: boolean) => {
    setSections(prevSections =>
      prevSections.map(section => {
        if (section.id === sectionId) {
          const updatedLectures = section.lectures.map(lecture =>
            lecture.id === lectureId ? { ...lecture, completed } : lecture
          );

          // Calculate new section progress
          const completedLectures = updatedLectures.filter(l => l.completed).length;
          const progress = Math.round((completedLectures / section.lectures.length) * 100);

          return {
            ...section,
            lectures: updatedLectures,
            progress
          };
        }
        return section;
      })
    );
  };

  // Add handleLectureClick function
  const handleLectureClick = (sectionId: number, lecture: Lecture) => {
    setActiveLecture({
      id: lecture.id,
      title: lecture.title,
      videoUrl: `https://www.youtube.com/embed/_L70tC-YRb4?start=0`, // You would replace this with actual video URLs
      notes: `Content for ${lecture.title}...`, // You would replace this with actual lecture notes
      sectionId: sectionId
    });
  };

  const handleAssessmentClick = (assessment: Assessment) => {
    setActiveAssessment(assessment);
    setActiveTab('attachFile');
  };

  // Add function to check if deadline has passed
  const isDeadlinePassed = (dueDate: string) => {
    const deadline = new Date(dueDate);
    return new Date() > deadline;
  };

  // Add unsubmit handler
  const handleUnsubmit = (assessmentId: number) => {
    setAssessments(prev => prev.map(assessment => 
      assessment.id === assessmentId 
        ? { ...assessment, submitted: false, submittedAt: undefined }
        : assessment
    ));
  };

  // Add file preview handler
  const handleFileSelect = (file: File | null) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFile(file);
    } else {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      setFile(null);
    }
  };

  // Add submission handler
  const handleSubmit = () => {
    if (file && activeAssessment) {
      setAssessments(prev => prev.map(assessment => 
        assessment.id === activeAssessment.id
          ? { ...assessment, submitted: true, submittedAt: new Date() }
          : assessment
      ));
      setShowPreview(false);
      setFile(null);
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl(null);
      }
    }
  };

  // Calculate overall progress
  const overallProgress = Math.round(
    sections.reduce((acc, section) => acc + section.progress, 0) / sections.length
  );

  return (
    <div className="min-h-screen flex flex-col">
      <HomeHeader />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Group justify="space-between" className="w-full">
            <Group gap="md">
              <ActionIcon 
                size="lg" 
                variant="subtle" 
                onClick={() => navigate('/subjectlist')}
                className="cursor-pointer hover:bg-gray-100"
              >
                <IconArrowLeft size={20} />
              </ActionIcon>
              <div>
                <Title order={4}>Music Theory I</Title>
                <Group gap={4}>
                  <Text size="sm" color="dimmed">6 Sections</Text>
                  <Text size="sm" color="dimmed">•</Text>
                  <Text size="sm" color="dimmed">202 lectures</Text>
                  <Text size="sm" color="dimmed">•</Text>
                  <Text size="sm" color="dimmed">5 months</Text>
                </Group>
              </div>
            </Group>
          </Group>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Video player card */}
              <div className="relative w-full aspect-video bg-gray-100 rounded overflow-hidden mb-6">
                <iframe
                  width="100%"
                  height="100%"
                  src={activeLecture.videoUrl}
                  title={activeLecture.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Lecture Info */}
              <div className="mb-6 bg-white rounded-lg p-6">
                <Title order={3} className="mb-4">{activeLecture.title}</Title>
                <Group gap="lg">
                  <Group gap={4}>
                    {/* Student avatars */}
                    <div className="flex -space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <img
                          key={i}
                          src="/api/placeholder/24/24"
                          alt="student"
                          className="w-6 h-6 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <Text size="sm" color="dimmed">512 Students watching</Text>
                  </Group>
                  <Divider orientation="vertical" />
                  <Text size="sm" color="dimmed">Last updated: Jan 26, 2025</Text>
                  <Divider orientation="vertical" />
                  <Text size="sm" color="dimmed">Comments: 154</Text>
                </Group>
              </div>

              {/* Tabs Navigation */}
              <div className="mb-6 bg-white rounded-lg">
                <Group gap={0} className="border-b">
                  {['description', 'lectureNotes', 'attachFile', 'comments'].map((tab) => (
                    <Button
                      key={tab}
                      variant="subtle"
                      color={activeTab === tab ? 'blue' : 'gray'}
                      className={`rounded-none px-6 py-3 ${activeTab === tab ? 'border-b-2 border-blue-500' : ''
                        }`}
                      onClick={() => setActiveTab(tab as any)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {tab === 'attachFile' && (
                        <span className="ml-2 text-xs px-1.5 bg-orange-500 text-white rounded-full">
                          01
                        </span>
                      )}
                    </Button>
                  ))}
                </Group>
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-lg p-6">
                {activeTab === 'lectureNotes' && (
                  <div className="mb-6">
                    <Group justify="space-between" className="mb-4">
                      <Title order={4}>Lecture Notes</Title>
                      <Button leftSection={<IconDownload size={16} />} variant="subtle" color="orange">
                        Download Notes
                      </Button>
                    </Group>
                    <div className="prose max-w-none">
                      {activeLecture.notes}
                    </div>
                  </div>
                )}

                {activeTab === 'attachFile' && (
                  <div className="mb-6">
                    {activeAssessment ? (
                      <>
                        <Group justify="between" className="mb-4">
                          <div>
                            <Title order={4}>{activeAssessment.title}</Title>
                            <Group gap="xs" className="mt-1">
                              <Text size="xs" className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                {activeAssessment.type}
                              </Text>
                              <Text size="xs" c="dimmed">Due: {activeAssessment.dueDate}</Text>
                            </Group>
                          </div>
                            <Text fw={500} size="lg" color="blue">{activeAssessment.score ?? 0}/{activeAssessment.totalScore}</Text>
                        </Group>

                        <div className="mb-6">
                          <Title order={6} className="mb-2">Description</Title>
                          <Text size="sm" className="mb-4">{activeAssessment.details.description}</Text>

                          <Title order={6} className="mb-2">Grading Criteria</Title>
                          <div className="space-y-3">
                            {activeAssessment.details.criteria.map((criterion, index) => (
                              <div key={index} className="p-3 border rounded-md">
                                <Group justify="between" className="mb-1">
                                  <Text fw={500}>{criterion.name}</Text>
                                  <Text fw={500} color="blue">{criterion.percentage}%</Text>
                                </Group>
                                <Text size="sm" color="dimmed">{criterion.description}</Text>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-6">
                          <Text size="sm" className="mb-3">Attach Your Submission</Text>
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                            <FileButton 
                              onChange={handleFileSelect} 
                              accept="image/png,image/jpeg,application/pdf"
                            >
                              {(props) => (
                                <div {...props} className="cursor-pointer">
                                  <IconFileUpload size={32} className="mx-auto text-gray-400 mb-2" />
                                  <Text size="sm">
                                    Drag and drop a file or <span className="text-blue-500">browse file</span>
                                  </Text>
                                  <Text size="xs" color="dimmed" mt={8}>
                                    Supported formats: PNG, JPEG, PDF
                                  </Text>
                                </div>
                              )}
                            </FileButton>
                          </div>

                          {file && (
                            <div className="mt-4 space-y-4">
                              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                                <div>
                                  <Text size="sm" fw={500}>{file.name}</Text>
                                  <Text size="xs" color="dimmed">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </Text>
                                </div>
                                <Button 
                                  variant="subtle" 
                                  color="red" 
                                  size="sm"
                                  onClick={() => handleFileSelect(null)}
                                >
                                  Remove
                                </Button>
                              </div>

                              {previewUrl && (
                                <div className="border rounded-md p-4">
                                  <Text size="sm" fw={500} className="mb-2">Preview:</Text>
                                  {file.type.startsWith('image/') ? (
                                    <img 
                                      src={previewUrl} 
                                      alt="Preview" 
                                      className="max-h-[400px] mx-auto rounded-md"
                                    />
                                  ) : file.type === 'application/pdf' ? (
                                    <iframe
                                      src={previewUrl}
                                      className="w-full h-[400px] rounded-md"
                                      title="PDF Preview"
                                    />
                                  ) : null}
                                </div>
                              )}

                              <Group justify="flex-end" className="mt-4">
                                <Button 
                                  variant="default" 
                                  onClick={() => handleFileSelect(null)}
                                >
                                  Cancel
                                </Button>
                                <Button 
                                  color="blue"
                                  onClick={() => setShowPreview(true)}
                                  disabled={!file}
                                >
                                  Review Submission
                                </Button>
                              </Group>
                            </div>
                          )}

                          {/* Submission Review Modal */}
                          <Modal
                            opened={showPreview}
                            onClose={() => setShowPreview(false)}
                            title="Review Your Submission"
                            size="lg"
                          >
                            <div className="space-y-4">
                              <div className="bg-gray-50 p-4 rounded-md">
                                <Text fw={500}>{activeAssessment?.title}</Text>
                                <Text size="sm" color="dimmed">Due: {activeAssessment?.dueDate}</Text>
                              </div>

                              <div className="border rounded-md p-4">
                                <Text size="sm" fw={500} className="mb-2">File Details:</Text>
                                <Text size="sm">{file?.name}</Text>
                                <Text size="xs" color="dimmed">
                                  Size: {file && (file.size / 1024 / 1024).toFixed(2)} MB
                                </Text>
                              </div>

                              {previewUrl && (
                                <div className="border rounded-md p-4">
                                  <Text size="sm" fw={500} className="mb-2">Preview:</Text>
                                  {file?.type.startsWith('image/') ? (
                                    <img 
                                      src={previewUrl} 
                                      alt="Preview" 
                                      className="max-h-[400px] mx-auto rounded-md"
                                    />
                                  ) : file?.type === 'application/pdf' ? (
                                    <iframe
                                      src={previewUrl}
                                      className="w-full h-[400px] rounded-md"
                                      title="PDF Preview"
                                    />
                                  ) : null}
                                </div>
                              )}

                              <Alert color="blue" className="mt-4">
                                <Text size="sm">
                                  Please review your submission carefully. Once submitted, you can only 
                                  unsubmit before the deadline.
                                </Text>
                              </Alert>

                              <Group justify="flex-end" mt="xl">
                                <Button variant="default" onClick={() => setShowPreview(false)}>
                                  Back to Edit
                                </Button>
                                <Button color="blue" onClick={handleSubmit}>
                                  Confirm & Submit
                                </Button>
                              </Group>
                            </div>
                          </Modal>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6">
                        <Text c="dimmed">Select an assessment from the sidebar to view details and submit your work.</Text>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Course Structure */}
                <div className="bg-white rounded-lg shadow-sm">
                  <CourseStructure
                    sections={sections}
                    overallProgress={overallProgress}
                    onToggleSection={toggleSection}
                    onLectureComplete={handleLectureComplete}
                    onLectureClick={handleLectureClick}
                    activeLectureId={activeLecture.id}
                  />
                </div>

                {/* Assessments section */}
                <Card shadow="sm" p="md" className="w-full">
                  <Title order={5} className="mb-4">Assessments & Deadlines</Title>
                  <div className="space-y-3">
                    {assessments.map(assessment => (
                      <div 
                        key={assessment.id} 
                        className="p-3 border rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleAssessmentClick(assessment)}
                      >
                        <Group justify="space-between">
                          <div>
                            <Text fw={500}>{assessment.title}</Text>
                            <Group gap="xs" className="mt-1">
                              <Text size="xs" className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                                {assessment.type}
                              </Text>
                              <Text size="xs" c="dimmed">Due: {assessment.dueDate}</Text>
                            </Group>
                          </div>
                          <div className="text-right">
                            <Text size="sm" fw={500} className={assessment.score ? 'text-green-600' : 'text-gray-600'}>
                              {assessment.score ?? 0}/{assessment.totalScore}
                            </Text>
                            {assessment.submitted && !isDeadlinePassed(assessment.dueDate) && (
                              <Button
                                variant="subtle"
                                size="xs"
                                color="red"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleUnsubmit(assessment.id);
                                }}
                                className="mt-1"
                              >
                                Unsubmit
                              </Button>
                            )}
                          </div>
                        </Group>
                        {assessment.submitted && (
                          <div className="mt-2 text-blue-600 text-sm flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="mr-1">📤</span> Submitted
                              {assessment.submittedAt && (
                                <Text size="xs" c="dimmed" className="ml-2">
                                  on {assessment.submittedAt.toLocaleDateString()}
                                </Text>
                              )}
                            </div>
                          </div>
                        )}
                        {assessment.score && (
                          <div className="mt-2 text-green-600 text-sm flex items-center">
                            <span className="mr-1">✓</span> Graded
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SubjectPage;