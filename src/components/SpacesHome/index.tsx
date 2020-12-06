import { Suspense } from "react";
import Rocks from "models/Rocks";
import { Logo } from "spacesvr";
import Orbiting from "../../modifiers/Orbiting";

const SpacesHome = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <group scale={[0.00275, 0.00275, 0.00275]}>
        <Suspense fallback={null}>
          <Rocks />
        </Suspense>
        <Orbiting dist={9}>
          <Logo
            floating
            rotating
            position={[0, 9, 0]}
            scale={[1.5, 1.5, 1.5]}
          />
        </Orbiting>
      </group>
    </group>
  );
};

export default SpacesHome;
