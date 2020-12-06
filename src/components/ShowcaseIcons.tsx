import Chad from "models/Chad";
import Portal from "models/Portal";
import Gallery from "models/Gallery";
import { Floating } from "spacesvr";

const SPACING = 1;
const FLOAT_HEIGHT = 0.1;
const SCALE = 4;

const ShowcaseIcons = (props: JSX.IntrinsicElements["group"]) => {
  return (
    <group {...props}>
      <group position-y={1.5} scale={[SCALE, SCALE, SCALE]}>
        <group position-x={-SPACING}>
          <Floating height={FLOAT_HEIGHT}>
            <Chad />
          </Floating>
        </group>
        <group>
          <Floating height={FLOAT_HEIGHT}>
            <Portal />
          </Floating>
        </group>
        <group position-x={SPACING}>
          <Floating height={FLOAT_HEIGHT}>
            <Gallery />
          </Floating>
        </group>
      </group>
    </group>
  );
};

export default ShowcaseIcons;
