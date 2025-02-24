import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountType: "individual",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    address: "",
    email: "",
    mobileno: "",
    password: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!uppercaseRegex.test(password)) return "Password must have at least 1 uppercase letter.";
    if (!specialCharRegex.test(password)) return "Password must have at least 1 special character.";
    return null;
  };

  const validateForm = () => {
    let newErrors = {};
    ["firstName", "lastName", "country", "city", "address", "email"].forEach((field) => {
      if (!formData[field]) newErrors[field] = "Required";
    });

    // Validate Password
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    if (!formData.agreeTerms) newErrors.agreeTerms = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/login"); // Redirect to Sign In page
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          alert("User registered successfully!");

          setFormData({
            accountType: "individual",
            firstName: "",
            lastName: "",
            country: "",
            city: "",
            address: "",
            email: "",
            mobileno: "",
            password: "",
            agreeTerms: false,
          });
        } else {
          alert(data.message || "Registration failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Server error");
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#E3F2FD] to-[#CBD5E1] px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg"> {/* ✅ Smaller size & responsive */}
        <h2 className="text-3xl font-bold text-center text-black">Sign Up</h2>

        <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">Create your account below.</p>

        <form className="mt-6">
          {/* Account Type Selection */}
          <div className="flex justify-center space-x-4 mb-4">
            {["individual", "company"].map((type) => (
              <label key={type} className="flex items-center space-x-2 text-sm sm:text-base">
                <input
                  type="radio"
                  name="accountType"
                  value={type}
                  checked={formData.accountType === type}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
                <span className="capitalize">{type}</span>
              </label>
            ))}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["firstName", "lastName", "country", "city", "address", "email"].map((field) => (
              <div key={field}>
                <label className="block font-medium text-sm sm:text-base">
                  {field.replace(/([A-Z])/g, " $1").trim()} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name={field}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0073FF]"
                  value={formData[field]}
                  onChange={handleChange}
                  required
                />
                {errors[field] && <p className="text-red-500 text-xs sm:text-sm">{errors[field]}</p>}
              </div>
            ))}
          </div>

          {/* Mobile No. */}
          <div className="mt-4">
            <label className="block font-medium text-sm sm:text-base">Mobile No.</label>
            <input
              type="text"
              name="mobileno"
              className="w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0073FF]"
              value={formData.mobileno}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block font-medium text-sm sm:text-base">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0073FF]"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-red-500 text-xs sm:text-sm">{errors.password}</p>}
          </div>

          {/* Terms & Conditions */}
          <div className="mt-4">
            <label className="flex items-center text-sm sm:text-base">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <span className="ml-2">I agree to the Terms & Conditions <span className="text-red-500">*</span></span>
            </label>
            {errors.agreeTerms && <p className="text-red-500 text-xs sm:text-sm">{errors.agreeTerms}</p>}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-[#0073FF] text-white py-3 rounded-md text-sm sm:text-lg hover:bg-[#005FCC] transition-all"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
