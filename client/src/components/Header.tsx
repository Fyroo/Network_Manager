import { Typography, Box, useTheme, IconButton } from "@mui/material";
import { tokens } from "../theme";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSpring, animated } from "react-spring";

const Header = ({
  title,
  subtitle,
  addlink = "#",
  withbtn = false,
  variant = "1",
}: {
  title: string;
  subtitle: string;
  addlink: string;
  withbtn: boolean;
  variant: string;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const springProps = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(-20vh)" },
  });

  const BtnIcon = variant === "1" ? ArrowBackIcon : AddCircleOutlineIcon;

  return (
    <animated.div style={springProps}>
      <Box
        width="100%"
        display="flex"
        mb="5px"
        mt="0px"
        flexDirection="row"
        justifyContent="space-between"
        alignContent="center"
      >
        <Box>
          <Typography variant="h2" color={colors.grey[100]} fontWeight="bold" sx={{ mb: "5px" }}>
            {title}
          </Typography>
          <Typography variant="h5" color={colors.greenAccent[400]}>
            {subtitle}
          </Typography>
        </Box>
        {withbtn && (
          <Box>
            <IconButton aria-label="add" sx={{ color: colors.greenAccent[500] }} href={addlink}>
              <BtnIcon sx={{ transform: "scale(2)" }} />
            </IconButton>
          </Box>
        )}
      </Box>
    </animated.div>
  );
};

export default Header;
