import styled from "styled-components";
import { IconButton } from "@chakra-ui/core";

export const HoverIconButton = styled(IconButton)`
  color: rgba(255, 255, 255, 0.6);
  :hover {
    color: rgba(255, 255, 255, 1);
  }
  svg {
    width: 32px;
    height: 32px;
  }
`;

export const SmallHoverIconButton = styled(IconButton)`
  color: rgba(255, 255, 255, 0.6);
  :hover {
    color: rgba(255, 255, 255, 1);
  }
  svg {
    width: 16px;
    height: 16px;
  }
`;
