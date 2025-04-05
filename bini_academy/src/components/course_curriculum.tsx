import { TextInput, Paper } from "@mantine/core";

interface Lecture {
  name: string;
  contents: string[];
}

interface Section {
  name: string;
  lectures: Lecture[];
}

const sections: Section[] = [
  {
    name: "Year 1: Foundation in Music & Vocal Techniques",
    lectures: [
      {
        name: "First Semester",
        contents: [
          "Music Theory I (3 units)",
          "Ear Training & Sight Singing I (2 units)",
          "Vocal Techniques I (2 units)",
          "Diction for Singers I (English & Italian) (2 units)",
          "Piano for Non-Pianists I (2 units)",
          "Introduction to Music History (3 units)",
          "Performance Lab I (1 unit)",
          "General Education Elective (3 units)"
        ]
      },
      {
        name: "Second Semester",
        contents: [
          "Music Theory II (3 units)",
          "Ear Training & Sight Singing II (2 units)",
          "Vocal Techniques II (2 units)",
          "Diction for Singers II (German & French) (2 units)",
          "Piano for Non-Pianists II (2 units)",
          "Fundamentals of Conducting (3 units)",
          "Performance Lab II (1 unit)",
          "General Education Elective (3 units)"
        ]
      }
    ]
  },
  {
    name: "Year 2: Advanced Vocal Studies & Performance",
    lectures: [
      {
        name: "Third Semester",
        contents: [
          "Music Theory III (3 units)",
          "Ear Training & Sight Singing III (2 units)",
          "Vocal Techniques III (2 units)",
          "Introduction to Opera & Art Song Literature (3 units)",
          "Vocal Ensemble (1 unit)",
          "Performance Lab III (1 unit)",
          "General Education Elective (3 units)",
          "Music Technology & Recording Basics (3 units)"
        ]
      },
      {
        name: "Fourth Semester",
        contents: [
          "Music Theory IV (3 units)",
          "Ear Training & Sight Singing IV (2 units)",
          "Vocal Techniques IV (2 units)",
          "Stagecraft & Acting for Singers (3 units)",
          "Performance Lab IV (1 unit)",
          "Choral Conducting (2 units)",
          "General Education Elective (3 units)",
          "Music Business & Career Development (2 units)"
        ]
      }
    ]
  },
  {
    name: "Year 3: Specialized Training & Professional Preparation",
    lectures: [
      {
        name: "Fifth Semester",
        contents: [
          "Advanced Vocal Techniques I (2 units)",
          "Opera Workshop I (3 units)",
          "Song Literature & Interpretation I (3 units)",
          "Advanced Diction & Language for Singers (2 units)",
          "Performance Lab V (1 unit)",
          "Music Pedagogy (3 units)",
          "General Education Elective (3 units)",
          "Internship in Music Performance (2 units)"
        ]
      },
      {
        name: "Sixth Semester",
        contents: [
          "Advanced Vocal Techniques II (2 units)",
          "Opera Workshop II (3 units)",
          "Song Literature & Interpretation II (3 units)",
          "Advanced Performance Lab VI (1 unit)",
          "Music Entrepreneurship & Marketing (3 units)",
          "Recital Preparation (2 units)",
          "General Education Elective (3 units)",
          "Music Research Methods (2 units)"
        ]
      }
    ]
  },
  {
    name: "Year 4: Performance & Professional Development",
    lectures: [
      {
        name: "Seventh Semester",
        contents: [
          "Senior Recital I (3 units)",
          "Opera Role Preparation (3 units)",
          "Advanced Vocal Techniques III (2 units)",
          "Professional Audition Techniques (2 units)",
          "Chamber Music & Collaboration (3 units)",
          "General Education Elective (3 units)",
          "Research Project in Music (2 units)"
        ]
      },
      {
        name: "Eighth Semester",
        contents: [
          "Senior Recital II (3 units)",
          "Vocal Masterclass & Coaching (2 units)",
          "Music Criticism & Aesthetics (3 units)",
          "Advanced Vocal Techniques IV (2 units)",
          "Capstone Project (3 units)",
          "Elective (3 units)",
          "Portfolio & Career Development (2 units)"
        ]
      }
    ]
  }
];

const CourseCurriculum = () => {
  return (
    <Paper shadow="sm" p="lg">
      <h3 className="text-xl font-semibold mb-4">Course Curriculum</h3>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="border p-4 mb-4">
          <TextInput value={section.name} readOnly />
          {section.lectures.map((lecture, lectureIndex) => (
            <div key={lectureIndex} className="mt-2 border p-2">
              <TextInput value={lecture.name} readOnly />
              <ul className="list-disc ml-6 mt-1">
                {lecture.contents.map((content, idx) => (
                  <li key={idx} className="text-sm text-gray-700">{content}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </Paper>
  );
};

export default CourseCurriculum;