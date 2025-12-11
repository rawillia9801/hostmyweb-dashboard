import { ExternalLink, Github, LayoutDashboard } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase"; 
import { AddProjectDialog } from "@/components/AddProjectDialog";

// Helper to color-code statuses
const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "default";
    case "in-progress": return "secondary";
    case "idea": return "outline";
    case "dormant": return "destructive";
    default: return "secondary";
  }
};

export default async function Dashboard() {
  
  // Fetch data directly from Supabase
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  // Safe fallback if data is missing
  const projectList = projects || [];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* HEADER: Title on Left, Add Button on Right */}
      <div className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Project Incubator</h1>
          <p className="text-slate-500">Manage your 26 ideas, active sites, and dormant projects.</p>
        </div>
        
        {/* The Add Project Modal Button */}
        <AddProjectDialog />
      </div>

      {/* STATS OVERVIEW */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <LayoutDashboard className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectList.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* PROJECT GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectList.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl truncate pr-2">{project.name}</CardTitle>
                <Badge variant={getStatusColor(project.status) as "default" | "secondary" | "outline" | "destructive"}>
                  {project.status}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {/* Content placeholder */}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4 bg-slate-50/50">
              {project.repo ? (
                <a 
                  href={project.repo.startsWith('http') ? project.repo : `https://${project.repo}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-sm text-slate-500 hover:text-black flex items-center"
                >
                  <Github className="mr-1 h-3 w-3" /> Repo
                </a>
              ) : (
                <span className="text-sm text-slate-300 flex items-center cursor-not-allowed">
                   <Github className="mr-1 h-3 w-3" /> No Repo
                </span>
              )}

              {project.url ? (
                <a 
                  href={project.url.startsWith('http') ? project.url : `https://${project.url}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-sm text-blue-600 hover:underline flex items-center"
                >
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