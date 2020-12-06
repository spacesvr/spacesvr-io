import { PointLight } from "three";
import { useMemo } from "react";
import { useFrame } from "react-three-fiber";
import SimplexNoise from "simplex-noise";

const FlickeringLight = (props: JSX.IntrinsicElements["group"]) => {
  const noise = useMemo(() => new SimplexNoise(), []);

  const light = useMemo(() => new PointLight(), []);
  const lightAttrs = {
    distance: 0.17,
    color: "#ff8e2b",
    intensity: 1.7,
  };

  useFrame(({ clock }) => {
    const SPEED = 4;
    light.intensity =
      lightAttrs.intensity + noise.noise2D(clock.getElapsedTime() * SPEED, 1);
  });

  return (
    <group {...props}>
      <primitive object={light} {...lightAttrs} />
    </group>
  );
};

export default FlickeringLight;
