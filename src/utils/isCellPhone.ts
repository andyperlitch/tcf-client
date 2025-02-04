import { isMobile, isTablet } from "react-device-detect";

export const isCellPhone = isMobile && !isTablet;
