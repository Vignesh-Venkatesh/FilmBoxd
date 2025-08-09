import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      //  if login failed
      if (response.error) {
        setError(response.error.message || "Login failed.");
      } else {
        // if login successful
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-google flex justify-center items-center h-screen">
      <div className="w-120 p-6 shadow-lg rounded-lg bg-base-200">
        {/* title */}
        <div className="mb-6">
          <h1 className="text-md">FilmBoxd</h1>
          <h1 className="text-3xl font-bold">Login</h1>
        </div>

        {/* inputs */}
        <div className="space-y-4">
          {/* email */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg opacity-50">
              Email
            </legend>
            <input
              type="email"
              className="input w-full"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>

          {/* password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg opacity-50">
              Password
            </legend>
            <input
              type="password"
              className="input w-full"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>

          {/* error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* login button */}
          <button
            className="btn btn-primary w-full mt-2"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>

          {/* signup link */}
          <p className="text-center text-sm mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
