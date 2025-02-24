import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

  
      // Store token in local storage
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/");

      // Redirect or update state as needed
    } catch (err) {
      setLoading(false);
      setError("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-12 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-4xl font-bold text-center text-black">Sign In</h2>
        <p className="text-center text-gray-600 mt-2">Welcome back! Please enter your credentials.</p>

        <form className="mt-8" onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email" 
            required
            className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#0073FF]" 
          />
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password" 
            required
            className="w-full p-4 mt-6 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#0073FF]" 
          />

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#0073FF] text-white py-4 mt-6 rounded-lg text-lg hover:bg-[#005FCC] transition-all"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export { SignInPage };
