import React from "react";
//@ts-ignore
import LoadingOverlay from "react-loading-overlay";
//@ts-ignore
import BounceLoader from "react-spinners/BounceLoader";
//@ts-ignore
import styled from "styled-components";

const StyledLoader = styled(LoadingOverlay)`
  width: 100%;
  height: 100%;
  .Spinner_overlay {
    background: rgba(213, 227, 237, 0.5);
  }
  &.Spinner_wrapper--active {
    overflow: hidden;
  }
`;

//@ts-ignore
export default function Spinner({ active, children }) {
  return (
    <StyledLoader
      active={active}
      classNamePrefix="Spinner_"
      spinner={<BounceLoader color={"#4A90E2"} />}
    >
      {children}
    </StyledLoader>
  );
}
