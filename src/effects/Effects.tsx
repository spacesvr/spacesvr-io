import { extend, useFrame, useThree } from "react-three-fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { useEffect, useRef } from "react";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { SAOPass } from "three/examples/jsm/postprocessing/SAOPass";

extend({ EffectComposer, RenderPass });

export const Effects = () => {
  const { gl, scene, camera, size } = useThree();

  const saoPass = new ShaderPass(SAOPass);

  const gammaCorrection = new ShaderPass(GammaCorrectionShader);

  const fxaaPass = new ShaderPass(FXAAShader);
  const pixelRatio = window ? window.devicePixelRatio : 2;
  // @ts-ignore
  fxaaPass.material.uniforms["resolution"].value.x =
    1 / (window.innerWidth * pixelRatio);
  // @ts-ignore
  fxaaPass.material.uniforms["resolution"].value.y =
    1 / (window.innerHeight * pixelRatio);

  const composer = useRef<EffectComposer>();

  useEffect(() => composer?.current?.setSize(size.width, size.height), [size]);

  useEffect(() => {
    gammaCorrection.renderToScreen = true;
    composer?.current?.addPass(gammaCorrection);

    saoPass.renderToScreen = true;
    composer?.current?.addPass(saoPass);

    fxaaPass.renderToScreen = true;
    composer?.current?.addPass(fxaaPass);
  }, []);

  useFrame(() => {
    composer?.current?.render();
  }, 1);

  return (
    <>
      {/* @ts-ignore*/}
      <effectComposer ref={composer} args={[gl]}>
        {/* @ts-ignore*/}
        <renderPass attachArray="passes" args={[scene, camera]} />
        {/* @ts-ignore*/}
      </effectComposer>
    </>
  );
};
