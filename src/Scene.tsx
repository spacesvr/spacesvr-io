import { useAnalytics } from "services/analytics";
import SpacesVREntity from "components/SpacesVREntity";
import Floor from "components/Floor";
import Entities from "components/Entities";
import { KeyframeEnvironment, Keyframe, Fog, Background, HDRI } from "spacesvr";
import { Color, Vector3 } from "three";
import Particles from "./components/Particles";
import { Effects } from "./effects/Effects";
import { Radiance } from "./components/Radiance";

const RENDER_DIST = 25;

const SpacesVR = () => {
  useAnalytics();

  const keyframes: Keyframe[] = [
    { label: "over", position: new Vector3(0.75, 1.25, 1.25) },
    { label: "entrance", position: new Vector3(0, 0.855 + 0.35, 0.43) },
    { label: "campfire", position: new Vector3(0, 0.855, 0) },
  ];

  return (
    <KeyframeEnvironment
      effects={Effects}
      keyframes={keyframes}
      canvasProps={{
        camera: { near: 0.0001, far: RENDER_DIST * 2 },
        gl: { depth: true, stencil: true },
      }}
    >
      <Radiance src="/assets/gradient.hdr" />
      <Fog color={new Color(0xfffffff)} near={2} far={RENDER_DIST} />
      <Background color={0xffffff} />
      <SpacesVREntity rotation-y={Math.PI} />
      <Floor />
      <Particles />
      <Entities renderdist={RENDER_DIST} />
      <ambientLight intensity={0.1} />
      {/*<directionalLight intensity={1} castShadow />*/}
    </KeyframeEnvironment>
  );
};

export default SpacesVR;
