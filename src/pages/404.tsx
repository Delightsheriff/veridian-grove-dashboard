import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useMoveBack } from "@/hooks/useMoveback";
import { MoveLeft } from "lucide-react";

export default function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Atmospheric Panel */}
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
          {/* Giant 404 Text */}
          <div className="mb-8">
            <h2 className="text-8xl md:text-9xl lg:text-[12rem] font-thin text-muted-foreground/20 leading-none tracking-tight">
              404
            </h2>
          </div>

          {/* Content Card */}
          <Card className="border-none shadow-none bg-transparent">
            <CardTitle className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
              A Path Untraveled.
            </CardTitle>
            <CardContent className="p-0 space-y-6">
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                The page you're looking for seems to have been reclaimed by the
                grove. Let's guide you back to a familiar trail.
              </p>

              <Button
                size="lg"
                className="bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white px-8 py-3 text-base font-medium"
                onClick={moveBack}
              >
                <MoveLeft className="mr-2 h-5 w-5" />
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
