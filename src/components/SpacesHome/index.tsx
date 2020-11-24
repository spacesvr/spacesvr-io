import HomeBlue from "models/HomeBlue";
import HomePurple from "models/HomePurple";
import HomeRed from "models/HomeRed";
import React, { useMemo } from "react";
import { Logo } from "spacesvr/components";
import Orbiting from "../../modifiers/Orbiting";
import { SpotLight } from "three";

const SpacesHome = (props: JSX.IntrinsicElements["group"]) => {
  const config = {
    intensity: 1.2,
    angle: Math.PI / 3,
    penumbra: 0.8,
  };

  const light = useMemo(() => new SpotLight(0x3d4867), []);
  const light2 = useMemo(() => new SpotLight(0x5b703d), []);
  const light3 = useMemo(() => new SpotLight(0x224f86), []);

  return (
    <group {...props}>
      <group scale={[0.00075, 0.00075, 0.00075]}>
        <group position={[108, 0, 34]} rotation-y={0.15}>
          <group position={[0, 65, 0]}>
            <primitive object={light} {...config} />
            <primitive object={light.target} position={[0, -1, 0]} />
          </group>
          <HomeBlue />
        </group>
        <group position={[-130, 0, 10]} rotation-y={Math.PI / 2 + 0.3}>
          <group position={[0, 65, 0]}>
            <primitive object={light2} {...config} />
            <primitive object={light2.target} position={[0, -1, 0]} />
          </group>
          <HomePurple />
        </group>
        <group position-z={115} rotation-y={-Math.PI / 2}>
          <group position={[0, 65, 0]}>
            <primitive object={light3} {...config} />
            <primitive object={light3.target} position={[0, -1, 0]} />
          </group>
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
