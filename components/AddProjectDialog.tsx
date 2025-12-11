"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addProject } from "@/app/actions"; // Import our server action

export function AddProjectDialog() {
  const [open, setOpen] = useState(false);

  // We wrap the server action to close the modal on success
  async function handleSubmit(formData: FormData) {
    const result = await addProject(formData);
    if (result.success) {
      setOpen(false); // Close the dialog
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Enter the details of your new idea or site.
          </DialogDescription>
        </DialogHeader>
        
        {/* The form automatically passes FormData to the action */}
        <form action={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" name="name" placeholder="e.g. HostMyWeb" required />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="status">Status</Label>
            <Select name="status" defaultValue="idea">
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idea">🔵 Idea</SelectItem>
                <SelectItem value="in-progress">🟡 In Progress</SelectItem>
                <SelectItem value="active">🟢 Active</SelectItem>
                <SelectItem value="dormant">⚪ Dormant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="url">Live URL (Optional)</Label>
            <Input id="url" name="url" placeholder="https://..." />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="repo">GitHub Repo (Optional)</Label>
            <Input id="repo" name="repo" placeholder="github.com/username/repo" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="Short description..." />
          </div>

          <DialogFooter>
            <Button type="submit">Save Project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}