import { MeshBasicMaterial } from "three";

export const convertToBasic = (mats: any): any => {
  if (!mats) {
    return {};
  }

  const numKeys = Object.keys(mats).length;
  const materials: any = {};
  for (let i = 0; i < numKeys; i++) {
    const key = Object.keys(mats)[i];
    const oldMat = mats[key];
    if (!oldMat) {
      continue;
    }
    materials[key] = new MeshBasicMaterial();
    materials[key].map = oldMat.emissiveMap;
  }

  return materials;
};
