# Press-On Play - 3D Nail Design Studio

## Overview
Press-On Play is a revolutionary, photorealistic 3D nail art design studio that allows users to create professional nail designs in an immersive 3D environment. The application features realistic hand models, extensive customization options, professional design tools, and a comprehensive layer-based design system.

## Recent Changes
- **November 3, 2025**: Initial setup of comprehensive 3D nail design studio with all professional features

## Project Architecture
### Frontend (client/)
- **React + TypeScript**: Main UI framework
- **Three.js + React Three Fiber**: 3D rendering engine for photorealistic hand models
- **Zustand**: State management for design system, layers, undo/redo
- **Tailwind CSS**: Professional studio interface styling
- **Radix UI**: Accessible UI components
- **Howler.js**: Audio management for ambient music and sound effects

### Backend (server/)
- **Express.js**: Local development server
- **File System Storage**: Project save/load functionality
- **Vite**: Development server and build tool

### Key Features
1. **3D Hand Model**: Photorealistic hand with 10 individually customizable fingernails
2. **Advanced Color System**: Solid, gradients, metallics, chrome, holographic, matte, glossy
3. **Design Tools**: Brush, stamp, decals, rhinestones, textures
4. **Template Library**: French tips, ombre, glitter, geometric, floral, animal prints
5. **Multi-Layer System**: Stack colors, patterns, decals, and effects
6. **Nail Customization**: Shape editor (square, stiletto, almond, coffin, etc.), length adjustment
7. **Professional Lighting**: Realistic studio lights, shadows, reflections, post-processing
8. **Project Management**: Save/load designs, undo/redo with full history
9. **Export**: High-resolution PNG/JPG with transparent background option
10. **Gallery Views**: Individual nail detail views and full hand preview
11. **Tutorial System**: Guided introduction for new users
12. **Audio**: Ambient background music and UI sound effects

## User Preferences
- Professional studio aesthetic with dark theme
- Intuitive tool panels with collapsible sections
- Hotkey support for quick access to tools
- Real-time 3D preview with realistic materials

## Development Notes
- Application runs on port 5000 (0.0.0.0:5000)
- All assets (textures, sounds, models) stored in `client/public/`
- Design state managed through Zustand stores
- Local storage for saving user projects
- Fully portable and playable outside of Replit environment

## How to Run
```bash
npm run dev
```
Access at http://localhost:5000

## Project Structure
```
press-on-play/
├── client/
│   ├── public/          # Static assets (sounds, textures)
│   └── src/
│       ├── components/  # React components & UI
│       ├── lib/         # Stores, utilities
│       ├── hooks/       # Custom React hooks
│       └── pages/       # Page components
├── server/              # Express backend
└── shared/              # Shared types/schemas
```
