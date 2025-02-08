import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import React__default, { useState, useMemo, useCallback } from "react";
import { useSpring, animated } from "@react-spring/web";
import { AwesomeButton } from "react-awesome-button";
import Select from "react-select";
/* empty css               */
const letters = [
  "C",
  "c#",
  "D",
  "d#",
  "E",
  "F",
  "f#",
  "G",
  "g#",
  "A",
  "a#",
  "B"
];
const createLine = (section1 = "", section2 = "", section3 = "", section4 = "", section5 = "", section6 = "", section7 = "") => section1 + ";" + section2 + ";" + section3 + ";" + section4 + ";" + section5 + ";" + section6 + ";" + section7;
const createNote = (name, sectionNumber, stepNumber, isSilent, color = "blue") => ({
  name,
  sectionNumber,
  stepNumber,
  isSilent,
  color
});
const sizeOfStepNum = 112;
const sizeOfStepPx = "110px";
const totalOfSteps = 6;
const createStep = (contentNotesLine, stepNumber) => {
  return contentNotesLine.split(";").map(
    (setOfNotes, index) => letters.map(
      (letter) => createNote(letter, index + 1, stepNumber, !setOfNotes.includes(letter))
    )
  );
};
const createFallingNotesKeyBoard = (namePiece, allLines) => ({
  namePiece,
  steps: allLines.map((line, index) => createStep(line, index + 1))
});
const frenchLetters = {
  A: "La",
  B: "Si",
  C: "Do",
  D: "Ré",
  E: "Mi",
  F: "Fa",
  G: "Sol",
  "c#": "Do dièse",
  "d#": "Ré dièse",
  "f#": "Fa dièse",
  "g#": "Sol dièse",
  "a#": "La dièse"
};
const optionsPieces = [
  // Test
  { value: "test01", label: "Test 1" },
  { value: "pieceOdetoJoy", label: "Ode to Joy" },
  { value: "pieceHappyBirthday", label: "Happy Birthday" },
  {
    value: "pieceTwinkleTwinkleLittleStar",
    label: "Twinkle Twinkle Little Star"
  },
  // Major Scales
  { value: "cMajorScale", label: "C Major Scale" },
  { value: "dMajorScale", label: "D Major Scale" },
  { value: "eMajorScale", label: "E Major Scale" },
  { value: "fMajorScale", label: "F Major Scale" },
  { value: "gMajorScale", label: "G Major Scale" },
  { value: "aMajorScale", label: "A Major Scale" },
  { value: "bMajorScale", label: "B Major Scale" },
  { value: "cSharpMajorScale", label: "C# Major Scale" },
  { value: "dSharpMajorScale", label: "D# Major Scale" },
  { value: "fSharpMajorScale", label: "F# Major Scale" },
  { value: "gSharpMajorScale", label: "G# Major Scale" },
  { value: "aSharpMajorScale", label: "A# Major Scale" },
  // Minor Scales
  { value: "cMinorScale", label: "C Minor Scale" },
  { value: "dMinorScale", label: "D Minor Scale" },
  { value: "eMinorScale", label: "E Minor Scale" },
  { value: "fMinorScale", label: "F Minor Scale" },
  { value: "gMinorScale", label: "G Minor Scale" },
  { value: "aMinorScale", label: "A Minor Scale" },
  { value: "bMinorScale", label: "B Minor Scale" },
  { value: "cSharpMinorScale", label: "C# Minor Scale" },
  { value: "dSharpMinorScale", label: "D# Minor Scale" },
  { value: "fSharpMinorScale", label: "F# Minor Scale" },
  { value: "gSharpMinorScale", label: "G# Minor Scale" },
  { value: "aSharpMinorScale", label: "A# Minor Scale" },
  // Harmonic Minor and Major Scales
  { value: "cHarmonicMinorScale", label: "C Harmonic Minor Scale" },
  { value: "dHarmonicMinorScale", label: "D Harmonic Minor Scale" },
  { value: "eHarmonicMinorScale", label: "E Harmonic Minor Scale" },
  { value: "fHarmonicMinorScale", label: "F Harmonic Minor Scale" },
  { value: "gHarmonicMinorScale", label: "G Harmonic Minor Scale" },
  { value: "aHarmonicMinorScale", label: "A Harmonic Minor Scale" },
  { value: "bHarmonicMinorScale", label: "B Harmonic Minor Scale" },
  { value: "cSharpHarmonicMinorScale", label: "C# Harmonic Minor Scale" },
  { value: "dSharpHarmonicMinorScale", label: "D# Harmonic Minor Scale" },
  { value: "fSharpHarmonicMinorScale", label: "F# Harmonic Minor Scale" },
  { value: "gSharpHarmonicMinorScale", label: "G# Harmonic Minor Scale" },
  { value: "aSharpHarmonicMinorScale", label: "A# Harmonic Minor Scale" },
  { value: "cMajorHarmonicScale", label: "C Major Harmonic Scale" },
  { value: "dMajorHarmonicScale", label: "D Major Harmonic Scale" },
  { value: "eMajorHarmonicScale", label: "E Major Harmonic Scale" },
  { value: "fMajorHarmonicScale", label: "F Major Harmonic Scale" },
  { value: "gMajorHarmonicScale", label: "G Major Harmonic Scale" },
  { value: "aMajorHarmonicScale", label: "A Major Harmonic Scale" },
  { value: "bMajorHarmonicScale", label: "B Major Harmonic Scale" },
  { value: "cSharpMajorHarmonicScale", label: "C# Major Harmonic Scale" },
  { value: "dSharpMajorHarmonicScale", label: "D# Major Harmonic Scale" },
  { value: "fSharpMajorHarmonicScale", label: "F# Major Harmonic Scale" },
  { value: "gSharpMajorHarmonicScale", label: "G# Major Harmonic Scale" },
  { value: "aSharpMajorHarmonicScale", label: "A# Major Harmonic Scale" },
  // Melodic Minor and Major Scales
  { value: "cMelodicMinorScale", label: "C Melodic Minor Scale" },
  { value: "dMelodicMinorScale", label: "D Melodic Minor Scale" },
  { value: "eMelodicMinorScale", label: "E Melodic Minor Scale" },
  { value: "fMelodicMinorScale", label: "F Melodic Minor Scale" },
  { value: "gMelodicMinorScale", label: "G Melodic Minor Scale" },
  { value: "aMelodicMinorScale", label: "A Melodic Minor Scale" },
  { value: "bMelodicMinorScale", label: "B Melodic Minor Scale" },
  { value: "cSharpMelodicMinorScale", label: "C# Melodic Minor Scale" },
  { value: "dSharpMelodicMinorScale", label: "D# Melodic Minor Scale" },
  { value: "fSharpMelodicMinorScale", label: "F# Melodic Minor Scale" },
  { value: "gSharpMelodicMinorScale", label: "G# Melodic Minor Scale" },
  { value: "aSharpMelodicMinorScale", label: "A# Melodic Minor Scale" },
  { value: "cMajorMelodicScale", label: "C Major Melodic Scale" },
  { value: "dMajorMelodicScale", label: "D Major Melodic Scale" },
  { value: "eMajorMelodicScale", label: "E Major Melodic Scale" },
  { value: "fMajorMelodicScale", label: "F Major Melodic Scale" },
  { value: "gMajorMelodicScale", label: "G Major Melodic Scale" },
  { value: "aMajorMelodicScale", label: "A Major Melodic Scale" },
  { value: "bMajorMelodicScale", label: "B Major Melodic Scale" },
  { value: "cSharpMajorMelodicScale", label: "C# Major Melodic Scale" },
  { value: "dSharpMajorMelodicScale", label: "D# Major Melodic Scale" },
  { value: "fSharpMajorMelodicScale", label: "F# Major Melodic Scale" },
  { value: "gSharpMajorMelodicScale", label: "G# Major Melodic Scale" },
  { value: "aSharpMajorMelodicScale", label: "A# Major Melodic Scale" },
  // Major Chords
  { value: "cMajorChord", label: "C Major Chord" },
  { value: "dMajorChord", label: "D Major Chord" },
  { value: "eMajorChord", label: "E Major Chord" },
  { value: "fMajorChord", label: "F Major Chord" },
  { value: "gMajorChord", label: "G Major Chord" },
  { value: "aMajorChord", label: "A Major Chord" },
  { value: "bMajorChord", label: "B Major Chord" },
  { value: "cSharpMajorChord", label: "C# Major Chord" },
  { value: "dSharpMajorChord", label: "D# Major Chord" },
  { value: "fSharpMajorChord", label: "F# Major Chord" },
  { value: "gSharpMajorChord", label: "G# Major Chord" },
  { value: "aSharpMajorChord", label: "A# Major Chord" },
  // Minor Chords
  { value: "cMinorChord", label: "C Minor Chord" },
  { value: "dMinorChord", label: "D Minor Chord" },
  { value: "eMinorChord", label: "E Minor Chord" },
  { value: "fMinorChord", label: "F Minor Chord" },
  { value: "gMinorChord", label: "G Minor Chord" },
  { value: "aMinorChord", label: "A Minor Chord" },
  { value: "bMinorChord", label: "B Minor Chord" },
  { value: "cSharpMinorChord", label: "C# Minor Chord" },
  { value: "dSharpMinorChord", label: "D# Minor Chord" },
  { value: "fSharpMinorChord", label: "F# Minor Chord" },
  { value: "gSharpMinorChord", label: "G# Minor Chord" },
  { value: "aSharpMinorChord", label: "A# Minor Chord" },
  // Chord Progressions
  {
    value: "cMajorChordProgression1",
    label: "C Major Chord Progression I-IV-V-I"
  },
  {
    value: "cMajorChordProgression2",
    label: "C Major Chord Progression I-VI-III-IV-I"
  },
  {
    value: "cMajorChordProgression3",
    label: "C Major Chord Progression I-V-VI-IV"
  },
  {
    value: "cMinorChordProgression1",
    label: "C Minor Chord Progression i-iv-v-i"
  },
  {
    value: "cMinorChordProgression2",
    label: "C Minor Chord Progression i-ii°-v-i"
  },
  {
    value: "cMinorChordProgression3",
    label: "C Minor Chord Progression i-bVI-bIII-bVII"
  },
  {
    value: "cMinorChordProgression4",
    label: "C Minor Chord Progression i-bVII-bVI-bVII-i"
  }
];
const allPieces = {
  test01: createFallingNotesKeyBoard("Test 01", [
    createLine("A,B,C,D,E", "A,B,C,D,E", "A,B,C,D,E", "A,B,C,D,E")
  ]),
  pieceOdetoJoy: createFallingNotesKeyBoard("Ode to Joy", [
    createLine("", "", "E", "E", "F", "G", ""),
    createLine("", "", "G", "F", "E", "D", ""),
    createLine("", "", "C", "C", "D", "E", ""),
    createLine("", "", "E", "D", "D", "", ""),
    createLine("", "", "E", "E", "F", "G", ""),
    createLine("", "", "G", "F", "E", "D", ""),
    createLine("", "", "C", "C", "D", "E", ""),
    createLine("", "", "D", "C", "C", "", ""),
    createLine("", "", "D", "D", "E", "C", ""),
    createLine("", "", "D", "E", "F", "E", ""),
    createLine("", "", "C", "D", "E", "D", ""),
    createLine("", "", "C", "D", "G", "", ""),
    createLine("", "", "E", "E", "F", "G", ""),
    createLine("", "", "G", "F", "E", "D", ""),
    createLine("", "", "C", "C", "D", "E", ""),
    createLine("", "", "D", "C", "C", "", "")
  ]),
  pieceHappyBirthday: createFallingNotesKeyBoard("Happy Birthday", [
    createLine("", "", "C", "C", "D", "C", ""),
    createLine("", "", "F", "E", "", "", ""),
    createLine("", "", "C", "C", "D", "C", ""),
    createLine("", "", "G", "F", "", "", ""),
    createLine("", "", "C", "C", "C'", "A", ""),
    createLine("", "", "F", "E", "D", "", ""),
    createLine("", "", "A#", "A#", "A", "F", ""),
    createLine("", "", "G", "F", "", "", "")
  ]),
  pieceTwinkleTwinkleLittleStar: createFallingNotesKeyBoard(
    "Twinkle Twinkle Little Star",
    [
      createLine("", "", "C", "C", "G", "G", ""),
      createLine("", "", "A", "A", "G", "", ""),
      createLine("", "", "F", "F", "E", "E", ""),
      createLine("", "", "D", "D", "C", "", ""),
      createLine("", "", "G", "G", "F", "F", ""),
      createLine("", "", "E", "E", "D", "", ""),
      createLine("", "", "G", "G", "F", "F", ""),
      createLine("", "", "E", "E", "D", "", ""),
      createLine("", "", "C", "C", "G", "G", ""),
      createLine("", "", "A", "A", "G", "", ""),
      createLine("", "", "F", "F", "E", "E", ""),
      createLine("", "", "D", "D", "C", "", "")
    ]
  ),
  // Major Scales
  cMajorScale: createFallingNotesKeyBoard("C major Scale", [
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "", "C")
  ]),
  dMajorScale: createFallingNotesKeyBoard("D major Scale", [
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "D")
  ]),
  eMajorScale: createFallingNotesKeyBoard("E major Scale", [
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "E")
  ]),
  fMajorScale: createFallingNotesKeyBoard("F major Scale", [
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "F")
  ]),
  gMajorScale: createFallingNotesKeyBoard("G major Scale", [
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "G")
  ]),
  aMajorScale: createFallingNotesKeyBoard("A major Scale", [
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "A")
  ]),
  bMajorScale: createFallingNotesKeyBoard("B major Scale", [
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "B")
  ]),
  cSharpMajorScale: createFallingNotesKeyBoard("C# major Scale", [
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "B#", ""),
    createLine("", "", "", "C#")
  ]),
  dSharpMajorScale: createFallingNotesKeyBoard("D# major Scale", [
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "F##", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "B#", ""),
    createLine("", "", "C##", ""),
    createLine("", "", "", "D#")
  ]),
  fSharpMajorScale: createFallingNotesKeyBoard("F# major Scale", [
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "", "F#")
  ]),
  gSharpMajorScale: createFallingNotesKeyBoard("G# major Scale", [
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "B#", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "F##", ""),
    createLine("", "", "", "G#")
  ]),
  aSharpMajorScale: createFallingNotesKeyBoard("A# major Scale", [
    createLine("", "", "A#", ""),
    createLine("", "", "B#", ""),
    createLine("", "", "C##", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "F##", ""),
    createLine("", "", "G##", ""),
    createLine("", "", "", "A#")
  ]),
  //  Minor Scales
  cMinorScale: createFallingNotesKeyBoard("C minor Scale", [
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "Eb", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "Ab", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "", "C")
  ]),
  dMinorScale: createFallingNotesKeyBoard("D minor Scale", [
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "", "D")
  ]),
  eMinorScale: createFallingNotesKeyBoard("E minor Scale", [
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "", "E")
  ]),
  fMinorScale: createFallingNotesKeyBoard("F minor Scale", [
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "Ab", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "Db", ""),
    createLine("", "", "Eb", ""),
    createLine("", "", "", "F")
  ]),
  gMinorScale: createFallingNotesKeyBoard("G minor Scale", [
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "Eb", ""),
    createLine("", "", "F", ""),
    createLine("", "", "", "G")
  ]),
  aMinorScale: createFallingNotesKeyBoard("A minor Scale", [
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "", "A")
  ]),
  bMinorScale: createFallingNotesKeyBoard("B minor Scale", [
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "", "B")
  ]),
  cSharpMinorScale: createFallingNotesKeyBoard("C# minor Scale", [
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "", "C#")
  ]),
  dSharpMinorScale: createFallingNotesKeyBoard("D# minor Scale", [
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "D#")
  ]),
  fSharpMinorScale: createFallingNotesKeyBoard("F# minor Scale", [
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "F#")
  ]),
  gSharpMinorScale: createFallingNotesKeyBoard("G# minor Scale", [
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "G#")
  ]),
  aSharpMinorScale: createFallingNotesKeyBoard("A# minor Scale", [
    createLine("", "", "A#", ""),
    createLine("", "", "B#", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "A#")
  ]),
  // Harmonic Minor Scales
  cHarmonicMinorScale: createFallingNotesKeyBoard("C harmonic minor Scale", [
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "Eb", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "Ab", ""),
    createLine("", "", "B", ""),
    createLine("", "", "", "C")
  ]),
  dHarmonicMinorScale: createFallingNotesKeyBoard("D harmonic minor Scale", [
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "D")
  ]),
  eHarmonicMinorScale: createFallingNotesKeyBoard("E harmonic minor Scale", [
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "E")
  ]),
  fHarmonicMinorScale: createFallingNotesKeyBoard("F harmonic minor Scale", [
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "Ab", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "Db", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "F")
  ]),
  gHarmonicMinorScale: createFallingNotesKeyBoard("G harmonic minor Scale", [
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "Eb", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "G")
  ]),
  aHarmonicMinorScale: createFallingNotesKeyBoard("A harmonic minor Scale", [
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "A")
  ]),
  bHarmonicMinorScale: createFallingNotesKeyBoard("B harmonic minor Scale", [
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "B")
  ]),
  cSharpHarmonicMinorScale: createFallingNotesKeyBoard(
    "C# harmonic minor Scale",
    [
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E", ""),
      createLine("", "", "F#", ""),
      createLine("", "", "G#", ""),
      createLine("", "", "A", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "", "C#")
    ]
  ),
  dSharpHarmonicMinorScale: createFallingNotesKeyBoard(
    "D# harmonic minor Scale",
    [
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F#", ""),
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B", ""),
      createLine("", "", "C##", ""),
      createLine("", "", "", "D#")
    ]
  ),
  fSharpHarmonicMinorScale: createFallingNotesKeyBoard(
    "F# harmonic minor Scale",
    [
      createLine("", "", "F#", ""),
      createLine("", "", "G#", ""),
      createLine("", "", "A", ""),
      createLine("", "", "B", ""),
      createLine("", "", "C#", ""),
      createLine("", "", "D", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "", "F#")
    ]
  ),
  gSharpHarmonicMinorScale: createFallingNotesKeyBoard(
    "G# harmonic minor Scale",
    [
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B", ""),
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E", ""),
      createLine("", "", "F##", ""),
      createLine("", "", "", "G#")
    ]
  ),
  aSharpHarmonicMinorScale: createFallingNotesKeyBoard(
    "A# harmonic minor Scale",
    [
      createLine("", "", "A#", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F#", ""),
      createLine("", "", "G##", ""),
      createLine("", "", "", "A#")
    ]
  ),
  // Melodic Minor Scales
  cMelodicMinorScale: createFallingNotesKeyBoard("C melodic minor Scale", [
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "Eb", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "", "C")
  ]),
  dMelodicMinorScale: createFallingNotesKeyBoard("D melodic minor Scale", [
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "D")
  ]),
  eMelodicMinorScale: createFallingNotesKeyBoard("E melodic minor Scale", [
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "E")
  ]),
  fMelodicMinorScale: createFallingNotesKeyBoard("F melodic minor Scale", [
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "Ab", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "F")
  ]),
  gMelodicMinorScale: createFallingNotesKeyBoard("G melodic minor Scale", [
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "G")
  ]),
  aMelodicMinorScale: createFallingNotesKeyBoard("A melodic minor Scale", [
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "A")
  ]),
  bMelodicMinorScale: createFallingNotesKeyBoard("B melodic minor Scale", [
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "B")
  ]),
  cSharpMelodicMinorScale: createFallingNotesKeyBoard(
    "C# melodic minor Scale",
    [
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E", ""),
      createLine("", "", "F#", ""),
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "", "C#")
    ]
  ),
  dSharpMelodicMinorScale: createFallingNotesKeyBoard(
    "D# melodic minor Scale",
    [
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F#", ""),
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "C##", ""),
      createLine("", "", "", "D#")
    ]
  ),
  fSharpMelodicMinorScale: createFallingNotesKeyBoard(
    "F# melodic minor Scale",
    [
      createLine("", "", "F#", ""),
      createLine("", "", "G#", ""),
      createLine("", "", "A", ""),
      createLine("", "", "B", ""),
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "", "F#")
    ]
  ),
  gSharpMelodicMinorScale: createFallingNotesKeyBoard(
    "G# melodic minor Scale",
    [
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B", ""),
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F##", ""),
      createLine("", "", "", "G#")
    ]
  ),
  aSharpMelodicMinorScale: createFallingNotesKeyBoard(
    "A# melodic minor Scale",
    [
      createLine("", "", "A#", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F##", ""),
      createLine("", "", "G##", ""),
      createLine("", "", "", "A#")
    ]
  ),
  // Major Harmonic Scales
  cMajorHarmonicScale: createFallingNotesKeyBoard("C major Harmonic Scale", [
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "", "C")
  ]),
  dMajorHarmonicScale: createFallingNotesKeyBoard("D major Harmonic Scale", [
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "D")
  ]),
  eMajorHarmonicScale: createFallingNotesKeyBoard("E major Harmonic Scale", [
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "E")
  ]),
  fMajorHarmonicScale: createFallingNotesKeyBoard("F major Harmonic Scale", [
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "F")
  ]),
  gMajorHarmonicScale: createFallingNotesKeyBoard("G major Harmonic Scale", [
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "G")
  ]),
  aMajorHarmonicScale: createFallingNotesKeyBoard("A major Harmonic Scale", [
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "A")
  ]),
  bMajorHarmonicScale: createFallingNotesKeyBoard("B major Harmonic Scale", [
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "B")
  ]),
  cSharpMajorHarmonicScale: createFallingNotesKeyBoard(
    "C# major Harmonic Scale",
    [
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F#", ""),
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "", "C#")
    ]
  ),
  dSharpMajorHarmonicScale: createFallingNotesKeyBoard(
    "D# major Harmonic Scale",
    [
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F##", ""),
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "C##", ""),
      createLine("", "", "", "D#")
    ]
  ),
  fSharpMajorHarmonicScale: createFallingNotesKeyBoard(
    "F# major Harmonic Scale",
    [
      createLine("", "", "F#", ""),
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B", ""),
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "", "F#")
    ]
  ),
  gSharpMajorHarmonicScale: createFallingNotesKeyBoard(
    "G# major Harmonic Scale",
    [
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F##", ""),
      createLine("", "", "", "G#")
    ]
  ),
  aSharpMajorHarmonicScale: createFallingNotesKeyBoard(
    "A# major Harmonic Scale",
    [
      createLine("", "", "A#", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "C##", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F##", ""),
      createLine("", "", "G##", ""),
      createLine("", "", "", "A#")
    ]
  ),
  // Major Melodic Scales
  cMajorMelodicScale: createFallingNotesKeyBoard("C major Melodic Scale", [
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "", "C")
  ]),
  dMajorMelodicScale: createFallingNotesKeyBoard("D major Melodic Scale", [
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "D")
  ]),
  eMajorMelodicScale: createFallingNotesKeyBoard("E major Melodic Scale", [
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "E")
  ]),
  fMajorMelodicScale: createFallingNotesKeyBoard("F major Melodic Scale", [
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "F")
  ]),
  gMajorMelodicScale: createFallingNotesKeyBoard("G major Melodic Scale", [
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "G")
  ]),
  aMajorMelodicScale: createFallingNotesKeyBoard("A major Melodic Scale", [
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "A")
  ]),
  bMajorMelodicScale: createFallingNotesKeyBoard("B major Melodic Scale", [
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "B")
  ]),
  cSharpMajorMelodicScale: createFallingNotesKeyBoard(
    "C# major Melodic Scale",
    [
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F#", ""),
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "", "C#")
    ]
  ),
  dSharpMajorMelodicScale: createFallingNotesKeyBoard(
    "D# major Melodic Scale",
    [
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F##", ""),
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "C##", ""),
      createLine("", "", "", "D#")
    ]
  ),
  fSharpMajorMelodicScale: createFallingNotesKeyBoard(
    "F# major Melodic Scale",
    [
      createLine("", "", "F#", ""),
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B", ""),
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "", "F#")
    ]
  ),
  gSharpMajorMelodicScale: createFallingNotesKeyBoard(
    "G# major Melodic Scale",
    [
      createLine("", "", "G#", ""),
      createLine("", "", "A#", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "C#", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F##", ""),
      createLine("", "", "", "G#")
    ]
  ),
  aSharpMajorMelodicScale: createFallingNotesKeyBoard(
    "A# major Melodic Scale",
    [
      createLine("", "", "A#", ""),
      createLine("", "", "B#", ""),
      createLine("", "", "C##", ""),
      createLine("", "", "D#", ""),
      createLine("", "", "E#", ""),
      createLine("", "", "F##", ""),
      createLine("", "", "G##", ""),
      createLine("", "", "", "A#")
    ]
  ),
  // Major Chords
  cMajorChord: createFallingNotesKeyBoard("C major Chord", [
    createLine("", "", "C", ""),
    createLine("", "", "E", ""),
    createLine("", "", "G", ""),
    createLine("", "", "", "C")
  ]),
  dMajorChord: createFallingNotesKeyBoard("D major Chord", [
    createLine("", "", "D", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "", "D")
  ]),
  eMajorChord: createFallingNotesKeyBoard("E major Chord", [
    createLine("", "", "E", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "B", ""),
    createLine("", "", "", "E")
  ]),
  fMajorChord: createFallingNotesKeyBoard("F major Chord", [
    createLine("", "", "F", ""),
    createLine("", "", "A", ""),
    createLine("", "", "C", ""),
    createLine("", "", "", "F")
  ]),
  gMajorChord: createFallingNotesKeyBoard("G major Chord", [
    createLine("", "", "G", ""),
    createLine("", "", "B", ""),
    createLine("", "", "D", ""),
    createLine("", "", "", "G")
  ]),
  aMajorChord: createFallingNotesKeyBoard("A major Chord", [
    createLine("", "", "A", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "A")
  ]),
  bMajorChord: createFallingNotesKeyBoard("B major Chord", [
    createLine("", "", "B", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "B")
  ]),
  cSharpMajorChord: createFallingNotesKeyBoard("C# major Chord", [
    createLine("", "", "C#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "C#")
  ]),
  dSharpMajorChord: createFallingNotesKeyBoard("D# major Chord", [
    createLine("", "", "D#", ""),
    createLine("", "", "F##", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "D#")
  ]),
  fSharpMajorChord: createFallingNotesKeyBoard("F# major Chord", [
    createLine("", "", "F#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "F#")
  ]),
  gSharpMajorChord: createFallingNotesKeyBoard("G# major Chord", [
    createLine("", "", "G#", ""),
    createLine("", "", "B#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "G#")
  ]),
  aSharpMajorChord: createFallingNotesKeyBoard("A# major Chord", [
    createLine("", "", "A#", ""),
    createLine("", "", "C##", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "", "A#")
  ]),
  // Minor Chords
  cMinorChord: createFallingNotesKeyBoard("C minor Chord", [
    createLine("", "", "C", ""),
    createLine("", "", "Eb", ""),
    createLine("", "", "G", ""),
    createLine("", "", "", "C")
  ]),
  dMinorChord: createFallingNotesKeyBoard("D minor Chord", [
    createLine("", "", "D", ""),
    createLine("", "", "F", ""),
    createLine("", "", "A", ""),
    createLine("", "", "", "D")
  ]),
  eMinorChord: createFallingNotesKeyBoard("E minor Chord", [
    createLine("", "", "E", ""),
    createLine("", "", "G", ""),
    createLine("", "", "B", ""),
    createLine("", "", "", "E")
  ]),
  fMinorChord: createFallingNotesKeyBoard("F minor Chord", [
    createLine("", "", "F", ""),
    createLine("", "", "Ab", ""),
    createLine("", "", "C", ""),
    createLine("", "", "", "F")
  ]),
  gMinorChord: createFallingNotesKeyBoard("G minor Chord", [
    createLine("", "", "G", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "D", ""),
    createLine("", "", "", "G")
  ]),
  aMinorChord: createFallingNotesKeyBoard("A minor Chord", [
    createLine("", "", "A", ""),
    createLine("", "", "C", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "A")
  ]),
  bMinorChord: createFallingNotesKeyBoard("B minor Chord", [
    createLine("", "", "B", ""),
    createLine("", "", "D", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "B")
  ]),
  cSharpMinorChord: createFallingNotesKeyBoard("C# minor Chord", [
    createLine("", "", "C#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "C#")
  ]),
  dSharpMinorChord: createFallingNotesKeyBoard("D# minor Chord", [
    createLine("", "", "D#", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "D#")
  ]),
  fSharpMinorChord: createFallingNotesKeyBoard("F# minor Chord", [
    createLine("", "", "F#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "F#")
  ]),
  gSharpMinorChord: createFallingNotesKeyBoard("G# minor Chord", [
    createLine("", "", "G#", ""),
    createLine("", "", "B", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "G#")
  ]),
  aSharpMinorChord: createFallingNotesKeyBoard("A# minor Chord", [
    createLine("", "", "A#", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "", "A#")
  ]),
  // Major Chord Progressions
  cMajorChordProgression1: createFallingNotesKeyBoard(
    "C major Chord Progression I-IV-V-I",
    [
      createLine("", "", "C", ""),
      createLine("", "", "F", ""),
      createLine("", "", "G", ""),
      createLine("", "", "", "C")
    ]
  ),
  cMajorChordProgression2: createFallingNotesKeyBoard(
    "C major Chord Progression I-VI-III-IV-I",
    [
      createLine("", "", "C", ""),
      createLine("", "", "Am", ""),
      createLine("", "", "Em", ""),
      createLine("", "", "F", ""),
      createLine("", "", "", "C")
    ]
  ),
  cMajorChordProgression3: createFallingNotesKeyBoard(
    "C major Chord Progression I-V-VI-IV",
    [
      createLine("", "", "C", ""),
      createLine("", "", "G", ""),
      createLine("", "", "Am", ""),
      createLine("", "", "F", "")
    ]
  ),
  // Minor Chord Progressions
  cMinorChordProgression1: createFallingNotesKeyBoard(
    "C minor Chord Progression i-iv-v-i",
    [
      createLine("", "", "Cm", ""),
      createLine("", "", "Fm", ""),
      createLine("", "", "Gm", ""),
      createLine("", "", "", "Cm")
    ]
  ),
  cMinorChordProgression2: createFallingNotesKeyBoard(
    "C minor Chord Progression i-ii°-v-i",
    [
      createLine("", "", "Cm", ""),
      createLine("", "", "D°", ""),
      createLine("", "", "Gm", ""),
      createLine("", "", "", "Cm")
    ]
  ),
  cMinorChordProgression3: createFallingNotesKeyBoard(
    "C minor Chord Progression i-bVI-bIII-bVII",
    [
      createLine("", "", "Cm", ""),
      createLine("", "", "Ab", ""),
      createLine("", "", "Eb", ""),
      createLine("", "", "Bb", "")
    ]
  ),
  cMinorChordProgression4: createFallingNotesKeyBoard(
    "C minor Chord Progression i-bVII-bVI-bVII-i",
    [
      createLine("", "", "Cm", ""),
      createLine("", "", "Bb", ""),
      createLine("", "", "Ab", ""),
      createLine("", "", "Bb", ""),
      createLine("", "", "", "Cm")
    ]
  )
};
const TrainPiano = () => {
  const [startState, setStartState] = useState(true);
  const [pauseState, setPauseState] = useState(true);
  const [musicalPiece, setMusicalPiece] = useState(null);
  const [numberOfLines, setNumberOfLines] = useState(0);
  const [isCleared, clearNotes] = useState(false);
  const [props, api] = useSpring(
    () => ({
      from: { y: -(sizeOfStepNum * totalOfSteps) }
    }),
    []
  );
  const renderContentFallingNotes = useMemo(() => {
    var _a;
    console.log("render the animated element");
    console.log("musicalPiece", musicalPiece);
    console.log("allPieces", allPieces[(musicalPiece == null ? void 0 : musicalPiece.value) ?? ""]);
    if (!isCleared && props && api && (musicalPiece == null ? void 0 : musicalPiece.value) && ((_a = allPieces[musicalPiece.value]) == null ? void 0 : _a.steps)) {
      setNumberOfLines(allPieces[musicalPiece.value].steps.length);
      return /* @__PURE__ */ jsx(
        animated.div,
        {
          style: {
            ...props,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          },
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "falling-notes-board",
              style: { height: `${sizeOfStepNum * totalOfSteps}px` },
              children: (musicalPiece == null ? void 0 : musicalPiece.value) && allPieces[musicalPiece.value].steps.map(
                (line, index) => {
                  const allNotes = line.flat();
                  return /* @__PURE__ */ jsx(
                    "div",
                    {
                      name: "line" + index,
                      id: "line" + index,
                      style: {
                        height: sizeOfStepPx
                      },
                      className: "falling-white-line",
                      children: allNotes.map((note) => {
                        if (note.name.includes("#")) return null;
                        return /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "falling-white-note",
                            style: {
                              height: sizeOfStepPx,
                              border: note.isSilent ? "none" : "solid 1px black",
                              borderTop: "none",
                              borderBottom: "none",
                              backgroundColor: note.isSilent ? "transparent" : note.color
                            },
                            id: (note.isSilent ? "silent" : "falling") + "-" + index + "-" + note.name + "-" + note.sectionNumber,
                            children: note.isSilent ? "" : note.name
                          },
                          Math.random()
                        );
                      })
                    },
                    "line" + index
                  );
                }
              )
            }
          )
        }
      );
    }
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "falling-notes-board",
        style: { height: `${sizeOfStepNum * totalOfSteps}px` }
      }
    );
  }, [musicalPiece, api, isCleared]);
  const playLineCallback = useCallback(
    (lineIndex) => {
      if (lineIndex >= numberOfLines) {
        return;
      }
      const playableNotes = [];
      const notes = Object.keys(frenchLetters);
      for (let note of notes) {
        for (let section = 1; section <= 7; section++) {
          const fallingId = `falling-${lineIndex}-${note}-${section}`;
          const fallingElement = document.getElementById(fallingId);
          if (fallingElement) {
            playableNotes.push({ note, section });
          }
        }
      }
      console.log("playableNotes", playableNotes);
      playableNotes.forEach(({ note, section }) => {
        const keyElement = document.getElementById(`key${note}${section}`);
        console.log("keyElement is", keyElement);
        if (keyElement) {
          keyElement.style.backgroundColor = "blue";
        }
      });
      api.start({
        from: { y: 0 },
        y: 110,
        config: { duration: 1e3 },
        onRest: () => {
          playableNotes.forEach(({ note, section }) => {
            const keyElement = document.getElementById(`key${note}${section}`);
            if (keyElement) {
              keyElement.style.backgroundColor = note.includes("#") ? "black" : "white";
            }
          });
          const lineNode = document.getElementById(`line${lineIndex}`);
          if (lineNode) {
            lineNode.remove();
          }
          playLineCallback(lineIndex + 1);
        }
      });
    },
    [api, numberOfLines]
  );
  const playButton = useCallback(() => {
    setStartState(!startState);
    if (startState) {
      clearNotes(false);
      api.start({
        from: { y: -(sizeOfStepNum * totalOfSteps) },
        y: 0,
        config: { duration: 5e3 },
        onRest: () => {
          playLineCallback(0);
        }
      });
    } else {
      console.log("Reset");
      clearNotes(true);
      setPauseState(true);
      api.resume();
    }
  }, [playLineCallback, api, setStartState, startState]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    startState && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "title-container",
        style: {
          background: "linear-gradient(0deg, #d1fdff, #fff7e5, #d1fdff)"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "overlay" }),
          /* @__PURE__ */ jsxs("div", { className: "text", children: [
            /* @__PURE__ */ jsxs("div", { className: "wrapper", children: [
              /* @__PURE__ */ jsx("div", { id: "L", className: "letter", children: "L" }),
              /* @__PURE__ */ jsx("div", { className: "shadow", children: "L" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "wrapper", children: [
              /* @__PURE__ */ jsx("div", { id: "O", className: "letter", children: "O" }),
              /* @__PURE__ */ jsx("div", { className: "shadow", children: "O" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "wrapper", children: [
              /* @__PURE__ */ jsx("div", { id: "V", className: "letter", children: "V" }),
              /* @__PURE__ */ jsx("div", { className: "shadow", children: "V" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "wrapper", children: [
              /* @__PURE__ */ jsx("div", { id: "E", className: "letter", children: "E" }),
              /* @__PURE__ */ jsx("div", { className: "shadow", children: "E" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "wrapper", children: [
              /* @__PURE__ */ jsx("div", { id: "♥", className: "letter", children: "♥" }),
              /* @__PURE__ */ jsx("div", { className: "shadow", children: "♥" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "wrapper", children: [
              /* @__PURE__ */ jsx("div", { id: "P", className: "letter", children: "P" }),
              /* @__PURE__ */ jsx("div", { className: "shadow", children: "P" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "wrapper", children: [
              /* @__PURE__ */ jsx("div", { id: "I", className: "letter", children: "I" }),
              /* @__PURE__ */ jsx("div", { className: "shadow", children: "I" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "wrapper", children: [
              /* @__PURE__ */ jsx("div", { id: "A", className: "letter", children: "A" }),
              /* @__PURE__ */ jsx("div", { className: "shadow", children: "A" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "wrapper", children: [
              /* @__PURE__ */ jsx("div", { id: "N", className: "letter", children: "N" }),
              /* @__PURE__ */ jsx("div", { className: "shadow", children: "N" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "wrapper", children: [
              /* @__PURE__ */ jsx("div", { id: "O", className: "letter", children: "O" }),
              /* @__PURE__ */ jsx("div", { className: "shadow", children: "O" })
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "paper-piano", children: [
      /* @__PURE__ */ jsxs("div", { className: "actions-container", children: [
        /* @__PURE__ */ jsx("div", { className: "select-container", children: /* @__PURE__ */ jsx(
          Select,
          {
            value: musicalPiece,
            onChange: (newValue) => {
              setMusicalPiece(newValue);
            },
            placeholder: "Choose a musical Piece..",
            options: optionsPieces
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "buttons-container", children: musicalPiece && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(AwesomeButton, { type: "primary", onPress: playButton, children: startState ? "Start Playing" : "Reset Playing" }),
          !startState && /* @__PURE__ */ jsx(
            AwesomeButton,
            {
              type: "primary",
              onPress: () => {
                setPauseState(!pauseState);
                if (pauseState) {
                  api.pause();
                } else {
                  api.resume();
                }
              },
              children: pauseState ? "Pause Playing" : "Resume Playing"
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "studio", children: [
        /* @__PURE__ */ jsx("div", { children: renderContentFallingNotes }),
        /* @__PURE__ */ jsxs("div", { className: "keyboard", children: [
          /* @__PURE__ */ jsx("div", { className: "keyboard-whites", children: new Array(7).fill("@").map((_, index) => /* @__PURE__ */ jsx(React__default.Fragment, { children: letters.map((letter) => /* @__PURE__ */ jsx(React__default.Fragment, { children: letter.includes("#") ? null : /* @__PURE__ */ jsx(
            "div",
            {
              id: "key" + letter + (index + 1),
              className: "white-note"
            }
          ) }, letter)) }, "white" + index)) }),
          /* @__PURE__ */ jsx("div", { className: "keyboard-blackes", children: new Array(7).fill("@").map((_, index) => /* @__PURE__ */ jsx(React__default.Fragment, { children: letters.map((letter) => /* @__PURE__ */ jsx(React__default.Fragment, { children: letter.includes("#") ? /* @__PURE__ */ jsx(
            "div",
            {
              id: "key" + letter + (index + 1),
              className: "black-note",
              style: {
                height: "55px",
                marginRight: ["a#", "d#"].includes(letter) ? "27px" : "0"
              }
            }
          ) : /* @__PURE__ */ jsx(Fragment, {}) }, letter)) }, "black" + index)) })
        ] })
      ] })
    ] })
  ] });
};
export {
  TrainPiano as default
};
