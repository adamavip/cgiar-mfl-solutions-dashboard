/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Globe3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // --- Setup Scene ---
    const scene = new THREE.Scene();
    
    // --- Setup Camera ---
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 2.2; // Zoom level

    // --- Setup Renderer ---
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // --- Create Globe ---
    // Using a high-quality NASA texture
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_2048.jpg/1024px-Land_ocean_ice_2048.jpg');
    // Bump map for texture depth
    // const bumpMap = textureLoader.load('https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Land_ocean_ice_2048.jpg/1024px-Land_ocean_ice_2048.jpg'); // Reusing for simplicity as bump

    const geometry = new THREE.SphereGeometry(0.8, 64, 64);
    const material = new THREE.MeshPhongMaterial({
      map: earthTexture,
      bumpScale: 0.05,
      specular: new THREE.Color(0x333333),
      shininess: 5,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // --- Atmosphere Glow (Simplified) ---
    const atmosphereGeo = new THREE.SphereGeometry(0.82, 64, 64);
    const atmosphereMat = new THREE.MeshPhongMaterial({
        color: 0x4db8ff,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending
    });
    const atmosphere = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    scene.add(atmosphere);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Soft white light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.2);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // --- Interaction State ---
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotationX = 0;
    let targetRotationY = 0;
    const rotationSpeed = 0.005;
    const autoRotationSpeed = 0.001;

    // --- Event Handlers ---
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.offsetX, y: e.offsetY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaMove = {
          x: e.offsetX - previousMousePosition.x,
          y: e.offsetY - previousMousePosition.y
        };

        const rotateAngleX = deltaMove.y * rotationSpeed; // Invert logic if needed
        const rotateAngleY = deltaMove.x * rotationSpeed;

        globe.rotation.x += rotateAngleX;
        globe.rotation.y += rotateAngleY;
        
        // Clamp X rotation to avoid flipping
        globe.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, globe.rotation.x));

        previousMousePosition = { x: e.offsetX, y: e.offsetY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };
    
    // Add listeners to renderer dom element
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);

      // Auto rotation if not dragging
      if (!isDragging) {
         globe.rotation.y += autoRotationSpeed;
      }
      
      // Update atmosphere rotation to match slightly or stay static
      atmosphere.rotation.copy(globe.rotation);

      renderer.render(scene, camera);
    };

    animate();

    // --- Handle Resize ---
    const handleResize = () => {
       if (!mountRef.current) return;
       const w = mountRef.current.clientWidth;
       const h = mountRef.current.clientHeight;
       camera.aspect = w / h;
       camera.updateProjectionMatrix();
       renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', onMouseUp);
      if (renderer.domElement) {
          renderer.domElement.removeEventListener('mousedown', onMouseDown);
          renderer.domElement.removeEventListener('mousemove', onMouseMove);
          renderer.dispose();
      }
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full cursor-grab active:cursor-grabbing"
      title="Drag to rotate globe"
    />
  );
};

export default Globe3D;