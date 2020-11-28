import { Suspense } from "react";
import { useAnalytics } from "services/analytics";
import SpacesVREntity from "components/SpacesVREntity";
import Floor from "components/Floor";
import Entities from "components/Entities";
import { KeyframeEnvironment, Keyframe, Fog } from "spacesvr";
import { Background } from "spacesvr/components";
import { Color, Vector3 } from "three";
import Particles from "./components/Particles";
import RealityManager from "./realities/RealityManager";

const RENDER_DIST = 25;

const SpacesVR = () => {
  useAnalytics();

  const keyframes: Keyframe[] = [
    { label: "over", position: new Vector3(0.5, 1.5, 1) },
    { label: "entrance", position: new Vector3(0, 0.855 + 0.48, 0.4) },
    { label: "campfire", position: new Vector3(0, 0.855, 0) },
    { label: "blue", position: new Vector3(-0.065, 0.855, -0.02) },
    { label: "red", position: new Vector3(0, 0.855, -0.07) },
    { label: "purple", position: new Vector3(0.064, 0.86, 0) },
  ];

  return (
    <RealityManager>
      <KeyframeEnvironment
        keyframes={keyframes}
        canvasProps={{
          camera: { near: 0.0001, far: RENDER_DIST * 2 },
          gl: { depth: true, stencil: true },
        }}
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
        <directionalLight intensity={1} />
      </KeyframeEnvironment>
      <KeyframeEnvironment
        keyframes={keyframes}
        canvasProps={{
          camera: { far: RENDER_DIST * 2 },
        }}
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
        <directionalLight intensity={1} />
      </KeyframeEnvironment>
    </RealityManager>
  );
};

export default SpacesVR;
