import { Link } from "react-router-dom";
import '../index.css';

export const PageA = () => {
    return (
        <div>
            <h1 className="text-red-600">Page A</h1>
            <Link to={'/pageb'} className="text-blue-700 underline">Go to page B</Link>      
        </div>
    );
}