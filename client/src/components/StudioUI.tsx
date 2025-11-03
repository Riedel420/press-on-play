import { useState } from "react";
import { ColorPicker } from "./ColorPicker";
import { NailControls } from "./NailControls";
import { TemplateLibrary } from "./TemplateLibrary";
import { ToolPanel } from "./ToolPanel";
import { ProjectManager } from "./ProjectManager";
import { useNailDesign, type HandPose, type ViewMode } from "@/lib/stores/useNailDesign";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Palette,
  Layers,
  BookTemplate,
  Save,
  Volume2,
  VolumeX,
  HelpCircle,
} from "lucide-react";
import { useAudio } from "@/lib/stores/useAudio";

export function StudioUI() {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  
  const { handPose, setHandPose, viewMode, setViewMode, toggleTutorial, showTutorial } = useNailDesign();
  const { isMuted, toggleMute } = useAudio();

  const poses: { value: HandPose; label: string }[] = [
    { value: "relaxed", label: "Relaxed" },
    { value: "spread", label: "Spread" },
    { value: "fist", label: "Fist" },
  ];

  const views: { value: ViewMode; label: string }[] = [
    { value: "full_hand", label: "Full Hand" },
    { value: "gallery", label: "Gallery" },
    { value: "detail", label: "Detail" },
  ];

  return (
    <>
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
        <Button
          onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          variant="outline"
          size="sm"
          className="bg-gray-900/90 backdrop-blur border-gray-700 hover:bg-gray-800"
        >
          {leftPanelOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </Button>

        {leftPanelOpen && (
          <div className="w-80 max-h-[calc(100vh-2rem)] overflow-y-auto space-y-3">
            <Tabs defaultValue="tools" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-900/90 backdrop-blur border border-gray-700">
                <TabsTrigger value="tools">
                  <Settings className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="colors">
                  <Palette className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="templates">
                  <BookTemplate className="w-4 h-4" />
                </TabsTrigger>
                <TabsTrigger value="save">
                  <Save className="w-4 h-4" />
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tools" className="space-y-3 mt-3">
                <ToolPanel />
                <NailControls />
              </TabsContent>

              <TabsContent value="colors" className="mt-3">
                <ColorPicker />
              </TabsContent>

              <TabsContent value="templates" className="mt-3">
                <TemplateLibrary />
              </TabsContent>

              <TabsContent value="save" className="mt-3">
                <ProjectManager />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          onClick={() => setRightPanelOpen(!rightPanelOpen)}
          variant="outline"
          size="sm"
          className="bg-gray-900/90 backdrop-blur border-gray-700 hover:bg-gray-800"
        >
          {rightPanelOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>

        {rightPanelOpen && (
          <Card className="w-64 p-4 bg-gray-900/90 backdrop-blur text-white border-gray-700">
            <h3 className="text-sm font-semibold mb-3">Settings</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs mb-2 block">Hand Pose</label>
                <div className="grid grid-cols-3 gap-1">
                  {poses.map((pose) => (
                    <Button
                      key={pose.value}
                      onClick={() => setHandPose(pose.value)}
                      variant={handPose === pose.value ? "default" : "outline"}
                      size="sm"
                      className={`text-xs ${
                        handPose === pose.value
                          ? "bg-pink-600"
                          : "bg-gray-800 border-gray-600"
                      }`}
                    >
                      {pose.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs mb-2 block">View Mode</label>
                <div className="grid grid-cols-3 gap-1">
                  {views.map((view) => (
                    <Button
                      key={view.value}
                      onClick={() => setViewMode(view.value)}
                      variant={viewMode === view.value ? "default" : "outline"}
                      size="sm"
                      className={`text-xs ${
                        viewMode === view.value
                          ? "bg-pink-600"
                          : "bg-gray-800 border-gray-600"
                      }`}
                    >
                      {view.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={toggleMute}
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-gray-800 border-gray-600"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={toggleTutorial}
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-gray-800 border-gray-600"
                >
                  <HelpCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <Card className="px-6 py-3 bg-gray-900/90 backdrop-blur text-white border-gray-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Press-On Play
          </h1>
          <p className="text-xs text-gray-400 text-center">3D Nail Design Studio</p>
        </Card>
      </div>

      {showTutorial && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <Card className="max-w-2xl p-8 bg-gray-900 text-white border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Welcome to Press-On Play! 💅</h2>
            
            <div className="space-y-3 text-sm mb-6">
              <p>🎨 <strong>Getting Started:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Click on nails to select them (hold Shift for multiple)</li>
                <li>Use the color picker to choose your colors</li>
                <li>Try different nail shapes and lengths</li>
                <li>Apply templates for quick designs</li>
                <li>Save your projects to continue later</li>
              </ul>
              
              <p>🛠️ <strong>Tools:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Select: Click to choose nails</li>
                <li>Color: Apply solid colors</li>
                <li>Brush: Paint freehand (coming soon)</li>
                <li>Stamp: Add decals (coming soon)</li>
              </ul>
              
              <p>💡 <strong>Tips:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Rotate the hand with mouse drag</li>
                <li>Zoom with mouse wheel</li>
                <li>Use Undo/Redo for mistakes</li>
                <li>Export your design as an image</li>
              </ul>
            </div>
            
            <Button
              onClick={toggleTutorial}
              className="w-full bg-pink-600 hover:bg-pink-700"
            >
              Get Started!
            </Button>
          </Card>
        </div>
      )}
    </>
  );
}
