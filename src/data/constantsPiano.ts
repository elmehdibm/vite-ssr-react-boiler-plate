// import AllNotes from "../img/allnotes.png";
// import NoteA from "../img/NoteA.png";
// import NoteB from "../img/NoteB.png";
// import NoteC from "../img/NoteC.png";
// import NoteD from "../img/NoteD.png";
// import NoteE from "../img/NoteE.png";
// import NoteF from "../img/NoteF.png";
// import NoteG from "../img/NoteG.png";

// import MajorScaleAImage from "../img/MajorScaleAImage.png";
// import MajorScaleBImage from "../img/MajorScaleBImage.png";
// import MajorScaleCImage from "../img/MajorScaleCImage.png";
// import MajorScaleDImage from "../img/MajorScaleDImage.png";
// import MajorScaleEImage from "../img/MajorScaleEImage.png";
// import MajorScaleFImage from "../img/MajorScaleFImage.png";
// import MajorScaleGImage from "../img/MajorScaleGImage.png";
// import MajorScaleASharpImage from "../img/MajorScaleASharpImage.png";
// import MajorScaleCSharpImage from "../img/MajorScaleCSharpImage.png";
// import MajorScaleDSharpImage from "../img/MajorScaleDSharpImage.png";
// import MajorScaleFSharpImage from "../img/MajorScaleFSharpImage.png";
// import MajorScaleGSharpImage from "../img/MajorScaleGSharpImage.png";

// import MinorScaleAImage from "../img/MinorScaleAImage.png";
// import MinorScaleBImage from "../img/MinorScaleBImage.png";
// import MinorScaleCImage from "../img/MinorScaleCImage.png";
// import MinorScaleDImage from "../img/MinorScaleDImage.png";
// import MinorScaleEImage from "../img/MinorScaleEImage.png";
// import MinorScaleFImage from "../img/MinorScaleFImage.png";
// import MinorScaleGImage from "../img/MinorScaleGImage.png";
// import MinorScaleASharpImage from "../img/MinorScaleASharpImage.png";
// import MinorScaleCSharpImage from "../img/MinorScaleCSharpImage.png";
// import MinorScaleDSharpImage from "../img/MinorScaleDSharpImage.png";
// import MinorScaleFSharpImage from "../img/MinorScaleFSharpImage.png";
// import MinorScaleGSharpImage from "../img/MinorScaleGSharpImage.png";

// import MajorChordAImage from "../img/MajorChordAImage.png";
// import MajorChordBImage from "../img/MajorChordBImage.png";
// import MajorChordCImage from "../img/MajorChordCImage.png";
// import MajorChordDImage from "../img/MajorChordDImage.png";
// import MajorChordEImage from "../img/MajorChordEImage.png";
// import MajorChordFImage from "../img/MajorChordFImage.png";
// import MajorChordGImage from "../img/MajorChordGImage.png";
// import MajorChordASharpImage from "../img/MajorChordASharpImage.png";
// import MajorChordCSharpImage from "../img/MajorChordCSharpImage.png";
// import MajorChordDSharpImage from "../img/MajorChordDSharpImage.png";
// import MajorChordFSharpImage from "../img/MajorChordFSharpImage.png";
// import MajorChordGSharpImage from "../img/MajorChordGSharpImage.png";

// import MinorChordAImage from "../img/MinorChordAImage.png";
// import MinorChordBImage from "../img/MinorChordBImage.png";
// import MinorChordCImage from "../img/MinorChordCImage.png";
// import MinorChordDImage from "../img/MinorChordDImage.png";
// import MinorChordEImage from "../img/MinorChordEImage.png";
// import MinorChordFImage from "../img/MinorChordFImage.png";
// import MinorChordGImage from "../img/MinorChordGImage.png";
// import MinorChordASharpImage from "../img/MinorChordASharpImage.png";
// import MinorChordCSharpImage from "../img/MinorChordCSharpImage.png";
// import MinorChordDSharpImage from "../img/MinorChordDSharpImage.png";
// import MinorChordFSharpImage from "../img/MinorChordFSharpImage.png";
// import MinorChordGSharpImage from "../img/MinorChordGSharpImage.png";

export const letters: string[] = [
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
  "B",
];

export const createSection = (...notes: string[]): string =>
  (notes && notes.join(",")) || "";

export const createLine = (
  section1: string = "",
  section2: string = "",
  section3: string = "",
  section4: string = "",
  section5: string = "",
  section6: string = "",
  section7: string = ""
): string =>
  section1 +
  ";" +
  section2 +
  ";" +
  section3 +
  ";" +
  section4 +
  ";" +
  section5 +
  ";" +
  section6 +
  ";" +
  section7;

interface NoteInfo {
  name: string;
  sectionNumber: number;
  stepNumber: number;
  isSilent: boolean;
  color: string;
}

export const createNote = (
  name: string,
  sectionNumber: number,
  stepNumber: number,
  isSilent: boolean,
  color: string = "blue"
): NoteInfo => ({
  name,
  sectionNumber,
  stepNumber,
  isSilent,
  color,
});

export const sizeOfStepNum: number = 112;

export const sizeOfStepPx: string = "110px";

export const totalOfSteps: number = 6;

export const startPosition: number = -(totalOfSteps * 4);

export const finishPosition: number = totalOfSteps * sizeOfStepNum;

export const createStep = (
  contentNotesLine: string,
  stepNumber: number
): NoteInfo[][] => {
  return contentNotesLine
    .split(";")
    .map((setOfNotes, index) =>
      letters.map((letter) =>
        createNote(letter, index + 1, stepNumber, !setOfNotes.includes(letter))
      )
    );
};

interface FallingNotesKeyBoard {
  namePiece: string;
  steps: NoteInfo[][][];
}

export const createFallingNotesKeyBoard = (
  namePiece: string,
  allLines: string[]
): FallingNotesKeyBoard => ({
  namePiece,
  steps: allLines.map((line, index) => createStep(line, index + 1)),
});

// export const revisionNoteMajorOrMinorScalesOrChords = {
//   // SCALES
//   MajorScaleA: MajorScaleAImage,
//   MajorScaleB: MajorScaleBImage,
//   MajorScaleC: MajorScaleCImage,
//   MajorScaleD: MajorScaleDImage,
//   MajorScaleE: MajorScaleEImage,
//   MajorScaleF: MajorScaleFImage,
//   MajorScaleG: MajorScaleGImage,
//   "MajorScalea#": MajorScaleASharpImage,
//   "MajorScalec#": MajorScaleCSharpImage,
//   "MajorScaled#": MajorScaleDSharpImage,
//   "MajorScalef#": MajorScaleFSharpImage,
//   "MajorScaleg#": MajorScaleGSharpImage,
//   MinorScaleA: MinorScaleAImage,
//   MinorScaleB: MinorScaleBImage,
//   MinorScaleC: MinorScaleCImage,
//   MinorScaleD: MinorScaleDImage,
//   MinorScaleE: MinorScaleEImage,
//   MinorScaleF: MinorScaleFImage,
//   MinorScaleG: MinorScaleGImage,
//   "MinorScalea#": MinorScaleASharpImage,
//   "MinorScalec#": MinorScaleCSharpImage,
//   "MinorScaled#": MinorScaleDSharpImage,
//   "MinorScalef#": MinorScaleFSharpImage,
//   "MinorScaleg#": MinorScaleGSharpImage,
//   // CHORDS
//   // MajorChordA: MajorChordAImage,
//   // MajorChordB: MajorChordBImage,
//   // MajorChordC: MajorChordCImage,
//   // MajorChordD: MajorChordDImage,
//   // MajorChordE: MajorChordEImage,
//   // MajorChordF: MajorChordFImage,
//   // MajorChordG: MajorChordGImage,
//   // "MajorChorda#": MajorChordASharpImage,
//   // "MajorChordc#": MajorChordCSharpImage,
//   // "MajorChordd#": MajorChordDSharpImage,
//   // "MajorChordf#": MajorChordFSharpImage,
//   // "MajorChordg#": MajorChordGSharpImage,
//   // MinorChordA: MinorChordAImage,
//   // MinorChordB: MinorChordBImage,
//   // MinorChordC: MinorChordCImage,
//   // MinorChordD: MinorChordDImage,
//   // MinorChordE: MinorChordEImage,
//   // MinorChordF: MinorChordFImage,
//   // MinorChordG: MinorChordGImage,
//   // "MinorChorda#": MinorChordASharpImage,
//   // "MinorChordc#": MinorChordCSharpImage,
//   // "MinorChordd#": MinorChordDSharpImage,
//   // "MinorChordf#": MinorChordFSharpImage,
//   // "MinorChordg#": MinorChordGSharpImage,
// };

export const letterColors = {
  A: "red",
  B: "orange",
  C: "black",
  D: "green",
  E: "blue",
  F: "indigo",
  G: "violet",
  "c#": "brown",
  "d#": "pink",
  "f#": "lightblue",
  "g#": "lightgreen",
  "a#": "lightcoral",
};

// export const pianoPartition = {
//   A: NoteA,
//   B: NoteB,
//   C: NoteC,
//   D: NoteD,
//   E: NoteE,
//   F: NoteF,
//   G: NoteG,
//   "c#": NoteC,
//   "d#": NoteD,
//   "f#": NoteF,
//   "g#": NoteG,
//   "a#": NoteA,
// };

export const frenchLetters = {
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
  "a#": "La dièse",
};

export const optionsPieces = [
  // Test
  { value: "test01", label: "Test 1" },

  { value: "pieceOdetoJoy", label: "Ode to Joy" },
  { value: "pieceHappyBirthday", label: "Happy Birthday" },
  {
    value: "pieceTwinkleTwinkleLittleStar",
    label: "Twinkle Twinkle Little Star",
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
    label: "C Major Chord Progression I-IV-V-I",
  },
  {
    value: "cMajorChordProgression2",
    label: "C Major Chord Progression I-VI-III-IV-I",
  },
  {
    value: "cMajorChordProgression3",
    label: "C Major Chord Progression I-V-VI-IV",
  },
  {
    value: "cMinorChordProgression1",
    label: "C Minor Chord Progression i-iv-v-i",
  },
  {
    value: "cMinorChordProgression2",
    label: "C Minor Chord Progression i-ii°-v-i",
  },
  {
    value: "cMinorChordProgression3",
    label: "C Minor Chord Progression i-bVI-bIII-bVII",
  },
  {
    value: "cMinorChordProgression4",
    label: "C Minor Chord Progression i-bVII-bVI-bVII-i",
  },
];

export const allPieces: Record<string, any> = {
  test01: createFallingNotesKeyBoard("Test 01", [
    createLine("A,B,C,D,E", "A,B,C,D,E", "A,B,C,D,E", "A,B,C,D,E"),
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
    createLine("", "", "D", "C", "C", "", ""),
  ]),
  pieceHappyBirthday: createFallingNotesKeyBoard("Happy Birthday", [
    createLine("", "", "C", "C", "D", "C", ""),
    createLine("", "", "F", "E", "", "", ""),
    createLine("", "", "C", "C", "D", "C", ""),
    createLine("", "", "G", "F", "", "", ""),
    createLine("", "", "C", "C", "C'", "A", ""),
    createLine("", "", "F", "E", "D", "", ""),
    createLine("", "", "A#", "A#", "A", "F", ""),
    createLine("", "", "G", "F", "", "", ""),
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
      createLine("", "", "D", "D", "C", "", ""),
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
    createLine("", "", "", "C"),
  ]),
  dMajorScale: createFallingNotesKeyBoard("D major Scale", [
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "D"),
  ]),
  eMajorScale: createFallingNotesKeyBoard("E major Scale", [
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "E"),
  ]),
  fMajorScale: createFallingNotesKeyBoard("F major Scale", [
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "F"),
  ]),
  gMajorScale: createFallingNotesKeyBoard("G major Scale", [
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "G"),
  ]),
  aMajorScale: createFallingNotesKeyBoard("A major Scale", [
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "A"),
  ]),
  bMajorScale: createFallingNotesKeyBoard("B major Scale", [
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "B"),
  ]),
  cSharpMajorScale: createFallingNotesKeyBoard("C# major Scale", [
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "B#", ""),
    createLine("", "", "", "C#"),
  ]),
  dSharpMajorScale: createFallingNotesKeyBoard("D# major Scale", [
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "F##", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "B#", ""),
    createLine("", "", "C##", ""),
    createLine("", "", "", "D#"),
  ]),
  fSharpMajorScale: createFallingNotesKeyBoard("F# major Scale", [
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "", "F#"),
  ]),
  gSharpMajorScale: createFallingNotesKeyBoard("G# major Scale", [
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "B#", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "F##", ""),
    createLine("", "", "", "G#"),
  ]),
  aSharpMajorScale: createFallingNotesKeyBoard("A# major Scale", [
    createLine("", "", "A#", ""),
    createLine("", "", "B#", ""),
    createLine("", "", "C##", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "F##", ""),
    createLine("", "", "G##", ""),
    createLine("", "", "", "A#"),
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
    createLine("", "", "", "C"),
  ]),
  dMinorScale: createFallingNotesKeyBoard("D minor Scale", [
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "", "D"),
  ]),
  eMinorScale: createFallingNotesKeyBoard("E minor Scale", [
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "", "E"),
  ]),
  fMinorScale: createFallingNotesKeyBoard("F minor Scale", [
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "Ab", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "Db", ""),
    createLine("", "", "Eb", ""),
    createLine("", "", "", "F"),
  ]),
  gMinorScale: createFallingNotesKeyBoard("G minor Scale", [
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "Eb", ""),
    createLine("", "", "F", ""),
    createLine("", "", "", "G"),
  ]),
  aMinorScale: createFallingNotesKeyBoard("A minor Scale", [
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "", "A"),
  ]),
  bMinorScale: createFallingNotesKeyBoard("B minor Scale", [
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "", "B"),
  ]),
  cSharpMinorScale: createFallingNotesKeyBoard("C# minor Scale", [
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "", "C#"),
  ]),
  dSharpMinorScale: createFallingNotesKeyBoard("D# minor Scale", [
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "D#"),
  ]),
  fSharpMinorScale: createFallingNotesKeyBoard("F# minor Scale", [
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "F#"),
  ]),
  gSharpMinorScale: createFallingNotesKeyBoard("G# minor Scale", [
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "G#"),
  ]),
  aSharpMinorScale: createFallingNotesKeyBoard("A# minor Scale", [
    createLine("", "", "A#", ""),
    createLine("", "", "B#", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "A#"),
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
    createLine("", "", "", "C"),
  ]),
  dHarmonicMinorScale: createFallingNotesKeyBoard("D harmonic minor Scale", [
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "D"),
  ]),
  eHarmonicMinorScale: createFallingNotesKeyBoard("E harmonic minor Scale", [
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "E"),
  ]),
  fHarmonicMinorScale: createFallingNotesKeyBoard("F harmonic minor Scale", [
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "Ab", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "Db", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "F"),
  ]),
  gHarmonicMinorScale: createFallingNotesKeyBoard("G harmonic minor Scale", [
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "Eb", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "G"),
  ]),
  aHarmonicMinorScale: createFallingNotesKeyBoard("A harmonic minor Scale", [
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "A"),
  ]),
  bHarmonicMinorScale: createFallingNotesKeyBoard("B harmonic minor Scale", [
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "B"),
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
      createLine("", "", "", "C#"),
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
      createLine("", "", "", "D#"),
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
      createLine("", "", "", "F#"),
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
      createLine("", "", "", "G#"),
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
      createLine("", "", "", "A#"),
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
    createLine("", "", "", "C"),
  ]),
  dMelodicMinorScale: createFallingNotesKeyBoard("D melodic minor Scale", [
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "D"),
  ]),
  eMelodicMinorScale: createFallingNotesKeyBoard("E melodic minor Scale", [
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "E"),
  ]),
  fMelodicMinorScale: createFallingNotesKeyBoard("F melodic minor Scale", [
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "Ab", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "F"),
  ]),
  gMelodicMinorScale: createFallingNotesKeyBoard("G melodic minor Scale", [
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "G"),
  ]),
  aMelodicMinorScale: createFallingNotesKeyBoard("A melodic minor Scale", [
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "A"),
  ]),
  bMelodicMinorScale: createFallingNotesKeyBoard("B melodic minor Scale", [
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "B"),
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
      createLine("", "", "", "C#"),
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
      createLine("", "", "", "D#"),
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
      createLine("", "", "", "F#"),
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
      createLine("", "", "", "G#"),
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
      createLine("", "", "", "A#"),
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
    createLine("", "", "", "C"),
  ]),
  dMajorHarmonicScale: createFallingNotesKeyBoard("D major Harmonic Scale", [
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "D"),
  ]),
  eMajorHarmonicScale: createFallingNotesKeyBoard("E major Harmonic Scale", [
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "E"),
  ]),
  fMajorHarmonicScale: createFallingNotesKeyBoard("F major Harmonic Scale", [
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "F"),
  ]),
  gMajorHarmonicScale: createFallingNotesKeyBoard("G major Harmonic Scale", [
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "G"),
  ]),
  aMajorHarmonicScale: createFallingNotesKeyBoard("A major Harmonic Scale", [
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "A"),
  ]),
  bMajorHarmonicScale: createFallingNotesKeyBoard("B major Harmonic Scale", [
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "B"),
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
      createLine("", "", "", "C#"),
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
      createLine("", "", "", "D#"),
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
      createLine("", "", "", "F#"),
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
      createLine("", "", "", "G#"),
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
      createLine("", "", "", "A#"),
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
    createLine("", "", "", "C"),
  ]),
  dMajorMelodicScale: createFallingNotesKeyBoard("D major Melodic Scale", [
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "D"),
  ]),
  eMajorMelodicScale: createFallingNotesKeyBoard("E major Melodic Scale", [
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "E"),
  ]),
  fMajorMelodicScale: createFallingNotesKeyBoard("F major Melodic Scale", [
    createLine("", "", "F", ""),
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "F"),
  ]),
  gMajorMelodicScale: createFallingNotesKeyBoard("G major Melodic Scale", [
    createLine("", "", "G", ""),
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "G"),
  ]),
  aMajorMelodicScale: createFallingNotesKeyBoard("A major Melodic Scale", [
    createLine("", "", "A", ""),
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "A"),
  ]),
  bMajorMelodicScale: createFallingNotesKeyBoard("B major Melodic Scale", [
    createLine("", "", "B", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "B"),
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
      createLine("", "", "", "C#"),
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
      createLine("", "", "", "D#"),
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
      createLine("", "", "", "F#"),
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
      createLine("", "", "", "G#"),
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
      createLine("", "", "", "A#"),
    ]
  ),

  // Major Chords
  cMajorChord: createFallingNotesKeyBoard("C major Chord", [
    createLine("", "", "C", ""),
    createLine("", "", "E", ""),
    createLine("", "", "G", ""),
    createLine("", "", "", "C"),
  ]),
  dMajorChord: createFallingNotesKeyBoard("D major Chord", [
    createLine("", "", "D", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "", "D"),
  ]),
  eMajorChord: createFallingNotesKeyBoard("E major Chord", [
    createLine("", "", "E", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "B", ""),
    createLine("", "", "", "E"),
  ]),
  fMajorChord: createFallingNotesKeyBoard("F major Chord", [
    createLine("", "", "F", ""),
    createLine("", "", "A", ""),
    createLine("", "", "C", ""),
    createLine("", "", "", "F"),
  ]),
  gMajorChord: createFallingNotesKeyBoard("G major Chord", [
    createLine("", "", "G", ""),
    createLine("", "", "B", ""),
    createLine("", "", "D", ""),
    createLine("", "", "", "G"),
  ]),
  aMajorChord: createFallingNotesKeyBoard("A major Chord", [
    createLine("", "", "A", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "A"),
  ]),
  bMajorChord: createFallingNotesKeyBoard("B major Chord", [
    createLine("", "", "B", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "B"),
  ]),
  cSharpMajorChord: createFallingNotesKeyBoard("C# major Chord", [
    createLine("", "", "C#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "C#"),
  ]),
  dSharpMajorChord: createFallingNotesKeyBoard("D# major Chord", [
    createLine("", "", "D#", ""),
    createLine("", "", "F##", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "D#"),
  ]),
  fSharpMajorChord: createFallingNotesKeyBoard("F# major Chord", [
    createLine("", "", "F#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "F#"),
  ]),
  gSharpMajorChord: createFallingNotesKeyBoard("G# major Chord", [
    createLine("", "", "G#", ""),
    createLine("", "", "B#", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "G#"),
  ]),
  aSharpMajorChord: createFallingNotesKeyBoard("A# major Chord", [
    createLine("", "", "A#", ""),
    createLine("", "", "C##", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "", "A#"),
  ]),

  // Minor Chords
  cMinorChord: createFallingNotesKeyBoard("C minor Chord", [
    createLine("", "", "C", ""),
    createLine("", "", "Eb", ""),
    createLine("", "", "G", ""),
    createLine("", "", "", "C"),
  ]),
  dMinorChord: createFallingNotesKeyBoard("D minor Chord", [
    createLine("", "", "D", ""),
    createLine("", "", "F", ""),
    createLine("", "", "A", ""),
    createLine("", "", "", "D"),
  ]),
  eMinorChord: createFallingNotesKeyBoard("E minor Chord", [
    createLine("", "", "E", ""),
    createLine("", "", "G", ""),
    createLine("", "", "B", ""),
    createLine("", "", "", "E"),
  ]),
  fMinorChord: createFallingNotesKeyBoard("F minor Chord", [
    createLine("", "", "F", ""),
    createLine("", "", "Ab", ""),
    createLine("", "", "C", ""),
    createLine("", "", "", "F"),
  ]),
  gMinorChord: createFallingNotesKeyBoard("G minor Chord", [
    createLine("", "", "G", ""),
    createLine("", "", "Bb", ""),
    createLine("", "", "D", ""),
    createLine("", "", "", "G"),
  ]),
  aMinorChord: createFallingNotesKeyBoard("A minor Chord", [
    createLine("", "", "A", ""),
    createLine("", "", "C", ""),
    createLine("", "", "E", ""),
    createLine("", "", "", "A"),
  ]),
  bMinorChord: createFallingNotesKeyBoard("B minor Chord", [
    createLine("", "", "B", ""),
    createLine("", "", "D", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "", "B"),
  ]),
  cSharpMinorChord: createFallingNotesKeyBoard("C# minor Chord", [
    createLine("", "", "C#", ""),
    createLine("", "", "E", ""),
    createLine("", "", "G#", ""),
    createLine("", "", "", "C#"),
  ]),
  dSharpMinorChord: createFallingNotesKeyBoard("D# minor Chord", [
    createLine("", "", "D#", ""),
    createLine("", "", "F#", ""),
    createLine("", "", "A#", ""),
    createLine("", "", "", "D#"),
  ]),
  fSharpMinorChord: createFallingNotesKeyBoard("F# minor Chord", [
    createLine("", "", "F#", ""),
    createLine("", "", "A", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "", "F#"),
  ]),
  gSharpMinorChord: createFallingNotesKeyBoard("G# minor Chord", [
    createLine("", "", "G#", ""),
    createLine("", "", "B", ""),
    createLine("", "", "D#", ""),
    createLine("", "", "", "G#"),
  ]),
  aSharpMinorChord: createFallingNotesKeyBoard("A# minor Chord", [
    createLine("", "", "A#", ""),
    createLine("", "", "C#", ""),
    createLine("", "", "E#", ""),
    createLine("", "", "", "A#"),
  ]),

  // Major Chord Progressions
  cMajorChordProgression1: createFallingNotesKeyBoard(
    "C major Chord Progression I-IV-V-I",
    [
      createLine("", "", "C", ""),
      createLine("", "", "F", ""),
      createLine("", "", "G", ""),
      createLine("", "", "", "C"),
    ]
  ),
  cMajorChordProgression2: createFallingNotesKeyBoard(
    "C major Chord Progression I-VI-III-IV-I",
    [
      createLine("", "", "C", ""),
      createLine("", "", "Am", ""),
      createLine("", "", "Em", ""),
      createLine("", "", "F", ""),
      createLine("", "", "", "C"),
    ]
  ),
  cMajorChordProgression3: createFallingNotesKeyBoard(
    "C major Chord Progression I-V-VI-IV",
    [
      createLine("", "", "C", ""),
      createLine("", "", "G", ""),
      createLine("", "", "Am", ""),
      createLine("", "", "F", ""),
    ]
  ),

  // Minor Chord Progressions
  cMinorChordProgression1: createFallingNotesKeyBoard(
    "C minor Chord Progression i-iv-v-i",
    [
      createLine("", "", "Cm", ""),
      createLine("", "", "Fm", ""),
      createLine("", "", "Gm", ""),
      createLine("", "", "", "Cm"),
    ]
  ),
  cMinorChordProgression2: createFallingNotesKeyBoard(
    "C minor Chord Progression i-ii°-v-i",
    [
      createLine("", "", "Cm", ""),
      createLine("", "", "D°", ""),
      createLine("", "", "Gm", ""),
      createLine("", "", "", "Cm"),
    ]
  ),
  cMinorChordProgression3: createFallingNotesKeyBoard(
    "C minor Chord Progression i-bVI-bIII-bVII",
    [
      createLine("", "", "Cm", ""),
      createLine("", "", "Ab", ""),
      createLine("", "", "Eb", ""),
      createLine("", "", "Bb", ""),
    ]
  ),
  cMinorChordProgression4: createFallingNotesKeyBoard(
    "C minor Chord Progression i-bVII-bVI-bVII-i",
    [
      createLine("", "", "Cm", ""),
      createLine("", "", "Bb", ""),
      createLine("", "", "Ab", ""),
      createLine("", "", "Bb", ""),
      createLine("", "", "", "Cm"),
    ]
  ),
};
