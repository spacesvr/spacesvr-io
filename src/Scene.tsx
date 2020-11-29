import { Suspense } from "react";
import { useAnalytics } from "services/analytics";
import SpacesVREntity from "components/SpacesVREntity";
import Floor from "components/Floor";
import Entities from "components/Entities";
import { KeyframeEnvironment, Keyframe, Fog } from "spacesvr";
import { Background } from "spacesvr/components";
import { Color, Vector3 } from "three";
import Particles from "./components/Particles";

const RENDER_DIST = 25;

const SpacesVR = () => {
  useAnalytics();

  const keyframes: Keyframe[] = [
    { label: "over", position: new Vector3(0.75, 1.25, 1.25) },
    { label: "entrance", position: new Vector3(0, 0.855 + 0.35, 0.43) },
    { label: "campfire", position: new Vector3(0, 0.855, 0) },
    { label: "pink", position: new Vector3(-0.069, 0.8575, 0) },
    { label: "blue", position: new Vector3(0, 0.861, -0.04) },
    { label: "green", position: new Vector3(0.053, 0.8575, 0.02) },
  ];

  return (
    <KeyframeEnvironment
      keyframes={keyframes}
      canvasProps={{
        camera: { near: 0.0001, far: RENDER_DIST * 2 },
        gl: { depth: true, stencil: true },
      }}
    >
      <Fog color={new Color(0xfffffff)} near={2} far={RENDER_DIST} />
      <Background color={0xffffff} />
      <Suspense fallback={null}>
        <SpacesVREntity rotation-y={Math.PI} />
      </Suspense>
      <Floor />
      <Particles />
      <Entities renderdist={RENDER_DIST} />
      <ambientLight intensity={0.3} />
      <directionalLight intensity={1} />
    </KeyframeEnvironment>
  );
};

export default SpacesVR;
