import { Suspense } from "react";
import { useAnalytics } from "services/analytics";
import SpacesVREntity from "components/SpacesVREntity";
import Floor from "components/Floor";
import { softShadows } from "@react-three/drei";
import Entities from "components/Entities";
import { KeyframeEnvironment, Keyframe, Fog } from "spacesvr";
import { Background } from "spacesvr/components";
import { Color, Vector3 } from "three";
import Particles from "./components/Particles";

const RENDER_DIST = 25;

softShadows({
  frustrum: 3.5, // Frustrum width (default: 3.75)
  size: 0.002, // World size (default: 0.005)
  near: 7.5, // Near plane (default: 9.5)
  samples: 20, // Samples (default: 17)
  rings: 11, // Rings (default: 11)
});

const SpacesVR = () => {
  useAnalytics();

  const keyframes: Keyframe[] = [
    { label: "over", position: new Vector3(0.3, 1.5, 0.8) },
    { label: "entrance", position: new Vector3(0, 0.855, 0.4) },
    { label: "campfire", position: new Vector3(0, 0.855, 0) },
    { label: "blue", position: new Vector3(-0.065, 0.855, -0.02) },
    { label: "red", position: new Vector3(0, 0.855, -0.07) },
    { label: "purple", position: new Vector3(0.064, 0.86, 0) },
  ];

  return (
    <KeyframeEnvironment
      keyframes={keyframes}
      canvasProps={{ camera: { near: 0.0001, far: 150 } }}
    >
      <Fog color={new Color(0xfffffff)} near={0} far={RENDER_DIST} />
      <Background color={0xffffff} />
      <Suspense fallback={null}>
        <SpacesVREntity rotation-y={Math.PI} />
      </Suspense>
      <Floor />
      <Particles />
      <Entities renderdist={RENDER_DIST} />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[0, RENDER_DIST - 5, 0]}
        intensity={2}
        castShadow
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
        shadow-camera-near={2}
        shadow-camera-far={RENDER_DIST}
        shadow-camera-right={RENDER_DIST}
        shadow-camera-top={RENDER_DIST}
        shadow-camera-left={-RENDER_DIST}
        shadow-camera-bottom={-RENDER_DIST}
      />
    </KeyframeEnvironment>
  );
};

export default SpacesVR;
