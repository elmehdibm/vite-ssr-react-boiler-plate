import React, { useState, useEffect, useRef } from "react";
import { Vex, Stave, StaveNote, Accidental } from "vexflow";
import { Piano, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

const PianoNotesChallenge = () => {
  const [currentNote, setCurrentNote] = useState(null);
  const [clef, setClef] = useState("treble");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const staffRef = useRef(null);
  const rendererRef = useRef(null);

  // MIDI note ranges for different clefs
  const noteRanges = {
    treble: {
      first: MidiNumbers.fromNote("c4"),
      last: MidiNumbers.fromNote("b5"),
    },
    bass: {
      first: MidiNumbers.fromNote("c2"),
      last: MidiNumbers.fromNote("b3"),
    },
  };

  // Initialize VexFlow
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
        clef: clef,
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
      setTimeout(generateNewNote, 1000);
    } else {
      setScore((s) => Math.max(0, s - 2));
      setFeedback("Wrong! ❌");
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
          background: "rgba(255, 255, 255, 0.9)",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <button
          style={{
            padding: "10px 20px",
            background: clef === "treble" ? "#4CAF50" : "#e0e0e0",
            color: clef === "treble" ? "white" : "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onClick={() => setClef("treble")}
        >
          Treble Clef
        </button>
        <button
          style={{
            padding: "10px 20px",
            background: clef === "bass" ? "#4CAF50" : "#e0e0e0",
            color: clef === "bass" ? "white" : "#333",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
          onClick={() => setClef("bass")}
        >
          Bass Clef
        </button>
        <button
          style={{
            padding: "10px 20px",
            background: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
          onClick={generateNewNote}
        >
          New Note
        </button>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "1.2em" }}>
            Score: <strong>{score}</strong>
          </div>
          <div
            style={{
              color: feedback.includes("🎉") ? "#4CAF50" : "#f44336",
              fontWeight: "bold",
            }}
          >
            {feedback || "Click keys to play!"}
          </div>
        </div>
      </div>

      {/* Staff */}
      <div
        ref={staffRef}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          flexShrink: 0,
        }}
      />

      {/* Piano */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "40px 0",
          padding: "20px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "800px", height: "200px" }}>
          <Piano
            noteRange={noteRanges[clef]}
            activeNotes={
              currentNote
                ? [
                    MidiNumbers.fromNote(
                      `${currentNote}${clef === "treble" ? "4" : "2"}`
                    ),
                  ]
                : []
            }
            playNote={() => {}}
            stopNote={() => {}}
            onPlayNoteInput={handleKeyPress}
            keyboardShortcuts={[]}
            renderNoteLabel={({ midiNumber }) => (
              <div
                style={{
                  position: "absolute",
                  bottom: "8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontSize: "0.85em",
                  color: MidiNumbers.getAttributes(midiNumber).isAccidental
                    ? "white"
                    : "#333",
                }}
              >
                {MidiNumbers.getAttributes(midiNumber).note.replace(
                  /[0-9]/g,
                  ""
                )}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PianoNotesChallenge;
