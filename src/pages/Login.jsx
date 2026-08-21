import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTasks,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaGoogle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // =========================
  // HANDLE INPUT
  // =========================
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

  // =========================
  // VALIDATION
  // =========================
  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
        formData.email
      )
    ) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // =========================
  // LOGIN
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const response = await login(
        formData.email.trim(),
        formData.password
      );

      console.log("Login Success:", response);

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login Error:", error);

      setErrors({
        server:
          error.response?.data?.message ||
          "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8 relative overflow-hidden">

      {/* ================= BACKGROUND ================= */}

      <div className="absolute -top-32 -left-32 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />

      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      {/* ================= MAIN CARD ================= */}

      <div className="relative w-full max-w-5xl min-h-[650px] bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* ================= LEFT ================= */}

        <div className="hidden lg:flex bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-950 p-10 flex-col justify-between relative overflow-hidden">

          {/* Decorative Circles */}

          <div className="absolute -top-20 -right-20 w-64 h-64 border border-white/10 rounded-full" />

          <div className="absolute bottom-10 -left-20 w-64 h-64 border border-white/10 rounded-full" />

          {/* Floating Icon */}

          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-12 right-12 text-white/20 text-7xl"
          >
            <FaTasks />
          </motion.div>

          {/* Logo */}

          <div className="relative z-10 flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md">
              <FaTasks className="text-white text-xl" />
            </div>

            <span className="text-white text-2xl font-bold">
              TaskFlow
            </span>

          </div>

          {/* Main Content */}

          <div className="relative z-10 max-w-md">

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
            >

              <p className="text-cyan-100 text-sm font-medium mb-4">
                SMART TASK MANAGEMENT
              </p>

              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                Welcome Back.
                <br />
                Stay Productive.
              </h1>

              <p className="text-white/75 mt-6 leading-7">
                Organize your tasks, manage priorities,
                track deadlines, and accomplish more
                with TaskFlow.
              </p>

            </motion.div>

            {/* Features */}

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3 text-white/90">
                <FaCheckCircle className="text-cyan-300" />

                <span className="text-sm">
                  Smart task management
                </span>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                <FaCheckCircle className="text-cyan-300" />

                <span className="text-sm">
                  Priorities and deadlines
                </span>
              </div>

              <div className="flex items-center gap-3 text-white/90">
                <FaCheckCircle className="text-cyan-300" />

                <span className="text-sm">
                  Track your productivity
                </span>
              </div>

            </div>

          </div>

          <p className="relative z-10 text-white/50 text-xs">
            © 2026 TaskFlow. Manage smarter. Work better.
          </p>

        </div>

        {/* ================= RIGHT ================= */}

        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">

          {/* Mobile Logo */}

          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
              <FaTasks className="text-white" />
            </div>

            <span className="text-white text-2xl font-bold">
              TaskFlow
            </span>

          </div>

          <div className="max-w-md w-full mx-auto">

            {/* Heading */}

            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Sign In
            </h2>

            <p className="text-gray-400 text-sm mt-2 mb-8">
              Welcome back! Please enter your details.
            </p>

            {/* Server Error */}

            <AnimatePresence>
              {errors.server && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="mb-5 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-sm"
                >
                  {errors.server}
                </motion.div>
              )}
            </AnimatePresence>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* ================= EMAIL ================= */}

              <motion.div
                animate={
                  errors.email
                    ? {
                        x: [-7, 7, -7, 7, 0],
                      }
                    : {}
                }
              >

                <label className="text-gray-300 text-sm block mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`w-full h-12 pl-11 pr-4 bg-slate-900/80 rounded-xl border ${
                      errors.email
                        ? "border-red-500"
                        : "border-slate-700"
                    } text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10`}
                  />

                </div>

                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      className="text-red-400 text-xs mt-2"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>

              </motion.div>

              {/* ================= PASSWORD ================= */}

              <motion.div
                animate={
                  errors.password
                    ? {
                        x: [-7, 7, -7, 7, 0],
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
                    placeholder="Enter your password"
                    autoComplete="current-password"
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
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition"
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

                {errors.password && (
                  <p className="text-red-400 text-xs mt-2">
                    {errors.password}
                  </p>
                )}

              </motion.div>

              {/* ================= REMEMBER ================= */}

              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-gray-400 cursor-pointer">

                  <input
                    type="checkbox"
                    className="accent-cyan-500"
                  />

                  Remember me

                </label>

                <button
                  type="button"
                  className="text-cyan-400 hover:text-cyan-300 transition"
                >
                  Forgot password?
                </button>

              </div>

              {/* ================= LOGIN BUTTON ================= */}

              <motion.button
                whileHover={{
                  scale: loading ? 1 : 1.01,
                }}
                whileTap={{
                  scale: loading ? 1 : 0.98,
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
                  ? "Signing In..."
                  : "Sign In"}

              </motion.button>

              {/* ================= DIVIDER ================= */}

              <div className="flex items-center gap-3 py-1">

                <div className="flex-1 h-px bg-slate-800" />

                <span className="text-gray-500 text-xs">
                  OR
                </span>

                <div className="flex-1 h-px bg-slate-800" />

              </div>

              {/* ================= GOOGLE ================= */}

              <button
                type="button"
                className="w-full h-12 border border-slate-700 rounded-xl flex items-center justify-center gap-3 text-gray-200 hover:bg-white/5 hover:border-slate-600 transition"
              >
                <FaGoogle />

                Continue with Google
              </button>

              {/* ================= REGISTER ================= */}

              <p className="text-center text-gray-500 text-sm pt-2">

                Don't have an account?

                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-cyan-400 ml-2 hover:text-cyan-300 font-medium transition"
                >
                  Create Account
                </button>

              </p>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;