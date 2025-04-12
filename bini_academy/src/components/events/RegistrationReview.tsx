import { useState } from 'react';
import { Modal, Tabs, Table, Badge, Button, Group, Text, Avatar } from '@mantine/core';
import { IconCheck, IconX, IconVideo } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { EventType } from '../../types/events';

interface RegistrationReviewProps {
  event: EventType;
  opened: boolean;
  onClose: () => void;
}

interface Registration {
  studentId: string;
  studentName: string;
  registrationDate: string;
  status: 'pending' | 'approved' | 'rejected';
  submissionUrl?: string;
  avatarUrl?: string;
}

export const RegistrationReview = ({ event, opened, onClose }: RegistrationReviewProps) => {
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [videoModalUrl, setVideoModalUrl] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([
    {
      studentId: '1',
      studentName: 'John Doe',
      registrationDate: '2025-04-10',
      status: 'pending',
      submissionUrl: 'https://example.com/video1.mp4',
      avatarUrl: 'https://example.com/avatar1.jpg'
    },
    {
      studentId: '2',
      studentName: 'Jane Smith',
      registrationDate: '2025-04-11',
      status: 'pending',
      submissionUrl: 'https://example.com/video2.mp4',
      avatarUrl: 'https://example.com/avatar2.jpg'
    }
  ]);

  const handleUpdateStatus = (studentId: string, newStatus: 'approved' | 'rejected') => {
    // Update the registration status
    setRegistrations(prevRegistrations => 
      prevRegistrations.map(reg => 
        reg.studentId === studentId ? { ...reg, status: newStatus } : reg
      )
    );

    // Show notification
    notifications.show({
      title: 'Status Updated',
      message: `Registration ${newStatus} successfully`,
      color: newStatus === 'approved' ? 'green' : 'red'
    });

    // Switch to the appropriate tab
    setActiveTab(newStatus);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={`Registrations for ${event.title}`}
        size="xl"
      >
        <Tabs value={activeTab} onChange={(value) => value && setActiveTab(value)}>
          <Tabs.List>
            <Tabs.Tab value="pending">Pending</Tabs.Tab>
            <Tabs.Tab value="approved">Approved</Tabs.Tab>
            <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab} pt="md">
            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Student</Table.Th>
                  <Table.Th>Registration Date</Table.Th>
                  <Table.Th>Submission</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {registrations
                  .filter(reg => reg.status === activeTab)
                  .map(registration => (
                    <Table.Tr key={registration.studentId}>
                      <Table.Td>
                        <Group>
                          <Avatar src={registration.avatarUrl} radius="xl" />
                          <Text>{registration.studentName}</Text>
                        </Group>
                      </Table.Td>
                      <Table.Td>
                        {new Date(registration.registrationDate).toLocaleDateString()}
                      </Table.Td>
                      <Table.Td>
                        {event.category === 'Performance' && registration.submissionUrl && (
                          <Button
                            variant="light"
                            leftSection={<IconVideo size={14} />}
                            onClick={() => setVideoModalUrl(registration.submissionUrl ?? null)}
                          >
                            View Submission
                          </Button>
                        )}
                      </Table.Td>
                      <Table.Td>
                        {activeTab === 'pending' && (
                          <Group>
                            <Button
                              color="green"
                              leftSection={<IconCheck size={14} />}
                              onClick={() => handleUpdateStatus(registration.studentId, 'approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              color="red"
                              leftSection={<IconX size={14} />}
                              onClick={() => handleUpdateStatus(registration.studentId, 'rejected')}
                            >
                              Reject
                            </Button>
                          </Group>
                        )}
                      </Table.Td>
                    </Table.Tr>
                  ))}
              </Table.Tbody>
            </Table>
          </Tabs.Panel>
        </Tabs>
      </Modal>

      <Modal
        opened={!!videoModalUrl}
        onClose={() => setVideoModalUrl(null)}
        title="Performance Submission"
        size="xl"
      >
        {videoModalUrl && (
          <video
            src={videoModalUrl}
            controls
            className="w-full"
          />
        )}
      </Modal>
    </>
  );
};