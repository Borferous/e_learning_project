import { Card, Group, Text, Progress, Collapse, Radio } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';

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

interface CourseStructureProps {
  sections: Section[];
  overallProgress: number;
  onToggleSection: (sectionId: number) => void;
  onLectureComplete: (sectionId: number, lectureId: number, completed: boolean) => void;
  onLectureClick: (sectionId: number, lecture: Lecture) => void;
  activeLectureId: number;
}

export const CourseStructure = ({ 
  sections, 
  overallProgress, 
  onToggleSection,
  onLectureComplete,
  onLectureClick,
  activeLectureId
}: CourseStructureProps) => {
  return (
    <div className="w-full">
      {/* Overall progress */}
      <Card shadow="sm" p="md" mb="md">
        <Group justify="space-between" className="mb-2">
          <Text size="sm" fw={500}>Subject Contents</Text>
          <Text size="sm" color="green" fw={500}>{overallProgress}% Completed</Text>
        </Group>
        <Progress value={overallProgress} color="green" size="sm" />
      </Card>

      {/* Course structure accordion */}
      <div className="space-y-2">
        {sections.map(section => (
          <div key={section.id} className="border rounded overflow-hidden">
            <button 
              className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
              onClick={() => onToggleSection(section.id)}
            >
              <Group>
                <span className="text-gray-500 text-sm">
                  {section.expanded ? '▾' : '▸'}
                </span>
                <div>
                  <Text fw={500}>{section.title}</Text>
                  <Text size="xs" color="dimmed">
                    {section.progress}% complete • {section.lectureCount} lectures • {section.duration}
                  </Text>
                </div>
              </Group>
              <Progress 
                value={section.progress} 
                size="xs" 
                className="w-20" 
                color={section.progress === 100 ? 'green' : 'blue'} 
              />
            </button>
            
            <Collapse in={section.expanded}>
              <div className="divide-y">
                {section.lectures.map(lecture => (
                  <div 
                    key={lecture.id} 
                    className={`p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer
                      ${lecture.id === activeLectureId ? 'bg-blue-50' : ''}`}
                    onClick={() => onLectureClick(section.id, lecture)}
                  >
                    <Group>
                      <Radio
                        checked={lecture.completed}
                        onChange={(event) => 
                          onLectureComplete(section.id, lecture.id, event.currentTarget.checked)
                        }
                        aria-label={`Mark ${lecture.title} as completed`}
                      />
                      <div>
                        <Text size="sm" className={lecture.completed ? 'text-gray-500' : ''}>
                          {lecture.title}
                        </Text>
                        <Text size="xs" color="dimmed">
                          <IconClock size={12} className="inline mr-1" />
                          {lecture.duration}
                        </Text>
                      </div>
                    </Group>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};