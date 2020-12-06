import { Floating, Interactable } from "spacesvr";
import { Text } from "@react-three/drei";

type LinkProps = {
  url: string;
  title: string;
} & JSX.IntrinsicElements["group"];

const Link = (props: LinkProps) => {
  const { url, title, ...restProps } = props;
  return (
    <group {...restProps}>
      <Interactable onClick={() => (window.location.href = url)}>
        <Floating>
          <group position-y={1} rotation-y={Math.PI}>
            <Text color="black" fontSize={0.75}>
              {title}
            </Text>
          </group>
          <mesh>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </Floating>
      </Interactable>
    </group>
  );
};

export default Link;
