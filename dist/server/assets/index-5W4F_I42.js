import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Vex, Stave, StaveNote, Accidental } from "vexflow";
import { MidiNumbers, Piano } from "react-piano";
import { createTheme, ThemeProvider } from "@mui/material";
const PianoNotesChallenge = () => {
  const [currentNote, setCurrentNote] = useState(null);
  const [clef, setClef] = useState("treble");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const staffRef = useRef(null);
  const rendererRef = useRef(null);
  const noteRanges = {
    treble: {
      first: MidiNumbers.fromNote("c4"),
      last: MidiNumbers.fromNote("b5")
    },
    bass: {
      first: MidiNumbers.fromNote("c2"),
      last: MidiNumbers.fromNote("b3")
    }
  };
  useEffect(() => {
    if (staffRef.current && !rendererRef.current) {
      const { Renderer } = Vex.Flow;
      rendererRef.current = new Renderer(
        staffRef.current,
        Renderer.Backends.SVG
      );
      rendererRef.current.resize(600, 150);
    }
    redrawStaff();
  }, [currentNote, clef]);
  const redrawStaff = () => {
    if (!rendererRef.current) return;
    const context = rendererRef.current.getContext();
    context.clear();
    const stave = new Stave(10, 30, 550);
    stave.addClef(clef).setContext(context).draw();
    if (currentNote) {
      const octave = clef === "treble" ? 4 : 2;
      const note = new StaveNote({
        keys: [`${currentNote}/${octave}`],
        duration: "q",
        clef
      });
      if (currentNote.includes("#")) {
        note.addModifier(new Accidental("#"));
      }
      try {
        Vex.Flow.Formatter.FormatAndDraw(context, stave, [note]);
      } catch (error) {
        console.error("VexFlow rendering error:", error);
        setFeedback("Error rendering note");
      }
    }
  };
  const generateNewNote = () => {
    const notes = ["c", "d", "e", "f", "g", "a", "b"];
    const newNote = notes[Math.floor(Math.random() * notes.length)];
    setCurrentNote(newNote);
    setFeedback("");
  };
  const handleKeyPress = (midiNumber) => {
    if (!currentNote) return;
    const pressedNote = MidiNumbers.getAttributes(midiNumber).note.replace(
      /[0-9]/g,
      ""
    );
    const targetNote = currentNote;
    if (pressedNote === targetNote) {
      setScore((s) => s + 10);
      setFeedback("Correct! 🎉");
      setTimeout(generateNewNote, 1e3);
    } else {
      setScore((s) => Math.max(0, s - 2));
      setFeedback("Wrong! ❌");
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      },
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "20px",
              background: "rgba(255, 255, 255, 0.9)",
              padding: "15px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            },
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  style: {
                    padding: "10px 20px",
                    background: clef === "treble" ? "#4CAF50" : "#e0e0e0",
                    color: clef === "treble" ? "white" : "#333",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.3s"
                  },
                  onClick: () => setClef("treble"),
                  children: "Treble Clef"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  style: {
                    padding: "10px 20px",
                    background: clef === "bass" ? "#4CAF50" : "#e0e0e0",
                    color: clef === "bass" ? "white" : "#333",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "all 0.3s"
                  },
                  onClick: () => setClef("bass"),
                  children: "Bass Clef"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  style: {
                    padding: "10px 20px",
                    background: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  },
                  onClick: generateNewNote,
                  children: "New Note"
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    marginLeft: "auto",
                    display: "flex",
                    gap: "15px",
                    alignItems: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsxs("div", { style: { fontSize: "1.2em" }, children: [
                      "Score: ",
                      /* @__PURE__ */ jsx("strong", { children: score })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        style: {
                          color: feedback.includes("🎉") ? "#4CAF50" : "#f44336",
                          fontWeight: "bold"
                        },
                        children: feedback || "Click keys to play!"
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            ref: staffRef,
            style: {
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              flexShrink: 0
            }
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "40px 0",
              padding: "20px",
              background: "#f5f5f5",
              borderRadius: "8px"
            },
            children: /* @__PURE__ */ jsx("div", { style: { width: "100%", maxWidth: "800px", height: "200px" }, children: /* @__PURE__ */ jsx(
              Piano,
              {
                noteRange: noteRanges[clef],
                activeNotes: currentNote ? [
                  MidiNumbers.fromNote(
                    `${currentNote}${clef === "treble" ? "4" : "2"}`
                  )
                ] : [],
                playNote: () => {
                },
                stopNote: () => {
                },
                onPlayNoteInput: handleKeyPress,
                keyboardShortcuts: [],
                renderNoteLabel: ({ midiNumber }) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      bottom: "8px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontSize: "0.85em",
                      color: MidiNumbers.getAttributes(midiNumber).isAccidental ? "white" : "#333"
                    },
                    children: MidiNumbers.getAttributes(midiNumber).note.replace(
                      /[0-9]/g,
                      ""
                    )
                  }
                )
              }
            ) })
          }
        )
      ]
    }
  );
};
lazy(() => import("./Home-aoWihwri.js"));
const TrainPiano = lazy(() => import("./TrainPiano-BY64VzeD.js"));
const OnboardingPage = lazy(() => import("./OnBoarding-0LXEVQyh.js"));
const AdvicePage = lazy(() => import("./AdvicePage-BHOlw0rK.js"));
const TutorialPage = lazy(() => import("./TutorialPage-pp1OkP6c.js"));
const theme = createTheme({
  palette: {
    primary: { main: "#1a5da6" },
    secondary: { main: "#FF4081" }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h1: { fontWeight: 700 }
  }
});
const Router = ({ isMobile }) => {
  if (isMobile) {
    return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(OnboardingPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/advice", element: /* @__PURE__ */ jsx(AdvicePage, { isMobile: true }) }),
      /* @__PURE__ */ jsx(Route, { path: "/tutorial", element: /* @__PURE__ */ jsx(TutorialPage, { isMobile: true }) })
    ] }) });
  }
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { children: "Loading..." }), children: /* @__PURE__ */ jsx(ThemeProvider, { theme, children: /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(OnboardingPage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/advice", element: /* @__PURE__ */ jsx(AdvicePage, { isMobile: false }) }),
    /* @__PURE__ */ jsx(Route, { path: "/tutorial", element: /* @__PURE__ */ jsx(TutorialPage, { isMobile: false }) }),
    /* @__PURE__ */ jsx(Route, { path: "/trainpiano", element: /* @__PURE__ */ jsx(TrainPiano, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "/dailychallenge", element: /* @__PURE__ */ jsx(PianoNotesChallenge, {}) })
  ] }) }) });
};
export {
  Router
};
