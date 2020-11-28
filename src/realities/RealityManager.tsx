import { Children, ReactNode } from "react";
import styled from "@emotion/styled";

type RealityManagerProps = {
  children: ReactNode;
  activeReality: number;
};

const Z_SPACING = 1000;

const Container = styled.div<{ z: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.z};
`;

const RealityManager = (props: RealityManagerProps) => {
  const { children, activeReality } = props;

  const renderReality = (reality: ReactNode, i: number) => {
    if (i === activeReality) {
      /// TODO
    }

    return <Container z={i * Z_SPACING}>{reality}</Container>;
  };

  return (
    <>
      {children &&
        Children.map(children, (Child, i) => renderReality(Child, i))}
    </>
  );
};

export default RealityManager;
