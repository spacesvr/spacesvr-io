import HomeBlue from "models/HomeBlue";
import HomePurple from "models/HomePurple";
import HomeRed from "models/HomeRed";
import React from "react";
import { Logo } from "spacesvr/components";
import Orbiting from "../../modifiers/Orbiting";
import Editable from "../../modifiers/Editable";

const SpacesHome = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <group scale={[0.00075, 0.00075, 0.00075]}>
        <Editable>
          <HomeBlue position={[110, 0, 40]} rotation-y={Math.PI - 0.14} />
        </Editable>
        <Editable>
          <HomePurple position={[-130, 0, 10]} rotation-y={Math.PI / 2 + 0.5} />
        </Editable>
        <Editable>
          <HomeRed position-z={120} rotation-y={-Math.PI / 2} />
        </Editable>
        <Orbiting dist={90}>
          <Logo floating rotating position={[0, 90, 0]} scale={[15, 15, 15]} />
        </Orbiting>
      </group>
    </group>
  );
};

export default SpacesHome;
