import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const container = "_container_138gg_1";
const piano = "_piano_138gg_11";
const keys = "_keys_138gg_19";
const whiteKey = "_whiteKey_138gg_24";
const blackKey = "_blackKey_138gg_38";
const notationSystem = "_notationSystem_138gg_63";
const tutorialBox = "_tutorialBox_138gg_64";
const score = "_score_138gg_65";
const highlighted = "_highlighted_138gg_77";
const staff = "_staff_138gg_104";
const staffLine = "_staffLine_138gg_115";
const clef = "_clef_138gg_122";
const note = "_note_138gg_129";
const correct = "_correct_138gg_145";
const incorrect = "_incorrect_138gg_149";
const viewToggle = "_viewToggle_138gg_153";
const clefToggle = "_clefToggle_138gg_154";
const hidden = "_hidden_138gg_158";
const styles = {
  container,
  piano,
  keys,
  whiteKey,
  blackKey,
  notationSystem,
  tutorialBox,
  score,
  highlighted,
  staff,
  staffLine,
  clef,
  note,
  correct,
  incorrect,
  viewToggle,
  clefToggle,
  hidden
};
const letterNotes = ["C", "D", "E", "F", "G", "A", "B"];
const solfegeNotes = ["Do", "Ré", "Mi", "Fa", "Sol", "La", "Si"];
const notePositions = {
  treble: { C: 220, D: 200, E: 180, F: 160, G: 140, A: 120, B: 100 },
  bass: { C: 160, D: 140, E: 120, F: 100, G: 80, A: 60, B: 40 }
};
const PianoNotesChallenge = () => {
  const [currentNotation, setCurrentNotation] = useState("letters");
  const [currentView, setCurrentView] = useState("piano");
  const [currentClef, setCurrentClef] = useState("treble");
  const [score2, setScore] = useState(0);
  const [currentNote, setCurrentNote] = useState(null);
  const [tutorial, setTutorial] = useState(
    "Welcome to Piano Notes Challenge! Select your preferred notation system to begin."
  );
  useEffect(() => {
    updateNoteDisplay();
  }, [currentView, currentClef, currentNote]);
  const setNotation = (notation) => {
    setCurrentNotation(notation);
    setTutorial(
      `Great! You've selected ${notation === "letters" ? "Letter" : "Solfège"} notation. Click 'Start Challenge' to begin learning notes!`
    );
  };
  const toggleView = (view) => {
    setCurrentView(view);
  };
  const toggleClef = (clef2) => {
    setCurrentClef(clef2);
  };
  const startChallenge = () => {
    setScore(0);
    nextNote();
  };
  const nextNote = () => {
    const newNote = Math.floor(Math.random() * 7);
    setCurrentNote(newNote);
    const noteName = currentNotation === "letters" ? letterNotes[newNote] : solfegeNotes[newNote];
    setTutorial(`Find and click ${noteName} on the ${currentView}!`);
  };
  const checkAnswer = (noteIndex) => {
    if (noteIndex === currentNote) {
      setScore((prevScore) => prevScore + 10);
      setTutorial(/* @__PURE__ */ jsx("span", { style: { color: "green" }, children: "Correct! Well done!" }));
      setTimeout(nextNote, 1e3);
    } else {
      setTutorial(
        /* @__PURE__ */ jsx("span", { style: { color: "red" }, children: "Try again! That's not the correct note." })
      );
    }
  };
  const updateNoteDisplay = () => {
  };
  const renderPianoKeys = () => {
    return letterNotes.map((note2, index) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `${styles.whiteKey} ${currentNote === index ? styles.highlighted : ""}`,
          onClick: () => checkAnswer(index),
          children: currentNotation === "letters" ? letterNotes[index] : solfegeNotes[index]
        }
      ),
      index !== 2 && index !== 6 && /* @__PURE__ */ jsx(
        "div",
        {
          className: styles.blackKey,
          onClick: () => checkAnswer(`${index}s`)
        }
      )
    ] }, index));
  };
  const renderStaffNotes = () => {
    return Object.entries(notePositions[currentClef]).map(
      ([noteName, position], index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: `${styles.note} ${currentNote === letterNotes.indexOf(noteName) ? styles.highlighted : ""}`,
          style: { top: `${position}px`, left: `${150 + index * 60}px` },
          onClick: () => checkAnswer(letterNotes.indexOf(noteName))
        },
        index
      )
    );
  };
  return /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
    /* @__PURE__ */ jsx("h1", { children: "Learn Piano Notes" }),
    /* @__PURE__ */ jsxs("div", { className: styles.notationSystem, children: [
      /* @__PURE__ */ jsx("button", { onClick: () => setNotation("letters"), children: "Use Letters (A, B, C...)" }),
      /* @__PURE__ */ jsx("button", { onClick: () => setNotation("solfege"), children: "Use Solfège (Do, Ré, Mi...)" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles.viewToggle, children: [
      /* @__PURE__ */ jsx("button", { onClick: () => toggleView("piano"), children: "Piano View" }),
      /* @__PURE__ */ jsx("button", { onClick: () => toggleView("staff"), children: "Staff View" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles.clefToggle, children: [
      /* @__PURE__ */ jsx("button", { onClick: () => toggleClef("treble"), children: "Treble Clef" }),
      /* @__PURE__ */ jsx("button", { onClick: () => toggleClef("bass"), children: "Bass Clef" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles.tutorialBox, children: tutorial }),
    /* @__PURE__ */ jsxs("div", { className: styles.score, children: [
      "Score: ",
      /* @__PURE__ */ jsx("span", { children: score2 })
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: `${styles.piano} ${currentView !== "piano" ? styles.hidden : ""}`,
        children: /* @__PURE__ */ jsx("div", { className: styles.keys, children: renderPianoKeys() })
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: `${styles.staff} ${currentView !== "staff" ? styles.hidden : ""}`,
        children: [
          /* @__PURE__ */ jsx("div", { className: styles.clef, children: currentClef === "treble" ? "𝄞" : "𝄢" }),
          [40, 80, 120, 160, 200].map((top, index) => /* @__PURE__ */ jsx(
            "div",
            {
              className: styles.staffLine,
              style: { top: `${top}px` }
            },
            index
          )),
          /* @__PURE__ */ jsx("div", { className: styles.notesContainer, children: renderStaffNotes() })
        ]
      }
    ),
    /* @__PURE__ */ jsx("button", { onClick: startChallenge, children: "Start Challenge" })
  ] });
};
const Home = lazy(() => import("./Home-aoWihwri.js"));
const TrainPiano = lazy(() => import("./TrainPiano-BY64VzeD.js"));
const Router = ({ isMobile }) => {
  if (isMobile) {
    return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/trainpiano",
          element: /* @__PURE__ */ jsx("div", { children: "Not Supported Now - Please check the app in Desktop" })
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "/dailychallenge", element: /* @__PURE__ */ jsx(PianoNotesChallenge, {}) })
    ] }) });
  }
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/trainpiano", element: /* @__PURE__ */ jsx(TrainPiano, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/dailychallenge", element: /* @__PURE__ */ jsx(PianoNotesChallenge, {}) })
  ] }) });
};
export {
  Router
};
