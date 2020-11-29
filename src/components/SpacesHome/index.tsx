import AboutSpace from "models/AboutSpace";
import ContactSpace from "models/ContactSpace";
import ServiceSpace from "models/ServiceSpace";
import React from "react";
import { Logo } from "spacesvr/components";
import Orbiting from "../../modifiers/Orbiting";

const SpacesHome = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <group scale={[0.004, 0.004, 0.004]}>
        <group position={[17, 0, 3.5]} rotation-y={-0.15}>
          <AboutSpace />
        </group>
        <group position={[-16, 0, -3]} rotation-y={Math.PI / 2 + 0.3}>
          <ContactSpace />
        </group>
        <group position-z={18} rotation-y={-Math.PI / 2}>
          <ServiceSpace />
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
