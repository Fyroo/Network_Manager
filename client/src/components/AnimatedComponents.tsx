import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from "@mui/system";
import { useSpring, animated } from "react-spring";
import { tokens } from "../theme";

export const AnimatedTypography = ({ children,reset, ...typographyProps }: { children: React.ReactNode;reset:boolean }) => {
  const AnimatedTypo = animated(Typography);
  const springProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    reset: reset,
  });

  return (
    <AnimatedTypo style={springProps} {...typographyProps}>
      {children}
    </AnimatedTypo>
  );
};




