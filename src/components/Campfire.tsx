import { Suspense } from "react";
import Bonfire from "../models/Bonfire";
import Fire from "./Fire";
import FlickeringLight from "./FlickeringLight";
import Log from "../models/Log";

const Campfire = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <Suspense fallback={null}>
        <Bonfire />
      </Suspense>
      <Fire width={1} depth={1} height={2} sliceSpacing={0.25} position-y={1} />
      <FlickeringLight position-y={0.5} />
      <Suspense fallback={null}>
        <Log position={[1.8, 0, -1.6]} rotation-y={-0.39} />
        <group position={[-1.95, 0, -1.35]} rotation-y={0.73}>
          <Log rotation-z={Math.PI} />
        </group>
      </Suspense>
    </group>
  );
};

export default Campfire;
