import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Atom,
  RotateCcw,
  Eye,
  EyeOff,
  Sparkles,
  Info,
  Layers,
  Compass,
} from "lucide-react";
import { ORBITALS_DATA } from "../data/chemistryData";
import { OrbitalData } from "../types/chemistry";

export const OrbitalLab3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedOrbitalId, setSelectedOrbitalId] = useState<string>("pz");
  const [showAxes, setShowAxes] = useState<boolean>(true);
  const [showNodalPlanes, setShowNodalPlanes] = useState<boolean>(true);

  const selectedOrbital: OrbitalData =
    ORBITALS_DATA.find((o) => o.id === selectedOrbitalId) || ORBITALS_DATA[0];

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth || 600;
    const height = mountRef.current.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#080c14");

    const camera = new THREE.PerspectiveCamera(45, width / (height || 1), 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Clear existing children before appending to prevent duplicate canvases
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }
    mountRef.current.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    // Axes Helper
    if (showAxes) {
      const axesHelper = new THREE.AxesHelper(3);
      orbitalGroup.add(axesHelper);
    }

    // Generate Orbital Meshes based on Mathematical Spherical Harmonics
    const createLobes = () => {
      const positiveMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8, // Cyan for Positive Phase (+)
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
      });

      const negativeMat = new THREE.MeshStandardMaterial({
        color: 0xf43f5e, // Pink/Red for Negative Phase (-)
        roughness: 0.3,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85,
      });

      switch (selectedOrbital.type) {
        case "s": {
          const sphereGeom = new THREE.SphereGeometry(1.8, 32, 32);
          const sphere = new THREE.Mesh(sphereGeom, positiveMat);
          orbitalGroup.add(sphere);
          break;
        }

        case "pz": {
          // Upper Lobe (+)
          const geom1 = new THREE.SphereGeometry(1.2, 32, 32);
          geom1.scale(0.8, 1.4, 0.8);
          const lobe1 = new THREE.Mesh(geom1, positiveMat);
          lobe1.position.set(0, 1.2, 0);

          // Lower Lobe (-)
          const geom2 = new THREE.SphereGeometry(1.2, 32, 32);
          geom2.scale(0.8, 1.4, 0.8);
          const lobe2 = new THREE.Mesh(geom2, negativeMat);
          lobe2.position.set(0, -1.2, 0);

          orbitalGroup.add(lobe1);
          orbitalGroup.add(lobe2);
          break;
        }

        case "px": {
          // Right Lobe (+)
          const geom1 = new THREE.SphereGeometry(1.2, 32, 32);
          geom1.scale(1.4, 0.8, 0.8);
          const lobe1 = new THREE.Mesh(geom1, positiveMat);
          lobe1.position.set(1.2, 0, 0);

          // Left Lobe (-)
          const geom2 = new THREE.SphereGeometry(1.2, 32, 32);
          geom2.scale(1.4, 0.8, 0.8);
          const lobe2 = new THREE.Mesh(geom2, negativeMat);
          lobe2.position.set(-1.2, 0, 0);

          orbitalGroup.add(lobe1);
          orbitalGroup.add(lobe2);
          break;
        }

        case "py": {
          // Top Lobe (+)
          const geom1 = new THREE.SphereGeometry(1.2, 32, 32);
          geom1.scale(0.8, 1.4, 0.8);
          const lobe1 = new THREE.Mesh(geom1, positiveMat);
          lobe1.position.set(0, 0, 1.2);

          // Bottom Lobe (-)
          const geom2 = new THREE.SphereGeometry(1.2, 32, 32);
          geom2.scale(0.8, 1.4, 0.8);
          const lobe2 = new THREE.Mesh(geom2, negativeMat);
          lobe2.position.set(0, 0, -1.2);

          orbitalGroup.add(lobe1);
          orbitalGroup.add(lobe2);
          break;
        }

        case "dz2": {
          // Upper Lobe (+)
          const geom1 = new THREE.SphereGeometry(1.1, 32, 32);
          geom1.scale(0.7, 1.5, 0.7);
          const lobe1 = new THREE.Mesh(geom1, positiveMat);
          lobe1.position.set(0, 1.3, 0);

          // Lower Lobe (+)
          const geom2 = new THREE.SphereGeometry(1.1, 32, 32);
          geom2.scale(0.7, 1.5, 0.7);
          const lobe2 = new THREE.Mesh(geom2, positiveMat);
          lobe2.position.set(0, -1.3, 0);

          // Donut Collar (-)
          const donutGeom = new THREE.TorusGeometry(1.0, 0.3, 16, 32);
          const donut = new THREE.Mesh(donutGeom, negativeMat);
          donut.rotation.x = Math.PI / 2;

          orbitalGroup.add(lobe1);
          orbitalGroup.add(lobe2);
          orbitalGroup.add(donut);
          break;
        }

        case "dx2-y2": {
          // 4 lobes along X and Y axes
          const lobeX1 = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 24), positiveMat);
          lobeX1.scale.set(1.4, 0.7, 0.7);
          lobeX1.position.set(1.1, 0, 0);

          const lobeX2 = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 24), positiveMat);
          lobeX2.scale.set(1.4, 0.7, 0.7);
          lobeX2.position.set(-1.1, 0, 0);

          const lobeY1 = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 24), negativeMat);
          lobeY1.scale.set(0.7, 1.4, 0.7);
          lobeY1.position.set(0, 1.1, 0);

          const lobeY2 = new THREE.Mesh(new THREE.SphereGeometry(0.9, 24, 24), negativeMat);
          lobeY2.scale.set(0.7, 1.4, 0.7);
          lobeY2.position.set(0, -1.1, 0);

          orbitalGroup.add(lobeX1);
          orbitalGroup.add(lobeX2);
          orbitalGroup.add(lobeY1);
          orbitalGroup.add(lobeY2);
          break;
        }

        case "dxy":
        default: {
          // 4 lobes between X and Y axes
          const angleOffset = Math.PI / 4;
          const dist = 1.2;

          const p1 = new THREE.Mesh(new THREE.SphereGeometry(0.85, 24, 24), positiveMat);
          p1.position.set(Math.cos(angleOffset) * dist, Math.sin(angleOffset) * dist, 0);

          const p2 = new THREE.Mesh(new THREE.SphereGeometry(0.85, 24, 24), positiveMat);
          p2.position.set(-Math.cos(angleOffset) * dist, -Math.sin(angleOffset) * dist, 0);

          const n1 = new THREE.Mesh(new THREE.SphereGeometry(0.85, 24, 24), negativeMat);
          n1.position.set(-Math.cos(angleOffset) * dist, Math.sin(angleOffset) * dist, 0);

          const n2 = new THREE.Mesh(new THREE.SphereGeometry(0.85, 24, 24), negativeMat);
          n2.position.set(Math.cos(angleOffset) * dist, -Math.sin(angleOffset) * dist, 0);

          orbitalGroup.add(p1);
          orbitalGroup.add(p2);
          orbitalGroup.add(n1);
          orbitalGroup.add(n2);
          break;
        }
      }
    };

    createLobes();

    // Nodal Plane Mesh Overlay
    if (showNodalPlanes && selectedOrbital.angularNodes > 0) {
      const planeGeom = new THREE.PlaneGeometry(3.5, 3.5);
      const planeMat = new THREE.MeshBasicMaterial({
        color: 0xffb800,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.2,
      });

      const nodalPlane = new THREE.Mesh(planeGeom, planeMat);
      if (selectedOrbital.type === "pz") {
        nodalPlane.rotation.x = Math.PI / 2; // xy-plane
      } else if (selectedOrbital.type === "px") {
        nodalPlane.rotation.y = Math.PI / 2; // yz-plane
      }
      orbitalGroup.add(nodalPlane);
    }

    // Drag Rotate Controls
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;

      orbitalGroup.rotation.y += dx * 0.01;
      orbitalGroup.rotation.x += dy * 0.01;

      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.005;
      camera.position.z = Math.min(Math.max(camera.position.z, 3), 16);
    };

    let prevTouch = { x: 0, y: 0 };
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        prevTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - prevTouch.x;
        const dy = e.touches[0].clientY - prevTouch.y;

        orbitalGroup.rotation.y += dx * 0.01;
        orbitalGroup.rotation.x += dy * 0.01;

        prevTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const domElement = mountRef.current;
    domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    domElement.addEventListener("wheel", handleWheel, { passive: false });
    domElement.addEventListener("touchstart", handleTouchStart);
    domElement.addEventListener("touchmove", handleTouchMove);

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth || 600;
      const h = mountRef.current.clientHeight || 450;
      camera.aspect = w / (h || 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isDragging) {
        orbitalGroup.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
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
  }, [selectedOrbitalId, showAxes, showNodalPlanes]);

  return (
    <div className="space-y-8 pb-16">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Atom className="w-8 h-8 text-cyan-400" />
            <span>3D Atomic Orbital Visualizer</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Explore electron wavefunctions ψ, nodal surfaces, phase signs (+/-), and quantum numbers n, l, m.
          </p>
        </div>

        {/* Orbital Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {ORBITALS_DATA.map((orb) => (
            <button
              key={orb.id}
              onClick={() => setSelectedOrbitalId(orb.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedOrbitalId === orb.id
                  ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-extrabold"
                  : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {orb.type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Viewport & Quantum Specs */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        {/* 3D WebGL Canvas (8 Columns) */}
        <div className="lg:col-span-8 rounded-3xl bg-[#080c14] border border-slate-800 p-4 relative shadow-2xl overflow-hidden">
          {/* Legend Overlay */}
          <div className="flex items-center justify-between gap-2 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 mb-2 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-cyan-400" />
                <span className="text-slate-300 font-semibold">+ Phase Lobe</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-slate-300 font-semibold">- Phase Lobe</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAxes(!showAxes)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                  showAxes
                    ? "bg-cyan-950 text-cyan-300 border-cyan-700/60"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                XYZ Axes
              </button>

              <button
                onClick={() => setShowNodalPlanes(!showNodalPlanes)}
                className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all ${
                  showNodalPlanes
                    ? "bg-amber-950 text-amber-300 border-amber-700/60"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                Nodal Surface
              </button>
            </div>
          </div>

          <div
            ref={mountRef}
            className="w-full h-[400px] sm:h-[480px] cursor-grab active:cursor-grabbing rounded-2xl"
          />
        </div>

        {/* Quantum Numbers & Explanations (4 Columns) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Orbital Title Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-2xl font-extrabold text-white">
              {selectedOrbital.name}
            </h2>

            {/* Quantum Numbers Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                  Principal (n)
                </span>
                <span className="text-lg font-bold text-cyan-300">
                  {selectedOrbital.quantumN}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                  Azimuthal (l)
                </span>
                <span className="text-lg font-bold text-blue-300">
                  {selectedOrbital.quantumL}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 block font-semibold uppercase">
                  Magnetic (m)
                </span>
                <span className="text-lg font-bold text-indigo-300">
                  {selectedOrbital.quantumM}
                </span>
              </div>
            </div>

            {/* Nodes Breakdown */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950">
                <span className="text-slate-400">Radial Nodes (n - l - 1):</span>
                <span className="text-amber-300 font-bold">
                  {selectedOrbital.radialNodes}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950">
                <span className="text-slate-400">Angular Nodal Planes (l):</span>
                <span className="text-rose-300 font-bold">
                  {selectedOrbital.angularNodes}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950">
                <span className="text-slate-400">Total Nodes (n - 1):</span>
                <span className="text-emerald-300 font-bold">
                  {selectedOrbital.quantumN - 1}
                </span>
              </div>
            </div>
          </div>

          {/* Electron Density Info */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 shadow-xl">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Wavefunction ψ & Density</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              {selectedOrbital.electronDensityInfo}
            </p>
          </div>

          {/* JEE Exam Notes */}
          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-700/50 space-y-2 shadow-xl">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>JEE Core Concept</span>
            </div>
            <p className="text-xs text-amber-100 font-medium leading-relaxed">
              {selectedOrbital.jeeNotes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
