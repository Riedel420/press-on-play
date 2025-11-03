import { useNailDesign, type NailShape } from "@/lib/stores/useNailDesign";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function NailControls() {
  const {
    nails,
    selectedNails,
    setNailShape,
    setNailLength,
    clearNail,
    selectAllNails,
    deselectAll
  } = useNailDesign();

  const shapes: { value: NailShape; label: string }[] = [
    { value: "square", label: "Square" },
    { value: "rounded", label: "Rounded" },
    { value: "stiletto", label: "Stiletto" },
    { value: "almond", label: "Almond" },
    { value: "coffin", label: "Coffin" },
    { value: "oval", label: "Oval" },
  ];

  const averageLength =
    selectedNails.length > 0
      ? selectedNails.reduce((sum, id) => sum + nails[id].length, 0) / selectedNails.length
      : 0.5;

  return (
    <Card className="p-4 bg-gray-900 text-white border-gray-700">
      <h3 className="text-lg font-semibold mb-3">Nail Controls</h3>

      <Tabs defaultValue="shape" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="shape">Shape</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="shape" className="space-y-3 mt-3">
          <div>
            <label className="text-sm mb-2 block">Nail Shape</label>
            <div className="grid grid-cols-2 gap-2">
              {shapes.map((shape) => (
                <Button
                  key={shape.value}
                  onClick={() => setNailShape(shape.value)}
                  variant="outline"
                  className="bg-gray-800 border-gray-600 hover:bg-gray-700"
                  disabled={selectedNails.length === 0}
                >
                  {shape.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm mb-2 block">
              Nail Length: {averageLength.toFixed(2)}
            </label>
            <Slider
              value={[averageLength]}
              onValueChange={(v) => setNailLength(v[0])}
              min={0}
              max={1}
              step={0.01}
              disabled={selectedNails.length === 0}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Short</span>
              <span>Long</span>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-3 mt-3">
          <div className="space-y-2">
            <label className="text-sm mb-2 block">Selection</label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={selectAllNails}
                variant="outline"
                className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-xs"
              >
                Select All
              </Button>
              <Button
                onClick={deselectAll}
                variant="outline"
                className="bg-gray-800 border-gray-600 hover:bg-gray-700 text-xs"
              >
                Deselect All
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm mb-2 block">Quick Actions</label>
            <div className="space-y-2">
              {selectedNails.length === 1 && (
                <Button
                  onClick={() => clearNail(selectedNails[0])}
                  variant="destructive"
                  className="w-full"
                >
                  Clear Nail #{selectedNails[0] + 1}
                </Button>
              )}
              {selectedNails.length > 1 && (
                <Button
                  onClick={() => selectedNails.forEach(id => clearNail(id))}
                  variant="destructive"
                  className="w-full"
                >
                  Clear {selectedNails.length} Nails
                </Button>
              )}
            </div>
          </div>

          <div className="text-xs text-gray-400 mt-4">
            <p>💡 Click nails to select them</p>
            <p>💡 Hold Shift to select multiple</p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
