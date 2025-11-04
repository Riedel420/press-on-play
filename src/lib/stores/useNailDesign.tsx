import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type NailShape = "square" | "rounded" | "stiletto" | "almond" | "coffin" | "oval";
export type FinishType = "glossy" | "matte" | "metallic" | "chrome" | "holographic";
export type ViewMode = "full_hand" | "gallery" | "detail";
export type Tool = "select" | "color" | "brush" | "stamp" | "texture" | "eraser";
export type HandPose = "relaxed" | "spread" | "fist";

export interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

export interface Gradient {
  type: "linear" | "radial";
  colors: Color[];
  angle?: number;
}

export interface Layer {
  id: string;
  type: "color" | "gradient" | "pattern" | "texture" | "decal";
  visible: boolean;
  opacity: number;
  color?: Color;
  gradient?: Gradient;
  patternId?: string;
  textureId?: string;
  decalId?: string;
  decalPosition?: { x: number; y: number };
  decalScale?: number;
  decalRotation?: number;
}

export interface NailDesign {
  shape: NailShape;
  length: number;
  layers: Layer[];
}

export interface DesignState {
  nails: Record<number, NailDesign>;
  selectedNails: number[];
  currentTool: Tool;
  brushSize: number;
  brushOpacity: number;
  brushHardness: number;
  currentColor: Color;
  currentFinish: FinishType;
  symmetryMode: boolean;
  skinTone: Color;
  handPose: HandPose;
  viewMode: ViewMode;
  showTutorial: boolean;
  history: Array<Record<number, NailDesign>>;
  historyIndex: number;
  currentTemplate: string | null;
  
  selectNail: (nailId: number, addToSelection: boolean) => void;
  selectAllNails: () => void;
  deselectAll: () => void;
  setTool: (tool: Tool) => void;
  setBrushSize: (size: number) => void;
  setBrushOpacity: (opacity: number) => void;
  setBrushHardness: (hardness: number) => void;
  setColor: (color: Color) => void;
  setFinish: (finish: FinishType) => void;
  toggleSymmetry: () => void;
  setSkinTone: (color: Color) => void;
  setHandPose: (pose: HandPose) => void;
  setViewMode: (mode: ViewMode) => void;
  setNailShape: (shape: NailShape) => void;
  setNailLength: (length: number) => void;
  addLayer: (layerData: Partial<Layer>) => void;
  updateLayer: (nailId: number, layerId: string, updates: Partial<Layer>) => void;
  deleteLayer: (nailId: number, layerId: string) => void;
  toggleLayerVisibility: (nailId: number, layerId: string) => void;
  applyTemplate: (templateId: string) => void;
  applyColorToNail: (color: Color) => void;
  applyPatternToNail: (patternId: string) => void;
  applyTextureToNail: (textureId: string) => void;
  addDecalToNail: (decalId: string, position: { x: number; y: number }) => void;
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;
  clearNail: (nailId: number) => void;
  clearAllNails: () => void;
  saveProject: (name: string) => void;
  loadProject: (name: string) => void;
  getProjectList: () => string[];
  exportDesign: () => void;
  toggleTutorial: () => void;
}

const defaultNailDesign: NailDesign = {
  shape: "rounded",
  length: 0.5,
  layers: [
    {
      id: "base",
      type: "color",
      visible: true,
      opacity: 1,
      color: { r: 255, g: 192, b: 203, a: 1 }
    }
  ]
};

const createDefaultNails = (): Record<number, NailDesign> => {
  const nails: Record<number, NailDesign> = {};
  for (let i = 0; i < 10; i++) {
    nails[i] = JSON.parse(JSON.stringify(defaultNailDesign));
  }
  return nails;
};

export const useNailDesign = create<DesignState>()(
  subscribeWithSelector((set, get) => ({
    nails: createDefaultNails(),
    selectedNails: [0],
    currentTool: "select",
    brushSize: 10,
    brushOpacity: 1,
    brushHardness: 0.8,
    currentColor: { r: 255, g: 0, b: 0, a: 1 },
    currentFinish: "glossy",
    symmetryMode: false,
    skinTone: { r: 255, g: 224, b: 189, a: 1 },
    handPose: "relaxed",
    viewMode: "full_hand",
    showTutorial: true,
    history: [],
    historyIndex: -1,
    currentTemplate: null,

    selectNail: (nailId: number, addToSelection: boolean) => {
      set((state) => {
        if (addToSelection) {
          if (state.selectedNails.includes(nailId)) {
            return { selectedNails: state.selectedNails.filter(id => id !== nailId) };
          } else {
            return { selectedNails: [...state.selectedNails, nailId] };
          }
        } else {
          return { selectedNails: [nailId] };
        }
      });
    },

    selectAllNails: () => set({ selectedNails: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }),
    
    deselectAll: () => set({ selectedNails: [] }),

    setTool: (tool: Tool) => set({ currentTool: tool }),
    
    setBrushSize: (size: number) => set({ brushSize: size }),
    
    setBrushOpacity: (opacity: number) => set({ brushOpacity: opacity }),
    
    setBrushHardness: (hardness: number) => set({ brushHardness: hardness }),
    
    setColor: (color: Color) => set({ currentColor: color }),
    
    setFinish: (finish: FinishType) => set({ currentFinish: finish }),
    
    toggleSymmetry: () => set((state) => ({ symmetryMode: !state.symmetryMode })),
    
    setSkinTone: (color: Color) => set({ skinTone: color }),
    
    setHandPose: (pose: HandPose) => set({ handPose: pose }),
    
    setViewMode: (mode: ViewMode) => set({ viewMode: mode }),

    setNailShape: (shape: NailShape) => {
      get().saveToHistory();
      set((state) => {
        const newNails = { ...state.nails };
        state.selectedNails.forEach(nailId => {
          newNails[nailId] = { ...newNails[nailId], shape };
        });
        return { nails: newNails };
      });
    },

    setNailLength: (length: number) => {
      get().saveToHistory();
      set((state) => {
        const newNails = { ...state.nails };
        state.selectedNails.forEach(nailId => {
          newNails[nailId] = { ...newNails[nailId], length };
        });
        return { nails: newNails };
      });
    },

    addLayer: (layerData: Partial<Layer>) => {
      get().saveToHistory();
      set((state) => {
        const newNails = { ...state.nails };
        state.selectedNails.forEach(nailId => {
          const newLayer: Layer = {
            id: `layer-${Date.now()}-${Math.random()}`,
            type: "color",
            visible: true,
            opacity: 1,
            ...layerData
          };
          newNails[nailId] = {
            ...newNails[nailId],
            layers: [...newNails[nailId].layers, newLayer]
          };
        });
        return { nails: newNails };
      });
    },

    updateLayer: (nailId: number, layerId: string, updates: Partial<Layer>) => {
      get().saveToHistory();
      set((state) => {
        const newNails = { ...state.nails };
        const nail = newNails[nailId];
        nail.layers = nail.layers.map(layer =>
          layer.id === layerId ? { ...layer, ...updates } : layer
        );
        return { nails: newNails };
      });
    },

    deleteLayer: (nailId: number, layerId: string) => {
      get().saveToHistory();
      set((state) => {
        const newNails = { ...state.nails };
        newNails[nailId].layers = newNails[nailId].layers.filter(layer => layer.id !== layerId);
        return { nails: newNails };
      });
    },

    toggleLayerVisibility: (nailId: number, layerId: string) => {
      set((state) => {
        const newNails = { ...state.nails };
        const nail = newNails[nailId];
        nail.layers = nail.layers.map(layer =>
          layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
        );
        return { nails: newNails };
      });
    },

    applyTemplate: (templateId: string) => {
      get().saveToHistory();
      set({ currentTemplate: templateId });
    },

    applyColorToNail: (color: Color) => {
      get().saveToHistory();
      set((state) => {
        const newNails = { ...state.nails };
        state.selectedNails.forEach(nailId => {
          const baseLayer = newNails[nailId].layers.find(l => l.id === "base");
          if (baseLayer) {
            baseLayer.color = color;
          }
        });
        return { nails: newNails };
      });
    },

    applyPatternToNail: (patternId: string) => {
      get().saveToHistory();
      get().addLayer({ type: "pattern", patternId, opacity: 1 });
    },

    applyTextureToNail: (textureId: string) => {
      get().saveToHistory();
      get().addLayer({ type: "texture", textureId, opacity: 1 });
    },

    addDecalToNail: (decalId: string, position: { x: number; y: number }) => {
      get().saveToHistory();
      get().addLayer({
        type: "decal",
        decalId,
        decalPosition: position,
        decalScale: 1,
        decalRotation: 0,
        opacity: 1
      });
    },

    saveToHistory: () => {
      set((state) => {
        const newHistory = state.history.slice(0, state.historyIndex + 1);
        newHistory.push(JSON.parse(JSON.stringify(state.nails)));
        return {
          history: newHistory.slice(-50),
          historyIndex: Math.min(newHistory.length - 1, 49)
        };
      });
    },

    undo: () => {
      set((state) => {
        if (state.historyIndex > 0) {
          return {
            nails: JSON.parse(JSON.stringify(state.history[state.historyIndex - 1])),
            historyIndex: state.historyIndex - 1
          };
        }
        return {};
      });
    },

    redo: () => {
      set((state) => {
        if (state.historyIndex < state.history.length - 1) {
          return {
            nails: JSON.parse(JSON.stringify(state.history[state.historyIndex + 1])),
            historyIndex: state.historyIndex + 1
          };
        }
        return {};
      });
    },

    clearNail: (nailId: number) => {
      get().saveToHistory();
      set((state) => {
        const newNails = { ...state.nails };
        newNails[nailId] = JSON.parse(JSON.stringify(defaultNailDesign));
        return { nails: newNails };
      });
    },

    clearAllNails: () => {
      get().saveToHistory();
      set({ nails: createDefaultNails() });
    },

    saveProject: (name: string) => {
      const state = get();
      const project = {
        nails: state.nails,
        skinTone: state.skinTone,
        handPose: state.handPose,
        timestamp: Date.now()
      };
      localStorage.setItem(`nail-project-${name}`, JSON.stringify(project));
      console.log(`Project "${name}" saved successfully`);
    },

    loadProject: (name: string) => {
      const projectData = localStorage.getItem(`nail-project-${name}`);
      if (projectData) {
        const project = JSON.parse(projectData);
        set({
          nails: project.nails,
          skinTone: project.skinTone || get().skinTone,
          handPose: project.handPose || "relaxed"
        });
        console.log(`Project "${name}" loaded successfully`);
      }
    },

    getProjectList: () => {
      const projects: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("nail-project-")) {
          projects.push(key.replace("nail-project-", ""));
        }
      }
      return projects;
    },

    exportDesign: () => {
      console.log("Export functionality will capture canvas screenshot");
    },

    toggleTutorial: () => set((state) => ({ showTutorial: !state.showTutorial }))
  }))
);
