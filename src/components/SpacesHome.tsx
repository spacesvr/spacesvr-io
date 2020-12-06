import { Suspense, useMemo } from "react";
import Rocks from "models/Rocks";
import Bonfire from "models/Bonfire";
import { Logo, Text } from "spacesvr";
import Orbiting from "../modifiers/Orbiting";
import Link from "./Link";
import { MeshStandardMaterial } from "three";
import Fire from "./Fire";
import FlickeringLight from "./FlickeringLight";

const SpacesHome = (props: JSX.IntrinsicElements["group"]) => {
  const textMaterial = useMemo(
    () => new MeshStandardMaterial({ roughness: 0.8, color: "#ad767a" }),
    []
  );

  return (
    <group {...props}>
      <group scale={[0.00275, 0.00275, 0.00275]}>
        <Suspense fallback={null}>
          <Rocks />
        </Suspense>
        {/*<group position-y={1.5}>*/}
        {/*  <Link url="https://instagram.com/spaces3.0" title="Instagram" position={[0, 0, 5]} />*/}
        {/*</group>*/}
        <group position={[14, 0.05, -2]} rotation-y={-Math.PI / 2 + 0.2}>
          <Text
            text="CONTACT US"
            vAlign="top"
            font="https://d27rt3a60hh1lx.cloudfront.net/fonts/Coolvetica.json"
            size={5}
            material={textMaterial}
          />
        </group>
        <group position={[0, 0, 8]}>
          <Bonfire />
          <Fire
            width={1}
            depth={1}
            height={3}
            sliceSpacing={0.25}
            position-y={1.5}
          />
          <FlickeringLight position-y={1} />
        </group>
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
