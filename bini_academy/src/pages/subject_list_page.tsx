import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeHeader } from "../components/homeheader";
import { Footer } from "../components/footer";
import { Burger } from "@mantine/core";
import SubjectCard from "../components/subject_card";
import { getMySubjects } from "../supabase/api/subjects";
import { Subject } from "../types";

export const SubjectListPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [mySubjects, setMySubjects] = useState<any[]>([]);

  const fetchMyCourse = async () => {
    setMySubjects(await getMySubjects() as any[])
  }

  useEffect(() => {
    fetchMyCourse();
  }, []);

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

      <p className="p-4 pb-2 font-bold text-3xl">My Courses</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-screen p-4 overflow-y-auto">
        {mySubjects.map((subject, index) => (
          <div
            key={index}
            onClick={handleSubjectClick}
            className="cursor-pointer transition-transform hover:scale-105 h-fit"
          >
            <SubjectCard
              title={subject.title}
              units={subject.units}
              instructor={subject.users.name}
            />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default SubjectListPage;
