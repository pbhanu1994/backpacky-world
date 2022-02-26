import { useState } from "react";
import NextLink from "next/link";
import { styled } from "@mui/material/styles";
import { Box, Button, Container, Typography } from "@mui/material";
import LogoOnlyLayout from "../../layouts/LogoOnlyLayout";
import { PAGE_PATH } from "/src/constants/navigationConstants";
import Page from "../../atoms/Page";
import { ResetPasswordForm } from "./ResetPasswordForm";
import SentIcon from "/src/assets/illustrations/SentIcon";

const RootStyle = styled(Page)(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [showLoadingButton, setShowLoadingButton] = useState(false);

  return (
    <RootStyle title="Reset Password | BackpackyWorld">
      <LogoOnlyLayout />
      <Container>
        <Box sx={{ maxWidth: 480, mx: "auto", mt: 15 }}>
          {!sent ? (
            <>
              <Typography variant="h3" paragraph>
                Forgot your password?
              </Typography>
              <Typography sx={{ color: "text.secondary", mb: 5 }}>
                Please enter the email address associated with your account and
                We will email you a link to reset your password.
              </Typography>

              <ResetPasswordForm
                onSent={() => setSent(true)}
                onGetEmail={(value) => setEmail(value)}
                showLoadingButton={showLoadingButton}
                onHandleLoadingButton={(value) => setShowLoadingButton(value)}
              />

              <NextLink href={PAGE_PATH.SIGNIN}>
                <Button fullWidth size="large" sx={{ mt: 1 }}>
                  Back
                </Button>
              </NextLink>
            </>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <SentIcon sx={{ mb: 5, mx: "auto", height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Email sent successfully
              </Typography>
              <Typography>
                We have sent a password reset link to &nbsp;
                <strong>{email}</strong>
                <br />
                Please check your email.
              </Typography>

              <NextLink href={PAGE_PATH.SIGNIN}>
                <Button size="large" variant="contained" sx={{ mt: 5 }}>
                  Back
                </Button>
              </NextLink>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
