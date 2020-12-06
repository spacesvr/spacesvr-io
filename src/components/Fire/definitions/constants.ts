import * as THREE from "three";

export const cornerNeighbors = [
  [1, 2, 4],
  [0, 5, 3],
  [0, 3, 6],
  [1, 7, 2],
  [0, 6, 5],
  [1, 4, 7],
  [2, 7, 4],
  [3, 5, 6],
];

export const incomingEdges = [
  [-1, 2, 4, -1, 1, -1, -1, -1],
  [5, -1, -1, 0, -1, 3, -1, -1],
  [3, -1, -1, 6, -1, -1, 0, -1],
  [-1, 7, 1, -1, -1, -1, -1, 2],
  [6, -1, -1, -1, -1, 0, 5, -1],
  [-1, 4, -1, -1, 7, -1, -1, 1],
  [-1, -1, 7, -1, 2, -1, -1, 4],
  [-1, -1, -1, 5, -1, 6, 3, -1],
];

export const texCorners = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(1, 1, 0),
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(1, 0, 1),
  new THREE.Vector3(0, 1, 1),
  new THREE.Vector3(1, 1, 1),
];
