import SpacesHome from "./SpacesHome";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";
import GradientSky from "./GradientSky";

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
        <GradientSky
          radius={INNER_RADIUS}
          stops={["#967577", "#e2beb7", "#dfc1bf"]}
        />
        {/* outer white sphere */}
        <mesh rotation-x={Math.PI}>
          <sphereBufferGeometry
            args={[RADIUS + 0.01, SUBDIVISIONS, SUBDIVISIONS]}
          />
          <meshBasicMaterial color={0xffffff} side={THREE.DoubleSide} />
        </mesh>
        {/* circle geometry for shadow */}
        <mesh
          position={[0, -HEIGHT + Math.random() * 0.005, 0]}
          rotation-x={-Math.PI / 2}
        >
          <circleBufferGeometry args={[RADIUS, 50]} />
          <meshBasicMaterial color={"gray"} transparent opacity={0.7} />
        </mesh>
        {/* circle geometry as base for mountain */}
        <mesh
          position-y={INNER_RADIUS}
          rotation-x={-Math.PI / 2}
          castShadow
          receiveShadow
        >
          <circleBufferGeometry args={[INNER_RADIUS, SUBDIVISIONS * 10]} />
          <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
        {/* mountains */}
        <mesh rotation-x={-Math.PI / 2} receiveShadow>
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
