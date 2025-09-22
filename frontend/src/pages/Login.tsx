import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import logo from "../assets/logo.svg";
import { HiXCircle, HiMail, HiArrowRight } from "react-icons/hi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("userEmail", email);
    toast.success("Email successfully saved!");
    navigate("/");
  };

  return (
    <Layout>
      <div className="relative">
        <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-[var(--color-logo-yellow)] via-[var(--color-success)] to-[var(--color-logo-teal)] opacity-75 blur-xl"></div>

        <div className="relative min-w-120 min-h-130 bg-base-100 rounded-2xl pt-6">
          <div className="relative p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-teal-400 rounded-full blur-lg opacity-20 scale-110"></div>
                <div className="relative bg-gradient-to-r from-yellow-400/10 to-teal-400/10 p-4 rounded-full border border-yellow-400/20">
                  <img
                    src={logo}
                    alt="Chat icon"
                    className="w-12 h-12 opacity-90"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
                  Welcome!
                </h1>
                <p className="text-base-content/60 text-lg">
                  Sign in to chat with the PDF Assistant
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <HiMail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="input input-bordered w-full pl-12 h-14 text-base bg-base-100/50 border-base-300/50 focus:border-primary/50 transition-all duration-200"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!email.trim()}
                className="btn btn-primary w-full h-12 text-base font-semibold relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:shadow-primary/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                Continue
                <HiArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </form>

            {error && (
              <div className="mt-6 animate-in slide-in-from-top-2 duration-500">
                <div className="alert bg-error/10 border border-error/20 text-error rounded-xl">
                  <HiXCircle className="h-5 w-5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium">{error}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
