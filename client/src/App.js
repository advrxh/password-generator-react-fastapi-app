import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Paper } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Slider from "@material-ui/core/Slider";
import { Typography } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { grid } from "@material-ui/system";

import { green } from "@material-ui/core/colors";

import {
  PrettoSlider,
  GreenSwitch,
  GreenButton,
} from "./components/PrettyComp";

import { fetchData } from "./apiHandler/fetchPwd";

const useSliderStyles = makeStyles({
  container: {
    width: "100%",
    marginTop: "6em",
    padding: "1em 2em 1em 2em",
  },
});

function App() {
  const sliderStyle = useSliderStyles();

  const [Args, setArgs] = useState({
    caps: false,
    digits: true,
    specialChar: true,
  });

  const [len, setLen] = useState(6);
  const [password, setPassword] = useState("");

  const sliderValueText = (value) => {
    return `${value}c`;
  };

  const handleArgChange = (e) => {
    setArgs({
      ...Args,
      [e.target.name]: e.target.checked,
    });
  };

  const handleLenChange = (e, newVal) => {
    setLen(newVal);
  };

  const handleSubmit = async () => {
    const pwd = await fetchData(Args, len);

    setPassword(pwd);
  };

  return (
    <div>
      <Grid
        container
        spacing={4}
        justifyContent="center"
        direction="column"
        alignContent="center"
      >
        <Grid item xs={10} sm={8} md={6} lg={6} xl={6}>
          <Paper className={sliderStyle.container}>
            <PrettoSlider
              getAriaValueText={sliderValueText}
              valueLabelDisplay="auto"
              defaultValue={len}
              value={len}
              onChange={handleLenChange}
              step={2}
              min={6}
              max={150}
            />
          </Paper>
        </Grid>
        <Grid
          item
          container
          sx={10}
          sm={8}
          md={6}
          lg={4}
          justifyContent="space-evenly"
        >
          <Grid item>
            <Paper>
              <FormControlLabel
                control={
                  <GreenSwitch
                    name="caps"
                    checked={Args.caps}
                    onChange={handleArgChange}
                  />
                }
                label="Caps"
                style={{ color: green[500] }}
                labelPlacement="top"
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <FormControlLabel
                control={
                  <GreenSwitch
                    name="digits"
                    checked={Args.digits}
                    onChange={handleArgChange}
                  />
                }
                label="Digits"
                style={{ color: green[500] }}
                labelPlacement="top"
              />
            </Paper>
          </Grid>
          <Grid item>
            <Paper>
              <FormControlLabel
                control={
                  <GreenSwitch
                    name="specialChar"
                    checked={Args.specialChar}
                    onChange={handleArgChange}
                  />
                }
                label="Special"
                style={{ color: green[500] }}
                labelPlacement="top"
              />
            </Paper>
          </Grid>
        </Grid>

        <Grid
          item
          container
          sx={10}
          sm={8}
          md={6}
          lg={4}
          justifyContent="space-evenly"
        >
          <Grid item>
            <GreenButton onClick={handleSubmit}>Get Password</GreenButton>
          </Grid>
        </Grid>

        <Grid
          item
          container
          sx={10}
          sm={8}
          md={6}
          lg={4}
          justifyContent="center"
        >
          <Grid item>
            <Typography
              variant="h5"
              component="h1"
              style={{ color: green[500] }}
            >
              {password}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
