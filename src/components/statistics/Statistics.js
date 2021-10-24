import { Box, Container, Grid } from "@material-ui-new/core";
import Navbar from "./../navbar/Navbar";
import React from "react";
import Addslots from "./Addslots";
import StatsTable from "./StatsTable";


const Statistics = (props) => {
  const [currTab, selectTab] = React.useState(0);
  const handleChange = (event, newValue) => {
    selectTab(newValue);
  };
  return (
    <>
      <Navbar statsTab={true} handleChange={handleChange} currTab={currTab} {...props} />
      {currTab == 0 ? (
        <StatsTable/>
      ) : (
        <Addslots />
      )}
    </>
  );
};

export default Statistics;
