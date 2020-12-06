/*
auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    log: THREE.Mesh;
  };
  materials: {
    ["log.mat"]: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/Log-1607258955/log_2.glb";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    FILE_URL,
    "https://www.gstatic.com/draco/versioned/decoders/1.4.0/"
  ) as GLTFResult;
  return (
    <group ref={group} {...props}>
      <group scale={[5, 5, 5]}>
        <mesh
          material={materials["log.mat"]}
          geometry={nodes.log.geometry}
          name="log"
          rotation={[0, 0, 0]}
          scale={[0.1451, 0.1451, 0.1451]}
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
