import { useMemo } from "react";
import { BufferAttribute, BufferGeometry, Color, ShaderMaterial } from "three";
import { useFrame } from "react-three-fiber";

const COUNT = 999;

const Particles = () => {
  const geo = useMemo(() => {
    const position = new Float32Array(COUNT * 3);
    const polars = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const velocities = new Float32Array(COUNT * 3);

    for (let i = 0; i < COUNT; i++) {
      let theta, phi, rad;

      polars[i * 3] = theta = (Math.random() * Math.PI) / 2; // theta
      polars[i * 3 + 1] = phi = Math.random() * Math.PI * 2; // phi
      polars[i * 3 + 2] = rad = Math.random() * 0.75; // rad

      // you have to set initial positions so bounding box is computed properly
      // basically set to outer edges of possibility
      position[i * 3] = rad * Math.sin(theta) * Math.cos(phi);
      position[i * 3 + 1] = rad * Math.cos(theta) + 0.85;
      position[i * 3 + 2] = rad * Math.sin(theta) * Math.sin(phi);

      velocities[i * 3] = (Math.random() - 0.5) * 0.4; // theta
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.4; // phi
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.4; // rad

      scales[i] = Math.random() * 1.4 + 1;
    }

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(position, 3));
    geometry.setAttribute("polars", new BufferAttribute(polars, 3));
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
          attribute vec3 polars;
          uniform float time;
          void main() {
            vec4 mvPolars = vec4(polars, 1.0);
            vec4 mvVelocity = vec4(velocity, 1.0);
            
            float theta = mvPolars.x + 0.2 * mvVelocity.x * sin(time * 4.0);
            float phi = mvPolars.y + 0.2 * mvVelocity.y * cos(time * 3.0);
            float rad = mvPolars.z + 0.2 * mvVelocity.z * sin(time * 2.0);
            rad = min(rad, 0.75);
            
            float x = rad * sin(theta) * cos(phi);
            float y = rad * cos(theta) + 0.85;
            float z = rad * sin(theta) * sin(phi);
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(x, y, z, 1.0);
            
            float depth = gl_Position.z / gl_Position.w;
            gl_PointSize = 3.0 * depth;
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
