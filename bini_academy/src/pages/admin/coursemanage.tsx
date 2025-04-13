import { useState } from "react";
import { Sidebar } from "../../components/sidebar";
import { Paper, Button, Modal, TextInput, Textarea, Group, Table, ScrollArea, Text, Tabs } from "@mantine/core";
import { HeaderAdmin } from "../../components/headeradmin";
import { UserRole, TabType, Degree } from "../../types";
import { BasicInfoTab } from "../../components/admin/course/BasicInfoTab";
import { AdvanceInfoTab } from "../../components/admin/course/AdvanceInfoTab";
import { CurriculumTab } from "../../components/admin/course/CurriculumTab";
import { PublishTab } from "../../components/admin/course/PublishTab";
import { IconPlus } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

interface DegreeForm {
  name: string;
  description: string;
  category: string;
}

interface MajorSelection {
  degreeId: string | null;
  majorId: string | null;
}

interface MajorForm {
  name: string;
  description: string;
}

// Update the dummyDegrees constant with curriculum data
const dummyDegrees: Degree[] = [
  {
    id: 'degree-1',
    name: 'Bachelor of Music',
    description: 'A comprehensive music program',
    category: 'Music',
    majors: [
      {
        id: 'major-1',
        name: 'Piano Performance',
        description: 'Focus on piano mastery',
        curriculum: {
          subjects: [
            {
              id: 'subject-1',
              name: 'Piano Basics I',
              description: 'Fundamental piano techniques',
              credits: 3,
              semester: 1,
              instructorId: 'inst1'
            },
            {
              id: 'subject-2',
              name: 'Music Theory',
              description: 'Basic music theory and notation',
              credits: 3,
              semester: 1,
              instructorId: 'inst3'
            },
            {
              id: 'subject-3',
              name: 'Piano Performance II',
              description: 'Advanced piano techniques',
              credits: 4,
              semester: 2,
              instructorId: 'inst1'
            }
          ]
        }
      },
      {
        id: 'major-2',
        name: 'Voice Performance',
        description: 'Focus on vocal techniques'
      }
    ]
  },
  {
    id: 'degree-2',
    name: 'Bachelor of Performing Arts',
    description: 'Comprehensive performing arts program',
    category: 'Arts',
    majors: [
      {
        id: 'major-3',
        name: 'Theater Arts',
        description: 'Focus on stage performance'
      }
    ]
  }
];

export const CourseManage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("basic");
  const [progress, setProgress] = useState({
    basic: { completed: 0, total: 5 },
    advance: { completed: 0, total: 8 },
    curriculum: { completed: 0, total: 3 },
    publish: { completed: 0, total: 2 },
  });

  const [showDegreeModal, setShowDegreeModal] = useState(false);
  const [degreeForm, setDegreeForm] = useState<DegreeForm>({
    name: '',
    description: '',
    category: ''
  });

  const [selection, setSelection] = useState<MajorSelection>({
    degreeId: null,
    majorId: null
  });

  // Initialize degrees with dummy data
  const [degrees, setDegrees] = useState<Degree[]>(dummyDegrees);
  const [showMajorModal, setShowMajorModal] = useState(false);
  const [majorForm, setMajorForm] = useState<MajorForm>({
    name: '',
    description: ''
  });

  const updateProgress = (
    tab: TabType,
    completed: number,
    total: number
  ) => {
    setProgress((prev) => ({
      ...prev,
      [tab]: { completed, total },
    }));
  };

  const handleTabChange = (tab: TabType) => {
    if (!selection.degreeId || !selection.majorId) {
      notifications.show({
        title: 'Selection Required',
        message: 'Please select a degree and major first',
        color: 'red'
      });
      return;
    }
    setActiveTab(tab);
  };

  const showMajorDetails = (degreeId: string, majorId: string) => {
    setSelection({ degreeId, majorId });
    setActiveTab("basic");
  };

  const handleAddDegree = () => {
    const newDegree: Degree = {
      id: `degree-${Date.now()}`,
      name: degreeForm.name,
      description: degreeForm.description,
      category: degreeForm.category,
      majors: []
    };
    setDegrees([...degrees, newDegree]);
    setShowDegreeModal(false);
    setDegreeForm({ name: '', description: '', category: '' });
  };

  const handleAddMajor = () => {
    if (!selection.degreeId) return;

    const newMajor = {
      id: `major-${Date.now()}`,
      name: majorForm.name,
      description: majorForm.description
    };

    setDegrees(degrees.map(degree => 
      degree.id === selection.degreeId 
        ? { ...degree, majors: [...degree.majors, newMajor] }
        : degree
    ));

    setShowMajorModal(false);
    setMajorForm({ name: '', description: '' });
    
    notifications.show({
      title: 'Success',
      message: 'Major added successfully',
      color: 'green'
    });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar role={UserRole.Admin}/>
      <div className="flex-1 bg-gray-50">
        <HeaderAdmin title="Course Management" />

        <div className="p-8">
          <Group justify="space-between" mb="xl">
            <Button 
              leftSection={<IconPlus size={16} />}
              onClick={() => setShowDegreeModal(true)}
            >
              Add New Degree
            </Button>
          </Group>

          {/* Degrees and Majors List */}
          <ScrollArea mb="xl">
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Degree Name</Table.Th>
                  <Table.Th>Category</Table.Th>
                  <Table.Th>Majors</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {degrees.map((degree) => (
                  <Table.Tr key={degree.id}>
                    <Table.Td>{degree.name}</Table.Td>
                    <Table.Td>{degree.category}</Table.Td>
                    <Table.Td>
                      <Group>
                        {degree.majors.map(major => (
                          <Button 
                            key={major.id}
                            size="xs"
                            variant="light"
                            onClick={() => showMajorDetails(degree.id, major.id)}
                          >
                            {major.name}
                          </Button>
                        ))}
                        <Button 
                          size="xs"
                          variant="subtle"
                          onClick={() => {
                            setSelection({ degreeId: degree.id, majorId: null });
                            setShowMajorModal(true);
                          }}
                        >
                          + Add Major
                        </Button>
                      </Group>
                    </Table.Td>
                    <Table.Td>
                      <Group>
                        <Button 
                          size="xs"
                          variant="light"
                          onClick={() => setSelection({ degreeId: degree.id, majorId: null })}
                        >
                          Manage Majors
                        </Button>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </ScrollArea>

          {/* Course Creation Section */}
          {selection.degreeId && selection.majorId && (
            <div className="mt-6">
              <Text size="xl" fw={500} mb="md">
                Course Creation for {degrees.find(d => d.id === selection.degreeId)?.name} - 
                {degrees.find(d => d.id === selection.degreeId)?.majors.find(m => m.id === selection.majorId)?.name}
              </Text>

              {/* Tabs Navigation */}
              <Tabs value={activeTab} onChange={(value) => handleTabChange(value as TabType)} mb="md">
                <Tabs.List>
                  <Tabs.Tab value="basic">Basic Info</Tabs.Tab>
                  <Tabs.Tab value="advance">Advanced Info</Tabs.Tab>
                  <Tabs.Tab value="curriculum">Curriculum</Tabs.Tab>
                  <Tabs.Tab value="publish">Publish</Tabs.Tab>
                </Tabs.List>

                {/* Tab Panels */}
                <Paper shadow="sm" p="lg" className="mt-4">
                  <Tabs.Panel value="basic">
                    <BasicInfoTab 
                      setActiveTab={handleTabChange} 
                      updateProgress={updateProgress}
                      selection={selection}
                      setSelection={setSelection}
                      degrees={degrees}
                    />
                  </Tabs.Panel>

                  <Tabs.Panel value="advance">
                    <AdvanceInfoTab 
                      setActiveTab={handleTabChange} 
                      updateProgress={updateProgress} 
                      selection={selection}
                      degrees={degrees}
                    />
                  </Tabs.Panel>

                  <Tabs.Panel value="curriculum">
                    <CurriculumTab 
                      setActiveTab={handleTabChange} 
                      updateProgress={updateProgress}
                      selection={selection}
                      degrees={degrees}
                    />
                  </Tabs.Panel>

                  <Tabs.Panel value="publish">
                    <PublishTab 
                      setActiveTab={handleTabChange} 
                      updateProgress={updateProgress}
                      selection={selection}
                      degrees={degrees}
                    />
                  </Tabs.Panel>
                </Paper>
              </Tabs>
            </div>
          )}

          {/* Show BasicInfoTab only when no major is selected */}
          {(!selection.degreeId || !selection.majorId) && (
            <BasicInfoTab 
              setActiveTab={handleTabChange} 
              updateProgress={updateProgress}
              selection={selection}
              setSelection={setSelection}
              degrees={degrees}
            />
          )}
        </div>
      </div>

      <Modal
        opened={showDegreeModal}
        onClose={() => setShowDegreeModal(false)}
        title="Add New Degree"
      >
        <div className="space-y-4">
          <TextInput
            label="Degree Name"
            placeholder="Enter degree name"
            value={degreeForm.name}
            onChange={(e) => setDegreeForm({ ...degreeForm, name: e.target.value })}
            required
          />
          <Textarea
            label="Description"
            placeholder="Enter degree description"
            value={degreeForm.description}
            onChange={(e) => setDegreeForm({ ...degreeForm, description: e.target.value })}
            required
          />
          <TextInput
            label="Category"
            placeholder="Enter degree category"
            value={degreeForm.category}
            onChange={(e) => setDegreeForm({ ...degreeForm, category: e.target.value })}
            required
          />
          <Group justify="flex-end">
            <Button onClick={() => setShowDegreeModal(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleAddDegree}>
              Add Degree
            </Button>
          </Group>
        </div>
      </Modal>

      <Modal
        opened={showMajorModal}
        onClose={() => setShowMajorModal(false)}
        title={`Add Major to ${degrees.find(d => d.id === selection.degreeId)?.name}`}
      >
        <div className="space-y-4">
          <TextInput
            label="Major Name"
            placeholder="Enter major name"
            value={majorForm.name}
            onChange={(e) => setMajorForm({ ...majorForm, name: e.target.value })}
            required
          />
          <Textarea
            label="Description"
            placeholder="Enter major description"
            value={majorForm.description}
            onChange={(e) => setMajorForm({ ...majorForm, description: e.target.value })}
            required
          />
          <Group justify="flex-end">
            <Button onClick={() => setShowMajorModal(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleAddMajor}>
              Add Major
            </Button>
          </Group>
        </div>
      </Modal>
    </div>
  );
};