import { ExternalLink, Github, Plus, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// --- MOCK DATA (We will replace this with Supabase data later) ---
const projects = [
  {
    id: 1,
    name: "HostMyWeb Main",
    status: "active",
    url: "https://hostmyweb.co",
    repo: "github.com/rawillia9801/hostmyweb",
    description: "The main landing page for the hosting business.",
  },
  {
    id: 2,
    name: "Personal Blog Idea",
    status: "idea",
    url: null,
    repo: null,
    description: "Concept for a tech blog using MDX.",
  },
  {
    id: 3,
    name: "Crypto Tracker",
    status: "dormant",
    url: "https://crypto-track-demo.vercel.app",
    repo: "github.com/rawillia9801/crypto-track",
    description: "Old project from 2021, needs updates.",
  },
  {
    id: 4,
    name: "Task Master App",
    status: "in-progress",
    url: "https://task-master-beta.vercel.app",
    repo: "github.com/rawillia9801/task-master",
    description: "Kanban board built with React.",
  },
];

// Helper to color-code statuses
const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "default"; // Black/White
    case "in-progress": return "secondary"; // Gray
    case "idea": return "outline"; // White/Border
    case "dormant": return "destructive"; // Red
    default: return "secondary";
  }
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Project Incubator</h1>
          <p className="text-slate-500">Manage your 26 ideas, active sites, and dormant projects.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      {/* STATS OVERVIEW */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
          </CardContent>
        </Card>
        {/* You can add more summary cards here later */}
      </div>

      {/* PROJECT GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{project.name}</CardTitle>
                <Badge variant={getStatusColor(project.status) as "default" | "secondary" | "outline" | "destructive"}>
                  {project.status}
                </Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Content placeholder */}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4 bg-slate-50/50">
              {project.repo ? (
                <a href={`https://${project.repo}`} target="_blank" rel="noreferrer" className="text-sm text-slate-500 hover:text-black flex items-center">
                  <Github className="mr-1 h-3 w-3" /> Repo
                </a>
              ) : (
                <span className="text-sm text-slate-300 flex items-center cursor-not-allowed">
                   <Github className="mr-1 h-3 w-3" /> No Repo
                </span>
              )}

              {project.url ? (
                <a href={project.url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline flex items-center">
                  Visit Site <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              ) : (
                <span className="text-sm text-slate-300 flex items-center cursor-not-allowed">
                  Not Deployed
                </span>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}