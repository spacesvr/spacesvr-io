import { Suspense, useMemo } from "react";
import Rocks from "models/Rocks";
import { Logo, Text } from "spacesvr";
import Orbiting from "../modifiers/Orbiting";
import { MeshStandardMaterial } from "three";
import IntroText from "./IntroText";
import ContactIcons from "./ContactIcons";
import ShowcaseIcons from "./ShowcaseIcons";
import Campfire from "./Campfire";

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
        <group
          name="contact"
          position={[14, 0.05, -2]}
          rotation-y={-Math.PI / 2 + 0.2}
        >
          <group>
            <Text
              text="CONTACT US"
              vAlign="top"
              font="https://d27rt3a60hh1lx.cloudfront.net/fonts/Coolvetica.json"
              size={5}
              material={textMaterial}
            />
          </group>
          <ContactIcons position={[-2, 0, 4]} />
        </group>
        <group
          name="showcase"
          position={[-13, 0.05, -4.5]}
          rotation-y={Math.PI / 2 - 0.35}
        >
          <group>
            <Text
              text="SHOWCASE"
              vAlign="top"
              font="https://d27rt3a60hh1lx.cloudfront.net/fonts/Coolvetica.json"
              size={5}
              material={textMaterial}
            />
          </group>
          <ShowcaseIcons position={[0, 0, 6]} />
        </group>
        <Campfire name="campfire" position={[0, 0, 8]} />
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
