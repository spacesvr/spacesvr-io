import HomeBlue from "models/HomeBlue";
import HomePurple from "models/HomePurple";
import HomeRed from "models/HomeRed";
import React, { useMemo } from "react";
import { Logo } from "spacesvr/components";
import Orbiting from "../../modifiers/Orbiting";
import { SpotLight } from "three";

const SpacesHome = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <group scale={[0.00075, 0.00075, 0.00075]}>
        <group position={[108, 0, 34]} rotation-y={0.15}>
          <HomeBlue />
        </group>
        <group position={[-130, 0, 10]} rotation-y={Math.PI / 2 + 0.3}>
          <HomePurple />
        </group>
        <group position-z={115} rotation-y={-Math.PI / 2}>
          <HomeRed />
        </group>
        <Orbiting dist={90}>
          <Logo floating rotating position={[0, 90, 0]} scale={[15, 15, 15]} />
        </Orbiting>
      </group>
    </group>
  );
};

export default SpacesHome;
