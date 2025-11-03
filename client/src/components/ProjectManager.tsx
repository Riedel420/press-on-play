import { useState } from "react";
import { useNailDesign } from "@/lib/stores/useNailDesign";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Save, FolderOpen, Trash2, Download, Upload } from "lucide-react";

export function ProjectManager() {
  const {
    saveProject,
    loadProject,
    getProjectList,
    undo,
    redo,
    historyIndex,
    history,
    clearAllNails,
  } = useNailDesign();

  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<string[]>(getProjectList());

  const handleSave = () => {
    if (!projectName.trim()) {
      alert("Please enter a project name");
      return;
    }
    saveProject(projectName);
    setProjects(getProjectList());
    alert(`Project "${projectName}" saved!`);
  };

  const handleLoad = (name: string) => {
    loadProject(name);
    alert(`Project "${name}" loaded!`);
  };

  const handleDelete = (name: string) => {
    if (confirm(`Delete project "${name}"?`)) {
      localStorage.removeItem(`nail-project-${name}`);
      setProjects(getProjectList());
    }
  };

  const handleExport = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `nail-design-${Date.now()}.png`;
          a.click();
          URL.revokeObjectURL(url);
        }
      });
    }
  };

  return (
    <Card className="p-4 bg-gray-900 text-white border-gray-700">
      <h3 className="text-lg font-semibold mb-3">Project Manager</h3>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={undo}
            disabled={historyIndex <= 0}
            variant="outline"
            className="flex-1 bg-gray-800 border-gray-600 hover:bg-gray-700"
            size="sm"
          >
            ↶ Undo
          </Button>
          <Button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            variant="outline"
            className="flex-1 bg-gray-800 border-gray-600 hover:bg-gray-700"
            size="sm"
          >
            ↷ Redo
          </Button>
        </div>

        <div>
          <label className="text-sm mb-2 block">Save Project</label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-gray-800 border-gray-600"
            />
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="text-sm mb-2 block">Saved Projects</label>
          <ScrollArea className="h-32 border border-gray-700 rounded-md p-2 bg-gray-800">
            {projects.length === 0 ? (
              <p className="text-xs text-gray-400 text-center py-4">
                No saved projects
              </p>
            ) : (
              <div className="space-y-1">
                {projects.map((project) => (
                  <div
                    key={project}
                    className="flex items-center justify-between p-2 bg-gray-700 rounded text-sm"
                  >
                    <span className="flex-1 truncate">{project}</span>
                    <div className="flex gap-1">
                      <Button
                        onClick={() => handleLoad(project)}
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                      >
                        <FolderOpen className="w-3 h-3" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(project)}
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        <div className="space-y-2">
          <Button
            onClick={handleExport}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Screenshot
          </Button>
          
          <Button
            onClick={clearAllNails}
            variant="destructive"
            className="w-full"
          >
            Clear All Nails
          </Button>
        </div>
      </div>
    </Card>
  );
}
