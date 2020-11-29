import SpacesHome from "./SpacesHome";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";
import { Stars } from "@react-three/drei";

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
      <group position-y={HEIGHT}>
        <SpacesHome />
        {/* inner night sky */}
        <mesh>
          <sphereBufferGeometry args={[RADIUS, SUBDIVISIONS, SUBDIVISIONS]} />
          <meshStandardMaterial color={0x000000} side={THREE.DoubleSide} />
        </mesh>
        {/* stars */}
        <Stars
          radius={RADIUS - 0.385}
          depth={0}
          count={3000}
          fade
          factor={0.008}
        />
        {/* outer white sphere */}
        <mesh rotation-x={Math.PI}>
          <sphereBufferGeometry
            args={[RADIUS + 0.01, SUBDIVISIONS, SUBDIVISIONS]}
          />
          <meshStandardMaterial color={0xffffff} side={THREE.DoubleSide} />
        </mesh>
        {/* circle geometry as base for mountain */}
        <mesh
          position-y={INNER_RADIUS}
          rotation-x={-Math.PI / 2}
          castShadow
          receiveShadow
        >
          <circleBufferGeometry args={[INNER_RADIUS, SUBDIVISIONS * 10]} />
          <meshStandardMaterial
            transparent
            opacity={0}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* mountains */}
        <mesh rotation-x={-Math.PI / 2}>
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
            depthWrite={true}
          />
        </mesh>
      </group>
    </group>
  );
};

export default SpacesVREntity;
