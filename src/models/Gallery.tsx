/*
auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";

import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GLTFResult = GLTF & {
  nodes: {
    gallerylogo: THREE.Mesh;
    gallerybutton: THREE.Mesh;
    gallerybase: THREE.Mesh;
  };
  materials: {
    ["gallery.logo"]: THREE.MeshStandardMaterial;
    ["gallery.button"]: THREE.MeshStandardMaterial;
    ["gallery.base"]: THREE.MeshStandardMaterial;
  };
};

const FILE_URL =
  "https://d27rt3a60hh1lx.cloudfront.net/models/Gallery-1607257970/gallery.glb";

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>();
  const { nodes, materials } = useGLTF(
    FILE_URL,
    "https://www.gstatic.com/draco/versioned/decoders/1.4.0/"
  ) as GLTFResult;
  return (
    <group ref={group} {...props}>
      <group>
        <mesh
          material={materials["gallery.logo"]}
          geometry={nodes.gallerylogo.geometry}
          name="gallerylogo"
        />
        <mesh
          material={materials["gallery.button"]}
          geometry={nodes.gallerybutton.geometry}
          name="gallerybutton"
        />
        <mesh
          material={materials["gallery.base"]}
          geometry={nodes.gallerybase.geometry}
          name="gallerybase"
        />
      </group>
    </group>
  );
}

useGLTF.preload(FILE_URL);
