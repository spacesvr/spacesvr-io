import { ReactThreeFiber } from "react-three-fiber";
import { useMemo } from "react";
import { ShaderMaterial } from "three";
import * as THREE from "three";

type GradientSky = {
  radius?: number;
  stops: ReactThreeFiber.Color[];
} & JSX.IntrinsicElements["group"];

const GradientSky = (props: GradientSky) => {
  const { radius, stops, ...restProps } = props;

  const NUM_COLORS = stops.length;
  const COLORS = stops.map((stop) => {
    console.log(new THREE.Color(stop).getHex());
    return new THREE.Color(stop).getHex();
  });

  const mat = useMemo(() => {
    return new ShaderMaterial({
      uniforms: {
        radius: { value: radius },
        colors: { value: COLORS },
        num_colors: { value: NUM_COLORS },
      },
      vertexShader: `
          varying vec3 absPosition;
          void main() {
            absPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
          }
      `,
      fragmentShader: `
          uniform float radius;
          uniform int num_colors;
          uniform int colors[${NUM_COLORS}];
          varying vec3 absPosition;
      
          vec3 hexToVec(int hex) {
            float r = float((hex >> 0x10) & 0xFF);
            float g = float((hex >> 0x8) & 0xFF);
            float b = float(hex & 0xFF);
            return vec3(r / 255.0, g / 255.0, b / 255.0);
          }
      
          void main() {
            float yCoord = (gl_FragCoord.y / gl_FragCoord.w);
            float height = (absPosition.y) / radius;
            
            vec3 color = hexToVec(colors[0]);
            for(int i = 1; i < num_colors; i++) {
              vec3 thisColor = hexToVec(colors[i]);
              float lastPerc = float(i - 1) / float(num_colors);
              float thisPerc = float(i) / float(num_colors);
              color = mix(color, thisColor, smoothstep(lastPerc, thisPerc, height));
            }
            
            gl_FragColor = vec4( color, 1.0 );
          }
      `,
    });
  }, [stops]);

  mat.side = THREE.DoubleSide;

  return (
    <group {...restProps}>
      <mesh material={mat}>
        <sphereBufferGeometry args={[radius, 50, 50]} />
      </mesh>
    </group>
  );
};

export default GradientSky;
