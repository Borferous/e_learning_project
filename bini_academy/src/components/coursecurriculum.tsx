import { useState, useEffect } from "react";
import { TextInput, Button, Paper, Menu } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface Lecture {
  name: string;
  contents: string[]; // List of contents (Video, File, Description)
}

interface Section {
  name: string;
  lectures: Lecture[];
}

interface CourseCurriculumProps {
  setActiveTab: (tab: string) => void;
  updateProgress: (tab: "curriculum", completed: number, total: number) => void;
}

export const CourseCurriculum = ({ setActiveTab, updateProgress }: CourseCurriculumProps) => {
  const [sections, setSections] = useState<Section[]>([{ name: "", lectures: [{ name: "", contents: [] }] }]);

  // Function to count completed fields dynamically
  const countCompletedFields = () => {
    let completedSections = sections.filter((s) => s.name.trim() !== "").length;
    let completedLectures = sections.reduce(
      (acc, sec) => acc + sec.lectures.filter((l) => l.name.trim() !== "").length,
      0
    );
    let completedContents = sections.reduce(
      (acc, sec) => acc + sec.lectures.reduce((lAcc, lec) => lAcc + lec.contents.length, 0),
      0
    );

    return { completedSections, completedLectures, completedContents };
  };

  useEffect(() => {
    const { completedSections, completedLectures, completedContents } = countCompletedFields();
    const total = sections.length + sections.reduce((acc, sec) => acc + sec.lectures.length, 0);
    updateProgress("curriculum", completedSections + completedLectures + completedContents, total);
  }, [sections]);

  const addSection = () => {
    setSections([...sections, { name: "", lectures: [{ name: "", contents: [] }] }]);
  };

  const addLecture = (sectionIndex: number) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[sectionIndex].lectures.push({ name: "", contents: [] });
      return newSections;
    });
  };

  const addContent = (sectionIndex: number, lectureIndex: number, contentType: string) => {
    setSections((prevSections) => {
      const newSections = [...prevSections];
      newSections[sectionIndex].lectures[lectureIndex].contents.push(contentType);
      return newSections;
    });
  };

  return (
    <Paper shadow="sm" p="lg">
      <h3 className="text-xl font-semibold mb-4">Course Curriculum</h3>

      {/* Dynamic Counter Display */}
      <p className="text-sm text-gray-500">
        Completed: Sections ({countCompletedFields().completedSections}) | Lectures ({countCompletedFields().completedLectures}) | Contents ({countCompletedFields().completedContents})
      </p>

      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border p-4 mb-4">
          <TextInput
            placeholder="Section name"
            value={section.name}
            onChange={(e) => {
              const newSections = [...sections];
              newSections[sectionIndex].name = e.target.value;
              setSections(newSections);
            }}
          />
          {section.lectures.map((lecture, lectureIndex) => (
            <div key={lectureIndex} className="flex justify-between items-center mt-2 border p-2">
              <TextInput
                placeholder="Lecture name"
                value={lecture.name}
                onChange={(e) => {
                  const newSections = [...sections];
                  newSections[sectionIndex].lectures[lectureIndex].name = e.target.value;
                  setSections(newSections);
                }}
              />
              <Menu>
                <Menu.Target>
                  <Button variant="subtle">Contents ({lecture.contents.length})</Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item onClick={() => addContent(sectionIndex, lectureIndex, "Video")}>Video</Menu.Item>
                  <Menu.Item onClick={() => addContent(sectionIndex, lectureIndex, "Attach File")}>Attach File</Menu.Item>
                  <Menu.Item onClick={() => addContent(sectionIndex, lectureIndex, "Description")}>Description</Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          ))}
          <Button variant="subtle" leftSection={<IconPlus size={16} />} onClick={() => addLecture(sectionIndex)}>
            Add Lecture
          </Button>
        </div>
      ))}

      <Button variant="subtle" leftSection={<IconPlus size={16} />} onClick={addSection}>
        Add Section
      </Button>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={() => setActiveTab("advance")}>
          Back
        </Button>
        <Button color="orange" onClick={() => setActiveTab("publish")}>
          Save & Next
        </Button>
      </div>
    </Paper>
  );
};
