/*
auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { convertToBasic } from "../utils/material";

type GLTFResult = GLTF & {
  nodes: {
    ROCK: THREE.Mesh;
    SNOW: THREE.Mesh;
  };
  materials: {
    ["ROCK.MATERIAL"]: THREE.MeshStandardMaterial;
    ["SNOW.MATERIAL"]: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/Rocks4-1607241704/ROCKS_004.glb";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    FILE_URL,
    "https://www.gstatic.com/draco/versioned/decoders/1.4.0/"
  ) as GLTFResult;

  // const materials = convertToBasic(oldMaterials)

  return (
    <group ref={group} {...props}>
      <group scale={[120, 120, 120]}>
        <mesh
          material={materials["ROCK.MATERIAL"]}
          geometry={nodes.ROCK.geometry}
          name="ROCK"
          position={[0.0071, 0.0433, 0.1211]}
        />
        <mesh
          material={materials["SNOW.MATERIAL"]}
          geometry={nodes.SNOW.geometry}
          name="SNOW"
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
