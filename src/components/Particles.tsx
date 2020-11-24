import { useMemo } from "react";
import { BufferAttribute, BufferGeometry, Color, ShaderMaterial } from "three";
import { useFrame } from "react-three-fiber";

const COUNT = 9999;

const Particles = () => {
  const geo = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const velocities = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 4;
      const phi = Math.random() * Math.PI;
      const rad = Math.random() * 0.75;

      positions[i * 3] = rad * Math.sin(theta) * Math.cos(phi); // x
      positions[i * 3 + 1] = rad * Math.sin(theta) * Math.sin(phi) + 0.85; // y
      positions[i * 3 + 2] = rad * Math.cos(theta); // z

      velocities[i * 3] = (Math.random() - 0.5) * 2; // theta
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 2; // phi
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 2; // rad

      scales[i] = Math.random() * 1.4 + 1;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new BufferAttribute(scales, 1));
    geometry.setAttribute("velocity", new BufferAttribute(velocities, 3));
    return geometry;
  }, []);

  const mat = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        color: { value: new Color(0xffffff) },
        time: { value: 0 },
      },
      vertexShader: `
          attribute float scale;
          attribute vec3 velocity;
          uniform float time;
          void main() {
            vec4 mvPosition = vec4(position, 1.0);
            vec4 mvVelocity = vec4(velocity, 1.0);
            
            float theta = atan(mvPosition.y / mvPosition.x);
            float rad = sqrt(mvPosition.x * mvPosition.x + mvPosition.y * mvPosition.y);
            float phi = atan(rad / mvPosition.z);
            
            theta = theta + 0.2 * mvVelocity.x * sin(time * 4.0);
            phi = phi + 0.2 * mvVelocity.y * cos(time * 4.0);
            rad = rad + 0.2 * mvVelocity.z * sin(time * 4.0);
            
            // rad = min(rad, 0.75);
            
            float x = rad * sin(theta) * cos(phi);
            float y = rad * sin(theta) * sin(phi);
            float z = rad * cos(theta);
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, z, 1.0);
            
            float depth = gl_Position.z / gl_Position.w;
            gl_PointSize = depth;
          }
      `,
      fragmentShader: `
          uniform vec3 color;
          void main() {
            // if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
            gl_FragColor = vec4( color, 1.0 );
          }
      `,
    });
  }, []);

  useFrame(({}, delta) => {
    if (mat) {
      mat.uniforms.time.value += delta / 20;
    }
  });

  return (
    <group>
      <points args={[geo, mat]} />
    </group>
  );
};

export default Particles;
