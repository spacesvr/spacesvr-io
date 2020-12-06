import * as THREE from "three";

export const getPosCorners = (
  width: number,
  height: number,
  depth: number
): Vector3[] => {
  const widthHalf = width * 0.5;
  const heightHalf = height * 0.5;
  const depthHalf = depth * 0.5;

  return [
    new THREE.Vector3(-widthHalf, -heightHalf, -depthHalf),
    new THREE.Vector3(widthHalf, -heightHalf, -depthHalf),
    new THREE.Vector3(-widthHalf, heightHalf, -depthHalf),
    new THREE.Vector3(widthHalf, heightHalf, -depthHalf),
    new THREE.Vector3(-widthHalf, -heightHalf, depthHalf),
    new THREE.Vector3(widthHalf, -heightHalf, depthHalf),
    new THREE.Vector3(-widthHalf, heightHalf, depthHalf),
    new THREE.Vector3(widthHalf, heightHalf, depthHalf),
  ];
};
