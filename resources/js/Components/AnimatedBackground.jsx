import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const frameIdRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Luminous lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00aaff,
      linewidth: 2,
      transparent: true,
      opacity: 0.8,
    });
    const lineGeometry = new THREE.BufferGeometry();

    const linePoints = [];
    for (let i = 0; i < 100; i++) {
      linePoints.push(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 50
      );
    }
    lineGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePoints, 3)
    );

    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);

    // Particles
    const particleCount = 1000;
    const particleGeometry = new THREE.BufferGeometry();
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.2,
      transparent: true,
      opacity: 0.8,
    });

    const particlePositions = [];
    for (let i = 0; i < particleCount; i++) {
      particlePositions.push(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      );
    }
    particleGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(particlePositions, 3)
    );
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 30;

    // Animation
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      line.rotation.x += 0.001;
      line.rotation.y += 0.001;

      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();
    sceneRef.current = { scene, camera, renderer };

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full -z-10 bg-black"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default AnimatedBackground;