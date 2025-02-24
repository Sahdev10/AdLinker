import { useState, useEffect } from "react";

const PublisherWallForm = ({ userId }) => {
  const [formData, setFormData] = useState({
    location: "",
    area: "",
    image: "",
    size: { length: "", width: "" },
    pricePerMonth: "",
    traffic: "",
    createdBy: userId || "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch existing wall data
  useEffect(() => {
    const fetchWallData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/publisher/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setFormData((prev) => ({
            ...prev,
            location: data.location || "",
            area: data.area || "",
            image: data.image || "",
            size: { length: data.size?.length || "", width: data.size?.width || "" },
            pricePerMonth: data.pricePerMonth || "",
            traffic: data.traffic || "",
          }));
        } else {
          setError(data.message || "No data found");
        }
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchWallData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "length" || name === "width") {
      setFormData((prev) => ({
        ...prev,
        size: { ...prev.size, [name]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/publisher/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Wall data submitted successfully!");
      } else {
        setError(data.message || "Submission failed");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center">Publisher Wall Form</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="mt-6" onSubmit={handleSubmit}>
          {/* Location */}
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            required
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />

          {/* Area */}
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Area (e.g. Downtown, NY)"
            required
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />

          {/* Image URL */}
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
          />

          {/* Size (Length & Width) */}
          <div className="flex gap-4">
            <input
              type="number"
              name="length"
              value={formData.size.length}
              onChange={handleChange}
              placeholder="Length"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              name="width"
              value={formData.size.width}
              onChange={handleChange}
              placeholder="Width"
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          {/* Price Per Month */}
          <input
            type="number"
            name="pricePerMonth"
            value={formData.pricePerMonth}
            onChange={handleChange}
            placeholder="Price Per Month"
            required
            className="w-full p-3 border border-gray-300 rounded-md mt-4"
          />

          {/* Traffic */}
          <input
            type="number"
            name="traffic"
            value={formData.traffic}
            onChange={handleChange}
            placeholder="Traffic (Daily Visitors)"
            required
            className="w-full p-3 border border-gray-300 rounded-md mt-4"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 mt-6 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export { PublisherWallForm };
