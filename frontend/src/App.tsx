import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome 🚀</h1>
      <Link
        to="/projects"
        className="text-blue-600 underline hover:text-blue-800"
      >
        Go to Projects
      </Link>
    </div>
  );
}
