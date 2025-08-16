import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package2, LayoutGrid, CheckSquare, Users, ArrowRight } from "lucide-react";

export default function App() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      {/* Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span>Project Manager's Tool</span>
        </Link>
        <nav>
          <Button asChild variant="outline">
            <a href="https://github.com/shadcn" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="max-w-3xl space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Streamline Your Workflow, Deliver Projects Faster
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Our intuitive project management tool helps you organize tasks,
                  track progress, and collaborate seamlessly with your team.
                </p>
              </div>
              <Button asChild size="lg">
                <Link to="/projects">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-background py-20 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Features Built for Productivity
              </h2>
              <p className="mt-2 text-muted-foreground">
                Everything you need to take your projects from idea to launch.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Card>
                <CardHeader className="items-center text-center">
                  <LayoutGrid className="mb-4 h-10 w-10 text-primary" />
                  <CardTitle>Project Organization</CardTitle>
                  <CardDescription>
                    Keep all your projects and tasks neatly organized in one central place.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="items-center text-center">
                  <CheckSquare className="mb-4 h-10 w-10 text-primary" />
                  <CardTitle>Task Tracking</CardTitle>
                  <CardDescription>
                    Monitor task progress from "To Do" to "Done" with clear status indicators.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="items-center text-center">
                  <Users className="mb-4 h-10 w-10 text-primary" />
                  <CardTitle>Team Collaboration</CardTitle>
                  <CardDescription>
                    Assign tasks and keep your team aligned towards common project goals.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}