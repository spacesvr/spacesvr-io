import Linkedin from "models/Linkedin";
import Insta from "models/Insta";
import Twitter from "models/Twitter";
import { Floating } from "spacesvr";

const SPACING = 1;
const FLOAT_HEIGHT = 0.1;
const SCALE = 4;

const ContactIcons = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <group position-y={1.5} scale={[SCALE, SCALE, SCALE]}>
        <group position-x={-SPACING}>
          <Floating height={FLOAT_HEIGHT}>
            <Linkedin />
          </Floating>
        </group>
        <group>
          <Floating height={FLOAT_HEIGHT}>
            <Insta />
          </Floating>
        </group>
        <group position-x={SPACING}>
          <Floating height={FLOAT_HEIGHT}>
            <Twitter />
          </Floating>
        </group>
      </group>
    </group>
  );
};

export default ContactIcons;
