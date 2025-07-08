import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TriangleAlert, RefreshCw } from "lucide-react";

interface ErrorBoundaryFallbackProps {
  resetErrorBoundary?: () => void;
}

export default function ErrorBoundaryFallback({
  resetErrorBoundary,
}: ErrorBoundaryFallbackProps) {
  const handleRefresh = () => {
    if (resetErrorBoundary) {
      resetErrorBoundary();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Atmospheric Panel - Identical to 404 page */}
      <div className="relative w-full md:w-2/5 h-64 md:h-screen bg-gradient-to-b from-green-800 to-green-950 dark:from-green-900 dark:to-gray-950">
        <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
          <h1 className="text-white text-sm md:text-base font-light uppercase tracking-[0.2em] md:tracking-[0.3em]">
            Veridian Grove
          </h1>
        </div>
      </div>

      {/* Right Content Panel */}
      <div className="flex-1 bg-background flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-lg">
          {/* Alert Icon */}
          <div className="mb-8 flex justify-start">
            <TriangleAlert className="h-16 w-16 md:h-20 md:w-20 text-amber-600 dark:text-amber-500" />
          </div>

          {/* Content Card */}
          <Card className="border-none shadow-none bg-transparent">
            <CardTitle className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
              A Moment of Stillness.
            </CardTitle>
            <CardContent className="p-0 space-y-6">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                It seems we've encountered an unexpected pause. Our team is
                aware and is clearing the path. Please try refreshing to
                continue your journey.
              </p>

              <Button
                variant="outline"
                size="lg"
                onClick={handleRefresh}
                className="px-8 py-3 text-base font-medium border-green-700 text-green-700 hover:bg-green-50 dark:border-green-600 dark:text-green-600 dark:hover:bg-green-950 bg-transparent"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Refresh View
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
