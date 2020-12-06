/* eslint-disable */
import { useMemo, useRef } from "react";
import { Mesh, ShaderMaterial, Vector3 } from "three";
import { useFrame, useLoader, useThree } from "react-three-fiber";
import { frag, vertex } from "./definitions/shaders";
import * as THREE from "three";
import { getPosCorners } from "./definitions/functions";
import {
  cornerNeighbors,
  incomingEdges,
  texCorners,
} from "./definitions/constants";

type FireProps = {
  width: number;
  height: number;
  depth: number;
  sliceSpacing: number;
} & JSX.IntrinsicElements["group"];

// ported from this repo:
// https://github.com/yomotsu/VolumetricFire

const Fire = (props: FireProps) => {
  const { width, height, depth, sliceSpacing, ...restProps } = props;

  const { camera } = useThree();
  const mesh = useRef<Mesh>();
  const viewVector = useRef<Vector3>(new Vector3());

  const nzw = useLoader(THREE.TextureLoader, "/assets/nzw.png");
  nzw.wrapS = nzw.wrapT = THREE.RepeatWrapping;
  nzw.minFilter = nzw.magFilter = THREE.LinearFilter;

  const firetex = useLoader(THREE.TextureLoader, "/assets/firetex.png");
  firetex.wrapS = firetex.wrapT = THREE.ClampToEdgeWrapping;
  firetex.minFilter = firetex.magFilter = THREE.LinearFilter;

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          nzw: {
            value: nzw,
          },
          fireProfile: {
            value: firetex,
          },
          time: {
            value: 1.0,
          },
        },
        vertexShader: vertex,
        fragmentShader: frag,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        transparent: true,
      }),
    [nzw, firetex]
  );

  const geometry = useMemo(() => {
    const index = new Uint16Array((width + height + depth) * 30);
    const position = new Float32Array((width + height + depth) * 30 * 3);
    const tex = new Float32Array((width + height + depth) * 30 * 3);

    const geometry = new THREE.BufferGeometry();
    // geometry.dynamic = true; // doesn't exist ?
    geometry.setIndex(new THREE.BufferAttribute(index, 1));
    geometry.addAttribute("position", new THREE.BufferAttribute(position, 3));
    geometry.addAttribute("tex", new THREE.BufferAttribute(tex, 3));

    return geometry;
  }, [width, height, depth, material]);

  const updateViewVector = () => {
    if (!mesh.current) {
      return;
    }

    const modelViewMatrix = new THREE.Matrix4();

    modelViewMatrix.multiplyMatrices(
      camera.matrixWorldInverse,
      mesh.current.matrixWorld
    );

    viewVector.current
      .set(
        -modelViewMatrix.elements[2],
        -modelViewMatrix.elements[6],
        -modelViewMatrix.elements[10]
      )
      .normalize();
  };

  const slice = () => {
    const PriorityQueue = function (this: any) {
      this.contents = [];
      this.sorted = false;
    };

    PriorityQueue.prototype = {
      sort: function () {
        this.contents.sort();
        this.sorted = true;
      },

      pop: function () {
        if (!this.sorted) {
          this.sort();
        }

        return this.contents.pop();
      },

      top: function () {
        if (!this.sorted) {
          this.sort();
        }

        return this.contents[this.contents.length - 1];
      },

      push: function (object: any, priority: any) {
        this.contents.push({ object: object, priority: priority });
        this.sorted = false;
      },
    };
    const points = [];
    const texCoords = [];
    const indexes = [];
    const posCorners = getPosCorners(width, height, depth);

    let i;
    const cornerDistance0 = posCorners[0].dot(viewVector.current);

    const cornerDistance = [cornerDistance0];
    let maxCorner = 0;
    let minDistance = cornerDistance0;
    let maxDistance = cornerDistance0;

    for (i = 1; i < 8; i = (i + 1) | 0) {
      cornerDistance[i] = posCorners[i].dot(viewVector.current);

      if (cornerDistance[i] > maxDistance) {
        maxCorner = i;
        maxDistance = cornerDistance[i];
      }

      if (cornerDistance[i] < minDistance) {
        minDistance = cornerDistance[i];
      }
    }

    // Aligning slices
    let sliceDistance = Math.floor(maxDistance / sliceSpacing) * sliceSpacing;

    const activeEdges = [];
    let firstEdge = 0;
    let nextEdge = 0;
    const expirations = new PriorityQueue();

    const createEdge = function (startIndex, endIndex) {
      if (nextEdge >= 12) {
        return undefined;
      }

      const activeEdge = {
        expired: false,
        startIndex: startIndex,
        endIndex: endIndex,
        deltaPos: new THREE.Vector3(),
        deltaTex: new THREE.Vector3(),
        pos: new THREE.Vector3(),
        tex: new THREE.Vector3(),
        cur: nextEdge,
      };

      const range = cornerDistance[startIndex] - cornerDistance[endIndex];

      if (range !== 0.0) {
        const irange = 1.0 / range;

        activeEdge.deltaPos
          .subVectors(posCorners[endIndex], posCorners[startIndex])
          .multiplyScalar(irange);

        activeEdge.deltaTex
          .subVectors(texCorners[endIndex], texCorners[startIndex])
          .multiplyScalar(irange);

        const step = cornerDistance[startIndex] - sliceDistance;

        activeEdge.pos.addVectors(
          activeEdge.deltaPos.clone().multiplyScalar(step),
          posCorners[startIndex]
        );

        activeEdge.tex.addVectors(
          activeEdge.deltaTex.clone().multiplyScalar(step),
          texCorners[startIndex]
        );

        activeEdge.deltaPos.multiplyScalar(sliceSpacing);
        activeEdge.deltaTex.multiplyScalar(sliceSpacing);
      }

      expirations.push(activeEdge, cornerDistance[endIndex]);
      activeEdges[nextEdge++] = activeEdge;
      return activeEdge;
    };

    for (i = 0; i < 3; i = (i + 1) | 0) {
      const activeEdge = createEdge.call(
        this,
        maxCorner,
        cornerNeighbors[maxCorner][i]
      );
      activeEdge.prev = (i + 2) % 3;
      activeEdge.next = (i + 1) % 3;
    }

    let nextIndex = 0;

    while (sliceDistance > minDistance) {
      while (expirations.top().priority >= sliceDistance) {
        const edge = expirations.pop().object;

        if (edge.expired) {
          continue;
        }

        if (
          edge.endIndex !== activeEdges[edge.prev].endIndex &&
          edge.endIndex !== activeEdges[edge.next].endIndex
        ) {
          // split this edge.
          edge.expired = true;

          // create two new edges.
          const activeEdge1 = createEdge.call(
            this,
            edge.endIndex,
            incomingEdges[edge.endIndex][edge.startIndex]
          );
          activeEdge1.prev = edge.prev;
          activeEdges[edge.prev].next = nextEdge - 1;
          activeEdge1.next = nextEdge;

          const activeEdge2 = createEdge.call(
            this,
            edge.endIndex,
            incomingEdges[edge.endIndex][activeEdge1.endIndex]
          );
          activeEdge2.prev = nextEdge - 2;
          activeEdge2.next = edge.next;
          activeEdges[activeEdge2.next].prev = nextEdge - 1;
          firstEdge = nextEdge - 1;
        } else {
          // merge edge.
          let prev;
          let next;

          if (edge.endIndex === activeEdges[edge.prev].endIndex) {
            prev = activeEdges[edge.prev];
            next = edge;
          } else {
            prev = edge;
            next = activeEdges[edge.next];
          }

          prev.expired = true;
          next.expired = true;

          // make new edge
          const activeEdge = createEdge.call(
            this,
            edge.endIndex,
            incomingEdges[edge.endIndex][prev.startIndex]
          );
          activeEdge.prev = prev.prev;
          activeEdges[activeEdge.prev].next = nextEdge - 1;
          activeEdge.next = next.next;
          activeEdges[activeEdge.next].prev = nextEdge - 1;
          firstEdge = nextEdge - 1;
        }
      }

      let cur = firstEdge;
      let count = 0;

      do {
        ++count;
        const activeEdge = activeEdges[cur];
        points.push(activeEdge.pos.x, activeEdge.pos.y, activeEdge.pos.z);
        texCoords.push(activeEdge.tex.x, activeEdge.tex.y, activeEdge.tex.z);
        activeEdge.pos.add(activeEdge.deltaPos);
        activeEdge.tex.add(activeEdge.deltaTex);
        cur = activeEdge.next;
      } while (cur !== firstEdge);

      for (i = 2; i < count; i = (i + 1) | 0) {
        indexes.push(nextIndex, nextIndex + i - 1, nextIndex + i);
      }

      nextIndex += count;
      sliceDistance -= sliceSpacing;
    }

    return [indexes, points, texCoords];
  };

  const updateGeometry = (indexes, points, texCoords) => {
    if (!mesh.current || !mesh.current.geometry) {
      return;
    }

    mesh.current.geometry.index.array.set(indexes);
    mesh.current.geometry.attributes.position.array.set(points);
    mesh.current.geometry.attributes.tex.array.set(texCoords);

    mesh.current.geometry.index.needsUpdate = true;
    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.geometry.attributes.tex.needsUpdate = true;
    /* eslint-enable */
  };

  useFrame(({ clock }) => {
    if (geometry && material && mesh.current) {
      updateViewVector();
      const [indexes, points, texCoords] = slice();
      updateGeometry(indexes, points, texCoords);

      (mesh.current
        .material as ShaderMaterial).uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <group {...restProps}>
      <mesh ref={mesh} material={material} geometry={geometry} />
    </group>
  );
};

export default Fire;
