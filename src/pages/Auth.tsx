import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckSquare, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 gradient-primary opacity-10" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <Card className="glass-card shadow-glow p-8 w-full max-w-md relative z-10 animate-scale-in">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shadow-glow">
            <CheckSquare className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            TaskFlow
          </span>
        </div>

        <div className="space-y-6">
          {/* Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-md font-medium transition-smooth ${
                isLogin ? "bg-card shadow-soft" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md font-medium transition-smooth ${
                !isLogin ? "bg-card shadow-soft" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="glass-card"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="glass-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="glass-card pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="glass-card"
                />
              </div>
            )}

            {isLogin ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline">
                    Terms & Conditions
                  </a>
                </label>
              </div>
            )}

            <Button className="w-full gradient-primary shadow-medium hover:shadow-glow transition-smooth" size="lg">
              {isLogin ? "Login" : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </div>

          <div className="text-center">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              ← Back to home
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
