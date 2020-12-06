import { Suspense, useMemo } from "react";
import Rocks from "models/Rocks";
import Bonfire from "models/Bonfire";
import { Logo, Text } from "spacesvr";
import Orbiting from "../modifiers/Orbiting";
import Link from "./Link";
import { MeshStandardMaterial } from "three";
import Fire from "./Fire";
import FlickeringLight from "./FlickeringLight";
import IntroText from "./IntroText";

const SpacesHome = (props: JSX.IntrinsicElements["group"]) => {
  const textMaterial = useMemo(
    () => new MeshStandardMaterial({ roughness: 0.1, color: "#ad767a" }),
    []
  );

  return (
    <group {...props}>
      <group scale={[0.00275, 0.00275, 0.00275]}>
        <Suspense fallback={null}>
          <Rocks />
        </Suspense>
        <group position={[14, 0.05, -2]} rotation-y={-Math.PI / 2 + 0.2}>
          <Text
            text="CONTACT US"
            vAlign="top"
            font="https://d27rt3a60hh1lx.cloudfront.net/fonts/Coolvetica.json"
            size={5}
            material={textMaterial}
          />
        </group>
        <group position={[-13, 0.05, -4.5]} rotation-y={Math.PI / 2 - 0.35}>
          <Text
            text="SHOWCASE"
            vAlign="top"
            font="https://d27rt3a60hh1lx.cloudfront.net/fonts/Coolvetica.json"
            size={5}
            material={textMaterial}
          />
        </group>
        <group name="campfire" position={[0, 0, 8]}>
          <Suspense fallback={null}>
            <Bonfire />
          </Suspense>
          <Fire
            width={1}
            depth={1}
            height={2}
            sliceSpacing={0.25}
            position-y={1}
          />
          <FlickeringLight position-y={0.5} />
        </group>
        <IntroText position={[0, 1, 11]} material={textMaterial} />
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
