import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import { Button } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import "./App.css";
import Main from "./Main";
import Sidebar from "./Sidebar";

import logo from "./assets/logo.jpg";

function App() {
  const defaultName = {
    id: uuid(),
    title: "Default",
    body: "Rita Bowen\nHadden Moss\nVivian Harris\nJennifer Ball\nAlexander Hersey",
    lastModified: Date.now(),
  };

  const [names, setNames] = useState([defaultName]);
  const [activeNote, setActiveNote] = useState(defaultName.id);
  const [arrayOfNames, setArrayOfNames] = useState();
  const [winnerList, setWinnerList] = useState();
  const [Index, setIndex] = useState(0);
  const [Interval, Set_Interval] = useState(0);
  const [Winner, setWinner] = useState("");
  const [buttontext, setbuttontext] = useState("Start");
  const [isHidden, setIsHidden] = useState(true);
  const [isExploding, setIsExploding] = useState(false);

  const onAddNames = () => {
    const newName = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };

    setNames([newName, ...names]);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = names.map((name) => {
      if (name.id === activeNote) {
        return updatedNote;
      }
      return name;
    });
    setNames(updatedNotesArray);
    splitName();
  };

  const onDeleteName = (idToDelete) => {
    setNames(names.filter((names) => names.id !== idToDelete));
  };

  const getActiveNote = () => {
    return names.find((names) => names.id === activeNote);
  };

  const splitName = () => {
    const combinedBodyArray = getActiveNote();

    if (!combinedBodyArray) return;
    else {
      const seperatedBodyArray = combinedBodyArray.body.split("\n");
      setArrayOfNames(seperatedBodyArray);
      setWinnerList(seperatedBodyArray);
    }
  };


  const shuffleArray = (array) => {
    if (Winner === null) {
    } else {
      let re_winner = [];
      for (let i = 0; i < winnerList.length; i++) {
        if (i == Index) {
        } else {
          re_winner.push(winnerList[i]);
        }
      }
      setWinnerList(re_winner);
      setArrayOfNames(re_winner);
      setWinner("No select");
    }
  };

  const removeWinner = (winnerName) => {
    setWinnerList(winnerList.filter((winnerList) => winnerList !== winnerName));
  };  

  const appendDisplay = () => {
    const container = document.querySelector("#winner");
    container.removeChild(container.firstChild);

    let p = document.createElement("p");

    if (winnerList !== undefined) {
      // console.log("appendDisplay:", winnerList[0]);
      container.append(winnerList[0]);
    }
  };

  const toggleEdit = () => {
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    splitName();
  }, []);

  useEffect(() => {
    if ([Winner] != null && [Winner] != "") console.log("Winner:" + [Winner]);
  }, [Winner]);

  return (
    <div className="App" style={{ height: "100vh", overflow: "hidden" }}>
      <div className="logo-wrapper">
        <img className="logo" src={logo}></img>
      </div>
      <Sidebar
        names={names}
        onAddNames={onAddNames}
        onDeleteName={onDeleteName}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Button
        disabled={isExploding}
        className="editBtn"
        onClick={(e) => toggleEdit()}
      >
        <SettingsIcon />
      </Button>
      <Main
        arrayOfNames={arrayOfNames}
        winnerList={winnerList}
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
        shuffleArray={shuffleArray}
        appendDisplay={appendDisplay}
        buttontext={buttontext}
        setbuttontext={setbuttontext}
        Index={Index}
        setIndex={setIndex}
        Set_Interval={Set_Interval}
        Interval={Interval}
        setWinner={setWinner}
        Winner={Winner}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        isExploding={isExploding}
        setIsExploding={setIsExploding}
        removeWinner={removeWinner}
        splitName={splitName}
      />
    </div>
  );
}

export default App;
