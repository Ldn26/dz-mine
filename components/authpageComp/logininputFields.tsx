import React, { useState } from "react";

interface LoginInputFieldsProps {
  formData: {
    username: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginInputFields: React.FC<LoginInputFieldsProps> = ({ formData, handleInputChange }) => {
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const validate = (username: string, value: string) => {
    let error = "";

    if (username === "name") {
      if (!value) {
        error = "Name is required";
      } else if (value.length < 3) {
        error = "Name must be at least 3 characters long";
      }
    }

    if (username === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters long";
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [username]: error }));
  };

  const handleInputChangeWithValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;  // 'name' is typically used for form elements
    handleInputChange(e);
    validate(name, value);  // Pass 'name' instead of 'username'
  };
  
  return (
    <div className="space-y-4">
      {/* Name Field */}
      <div>
        <label htmlFor="username" className="block text-[20px] text-gray-700">Login</label>
        <input
          type="text"
          id="username"
          name="username" 
          value={formData.username}
          onChange={handleInputChangeWithValidation}
          placeholder="Enter your name"
          className={`w-full px-4 py-2 h-[50px] text-[20px] border rounded-md focus:outline-none focus:ring-2 ${
            errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          required
        />
        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-[20px] text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChangeWithValidation}
          placeholder="Enter your password"
          className={`w-full px-4 py-2 h-[50px] text-[20px] border rounded-md focus:outline-none focus:ring-2 ${
            errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
          }`}
          required
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
    </div>
  );
};

export default LoginInputFields;
