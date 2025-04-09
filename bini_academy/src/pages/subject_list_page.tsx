import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeHeader } from "../components/homeheader";
import { Footer } from "../components/footer";
import { Container, Burger } from "@mantine/core";
import SubjectCard from "../components/subject_card";

const semesterData: Record<string, { 
  title: string; 
  units: number; 
  instructor: string; 
  color: string;
  progress: number; // Add progress field
}[]> = {
  "1st Semester": [
    { 
      title: "Music Theory I", 
      units: 3, 
      instructor: "Prof. John Doe", 
      color: "bg-blue-500",
      progress: 25 // Add progress value
    },
    { 
      title: "Ear Training & Sight Singing I", 
      units: 2, 
      instructor: "Prof. Jane Smith", 
      color: "bg-red-500",
      progress: 50
    },
    { 
      title: "Vocal Techniques I", 
      units: 2, 
      instructor: "Prof. Michael Lee", 
      color: "bg-green-600",
      progress: 75
    },
    { title: "Diction for Singers I (English & Italian)", units: 2, instructor: "Prof. Rachel Kim", color: "bg-orange-400", progress: 0 },
    { title: "Piano for Non-Pianists I", units: 2, instructor: "Prof. David Park", color: "bg-yellow-500", progress: 0 },
    { title: "Introduction to Music History", units: 3, instructor: "Prof. Laura Chen", color: "bg-purple-500", progress: 0 },
    { title: "Performance Lab I", units: 1, instructor: "Prof. Samuel Tan", color: "bg-pink-500", progress: 0 },
    { title: "General Education Elective", units: 3, instructor: "Prof. Emily Young", color: "bg-gray-400", progress: 0 },
  ],
  "2nd Semester": [],
  "3rd Semester": [],
  "4th Semester": [],
  "5th Semester": [],
  "6th Semester": [],
  "7th Semester": [],
  "8th Semester": [],
};

const semesterList = Object.keys(semesterData);

export const SubjectListPage = () => {
  const navigate = useNavigate();
  const [activeSemester, setActiveSemester] = useState("1st Semester");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSubjectClick = () => {
    navigate('/subjectpage');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />

      {/* Mobile Burger Menu */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 border-b">
        <h2 className="text-lg font-semibold">Subjects</h2>
        <Burger opened={sidebarOpen} onClick={() => setSidebarOpen(!sidebarOpen)} />
      </div>

      <div className="flex flex-grow relative">
        {/* Sidebar for Desktop and Mobile */}
        <aside
          className={`z-10 bg-gray-100 p-4 border-r w-64 absolute md:static transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-200 ease-in-out`}
        >
          <h2 className="text-lg font-semibold mb-4">Semesters</h2>
          <ul className="space-y-2">
            {semesterList.map((semester) => (
              <li key={semester}>
                <button
                  onClick={() => {
                    setActiveSemester(semester);
                    setSidebarOpen(false); // close sidebar on mobile
                  }}
                  className={`text-left w-full px-2 py-1 rounded ${
                    activeSemester === semester
                      ? "bg-orange-500 text-white"
                      : "text-blue-600 hover:text-blue-800"
                  }`}
                >
                  {semester}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-6 md:ml-0">
          <Container size="xl">
            <h2 className="text-2xl font-bold mb-6">{activeSemester}</h2>

            {semesterData[activeSemester]?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {semesterData[activeSemester].map((subject, index) => (
                  <div 
                    key={index} 
                    onClick={handleSubjectClick}
                    className="cursor-pointer transition-transform hover:scale-105"
                  >
                    <SubjectCard
                      title={subject.title}
                      units={subject.units}
                      instructor={subject.instructor}
                      bgColor={subject.color}
                      progress={subject.progress} // Pass progress prop
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center mt-20">
                <p className="text-xl font-semibold text-gray-600">
                  🚫 You must pass the previous semester and be officially enrolled to access this semester’s courses.
                </p>
              </div>
            )}
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default SubjectListPage;
