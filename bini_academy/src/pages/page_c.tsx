import { Link } from "react-router-dom";

export const PageC = () => {
    return (
        <div>
            <h1>Page C</h1>
            <Link to='/' className="text-blue-700 underline">Go back to Page A</Link>
        </div>
    );
}