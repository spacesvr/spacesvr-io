/*
auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToBasic } from "../utils/material";

type GLTFResult = GLTF & {
  nodes: {
    Rocks: THREE.Mesh;
    Tree: THREE.Mesh;
    Armchair: THREE.Mesh;
    Sofa_Modern: THREE.Mesh;
    Bench: THREE.Mesh;
    Structure: THREE.Mesh;
  };
  materials: {
    Rocks: THREE.MeshStandardMaterial;
    ["Polished Cement 01.1"]: THREE.MeshStandardMaterial;
    Armchair: THREE.MeshStandardMaterial;
    ["Sofa Modern"]: THREE.MeshStandardMaterial;
    Bench: THREE.MeshStandardMaterial;
    Structure: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/spaces7_2-1605952411/spacesvr_07.2.glb";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials: oldMaterials } = useGLTF(FILE_URL) as GLTFResult;

  const materials = convertToBasic(oldMaterials);

  return (
    <group ref={group} {...props}>
      <group>
        <mesh
          material={materials.Rocks}
          geometry={nodes.Rocks.geometry}
          name="Rocks"
        />
        <mesh
          material={materials["Polished Cement 01.1"]}
          geometry={nodes.Tree.geometry}
          name="Tree"
          rotation={[0, 0, 0]}
        />
        <mesh
          material={materials.Armchair}
          geometry={nodes.Armchair.geometry}
          name="Armchair"
          rotation={[0, 0, 0]}
        />
        <mesh
          material={materials["Sofa Modern"]}
          geometry={nodes.Sofa_Modern.geometry}
          name="Sofa_Modern"
          position={[0, 0, 0]}
          rotation={[-1.5621, 0, -0.7294]}
          scale={[2, 2, 2]}
        />
        <mesh
          material={materials.Bench}
          geometry={nodes.Bench.geometry}
          name="Bench"
          rotation={[0, 0.6919, 0]}
        />
        <mesh
          material={materials.Structure}
          geometry={nodes.Structure.geometry}
          name="Structure"
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
