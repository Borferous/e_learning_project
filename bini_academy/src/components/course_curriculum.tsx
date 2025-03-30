import { useState } from 'react';
import { Accordion, Text, Group, Badge, Button } from '@mantine/core';
import { IconVideo, IconClock, IconChevronDown } from '@tabler/icons-react';

const CourseCurriculum = () => {
  const [expanded, setExpanded] = useState(false);
  
  const curriculum = [
    {
      title: "Getting Started",
      lectures: 4,
      duration: "31m",
      content: [
        { title: "Introduction", duration: "5:12" },
        { title: "Commanding Stage Fright with Confidence Techniques", duration: "10:23" },
        { title: "Warm-up Basics", duration: "8:45" },
        { title: "Practice Project", duration: "7:30" }
      ]
    },
    {
      title: "Vocal Mastery",
      lectures: 12,
      duration: "88m",
      content: [
        { title: "Understanding Your Vocal Range", duration: "15:20" },
        { title: "Breath Support Fundamentals", duration: "12:45" },
        { title: "Projection Without Strain", duration: "18:10" },
        { title: "Articulation and Diction", duration: "14:35" },
        { title: "Voice Modulation", duration: "16:55" }
      ]
    },
    {
      title: "Body in Motion",
      lectures: 14,
      duration: "93m",
      content: [
        { title: "Posture and Alignment", duration: "13:40" },
        { title: "Movement Fundamentals", duration: "17:25" },
        { title: "Stage Presence", duration: "14:10" },
        { title: "Gestures and Their Impact", duration: "16:30" }
      ]
    },
    {
      title: "Expressive Performance",
      lectures: 17,
      duration: "96m",
      content: [
        { title: "Emotional Connectivity", duration: "14:15" },
        { title: "Storytelling Through Voice and Body", duration: "18:40" },
        { title: "Creating Character Through Movement", duration: "16:35" }
      ]
    },
    {
      title: "Final Showcase",
      lectures: 3,
      duration: "28m",
      content: [
        { title: "Preparing Your Performance", duration: "10:25" },
        { title: "Recording and Self-Evaluation", duration: "8:15" },
        { title: "Final Performance Submission", duration: "9:20" }
      ]
    }
  ];

  return (
    <div className="mb-12">
      <div className="flex justify-between mb-4">
        <Text component="h2" className="text-xl font-bold">
          Curriculum
        </Text>
        
        <div className="flex gap-2">
          <Badge size="lg" radius="sm" color="orange">
            <div className="flex items-center gap-1">
              <IconVideo size={14} />
              <Text size="xs">{curriculum.reduce((acc, section) => acc + section.lectures, 0)} lectures</Text>
            </div>
          </Badge>
          
          <Badge size="lg" radius="sm" color="orange">
            <div className="flex items-center gap-1">
              <IconClock size={14} />
              <Text size="xs">Total 5h 16m</Text>
            </div>
          </Badge>
        </div>
      </div>
      
      <Accordion variant="separated" radius="md">
        {curriculum.slice(0, expanded ? curriculum.length : 3).map((section, index) => (
          <Accordion.Item key={index} value={section.title}>
            <Accordion.Control>
              <div className="flex justify-between">
                <Text fw={600}>{section.title}</Text>
                <div className="flex gap-2">
                  <Badge size="sm" color="gray">
                    {section.lectures} lectures
                  </Badge>
                  <Badge size="sm" color="gray">
                    {section.duration}
                  </Badge>
                </div>
              </div>
            </Accordion.Control>
            
            <Accordion.Panel>
              {section.content.map((lecture, i) => (
                <div key={i} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex gap-2">
                    <IconVideo size={16} className="text-gray-500" />
                    <Text size="sm">{lecture.title}</Text>
                  </div>
                  <Text size="sm" c="dimmed">{lecture.duration}</Text>
                </div>
              ))}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      
      {!expanded && curriculum.length > 3 && (
        <Button 
          variant="subtle" 
          color="orange" 
          fullWidth 
          onClick={() => setExpanded(true)}
          className="mt-4"
          rightSection={<IconChevronDown size={16} />}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default CourseCurriculum;