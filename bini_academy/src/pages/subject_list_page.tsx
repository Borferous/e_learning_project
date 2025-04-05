// pages/SubjectListPage.tsx
import { HomeHeader } from "../components/homeheader";
import { Footer } from "../components/footer";
import { Container, ScrollArea } from "@mantine/core";
import SubjectCard from "../components/subject_card";

const subjects = [
  { title: "Music Theory I", units: 3, instructor: "Prof. John Doe", color: "bg-blue-500" },
  { title: "Ear Training & Sight Singing I", units: 2, instructor: "Prof. Jane Smith", color: "bg-red-500" },
  { title: "Vocal Techniques I", units: 2, instructor: "Prof. Michael Lee", color: "bg-green-600" },
  { title: "Diction for Singers I (English & Italian)", units: 2, instructor: "Prof. Rachel Kim", color: "bg-orange-400" },
  { title: "Piano for Non-Pianists I", units: 2, instructor: "Prof. David Park", color: "bg-yellow-500" },
  { title: "Introduction to Music History", units: 3, instructor: "Prof. Laura Chen", color: "bg-purple-500" },
  { title: "Performance Lab I", units: 1, instructor: "Prof. Samuel Tan", color: "bg-pink-500" },
  { title: "General Education Elective", units: 3, instructor: "Prof. Emily Young", color: "bg-gray-400" },
];

export const SubjectListPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeHeader />
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4 border-r hidden md:block">
          <h2 className="text-lg font-semibold mb-4">Subjects</h2>
          <ul className="space-y-2">
            {subjects.map((subject, index) => (
              <li key={index}>
                <a href="#" className="text-blue-500 hover:text-blue-700">
                  {subject.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Grid Area */}
        <main className="flex-grow p-6">
          <Container size="xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {subjects.map((subject, index) => (
                <a
                  key={index}
                  href="#"
                  className="block"
                >
                  <SubjectCard
                    title={subject.title}
                    units={subject.units}
                    instructor={subject.instructor}
                    bgColor={subject.color}
                  />
                </a>
              ))}
            </div>
          </Container>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SubjectListPage;
