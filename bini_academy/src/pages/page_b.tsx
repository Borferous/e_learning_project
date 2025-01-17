import { Link } from "react-router-dom";

export const PageB = () => {
    return (
        <div>
            <h1>Page B</h1>
            <Link to='/pagec' className="text-blue-700 underline">Go to Page C</Link>
        </div>
    );
}