import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Box,
  RotateCcw,
  Eye,
  EyeOff,
  Maximize2,
  Sparkles,
  Info,
  Layers,
  Zap,
} from "lucide-react";
import { MOLECULES_DATA } from "../data/chemistryData";
import { MoleculeData } from "../types/chemistry";

interface MolecularLab3DProps {
  selectedMoleculeId?: string;
  onSelectMolecule?: (id: string) => void;
}

export const MolecularLab3D: React.FC<MolecularLab3DProps> = ({
  selectedMoleculeId: propMoleculeId,
  onSelectMolecule,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>(
    propMoleculeId || "b2h6"
  );
  const [viewMode, setViewMode] = useState<"ball-stick" | "space-filling" | "wireframe">("ball-stick");
  const [showLonePairs, setShowLonePairs] = useState<boolean>(true);
  const [showGeometryMesh, setShowGeometryMesh] = useState<boolean>(false);

  // Sync prop changes into local state
  useEffect(() => {
    if (propMoleculeId) {
      setSelectedMoleculeId(propMoleculeId);
    }
  }, [propMoleculeId]);

  const handleMoleculeSelect = (id: string) => {
    setSelectedMoleculeId(id);
    if (onSelectMolecule) {
      onSelectMolecule(id);
    }
  };

  const selectedMolecule: MoleculeData =
    MOLECULES_DATA.find((m) => m.id === selectedMoleculeId) || MOLECULES_DATA[0];

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 600;
    const height = mountRef.current.clientHeight || 450;

    // Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#080c14");

    const camera = new THREE.PerspectiveCamera(45, width / (height || 1), 0.1, 1000);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Clear existing children before appending to prevent duplicate canvases
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.4);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // Group holding the molecular components
    const moleculeGroup = new THREE.Group();
    scene.add(moleculeGroup);

    // Render Atoms
    const atomObjects: { mesh: THREE.Mesh; pos: THREE.Vector3; label?: string }[] = [];

    selectedMolecule.atoms.forEach((atom) => {
      const radius =
        viewMode === "space-filling"
          ? (atom.radius || 0.5) * 1.6
          : atom.radius || 0.4;

      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const colorHex = atom.color || (atom.element === "B" ? "#f59e0b" : atom.element === "H" ? "#f3f4f6" : "#22c55e");

      const material =
        viewMode === "wireframe"
          ? new THREE.MeshBasicMaterial({ color: colorHex, wireframe: true })
          : new THREE.MeshStandardMaterial({
              color: colorHex,
              roughness: 0.2,
              metalness: 0.1,
            });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(atom.position[0], atom.position[1], atom.position[2]);
      moleculeGroup.add(mesh);

      atomObjects.push({
        mesh,
        pos: new THREE.Vector3(...atom.position),
        label: atom.label || atom.element,
      });
    });

    // Render Bonds
    selectedMolecule.bonds.forEach((bond) => {
      const fromAtom = selectedMolecule.atoms.find((a) => a.id === bond.from);
      const toAtom = selectedMolecule.atoms.find((a) => a.id === bond.to);

      if (fromAtom && toAtom) {
        const start = new THREE.Vector3(...fromAtom.position);
        const end = new THREE.Vector3(...toAtom.position);
        const distance = start.distanceTo(end);

        const cylinderRadius =
          bond.type === "3c-2e"
            ? 0.1
            : bond.type === "dative"
            ? 0.08
            : 0.06;

        const bondColor =
          bond.type === "3c-2e"
            ? 0x38bdf8
            : bond.type === "dative"
            ? 0x06b6d4
            : 0x94a3b8;

        const geom = new THREE.CylinderGeometry(
          cylinderRadius,
          cylinderRadius,
          distance,
          16
        );

        const mat = new THREE.MeshStandardMaterial({
          color: bondColor,
          roughness: 0.3,
        });

        const cylinder = new THREE.Mesh(geom, mat);

        // Position & Rotate cylinder between two atoms
        const midPoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        cylinder.position.copy(midPoint);

        const orientation = new THREE.Matrix4();
        orientation.lookAt(start, end, new THREE.Vector3(0, 1, 0));
        cylinder.quaternion.setFromRotationMatrix(orientation);
        cylinder.rotateX(Math.PI / 2);

        moleculeGroup.add(cylinder);
      }
    });

    // Render Lone Pairs if present
    if (showLonePairs && selectedMolecule.lonePairs) {
      selectedMolecule.lonePairs.forEach((lp) => {
        const atom = selectedMolecule.atoms.find((a) => a.id === lp.atomId);
        if (atom) {
          const atomPos = new THREE.Vector3(...atom.position);
          const offset = new THREE.Vector3(...lp.offset);
          const lpPos = atomPos.clone().add(offset);

          const lpGeom = new THREE.SphereGeometry(0.22, 16, 16);
          const lpMat = new THREE.MeshStandardMaterial({
            color: 0xec4899,
            transparent: true,
            opacity: 0.75,
            emissive: 0xec4899,
            emissiveIntensity: 0.3,
          });

          const lpMesh = new THREE.Mesh(lpGeom, lpMat);
          lpMesh.position.copy(lpPos);
          moleculeGroup.add(lpMesh);
        }
      });
    }

    // Geometry Overlay Wireframe
    if (showGeometryMesh) {
      const bbox = new THREE.Box3().setFromObject(moleculeGroup);
      const size = new THREE.Vector3();
      bbox.getSize(size);

      const geomHull = new THREE.SphereGeometry(
        Math.max(size.x, size.y, size.z) * 0.65,
        16,
        16
      );
      const hullMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      });
      const hullMesh = new THREE.Mesh(geomHull, hullMat);
      moleculeGroup.add(hullMesh);
    }

    // Interactive Drag Orbit Rotation Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      moleculeGroup.rotation.y += deltaX * 0.01;
      moleculeGroup.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.005;
      camera.position.z = Math.min(Math.max(camera.position.z, 3), 20);
    };

    const domElement = mountRef.current;
    domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    domElement.addEventListener("wheel", handleWheel, { passive: false });

    // Touch Controls for Mobile
    let previousTouchPos = { x: 0, y: 0 };
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        previousTouchPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousTouchPos.x;
        const deltaY = e.touches[0].clientY - previousTouchPos.y;

        moleculeGroup.rotation.y += deltaX * 0.01;
        moleculeGroup.rotation.x += deltaY * 0.01;

        previousTouchPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    domElement.addEventListener("touchstart", handleTouchStart);
    domElement.addEventListener("touchmove", handleTouchMove);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isDragging) {
        moleculeGroup.rotation.y += 0.003; // Gentle auto-spin
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth || 600;
      const h = mountRef.current.clientHeight || 450;
      camera.aspect = w / (h || 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      domElement.removeEventListener("wheel", handleWheel);
      domElement.removeEventListener("touchstart", handleTouchStart);
      domElement.removeEventListener("touchmove", handleTouchMove);
      if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [selectedMoleculeId, viewMode, showLonePairs, showGeometryMesh]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Box className="w-8 h-8 text-cyan-400" />
            <span>Interactive 3D Molecular Lab</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Rotate, zoom, and inspect 3D ball-and-stick models with lone pairs and bond geometry overlays.
          </p>
        </div>

        {/* Molecule Selector Dropdown */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
            Select Molecule:
          </span>
          <select
            value={selectedMoleculeId}
            onChange={(e) => handleMoleculeSelect(e.target.value)}
            className="bg-slate-900 border border-cyan-500/50 text-xs font-bold text-cyan-300 rounded-xl px-4 py-2 focus:outline-none focus:border-cyan-400 transition-all shadow-lg"
          >
            {MOLECULES_DATA.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.formula})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Viewport & Specs Grid */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* 3D WebGL Canvas (8 Columns) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-4 relative shadow-2xl overflow-hidden">
          {/* Controls Bar Overlay */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 mb-2 text-xs z-10 relative">
            {/* View Mode Buttons */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setViewMode("ball-stick")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "ball-stick"
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Ball & Stick
              </button>
              <button
                onClick={() => setViewMode("space-filling")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "space-filling"
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Space Filling
              </button>
              <button
                onClick={() => setViewMode("wireframe")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  viewMode === "wireframe"
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Wireframe
              </button>
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLonePairs(!showLonePairs)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                  showLonePairs
                    ? "bg-pink-950/80 text-pink-300 border-pink-700/60"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                Lone Pairs
              </button>

              <button
                onClick={() => setShowGeometryMesh(!showGeometryMesh)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                  showGeometryMesh
                    ? "bg-cyan-950/80 text-cyan-300 border-cyan-700/60"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                Geometry Mesh
              </button>
            </div>
          </div>

          {/* Three.js Canvas Container */}
          <div
            ref={mountRef}
            className="w-full h-[400px] sm:h-[500px] cursor-grab active:cursor-grabbing rounded-2xl relative"
          />

          <div className="absolute bottom-6 left-6 text-[10px] text-slate-500 font-mono bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800">
            Drag to Rotate • Scroll to Zoom
          </div>
        </div>

        {/* Structural Specifications & JEE Notes (4 Columns) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Title & Formula Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-white">
                {selectedMolecule.name}
              </h2>
              <span className="text-lg font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 px-3 py-1 rounded-xl">
                {selectedMolecule.formula}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedMolecule.description}
            </p>

            {/* Spec Matrix */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950">
                <span className="text-slate-400">Hybridisation:</span>
                <span className="text-cyan-300 font-bold">{selectedMolecule.hybridisation}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950">
                <span className="text-slate-400">Geometry:</span>
                <span className="text-amber-300 font-semibold">{selectedMolecule.geometry}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950">
                <span className="text-slate-400">Bond Angles:</span>
                <span className="text-indigo-300 font-semibold">{selectedMolecule.bondAngles}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950">
                <span className="text-slate-400">Dipole Moment:</span>
                <span className="text-emerald-300 font-semibold">{selectedMolecule.dipoleMoment}</span>
              </div>
            </div>
          </div>

          {/* JEE Exam Tip Card */}
          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-700/50 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>JEE Key Takeaway</span>
            </div>
            <p className="text-xs text-amber-100 font-medium leading-relaxed">
              {selectedMolecule.jeeTips}
            </p>
          </div>

          {/* Structural Details List */}
          {selectedMolecule.structuralDetails && (
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-xl">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Structural Highlights
              </h3>
              <div className="space-y-2 text-xs text-slate-300">
                {selectedMolecule.structuralDetails.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="font-bold text-cyan-400 block mb-0.5">{item.title}</span>
                    <span className="text-slate-400 text-[11px] leading-relaxed">{item.content}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
