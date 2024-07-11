import { useEffect, useState } from "react";
import axios from "axios";

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState({
    message: '',
    color: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (anonymous) setUsername("anonymous");

    let formData = {
      complaint,
      anonymous,
      username,
    };

    try {
      const response = await axios.post("/api/sendcomplaint", formData);

      console.log(response);

      if (response.status === 200) {
        setStatus({message: "Complaint submitted successfully", color: 'green'});
        setComplaint("");
        setUsername("");
        setAnonymous(false);
      } else {
        setStatus({message: "Failed to submit complaint", color: 'red'});
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      setStatus({message: "Failed to submit complaint", color: 'red'});
    }
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({message: "", color: ''});
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="complaint"
            className="block text-lg font-medium text-gray-800"
          >
            Complaint:
          </label>
          <textarea
            id="complaint"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            className="block w-full px-4 py-3 mt-2 text-lg text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            rows="4"
            placeholder="Enter your complaint here..."
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="anonymous" className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-lg text-gray-800">
              Submit anonymously
            </span>
          </label>
        </div>
        {!anonymous && (
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-800"
            >
              Your Name:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-3 mt-2 text-lg text-gray-700 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="Enter your name"
              required
            />
          </div>
        )}
        <button
          type="submit"
          className="block w-full px-4 py-3 mt-4 text-lg font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit Complaint
        </button>
        {status.message && (
          <p className="mt-4 text-lg font-medium" style={{ color: status.color }}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ComplaintForm;
