import React, { useMemo } from "react";
import { Vector3 } from "three";
import { Floating } from "spacesvr";

const NUM_ENTITIES = 16;
const HEIGHT_POWER = 6;
const ENTITY_RADIUS = 0.75;
const SPAWN_X_MULT = 2.2; // [-SPAWN / 2, SPAWN / 2]
const SPAWN_Y_MULT = 1.1; // [0, SPAWN]
const SPAWN_Z_MULT = 2.2; // [-SPAWN / 2, SPAWN / 2]
const SPACESVR_ENTITY = new Vector3(0, ENTITY_RADIUS + 0.1, 0);

type GenericEntityProps = {
  seed: number;
  position: Vector3;
  renderdist: number;
};

const GenericEntity = (props: GenericEntityProps) => {
  const { seed, position, renderdist } = props;

  const color = seed * 0xffffff;
  const SPAWN_Y = renderdist * SPAWN_Y_MULT;
  const shadowOpacity = (SPAWN_Y - position.y) / SPAWN_Y;

  return (
    <group position={position}>
      <Floating height={0.1}>
        <mesh>
          <sphereBufferGeometry args={[ENTITY_RADIUS, 20, 20]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </Floating>
      <mesh
        position={[0, -position.y + Math.random() * 0.005, 0]}
        rotation-x={-Math.PI / 2}
      >
        <circleBufferGeometry args={[ENTITY_RADIUS, 50]} />
        <meshBasicMaterial
          color={"gray"}
          transparent
          opacity={shadowOpacity * shadowOpacity * 0.8}
        />
      </mesh>
    </group>
  );
};

const Entities = (props: { renderdist: number }) => {
  const { renderdist } = props;

  const SPAWN_X = renderdist * SPAWN_X_MULT;
  const SPAWN_Y = renderdist * SPAWN_Y_MULT;
  const SPAWN_Z = renderdist * SPAWN_Z_MULT;

  const entities: GenericEntityProps[] = useMemo(() => {
    const arr: GenericEntityProps[] = [];
    for (let i = 0; i < NUM_ENTITIES; i++) {
      const position = new Vector3();

      // checks if entity is colliding with spacesvr entity or any other generic entity
      const posIsValid = (pos: Vector3) => {
        if (pos.distanceTo(SPACESVR_ENTITY) < ENTITY_RADIUS * 2) {
          return false;
        }

        for (let x = 0; x < arr.length; x++) {
          if (arr[x]?.position.distanceTo(position) < ENTITY_RADIUS * 2) {
            return false;
          }
        }

        return true;
      };

      do {
        const x = Math.random() * SPAWN_X - SPAWN_X / 2;
        const y =
          Math.pow(Math.random(), HEIGHT_POWER) * SPAWN_Y + ENTITY_RADIUS + 1;
        const z = Math.random() * SPAWN_Z - SPAWN_Z / 2;
        position.set(x, y, z);
      } while (!posIsValid(position));

      arr.push({
        seed: Math.random(),
        position,
        renderdist,
      });
    }
    return arr;
  }, []);

  if (!entities) {
    return <></>;
  }

  return (
    <group>
      {entities.map((props) => (
        <GenericEntity {...props} key={props.seed} />
      ))}
    </group>
  );
};

export default Entities;
