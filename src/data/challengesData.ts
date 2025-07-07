export enum ChallengeType {
  Info = "info_only",
  Quiz = "quiz_mcq",
  Match = "match_pairs",
  Input = "quiz_input",
  PlayNote = "play_note",
  PlaySeq = "play_sequence",
  Free = "free_practice",
}
export enum ChallengeLevel {
  Prep = "Prep",
  Grade1 = "Grade1",
  Grade2 = "Grade2",
  Grade3 = "Grade3",
  Grade4 = "Grade4",
  Grade5 = "Grade5",
}
export enum ChallengeDomain {
  Notation = "notation",
  Sight = "sight_reading",
  Rhythm = "rhythm",
  Technique = "technique",
  Scales = "scales",
  Chords = "chords",
  Harmony = "harmony",
  Ear = "ear_training",
}
export enum ObjectiveTag {
  Read = "read",
  Recognize = "recognize",
  Play = "play",
  Listen = "listen",
  Match = "match",
  Memorize = "memorize",
  Apply = "apply",
  Analyze = "analysis",
  Explore = "explore",
}

export const typeLabels: Record<ChallengeType, string> = {
  [ChallengeType.Info]: "Information Only",
  [ChallengeType.Quiz]: "Multiple‑Choice Quiz",
  [ChallengeType.Match]: "Matching Game",
  [ChallengeType.Input]: "Fill‑in Quiz",
  [ChallengeType.PlayNote]: "Play Note",
  [ChallengeType.PlaySeq]: "Play Sequence",
  [ChallengeType.Free]: "Free Practice",
};
export const levelLabels: Record<ChallengeLevel, string> = {
  [ChallengeLevel.Prep]: "Prep",
  [ChallengeLevel.Grade1]: "Grade 1",
  [ChallengeLevel.Grade2]: "Grade 2",
  [ChallengeLevel.Grade3]: "Grade 3",
  [ChallengeLevel.Grade4]: "Grade 4",
  [ChallengeLevel.Grade5]: "Grade 5",
};
export const domainLabels: Record<ChallengeDomain, string> = {
  [ChallengeDomain.Notation]: "Notation",
  [ChallengeDomain.Sight]: "Sight Reading",
  [ChallengeDomain.Rhythm]: "Rhythm",
  [ChallengeDomain.Technique]: "Technique",
  [ChallengeDomain.Scales]: "Scales",
  [ChallengeDomain.Chords]: "Chords",
  [ChallengeDomain.Harmony]: "Harmony",
  [ChallengeDomain.Ear]: "Ear Training",
};
export const objectiveLabels: Record<ObjectiveTag, string> = {
  [ObjectiveTag.Read]: "Read",
  [ObjectiveTag.Recognize]: "Recognize",
  [ObjectiveTag.Play]: "Play",
  [ObjectiveTag.Listen]: "Listen",
  [ObjectiveTag.Match]: "Match",
  [ObjectiveTag.Memorize]: "Memorize",
  [ObjectiveTag.Apply]: "Apply",
  [ObjectiveTag.Analyze]: "Analyze",
  [ObjectiveTag.Explore]: "Explore",
};

// --- Challenge type ---
export type Challenge = {
  id: string;
  title: string;
  type: ChallengeType;
  level: ChallengeLevel;
  domain: ChallengeDomain;
  objectives: ObjectiveTag[];
  estimatedDuration: number;
  shortDescription: string;
};

export const challengesData: Challenge[] = [
  {
    id: "prep_note_names",
    title: "Learn Note Names (A–G)",
    type: ChallengeType.Info,
    level: ChallengeLevel.Prep,
    domain: ChallengeDomain.Notation,
    objectives: [ObjectiveTag.Recognize, ObjectiveTag.Memorize],
    estimatedDuration: 3,
    shortDescription: "Introduction to the musical alphabet and Middle C.",
  },
  {
    id: "g1_quiz_treble_notes",
    title: "Treble Clef Quiz",
    type: ChallengeType.Quiz,
    level: ChallengeLevel.Grade1,
    domain: ChallengeDomain.Sight,
    objectives: [ObjectiveTag.Read, ObjectiveTag.Recognize],
    estimatedDuration: 4,
    shortDescription: "Identify line & space notes in the treble clef.",
  },
  {
    id: "g2_quiz_bass_notes_line_space",
    title: "Bass Clef Line & Space Quiz",
    type: ChallengeType.Quiz,
    level: ChallengeLevel.Grade2,
    domain: ChallengeDomain.Sight,
    objectives: [ObjectiveTag.Read, ObjectiveTag.Recognize],
    estimatedDuration: 5,
    shortDescription: "Identify bass clef line and space notes—up to Grade 2.",
  },
  {
    id: "g2_match_bass_to_key",
    title: "Match Bass Staff to Piano",
    type: ChallengeType.Match,
    level: ChallengeLevel.Grade2,
    domain: ChallengeDomain.Sight,
    objectives: [ObjectiveTag.Read, ObjectiveTag.Match],
    estimatedDuration: 5,
    shortDescription: "Drag bass-clef notes to their piano key positions.",
  },
  {
    id: "g2_quiz_rhythm_fill",
    title: "Fill the Missing Rhythm",
    type: ChallengeType.Input,
    level: ChallengeLevel.Grade2,
    domain: ChallengeDomain.Rhythm,
    objectives: [ObjectiveTag.Recognize, ObjectiveTag.Apply],
    estimatedDuration: 5,
    shortDescription: "Complete the bar by typing the missing note/rest.",
  },
  {
    id: "g3_play_c_scale",
    title: "Play C Major Scale",
    type: ChallengeType.PlaySeq,
    level: ChallengeLevel.Grade3,
    domain: ChallengeDomain.Scales,
    objectives: [ObjectiveTag.Play, ObjectiveTag.Memorize],
    estimatedDuration: 6,
    shortDescription: "Play C-major scale up and down accurately.",
  },
  {
    id: "g3_quiz_key_signature_g",
    title: "G Major Key Signature Quiz",
    type: ChallengeType.Quiz,
    level: ChallengeLevel.Grade3,
    domain: ChallengeDomain.Notation,
    objectives: [ObjectiveTag.Recognize, ObjectiveTag.Apply],
    estimatedDuration: 4,
    shortDescription: "Identify G‑major key signature in treble or bass clef.",
  },
  {
    id: "g4_play_triad_root",
    title: "Identify Triad Root Note",
    type: ChallengeType.PlayNote,
    level: ChallengeLevel.Grade4,
    domain: ChallengeDomain.Chords,
    objectives: [ObjectiveTag.Listen, ObjectiveTag.Recognize],
    estimatedDuration: 4,
    shortDescription: "Hear a triad → press its root on the keyboard.",
  },
  {
    id: "g4_match_quarter_rest",
    title: "Match Rests to Symbols",
    type: ChallengeType.Match,
    level: ChallengeLevel.Grade4,
    domain: ChallengeDomain.Rhythm,
    objectives: [ObjectiveTag.Recognize, ObjectiveTag.Match],
    estimatedDuration: 4,
    shortDescription: "Match names (e.g., crotchet rest) to their notation.",
  },
  {
    id: "g5_quiz_harmony_progression",
    title: "Chord Progression I–IV–V–I Quiz",
    type: ChallengeType.Quiz,
    level: ChallengeLevel.Grade5,
    domain: ChallengeDomain.Harmony,
    objectives: [ObjectiveTag.Analyze, ObjectiveTag.Recognize],
    estimatedDuration: 7,
    shortDescription: "Identify chord functions in a typical progression.",
  },
];
