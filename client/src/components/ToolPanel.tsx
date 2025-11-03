import { useNailDesign, type Tool } from "@/lib/stores/useNailDesign";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
import { Brush, Hand, Stamp, Palette, Eraser } from "lucide-react";

export function ToolPanel() {
  const {
    currentTool,
    setTool,
    brushSize,
    setBrushSize,
    brushOpacity,
    setBrushOpacity,
    brushHardness,
    setBrushHardness,
  } = useNailDesign();

  const tools: { id: Tool; label: string; icon: typeof Hand }[] = [
    { id: "select", label: "Select", icon: Hand },
    { id: "color", label: "Color", icon: Palette },
    { id: "brush", label: "Brush", icon: Brush },
    { id: "stamp", label: "Stamp", icon: Stamp },
    { id: "eraser", label: "Eraser", icon: Eraser },
  ];

  return (
    <Card className="p-4 bg-gray-900 text-white border-gray-700">
      <h3 className="text-lg font-semibold mb-3">Tools</h3>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Button
              key={tool.id}
              onClick={() => setTool(tool.id)}
              variant={currentTool === tool.id ? "default" : "outline"}
              className={`flex flex-col items-center h-auto py-3 ${
                currentTool === tool.id
                  ? "bg-pink-600 hover:bg-pink-700"
                  : "bg-gray-800 border-gray-600 hover:bg-gray-700"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{tool.label}</span>
            </Button>
          );
        })}
      </div>

      {currentTool === "brush" && (
        <div className="space-y-4 pt-4 border-t border-gray-700">
          <div>
            <label className="text-sm mb-2 block">
              Brush Size: {brushSize}px
            </label>
            <Slider
              value={[brushSize]}
              onValueChange={(v) => setBrushSize(v[0])}
              min={1}
              max={50}
              step={1}
            />
          </div>

          <div>
            <label className="text-sm mb-2 block">
              Opacity: {(brushOpacity * 100).toFixed(0)}%
            </label>
            <Slider
              value={[brushOpacity]}
              onValueChange={(v) => setBrushOpacity(v[0])}
              min={0}
              max={1}
              step={0.01}
            />
          </div>

          <div>
            <label className="text-sm mb-2 block">
              Hardness: {(brushHardness * 100).toFixed(0)}%
            </label>
            <Slider
              value={[brushHardness]}
              onValueChange={(v) => setBrushHardness(v[0])}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>
      )}
    </Card>
  );
}
