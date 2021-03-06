import { Link as RouterLink } from "react-router-dom";
import { isExpired } from "react-jwt";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Formik } from "formik";
import Image from "material-ui-image";
import useSWR from "swr";
import React from "react";
import { api_endpoint1 } from "../constants";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  Card,
  CardContent,
} from "@material-ui-new/core";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const phoneNoExp = /^[6-9]\d{9}$/;

const HandleLogin = (
  history,
  enqueueSnackbar,
  closeSnackbar,
  staffId,
  password,
  formikref
) => {
  enqueueSnackbar("Logging in...", { autoHideDuration: 3000 });
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: String(staffId),
      password: String(password),
    }),
  };
  fetch(api_endpoint1 + "/auth/login", requestOptions)
    .then((response) => {
      if (response.status == 200) return response.json();
      else throw new Error("Incorrect Staff ID or Password");
    })
    .then((data) => {
      formikref.current.setSubmitting(false);
      console.log(data);
      closeSnackbar();
      localStorage.setItem("userTokenStaff", data.jwt);
      history.replace({
        pathname: "/dashboard",
        state: { fromApp: true, jwt: data.jwt },
      });
    })
    .catch((err) => {
      formikref.current.setSubmitting(false);
      enqueueSnackbar(String(err), { autoHideDuration: 2000 });
    });
};

const Login = (props) => {
  //const navigate = useNavigate();

  const { match, history } = props;
  React.useEffect(() => {
    var userTokenStaff = localStorage.getItem("userTokenStaff");
    const isMyTokenExpired = isExpired(userTokenStaff);
    if (!isMyTokenExpired && userTokenStaff !== "") {
      history.replace({
        pathname: "/dashboard",
        state: { fromApp: true, jwt: userTokenStaff },
      });
    }
  }, []);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let formikref = React.useRef(null);
  return (
    <>
      <div
        style={{
          display: "grid",
          height: "102vh",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Card style={{ width: "450px" }}>
          <CardContent>
            <Container
              maxWidth="sm"
              style={{
                display: "grid",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Image
                style={{
                  backgroundColor: "#f4f6f8",
                  width: "200px",
                  height: "200px",
                  paddingTop: 0,
                  margin: "auto",
                }}
                imageStyle={{
                  width: "200px",
                  height: "200px",
                  margin: "auto",
                }}
                src="/logo512.png"
              />
              <Formik
                innerRef={formikref}
                initialValues={{
                  phoneNo: "",
                }}
                validationSchema={Yup.object().shape({
                  staffId: Yup.string().required("Staff ID is required"),
                  password: Yup.string().required("Please enter a password"),
                })}
                onSubmit={({ staffId, password }) => {
                  console.log(formikref);
                  HandleLogin(
                    history,
                    enqueueSnackbar,
                    closeSnackbar,
                    staffId,
                    password,
                    formikref
                  );
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box sx={{ mb: 3 }}>
                      <Typography color="textPrimary" variant="h2">
                        Sign in
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Please Sign In with your Staff credentials to continue..{" "}
                      </Typography>
                    </Box>
                    <TextField
                      style={{ margin: 0 }}
                      error={Boolean(touched.staffId && errors.staffId)}
                      fullWidth
                      helperText={
                        Boolean(touched.staffId && errors.staffId)
                          ? touched.staffId && errors.staffId
                          : "\u00a0"
                      }
                      label="Staff Id"
                      margin="normal"
                      name="staffId"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.staffId}
                      variant="outlined"
                    />
                    <TextField
                      style={{ margin: 0, marginTop: "10px" }}
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={
                        Boolean(touched.password && errors.password)
                          ? touched.password && errors.password
                          : "\u00a0"
                      }
                      label="Password"
                      margin="normal"
                      type="password"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      variant="outlined"
                    />
                    <Box sx={{ py: 2 }}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        SIGN IN
                      </Button>
                    </Box>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                      style={{ marginTop: "10px" }}
                    >
                      Forgot Password? Please contact Admin.
                    </Typography>
                  </form>
                )}
              </Formik>
            </Container>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
