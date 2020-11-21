import { ReactNode, useRef } from "react";
import { Group } from "three";
import { useFrame } from "react-three-fiber";

type OrbitingProps = {
  dist: number;
  children: ReactNode;
  height?: number;
  speed?: number;
};

const Orbiting = (props: OrbitingProps) => {
  const { dist, height = 0, speed = 1, children } = props;

  const group = useRef<Group>();
  useFrame(({ clock }) => {
    if (group.current) {
      const x = dist * Math.cos(clock.getElapsedTime() * 0.1 * speed);
      const z = dist * Math.sin(clock.getElapsedTime() * 0.1 * speed);
      group.current.position.set(x, height, z);
    }
  });

  return <group ref={group}>{children}</group>;
};

export default Orbiting;
