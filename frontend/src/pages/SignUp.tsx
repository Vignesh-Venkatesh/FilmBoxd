import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarValid, setAvatarValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fallbackAvatar = username ? username.charAt(0).toUpperCase() : "?";

  const handleSignUp = async () => {
    setError("");

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await authClient.signUp.email({
        email,
        password,
        name: username,
        image: avatarUrl || undefined,
      });

      // if better auth returns an error
      if (response.error) {
        console.log(response.error.message);
        if (response.error.code === "FAILED_TO_CREATE_USER") {
          setError("Username already exists.");
        } else if (response.error.code) {
          setError(response.error.message || "Sign up failed.");
        }
      } else {
        // if sign up is successful
        navigate("/");
      }
    } catch (err: any) {
      setError(err.message || "Sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-google flex justify-center items-center h-screen">
      <div className="w-120 p-6 shadow-lg rounded-lg bg-base-200">
        {/* title and avatar */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-md">FilmBoxd</h1>
            <h1 className="text-2xl font-bold">SignUp</h1>
          </div>

          {/* avatar display */}
          {avatarUrl && avatarValid ? (
            <div className="avatar">
              <div className="w-20 rounded-full">
                <img
                  src={avatarUrl}
                  alt="Avatar Preview"
                  onError={() => setAvatarValid(false)}
                />
              </div>
            </div>
          ) : (
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-16 rounded-full">
                <span className="text-xl">{fallbackAvatar}</span>
              </div>
            </div>
          )}
        </div>

        {/* inputs */}
        <div className="mt-4 space-y-4">
          {/* username */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg opacity-50">
              Username
            </legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </fieldset>

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

          {/* confirm password */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg opacity-50">
              Confirm Password
            </legend>
            <input
              type="password"
              className="input w-full"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </fieldset>

          {/* avatar URL */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg opacity-50">
              Avatar URL
            </legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Enter Avatar URL"
              value={avatarUrl}
              onChange={(e) => {
                setAvatarUrl(e.target.value);
                setAvatarValid(true);
              }}
            />
          </fieldset>

          {/* error message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* sign up button */}
          <button
            className="btn btn-primary w-full mt-2"
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* login link */}
          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
