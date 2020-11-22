import { ReactElement, useEffect, useRef } from "react";
import { Group } from "three";
import { Interactable, useEnvironment } from "spacesvr/main";
import { TransformControls } from "@react-three/drei";

type EditableProps = {
  children: ReactElement;
};

const Editable = (props: EditableProps) => {
  const { children } = props;

  const group = useRef<Group>();
  const { player } = useEnvironment();
  const transform = useRef<TransformControls>();

  return (
    <group ref={group}>
      <Interactable>
        <TransformControls ref={transform}>
          <group dispose={null}>{children}</group>
        </TransformControls>
      </Interactable>
    </group>
  );
};

export default Editable;
