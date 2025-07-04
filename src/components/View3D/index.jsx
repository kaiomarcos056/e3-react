import styles from './View3D.module.css';

import { useTileMap } from '../../contexts/TileMapContext';
import { useEffect, useRef, useState } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { Modal } from '../Modal';
import { LuAxis3D } from "react-icons/lu";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Tooltip } from '../Tooltip';

export function View3D() {
  const [isModal3d, setModal3d] = useState(false);
  const mountRef = useRef(null);

  const {tilemap} = useTileMap();

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });

  const handleMouseMove = (e, name) => {
    setTooltip({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        text: name
    });
  }

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, text: '' });
  };

  useEffect(() => {
    if (!isModal3d || !mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xabcdef);

    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    mountRef.current.appendChild(renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(0, 10, 5);
    scene.add(directionalLight);

    const tileSize = 1;
    const floorHeight = 1;
    const wallHeight = 1.5;
    const wallThickness = 1;

    const textureLoader = new THREE.TextureLoader();
    const gltfLoader = new GLTFLoader();

    function createMaterial(texturePath) {
      const texture = textureLoader.load(texturePath);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1, 1);
      return new THREE.MeshStandardMaterial({ map: texture });
    }

    const width = tilemap.width;
    const height = tilemap.height;

    const floorLayer = tilemap.layers.filter(layer => layer.id === 'floor');
    
    if (floorLayer) {
      for (const sprite of floorLayer[0].sprites) {

          if (!sprite.visible) continue;

          const { x, y, path, size } = sprite;
          const cols = size?.cols || 1;
          const rows = size?.rows || 1;

          const material = createMaterial(path);
          const floor = new THREE.Mesh(
            new THREE.BoxGeometry(tileSize * cols, floorHeight, tileSize * rows),
            material
          );

          // Posiciona centralizado se for maior que 1x1
          floor.position.set(
            (x + cols / 2 - 0.5) * tileSize,
            floorHeight / 2,
            (y + rows / 2 - 0.5) * tileSize
          );

          floor.rotation.y = sprite.rotation ?? 0;

          scene.add(floor);
      }
    }

    const wallLayer = tilemap.layers.filter(layer => layer.id === 'wall');

    if (wallLayer) {
      for (const sprite of wallLayer[0].sprites) {
        if (!sprite.visible) continue;

        const { x, y, path, size, direction, align, rotation } = sprite;
        const cols = size?.cols || 1;
        const rows = size?.rows || 1;

        const material = createMaterial(path);

        // Define orientação da parede: vertical (E ↔ D) ou horizontal (N ↕ S)
        const isVertical = direction === 'vertical';
        const geometry = isVertical
          ? new THREE.BoxGeometry(wallThickness * cols, wallHeight, tileSize * rows)
          : new THREE.BoxGeometry(tileSize * cols, wallHeight, wallThickness * rows);

        const wall = new THREE.Mesh(geometry, material);

        // Posição base (como o código original)
        let posX = x * tileSize;
        let posZ = y * tileSize;

        // Alinhamento opcional
        const effectiveAlign = align || 'center';

        if (isVertical) {
          if (effectiveAlign === 'left') posX -= tileSize / 2 - wallThickness / 2;
          else if (effectiveAlign === 'right') posX += tileSize / 2 - wallThickness / 2;
        } else {
          if (effectiveAlign === 'top') posZ -= tileSize / 2 - wallThickness / 2;
          else if (effectiveAlign === 'bottom') posZ += tileSize / 2 - wallThickness / 2;
        }

        wall.position.set(
          posX + (cols / 2 - 0.5) * tileSize,
          wallHeight / 2 + floorHeight,
          posZ + (rows / 2 - 0.5) * tileSize
        );

        wall.rotation.y = rotation ?? 0;

        scene.add(wall);
      }
    }

    /*
    const moveis = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, { model: '/models/cone.glb' }, null],
      [null, { model: '/models/cama.glb', size: [2, 2] }, null, null, null, null, null, null],
    ];

    function loadModel(path, onLoad) {
      gltfLoader.load(path, (gltf) => {
        const model = gltf.scene;
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        onLoad(model);
      }, undefined, (error) => {
        console.error('Erro ao carregar modelo:', error);
      });
    }

    // Móveis
    for (let row = 0; row < moveis.length; row++) {
      for (let col = 0; col < moveis[row].length; col++) {
        const cell = moveis[row][col];
        if (cell && cell.model) {
          if (cell._processed) continue;

          const modelPath = cell.model;
          const size = cell.size || [1, 1];
          const [w, h] = size;

          for (let dr = 0; dr < h; dr++) {
            for (let dc = 0; dc < w; dc++) {
              const r = row + dr;
              const c = col + dc;
              if (moveis[r] && moveis[r][c]) moveis[r][c]._processed = true;
            }
          }

          const x = (col + w / 2 - 0.5) * tileSize;
          const z = (row + h / 2 - 0.5) * tileSize;

          loadModel(modelPath, (model) => {
            model.position.set(x, floorHeight, z);
            model.scale.set(1, 1, 1);
            scene.add(model);
          });
        }
      }
    }
      */

    camera.position.set(2.5, 5, 7);
    camera.lookAt(new THREE.Vector3(2.5, 0, 2.5));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = true;
    controls.enableDamping = true;
    controls.dampingFactor = 1;
    controls.enablePan = true; 
    controls.target.set(2.5, 0, 2.5);
    controls.update();

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current) { mountRef.current.removeChild(renderer.domElement) }
    };
    
  }, [isModal3d]);

  return (
    <>
      <Modal isOpen={isModal3d} buttons={false} onClose={() => setModal3d(false)} showButtonClose={true}>
        <div className={styles.container} ref={mountRef}></div>
      </Modal>

      <button 
        className={styles.card} 
        onClick={() => setModal3d(true)}
        aria-label="Pré-visualização 3D"
        aria-selected={isModal3d}
        onMouseMove={(e) => handleMouseMove(e, "visualização 3d")}
        onMouseLeave={handleMouseLeave}
      >
        <LuAxis3D className={styles.iconee} />
      </button>

      {tooltip.visible && (
        <Tooltip texto={tooltip.text} x={tooltip.x} y={tooltip.y}/>
      )}
    </>
  );
}