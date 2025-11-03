import { useNailDesign, type Color } from "@/lib/stores/useNailDesign";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface Template {
  id: string;
  name: string;
  description: string;
  preview: Color;
}

export function TemplateLibrary() {
  const { applyColorToNail, selectedNails, addLayer } = useNailDesign();

  const templates: Template[] = [
    {
      id: "french",
      name: "French Tips",
      description: "Classic white tips",
      preview: { r: 255, g: 255, b: 255, a: 1 },
    },
    {
      id: "nude",
      name: "Nude Elegance",
      description: "Natural nude tone",
      preview: { r: 255, g: 228, b: 196, a: 1 },
    },
    {
      id: "red-classic",
      name: "Classic Red",
      description: "Timeless red polish",
      preview: { r: 220, g: 20, b: 60, a: 1 },
    },
    {
      id: "pink-glam",
      name: "Pink Glam",
      description: "Hot pink shimmer",
      preview: { r: 255, g: 105, b: 180, a: 1 },
    },
    {
      id: "black-matte",
      name: "Matte Black",
      description: "Bold matte black",
      preview: { r: 0, g: 0, b: 0, a: 1 },
    },
    {
      id: "gold-metallic",
      name: "Gold Metallic",
      description: "Shimmering gold",
      preview: { r: 255, g: 215, b: 0, a: 1 },
    },
    {
      id: "silver-chrome",
      name: "Silver Chrome",
      description: "Mirror chrome effect",
      preview: { r: 192, g: 192, b: 192, a: 1 },
    },
    {
      id: "lavender",
      name: "Lavender Dream",
      description: "Soft purple hue",
      preview: { r: 230, g: 230, b: 250, a: 1 },
    },
    {
      id: "mint",
      name: "Mint Fresh",
      description: "Cool mint green",
      preview: { r: 152, g: 255, b: 152, a: 1 },
    },
    {
      id: "coral",
      name: "Coral Sunset",
      description: "Warm coral orange",
      preview: { r: 255, g: 127, b: 80, a: 1 },
    },
    {
      id: "navy",
      name: "Navy Night",
      description: "Deep navy blue",
      preview: { r: 0, g: 0, b: 128, a: 1 },
    },
    {
      id: "rose-gold",
      name: "Rose Gold",
      description: "Trendy rose gold",
      preview: { r: 183, g: 110, b: 121, a: 1 },
    },
  ];

  const applyTemplate = (template: Template) => {
    if (selectedNails.length === 0) {
      alert("Please select at least one nail first");
      return;
    }

    switch (template.id) {
      case "french":
        applyColorToNail({ r: 255, g: 228, b: 225, a: 1 });
        addLayer({
          type: "color",
          color: { r: 255, g: 255, b: 255, a: 1 },
          opacity: 0.8,
        });
        break;
      
      case "pink-glam":
        applyColorToNail(template.preview);
        addLayer({
          type: "gradient",
          gradient: {
            type: "linear",
            colors: [
              { r: 255, g: 105, b: 180, a: 1 },
              { r: 255, g: 182, b: 193, a: 1 }
            ]
          },
          opacity: 0.5,
        });
        break;

      case "gold-metallic":
      case "silver-chrome":
      case "rose-gold":
        applyColorToNail(template.preview);
        addLayer({
          type: "color",
          color: { r: 255, g: 255, b: 255, a: 0.3 },
          opacity: 0.3,
        });
        break;
      
      default:
        applyColorToNail(template.preview);
        break;
    }
  };

  return (
    <Card className="p-4 bg-gray-900 text-white border-gray-700">
      <h3 className="text-lg font-semibold mb-3">Template Library</h3>
      
      <ScrollArea className="h-[400px] pr-4">
        <div className="grid grid-cols-2 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => applyTemplate(template)}
              className="flex flex-col items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-600"
              disabled={selectedNails.length === 0}
            >
              <div
                className="w-full h-16 rounded-md mb-2 border-2 border-gray-600"
                style={{
                  backgroundColor: `rgb(${template.preview.r}, ${template.preview.g}, ${template.preview.b})`,
                }}
              />
              <div className="text-xs font-medium text-center">
                {template.name}
              </div>
              <div className="text-xs text-gray-400 text-center">
                {template.description}
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}
