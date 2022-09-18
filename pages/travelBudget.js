import { Grid, Container, Typography } from "@mui/material";
import useSettings from "/src/hooks/useSettings";
import DashboardLayout from "/src/components/layouts/dashboard";
import Page from "/src/components/atoms/Page";
import TravelBudgetComponent from "/src/components/organisms/travelBudget";

TravelBudget.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default function TravelBudget() {
  const { themeStretch } = useSettings();

  return (
    <DashboardLayout>
      <Page title="Travel Budget">
        <Container maxWidth={themeStretch ? false : "lg"}>
          <Grid container fullWidth direction="row">
            <Grid item>
              <Typography
                component="h1"
                variant="h4"
                align="center"
                color="primary"
                gutterBottom
                paragraph
                style={{
                  display: "flex",
                }}
              >
                Travel Budget
              </Typography>
            </Grid>
          </Grid>

          <TravelBudgetComponent />
        </Container>
      </Page>
    </DashboardLayout>
  );
}
