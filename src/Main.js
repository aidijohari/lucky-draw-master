import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import React, { useState, useRef, useEffect } from "react";
import song from "./assets/scroll3.mpeg";
import winnersound from "./assets/Lucky draw mix 2.mp3";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";
import { FormGroup, FormControlLabel } from "@mui/material";
import useKeypress from "react-use-keypress";
import prize1 from "./assets/prize4.png";
import prize2 from "./assets/prize3.png";
import prize3 from "./assets/prize2.png";
import prize4 from "./assets/prize1.png";

function Main({
  activeNote,
  onUpdateNote,
  winnerList,
  shuffleArray,
  arrayOfNames,
  buttontext,
  setbuttontext,
  Index,
  setIndex,
  Set_Interval,
  Interval,
  setWinner,
  Winner,
  isHidden,
  removeWinner,
  setIsHidden,
  isExploding,
  setIsExploding,
  splitName,
}) {
  const onEditField = async (key, value) => {
    await onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  const [audio, changeAudioStatus] = useState(new Audio(song));
  const [winnerTheme, changeWinnerTheme] = useState(new Audio(winnersound));
  const myRef = useRef();

  const [checkBoxFlag, setCheckBoxFlag] = React.useState(false);
  const [confettiFlag, setConfettiFlag] = React.useState(false);

  const [counter, setCounter] = React.useState(1);

  useKeypress("Enter", () => {
    if (isExploding == false && isHidden == true) {
      start();
    }
  });

  useKeypress("ArrowRight", () => {
    if (isExploding == false) {
      imageCounter();
    }
  });

  const start = () => {
    // let Time = "";
    setIsHidden(true);
    let interval = "";
    const len = winnerList.length;
    if (buttontext === "Start") {
      if (checkBoxFlag === true) {
        if (Winner === winnerList[Index]) {
          removeWinner(Winner);
        }
      }
      audio.play();
      audio.loop = true;
      winnerTheme.load();
      winnerTheme.pause();

      interval = setInterval(() => {
        Index++;
        if (Index == len) {
          Index = 0;
        }
        setIndex(Index);
        Set_Interval(interval);
      }, 50);
      setbuttontext("Stop");
    } else {
      setIsExploding(true);
      audio.pause();
      winnerTheme.play();

      setbuttontext("Start");
      setWinner(winnerList[Index]);

      clearInterval(Interval);
    }
  };

  const imageCounter = () => {
    if (counter == 4) {
      setCounter(1);
    } else {
      setCounter(counter + 1);
    }
  };

  useEffect(() => {
    if (confettiFlag == true) {
      setIsExploding(false);
    } else {
      const timer = setTimeout(() => {
        setIsExploding(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isExploding]);

  useEffect(() => {
    splitName();
  }, [activeNote.body]);

  const rendertemplate = (winnerList) => {
    if (winnerList === undefined || winnerList === "") {
    } else {
      const len = winnerList.length;
      if (len >= 4) {
        return (
          <div>
            <div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(70deg)",
                    fontSize: "1.6vw",
                    lineHeight: "2.6vw",
                  }}
                >
                  {winnerList[Index - 4 >= 0 ? Index - 4 : Index - 4 + len]}
                </div>
              </div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(52deg)",
                    fontSize: "2vw",
                    lineHeight: "2vw",
                  }}
                >
                  {winnerList[Index - 3 >= 0 ? Index - 3 : Index - 3 + len]}
                </div>
              </div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(50deg)",
                    fontSize: "2.2vw",
                    lineHeight: "2.2vw",
                  }}
                >
                  {winnerList[Index - 2 >= 0 ? Index - 2 : Index - 2 + len]}
                </div>
              </div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(40deg)",
                    fontSize: "2.5vw",
                    lineHeight: "2.7vw",
                  }}
                >
                  {winnerList[Index - 1 >= 0 ? Index - 1 : Index - 1 + len]}
                </div>
              </div>
              <hr />
              <div
                className="winner"
                style={{
                  width: "100%",
                  padding: "0.15vw",
                  margin: "1rem 0px",
                  height: "80px",
                }}
              >
                <div className="truncate" style={{ fontSize: "3vw" }}>
                  {winnerList[Index]}
                </div>
              </div>
              <hr />
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(-40deg)",
                    fontSize: "2.5vw",
                    lineHeight: "2.7vw",
                  }}
                >
                  {winnerList[Index + 1 >= len ? Index + 1 - len : Index + 1]}
                </div>
              </div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(-50deg)",
                    fontSize: "2.2vw",
                    lineHeight: "2.4vw",
                  }}
                >
                  {winnerList[Index + 2 >= len ? Index + 2 - len : Index + 2]}
                </div>
              </div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(-60deg)",
                    fontSize: "2vw",
                    lineHeight: "2.2vw",
                  }}
                >
                  {winnerList[Index + 3 >= len ? Index + 3 - len : Index + 3]}
                </div>
              </div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(-70deg)",
                    fontSize: "1.6vw",
                    lineHeight: "1.6vw",
                  }}
                >
                  {winnerList[Index + 4 >= len ? Index + 4 - len : Index + 4]}
                </div>
              </div>
            </div>
          </div>
        );
      } else if (len == 1) {
        return (
          <div>
            <div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(40deg)",
                    fontSize: "2.5vw",
                    lineHeight: "2.7vw",
                  }}
                >
                  {winnerList[Index - 1 >= 0 ? Index - 1 : Index - 1 + len]}
                </div>
              </div>
              <hr />
              <div
                className="winner"
                style={{
                  width: "100%",
                  padding: "0.15vw",
                  margin: "1rem 0px",
                  height: "80px",
                }}
              >
                <div className="truncate" style={{ fontSize: "3vw" }}>
                  {winnerList[Index]}
                </div>
              </div>
              <hr />
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(-40deg)",
                    fontSize: "2.5vw",
                    lineHeight: "2.7vw",
                  }}
                >
                  {winnerList[Index + 1 >= len ? Index + 1 - len : Index + 1]}
                </div>
              </div>
            </div>
          </div>
        );
      } else if (len == 2) {
        return (
          <div>
            <div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(50deg)",
                    fontSize: "2.2vw",
                    lineHeight: "2.2vw",
                  }}
                >
                  {winnerList[Index - 2 >= 0 ? Index - 2 : Index - 2 + len]}
                </div>
              </div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(40deg)",
                    fontSize: "2.5vw",
                    lineHeight: "2.7vw",
                  }}
                >
                  {winnerList[Index - 1 >= 0 ? Index - 1 : Index - 1 + len]}
                </div>
              </div>
              <hr />
              <div
                className="winner"
                style={{
                  width: "100%",
                  padding: "0.15vw",
                  margin: "1rem 0px",
                  height: "80px",
                }}
              >
                <div className="truncate" style={{ fontSize: "3vw" }}>
                  {winnerList[Index]}
                </div>
              </div>
              <hr />
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(-40deg)",
                    fontSize: "2.5vw",
                    lineHeight: "2.7vw",
                  }}
                >
                  {winnerList[Index + 1 >= len ? Index + 1 - len : Index + 1]}
                </div>
              </div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(-50deg)",
                    fontSize: "2.2vw",
                    lineHeight: "2.4vw",
                  }}
                >
                  {winnerList[Index + 2 >= len ? Index + 2 - len : Index + 2]}
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(52deg)",
                    fontSize: "2vw",
                    lineHeight: "2vw",
                  }}
                >
                  {winnerList[Index - 3 >= 0 ? Index - 3 : Index - 3 + len]}
                </div>
              </div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(50deg)",
                    fontSize: "2.2vw",
                    lineHeight: "2.2vw",
                  }}
                >
                  {winnerList[Index - 2 >= 0 ? Index - 2 : Index - 2 + len]}
                </div>
              </div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(40deg)",
                    fontSize: "2.5vw",
                    lineHeight: "2.7vw",
                  }}
                >
                  {winnerList[Index - 1 >= 0 ? Index - 1 : Index - 1 + len]}
                </div>
              </div>
              <hr />
              <div
                className="winner"
                style={{
                  width: "100%",
                  padding: "0.15vw",
                  margin: "1rem 0px",
                  height: "80px",
                }}
              >
                <div className="truncate" style={{ fontSize: "3vw" }}>
                  {winnerList[Index]}
                </div>
              </div>
              <hr />
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(-40deg)",
                    fontSize: "2.5vw",
                    lineHeight: "2.7vw",
                  }}
                >
                  {winnerList[Index + 1 >= len ? Index + 1 - len : Index + 1]}
                </div>
              </div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(-50deg)",
                    fontSize: "2.2vw",
                    lineHeight: "2.4vw",
                  }}
                >
                  {winnerList[Index + 2 >= len ? Index + 2 - len : Index + 2]}
                </div>
              </div>
              <div className="winner__title">
                <div
                  style={{
                    transform: "rotateX(-60deg)",
                    fontSize: "2vw",
                    lineHeight: "2.2vw",
                  }}
                >
                  {winnerList[Index + 3 >= len ? Index + 3 - len : Index + 3]}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  if (!activeNote) return <div className="no active">No select</div>;
  return (
    <div className="app-main-note" style={{ height: "100%" }}>
      <div>
        <div className="popup">
          <div className="popup__inner">
            <div className="dialog-1">
              <div className="main-display">
                <Grid className="content-container" container spacing={2}>
                  <Grid
                    item
                    xs={4}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div id="winner" className="winnername__title">
                      <Button
                        className="img-wrapper"
                        disabled={isExploding}
                        onClick={(e) => imageCounter()}
                      >
                        <img
                          src={
                            counter == 1
                              ? prize1
                              : counter === 2
                              ? prize2
                              : counter === 3
                              ? prize3
                              : counter === 4
                              ? prize4
                              : null
                          }
                          width="400px"
                          height="400px"
                          alt=""
                        />
                      </Button>
                      <div className="prize-title">
                        <p className={counter == 1 ? "show" : "hidden"}>
                          Consolation
                        </p>
                        <p className={counter == 2 ? "show" : "hidden"}>
                          3rd Prize
                        </p>
                        <p className={counter == 3 ? "show" : "hidden"}>
                          2nd Prize
                        </p>
                        <p className={counter == 4 ? "show" : "hidden"}>
                          1st Prize
                        </p>
                      </div>
                      <div className="prize-desc">
                        <p className={counter == 1 ? "show" : "hidden"}>
                          Logitech Webcam
                        </p>
                        <p className={counter == 2 ? "show" : "hidden"}>
                          Philips Air Fryer
                        </p>
                        <p className={counter == 3 ? "show" : "hidden"}>
                          Xiaomi Mi Robot
                        </p>
                        <p className={counter == 4 ? "show" : "hidden"}>
                          Dyson Supersonic
                        </p>
                      </div>

                      {/* <div className="winnername__title"></div> */}
                      {/* <p>{Winner}</p> */}
                    </div>
                  </Grid>

                  <Grid item xs={4}>
                    <div className="title-header">
                      <h1>Lucky Draw</h1>
                    </div>
                    <div>{rendertemplate(winnerList)}</div>
                    <Button
                      className="blue-button startBtn"
                      disabled={isExploding}
                      onClick={(e) => start(e.target)}
                    >
                      {buttontext}
                    </Button>
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    className={isHidden ? "hidden" : "show edit-column"}
                  >
                    {/* <TextField
                      required
                      id="standard-required"
                      label="Required"
                      value={activeNote.title}
                      onChange={(e) => onEditField("title", e.target.value)}
                      style={{ width: "80%" }}
                    /> */}
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e) => setCheckBoxFlag(!checkBoxFlag)}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Remove winner from list if picked"
                      />
                    </FormGroup>
                    {/* <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e) => setConfettiFlag(!confettiFlag)}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Confetti On/Off"
                      />
                    </FormGroup> */}
                    <TextField
                      id="filled-multiline-flexible"
                      label="Entered names"
                      multiline
                      maxRows={15}
                      value={activeNote.body}
                      onChange={(e) => onEditField("body", e.target.value)}
                      variant="filled"
                    />
                    {/* <div
                      className="blue-button"
                      disabled="true"
                      onClick={() => shuffleArray(arrayOfNames)}
                    >
                      Shuffle
                    </div> */}
                  </Grid>
                </Grid>
                <div className="confetti">
                  {isExploding && (
                    <ConfettiExplosion
                      duration={3000}
                      force={1}
                      particleCount={150}
                      floorHeight={1200}
                    />
                  )}
                  {isExploding && (
                    <ConfettiExplosion
                      duration={3000}
                      force={1}
                      particleCount={150}
                      floorHeight={2200}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
