const PLANE_WIDTH = 150;
const PLANE_HEIGHT = 150;

const Floor = () => {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position-y={-0.2}>
        <planeBufferGeometry args={[PLANE_WIDTH, PLANE_HEIGHT]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  );
};

export default Floor;
