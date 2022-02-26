import { motion } from "framer-motion";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";
import { Box, Button, Typography, Container } from "@mui/material";
import LogoOnlyLayout from "/src/components/layouts/LogoOnlyLayout";
import { MotionContainer, varBounceIn } from "/src/components/animate";
import Page from "/src/components/atoms/Page";
import InternalServerErrorIllustration from "/src/assets/illustrations/500";

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function Custom500() {
  return (
    <LogoOnlyLayout>
      <RootStyle title="500 Internal Server Error | Minimal-UI">
        <Container>
          <MotionContainer initial="initial" open>
            <Box sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
              <motion.div variants={varBounceIn}>
                <Typography variant="h3" paragraph>
                  500 Internal Server Error
                </Typography>
              </motion.div>
              <Typography sx={{ color: "text.secondary" }}>
                There was an error, please try again later.
              </Typography>

              <motion.div variants={varBounceIn}>
                <InternalServerErrorIllustration
                  sx={{ height: 260, my: { xs: 5, sm: 10 } }}
                />
              </motion.div>

              <NextLink href="/">
                <Button size="large" variant="contained">
                  Go to Home
                </Button>
              </NextLink>
            </Box>
          </MotionContainer>
        </Container>
      </RootStyle>
    </LogoOnlyLayout>
  );
}
