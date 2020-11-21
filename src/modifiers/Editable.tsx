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
  //   const mode = useControl("mode", { type: "select", items: ["scale", "rotate", "translate"] })
  //
  useEffect(() => {
    if (transform.current) {
      const controls = transform.current;
      if (!controls) {
        return;
      }
      console.log(controls);
      controls.setMode("translate");
      // const callback = (event) =>
      //   event.value ? player.controls.lock() : player.controls.unlock;
      // controls.addEventListener("dragging-changed", callback);
      // return () => controls.removeEventListener("dragging-changed", callback);
    }
  });

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
