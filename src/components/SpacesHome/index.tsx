import HomeBlue from "models/HomeBlue";
import HomePurple from "models/HomePurple";
import HomeRed from "models/HomeRed";
import React from "react";
import { Logo } from "spacesvr/components";
import Orbiting from "../../modifiers/Orbiting";

const SpacesHome = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <group scale={[0.0025, 0.0025, 0.0025]}>
        <HomeBlue position-x={50} />
        <HomePurple position-z={-30} />
        <HomeRed position-z={60} />
        <Orbiting dist={90}>
          <Logo floating rotating position={[0, 50, 0]} scale={[15, 15, 15]} />
        </Orbiting>
      </group>
    </group>
  );
};

export default SpacesHome;
