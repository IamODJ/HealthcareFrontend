import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { Formik } from "formik";
import Image from "material-ui-image";
import useSWR from "swr";
import React from "react";
import { api_endpoint } from "../constants";
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
  Divider,
} from "@material-ui-new/core";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import VerifiedUserOutlinedIcon from "@material-ui/icons/VerifiedUserOutlined";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import PersonIcon from "@material-ui/icons/Person";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui-new/core/Chip";
const BeneficiaryCard = (props) => {
  const { match, history } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let formikref = React.useRef(null);
  const {
    name,
    photo_id_type,
    vaccination_status,
    dose1_date,
    dose2_date,
    birth_year,
    photo_id_number,
  } = props;
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 500,
      minWidth: 400,
      margin: "15px",
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2),
      borderRadius: "5px",
      boxShadow: "2px 4px 2px grey",
      borderWidth: "1px",
      borderColor: "#000000",
      borderStyle: "solid",
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    section1: {
      margin: theme.spacing(0.5),
    },
    section2: {
      margin: theme.spacing(2),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
  }));
  const egObj = {
    name: "Omkar",
    photo_id_type: "Aadhar",
    vaccination_status: "done",
    dose1_date: "12/2/2021",
    dose2_date: "12/2/2021",
    birth_year: 2021,
    photo_id_number,
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <PersonIcon />
                {props.name}
              </div>

              <div
                style={{
                  display: "flex",
                }}
              >
                {props.age < 45 ? (
                  <Chip
                    className={classes.chip}
                    style={{
                      color: "#ffffff",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                    color="primary"
                    label="18+"
                  />
                ) : (
                  <Chip
                    className={classes.chip}
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      color: "#ffffff",
                      background: "#a617f2",
                    }}
                    label="45+"
                  />
                )}
                <Chip
                  className={classes.chip}
                  style={{
                    background: props.isDose1 ? "#1fd451" : "#d4241f",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                  label="Dose-1"
                  icon={
                    props.isDose1 ? (
                      <CheckOutlinedIcon style={{ color: "#ffffff" }} />
                    ) : (
                      <ClearOutlinedIcon style={{ color: "#ffffff" }} />
                    )
                  }
                />
                <Chip
                  className={classes.chip}
                  style={{
                    background: props.isDose2 ? "#1fd451" : "#d4241f",
                    color: "#ffffff",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                  label="Dose-2"
                  icon={
                    props.isDose2 ? (
                      <CheckOutlinedIcon style={{ color: "#ffffff" }} />
                    ) : (
                      <ClearOutlinedIcon style={{ color: "#ffffff" }} />
                    )
                  }
                />
              </div>
            </Grid>
          </Grid>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              margin: "3px",
            }}
          >
            <EventAvailableIcon style={{ marginRight: "5px" }} />
            {"  "}Year of Birth: {props.birth_year}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              margin: "3px",
            }}
          >
            <ContactMailIcon style={{ marginRight: "5px" }} />
            {"  "} Photo ID: {props.photo_id_type}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              margin: "3px",
            }}
          >
            <VerifiedUserOutlinedIcon style={{ marginRight: "5px" }} />
            {"  "} ID Number: {props.photo_id_number}
          </div>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography gutterBottom variant="body1">
            Dose-1: Appointment not Scheduled
          </Typography>
          <Typography gutterBottom variant="body1">
            Dose-2: Appointment not Scheduled
          </Typography>
        </div>
        <Divider variant="middle" />
      </div>
    </>
  );
};

export default BeneficiaryCard;
