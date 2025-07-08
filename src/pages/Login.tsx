import LoginForm from "@/components/ui/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Atmospheric Panel - Identical to previous designs */}
      <div className="relative w-full md:w-2/5 h-64 md:h-screen bg-gradient-to-b from-green-800 to-green-950 dark:from-green-900 dark:to-gray-950">
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
          <h1 className="text-white text-sm md:text-base font-light uppercase tracking-[0.2em] md:tracking-[0.3em]">
            Veridian Grove
          </h1>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 bg-background flex items-center justify-center p-6 md:p-12">
        <LoginForm />
      </div>
    </div>
  );
}
