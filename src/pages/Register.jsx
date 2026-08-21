import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaPlaneDeparture,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      server: "",
    }));
  };

  // Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email field is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Confirm password is required";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Password strength
  const passwordStrength = () => {
    if (!formData.password) return "";

    if (formData.password.length < 6) {
      return "Weak";
    }

    if (formData.password.length < 10) {
      return "Medium";
    }

    return "Strong";
  };

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password
      );

      console.log("Registration Success:", response);

      // Registration successful
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);

      setErrors({
        server:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="relative w-full max-w-5xl min-h-[650px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* ================= LEFT ================= */}
        <div className="hidden lg:flex bg-gradient-to-br from-cyan-600 via-blue-700 to-slate-900 p-10 flex-col justify-center relative overflow-hidden">

          {/* Airplane */}
          <motion.div
            animate={{
              x: [0, 20, 0],
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-10 right-10 text-white/20 text-7xl"
          >
            <FaPlaneDeparture />
          </motion.div>

          {/* Decorative circles */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-white/10"
          />

          <div className="relative z-10">

            <p className="text-cyan-100 text-sm font-semibold uppercase tracking-widest mb-4">
              TaskFlow
            </p>

            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
              Organize Your
              <br />
              Work.
              <br />
              <span className="text-cyan-200">
                Achieve More.
              </span>
            </h1>

            <p className="text-white/75 mt-6 leading-7 max-w-md">
              Create tasks, manage priorities, track deadlines,
              and stay productive with your personal task
              management workspace.
            </p>

            <div className="mt-8 space-y-4 text-white/90 text-sm">

              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  ✓
                </span>
                <span>Manage your tasks easily</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  ✓
                </span>
                <span>Track deadlines and priorities</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  ✓
                </span>
                <span>Stay organized and productive</span>
              </div>

            </div>
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">

          <div className="w-full max-w-md mx-auto">

            {/* Heading */}
            <div className="mb-7">

              <h2 className="text-3xl font-bold text-white">
                Create Account
              </h2>

              <p className="text-gray-400 text-sm mt-2">
                Create your TaskFlow account and start managing
                your work.
              </p>

            </div>

            {/* Server Error */}
            <AnimatePresence>
              {errors.server && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                >
                  {errors.server}
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* ================= NAME ================= */}
              <motion.div
                animate={
                  errors.name
                    ? {
                        x: [-8, 8, -8, 8, 0],
                      }
                    : {}
                }
              >
                <label className="text-gray-300 text-sm block mb-2">
                  Full Name
                </label>

                <div className="relative">

                  <FaUser className="absolute left-3 top-3.5 text-gray-500" />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    className={`w-full h-12 pl-10 pr-4 bg-slate-900/80 rounded-xl border ${
                      errors.name
                        ? "border-red-500"
                        : "border-slate-700"
                    } text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10`}
                  />

                </div>

                {errors.name && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.name}
                  </p>
                )}
              </motion.div>

              {/* ================= EMAIL ================= */}
              <motion.div
                animate={
                  errors.email
                    ? {
                        x: [-8, 8, -8, 8, 0],
                      }
                    : {}
                }
              >
                <label className="text-gray-300 text-sm block mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <FaEnvelope className="absolute left-3 top-3.5 text-gray-500" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`w-full h-12 pl-10 pr-4 bg-slate-900/80 rounded-xl border ${
                      errors.email
                        ? "border-red-500"
                        : "border-slate-700"
                    } text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10`}
                  />

                </div>

                {errors.email && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.email}
                  </p>
                )}
              </motion.div>

              {/* ================= PASSWORD ================= */}
              <motion.div
                animate={
                  errors.password
                    ? {
                        x: [-8, 8, -8, 8, 0],
                      }
                    : {}
                }
              >
                <label className="text-gray-300 text-sm block mb-2">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    autoComplete="new-password"
                    className={`w-full h-12 px-4 pr-12 bg-slate-900/80 rounded-xl border ${
                      errors.password
                        ? "border-red-500"
                        : "border-slate-700"
                    } text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition"
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

                {/* Password Strength */}
                {formData.password && (
                  <p
                    className={`text-xs mt-1.5 ${
                      passwordStrength() === "Weak"
                        ? "text-red-400"
                        : passwordStrength() === "Medium"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    Password strength:{" "}
                    {passwordStrength()}
                  </p>
                )}

                {errors.password && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.password}
                  </p>
                )}
              </motion.div>

              {/* ================= CONFIRM PASSWORD ================= */}
              <motion.div
                animate={
                  errors.confirmPassword
                    ? {
                        x: [-8, 8, -8, 8, 0],
                      }
                    : {}
                }
              >
                <label className="text-gray-300 text-sm block mb-2">
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className={`w-full h-12 px-4 pr-12 bg-slate-900/80 rounded-xl border ${
                      errors.confirmPassword
                        ? "border-red-500"
                        : "border-slate-700"
                    } text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-white transition"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1.5">
                    {errors.confirmPassword}
                  </p>
                )}
              </motion.div>

              {/* ================= BUTTON ================= */}
              <motion.button
                whileHover={{
                  scale: loading ? 1 : 1.02,
                }}
                whileTap={{
                  scale: loading ? 1 : 0.97,
                }}
                type="submit"
                disabled={loading}
                className={`w-full h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/10 transition ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:from-cyan-400 hover:to-blue-500"
                }`}
              >
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </motion.button>

              {/* ================= LOGIN ================= */}
              <p className="text-center text-gray-400 text-sm pt-2">

                Already have an account?

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-cyan-400 ml-2 hover:text-cyan-300 transition font-medium"
                >
                  Sign In
                </button>

              </p>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;