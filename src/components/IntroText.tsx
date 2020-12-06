import { Floating, Arrow } from "spacesvr";
import { Material } from "three";
import { Text } from "@react-three/drei";
import Mail from "../models/Mail";

const WIDTH = 8;
const HEIGHT = 4.5;
const DEPTH = 0.5;

type IntroTextProps = { material: Material } & JSX.IntrinsicElements["group"];

const IntroText = (props: IntroTextProps) => {
  const { material, ...restProps } = props;

  const textProps = {
    fontSize: 1,
    color: "black",
    textAlign: "left",
    anchorY: "top",
  };

  return (
    <group {...restProps}>
      <Floating height={0.2}>
        <mesh
          position-y={(HEIGHT / 2) * 1.1}
          position-z={DEPTH / 2 + 0.01}
          material={material}
        >
          <boxBufferGeometry args={[WIDTH, HEIGHT, DEPTH]} />
        </mesh>
        <group rotation-y={Math.PI} position-y={HEIGHT}>
          <Text fontSize={0.8} color="black" textAlign="left" anchorY="top">
            SPACES
          </Text>
          <Text
            fontSize={0.3}
            maxWidth={WIDTH * 0.9}
            position-y={-1.5}
            anchorY="top"
            color="black"
            textAlign="justify"
          >
            Spaces is here to fuck shit up. Apply to our waitlist to fuck shit
            up with us. If not, feel free to sit by the campfire to sip on some
            hot coffee and read a book about why you should fuck shit up with
            us.
          </Text>
          <Text
            fontSize={0.3}
            maxWidth={WIDTH * 0.9}
            position-y={-HEIGHT * 0.9}
            position-x={(WIDTH / 2) * 0.7}
            anchorY="bottom"
            anchorX="right"
            color="black"
            textAlign="right"
          >
            Apply Here
          </Text>
          <Arrow
            dark
            rotation-z={Math.PI}
            position-y={-HEIGHT * 0.865}
            position-x={(WIDTH / 2) * 0.85}
            scale={[1.5, 1.5, 1.5]}
          />
        </group>
      </Floating>
      <group
        scale={[4, 4, 4]}
        rotation-y={Math.PI - 0.35}
        position-x={-WIDTH / 2 - 0.85}
      >
        <Floating height={0.06}>
          <Mail />
        </Floating>
      </group>
    </group>
  );
};

export default IntroText;
