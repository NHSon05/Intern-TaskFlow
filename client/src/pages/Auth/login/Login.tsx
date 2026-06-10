import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "@/pages/Auth/components/AuthCard";
import AuthHeader from "@/pages/Auth/components/AuthHeader";
import PasswordInput from "@/components/ui/PasswordInput";
import TextInput from "@/components/ui/TextInput";
import type { LoginErrors, LoginRequest } from "@/types/auth.type";
import { validateLogin } from "@/utils/auth-validation";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";


const defaultValues: LoginRequest = {
  email: "",
  password: "",
};

export default function Login() {

  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState<LoginRequest>(defaultValues);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const { login } = useAuth()
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setErrors((prev) => ({ ...prev, [event.target.name]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    const validationErrors = validateLogin(values)
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await login.mutateAsync(values);

      setIsLoading(true)
      await login.mutateAsync(values)
      toast.success("Login successfully")
      navigate('/dashboard')
    } catch (error: any) {
      toast.error("Login failed, email or password is incorrect")
      setErrors((prev) => ({
        ...prev,
        serverError: error.message || "Login failed, email or password is incorrect" 
      }));
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <AuthHeader currentPage="login" />

      <div className="absolute inset-x-0 top-0 h-72 bg-slate-100/40" />
      <main className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-20 sm:px-8 sm:py-24">
        <div className="w-full max-w-[420px] mx-auto ">
          <AuthCard
            title="Welcome back"
            subtitle="Sign in to your TaskFlow account"
            footer={
              <p className="text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-sky-600 transition hover:text-sky-700"
                >
                  Sign up
                </Link>
              </p>
            }
          >
            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <TextInput
                label="Email address"
                name="email"
                type="email"
                value={values.email}
                placeholder="Enter your email"
                autoComplete="email"
                error={submitted ? errors.email : undefined}
                onChange={handleChange}
              />

              <PasswordInput
                label="Password"
                name="password"
                value={values.password}
                placeholder="Enter your password"
                autoComplete="current-password"
                error={submitted ? errors.password : undefined}
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-200 active:scale-[0.98] hover:bg-sky-400 focus-visible:ring-2 focus-visible:ring-sky-500/80 focus-visible:outline-none"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </AuthCard>
        </div>
      </main>
    </div>
  );
}
