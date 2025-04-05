// components/subject_card.tsx
interface SubjectCardProps {
    title: string;
    units: number;
    instructor: string;
    bgColor?: string;
  }
  
  const SubjectCard = ({ title, units, instructor, bgColor = "bg-blue-500" }: SubjectCardProps) => (
    <div className="rounded-lg shadow hover:shadow-md transition overflow-hidden">
      <div className={`p-4 ${bgColor} text-white`}>
        <h3 className="text-lg font-bold truncate">{title}</h3>
        <p className="text-sm">{units} Units</p>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-700">{instructor}</p>
      </div>
    </div>
  );
  
  export default SubjectCard;
  