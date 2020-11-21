import { Floating } from "spacesvr/modifiers";
import SpacesHome from "./SpacesHome";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";
import { Color } from "three";

const RADIUS = 0.75;
const HEIGHT = RADIUS + 0.1;
const INNER_RADIUS = RADIUS - 0.001;
const SUBDIVISIONS = 36;

const SpacesVREntity = (props: JSX.IntrinsicElements["group"]) => {
  const heightmap = useLoader(THREE.TextureLoader, "/assets/TERRAIN-2.jpg");
  const alphaMap = useLoader(
    THREE.TextureLoader,
    "/assets/TERRAIN.ALPHA.MAP-3.jpg"
  );

  return (
    <group {...props}>
      <SpacesHome position-y={HEIGHT} />
      <mesh position-y={HEIGHT} rotation-x={Math.PI}>
        <sphereBufferGeometry
          args={[
            RADIUS,
            SUBDIVISIONS,
            SUBDIVISIONS,
            0,
            Math.PI * 2,
            0,
            -Math.PI / 2,
          ]}
        />
        <meshStandardMaterial color={0xffffff} side={THREE.DoubleSide} />
      </mesh>
      <mesh
        position-y={HEIGHT + INNER_RADIUS}
        rotation-x={-Math.PI / 2}
        castShadow
        receiveShadow
      >
        <circleBufferGeometry args={[INNER_RADIUS, SUBDIVISIONS * 10]} />
        <meshStandardMaterial transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
      <mesh position-y={HEIGHT} rotation-x={-Math.PI / 2}>
        <planeBufferGeometry
          args={[INNER_RADIUS * 2, INNER_RADIUS * 2, 500, 500]}
        />
        <meshStandardMaterial
          color={0xbbbbbb}
          transparent
          displacementMap={heightmap}
          displacementScale={0.2}
          alphaMap={alphaMap}
          bumpMap={heightmap}
        />
      </mesh>
    </group>
  );
};

export default SpacesVREntity;
