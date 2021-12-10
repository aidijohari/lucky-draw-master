import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import { Button } from "@mui/material";
import { useRandomReveal } from "react-random-reveal";
import { RandomReveal } from "react-random-reveal";
import SettingsIcon from "@mui/icons-material/Settings";

import "./App.css";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Modal from "./BasicModal";

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
      // console.log("splitName():", seperatedBodyArray);
      setArrayOfNames(seperatedBodyArray);
      setWinnerList(seperatedBodyArray);
      // return seperatedBodyArray;
    }
  };

  const shuffleArray = (array) => {
    // let i = array.length - 1;
    // for (; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   const temp = array[i];
    //   array[i] = array[j];
    //   array[j] = temp;
    // }
    // console.log("shuffle", array);
    // setArrayOfNames([...array]);
    // setWinnerList([...array]);
    // console.log("shuffleArray() [winnerList]", winnerList);
    // console.log("shuffleArray() [arrayOfNames]", arrayOfNames);

    // removeWinner(arrayOfNames);

    // appendDisplay();
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
    // AddSuspenseComponent(winnerList[0], true)
    // return arrayOfNames;
  };

  const removeWinner = (winnerName) => {
    setWinnerList(winnerList.filter((winnerList) => winnerList !== winnerName));


    // console.log("removeWinner() [arrayOfNames]", array[index]);
    // // var index = array;
    // array.splice(array, index);
    // setArrayOfNames(array);
    // return array
  };

  const appendDisplay = () => {
    const container = document.querySelector("#winner");
    container.removeChild(container.firstChild);

    let p = document.createElement("p");

    if (winnerList !== undefined) {
      console.log("appendDisplay:", winnerList[0]);
      container.append(winnerList[0]);
      // let winner = AddSuspenseComponent(winnerList, true);
      // container.append(winner);
    }
  };

  // const AddSuspenseComponent = (x, bool) => {
  //   // let winnerName = x[0].split("");
  //   // let candidates = x.map((item) => {
  //   //   return item.split(" ");
  //   // });
  //   // console.log("candidates", candidates);

  //   const characters = useRandomReveal({
  //     isPlaying: true,
  //     duration: 3.2,
  //     revealDuration: 0,
  //     speed: 6,
  //     characters: [x[0]],
  //     characterSet: x,
  //     // characters: x[0],
  //     // characterSet: " "+candidates,
  //     // revealEasing: "random",
  //     onComplete: () => [true, 3000],
  //   });

  //   return characters;
  // };

  const toggleEdit = () => {
    setIsHidden(!isHidden);
  };

  useEffect(() => {
    splitName();
  }, []);

  return (
    <div className="App" style={{ height: "100vh", overflow: "hidden" }}>
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
      {/* <Modal/> */}
      <Main
        arrayOfNames={arrayOfNames}
        winnerList={winnerList}
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
        shuffleArray={shuffleArray}
        // AddSuspenseComponent={AddSuspenseComponent}
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
