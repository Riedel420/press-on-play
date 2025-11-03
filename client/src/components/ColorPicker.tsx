import { useState } from "react";
import { useNailDesign, type Color, type FinishType } from "@/lib/stores/useNailDesign";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Card } from "./ui/card";

export function ColorPicker() {
  const { currentColor, setColor, applyColorToNail, selectedNails, currentFinish, setFinish } = useNailDesign();
  const [localColor, setLocalColor] = useState(currentColor);
  
  const finishes: { value: FinishType; label: string; description: string }[] = [
    { value: "glossy", label: "Glossy", description: "Shiny finish" },
    { value: "matte", label: "Matte", description: "Flat finish" },
    { value: "metallic", label: "Metallic", description: "Metal look" },
    { value: "chrome", label: "Chrome", description: "Mirror finish" },
    { value: "holographic", label: "Holo", description: "Rainbow effect" },
  ];

  const presetColors: Color[] = [
    { r: 255, g: 0, b: 0, a: 1 },
    { r: 255, g: 192, b: 203, a: 1 },
    { r: 255, g: 165, b: 0, a: 1 },
    { r: 255, g: 215, b: 0, a: 1 },
    { r: 0, g: 255, b: 0, a: 1 },
    { r: 0, g: 191, b: 255, a: 1 },
    { r: 0, g: 0, b: 255, a: 1 },
    { r: 128, g: 0, b: 128, a: 1 },
    { r: 255, g: 255, b: 255, a: 1 },
    { r: 0, g: 0, b: 0, a: 1 },
    { r: 192, g: 192, b: 192, a: 1 },
    { r: 255, g: 215, b: 180, a: 1 },
  ];

  const metallicColors: Color[] = [
    { r: 255, g: 215, b: 0, a: 1 },
    { r: 192, g: 192, b: 192, a: 1 },
    { r: 205, g: 127, b: 50, a: 1 },
    { r: 230, g: 230, b: 250, a: 1 },
  ];

  const handleApplyColor = () => {
    setColor(localColor);
    applyColorToNail(localColor);
  };

  const colorToRgbString = (color: Color) => {
    return `rgb(${color.r}, ${color.g}, ${color.b})`;
  };

  return (
    <Card className="p-4 bg-gray-900 text-white border-gray-700">
      <h3 className="text-lg font-semibold mb-3">Color Picker</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm mb-2 block">Custom Color</label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs w-6">R</span>
              <Slider
                value={[localColor.r]}
                onValueChange={(v) => setLocalColor({ ...localColor, r: v[0] })}
                max={255}
                step={1}
                className="flex-1"
              />
              <span className="text-xs w-8">{localColor.r}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-6">G</span>
              <Slider
                value={[localColor.g]}
                onValueChange={(v) => setLocalColor({ ...localColor, g: v[0] })}
                max={255}
                step={1}
                className="flex-1"
              />
              <span className="text-xs w-8">{localColor.g}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs w-6">B</span>
              <Slider
                value={[localColor.b]}
                onValueChange={(v) => setLocalColor({ ...localColor, b: v[0] })}
                max={255}
                step={1}
                className="flex-1"
              />
              <span className="text-xs w-8">{localColor.b}</span>
            </div>
          </div>
          <div
            className="w-full h-12 rounded mt-2 border-2 border-gray-600"
            style={{ backgroundColor: colorToRgbString(localColor) }}
          />
        </div>

        <div>
          <label className="text-sm mb-2 block">Preset Colors</label>
          <div className="grid grid-cols-6 gap-2">
            {presetColors.map((color, index) => (
              <button
                key={index}
                className="w-10 h-10 rounded border-2 border-gray-600 hover:border-white transition-colors"
                style={{ backgroundColor: colorToRgbString(color) }}
                onClick={() => setLocalColor(color)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm mb-2 block">Metallic Colors</label>
          <div className="grid grid-cols-4 gap-2">
            {metallicColors.map((color, index) => (
              <button
                key={index}
                className="w-10 h-10 rounded border-2 border-gray-600 hover:border-white transition-colors"
                style={{ backgroundColor: colorToRgbString(color) }}
                onClick={() => setLocalColor(color)}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm mb-2 block">Finish Type</label>
          <div className="grid grid-cols-3 gap-2">
            {finishes.map((finish) => (
              <Button
                key={finish.value}
                onClick={() => setFinish(finish.value)}
                variant={currentFinish === finish.value ? "default" : "outline"}
                className={`flex flex-col items-center h-auto py-2 text-xs ${
                  currentFinish === finish.value
                    ? "bg-pink-600 hover:bg-pink-700"
                    : "bg-gray-800 border-gray-600 hover:bg-gray-700"
                }`}
              >
                <span className="font-medium">{finish.label}</span>
                <span className="text-xs text-gray-400">{finish.description}</span>
              </Button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleApplyColor}
          className="w-full bg-pink-600 hover:bg-pink-700"
          disabled={selectedNails.length === 0}
        >
          Apply to Selected Nails ({selectedNails.length})
        </Button>
      </div>
    </Card>
  );
}
