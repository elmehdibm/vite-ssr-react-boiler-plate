// ==========================================
// PART 1: Learning Scenarios Configuration
// ==========================================

// ==========================================
// PART 2: Generic System Architecture
// ==========================================

// Action types that can be used in any step
export type ActionType =
  | "button"
  | "form"
  | "checkbox"
  | "audio"
  | "text_input"
  | "number_input"
  | "select";

export interface Action {
  id: string;
  type: ActionType;
  label: string;
  required?: boolean;
  options?: any; // specific options for each action type
  validation?: (value: any) => boolean | string;
  onExecute?: (value: any) => void;
}

// Generic step execution context
export interface StepContext {
  stepId: string;
  scenario: string;
  songData: {
    title: string;
    measuresNumber: number;
    targetTempo?: number;
    keySignature?: string;
    timeSignature?: string;
    difficulty?: "beginner" | "intermediate" | "advanced";
    youtubeLink?: string;
    remarks?: string;
  } | null;
  userPreferences: {
    notation: "anglo" | "solfege";
    defaultTempo: number;
    useMetronome: boolean;
    handPreference: "separate" | "together" | "right_first" | "left_first";
  };
  sessionData: {
    timeSpent: number;
    measuresCompleted: boolean[];
    currentStep: string;
    stepData: Record<string, any>; // store data from each step
    progressData: {
      measuresProgress: MeasureProgress[];
      performanceAttempts: PerformanceAttempt[];
      sessionCompleted: boolean;
    };
  };
}

// Extended measure data structure for enhanced tracking
export interface MeasureProgress {
  measureNumber: number;
  leftHandComplete: boolean;
  rightHandComplete: boolean;
  currentTempo: number;
  targetTempo: number;
  practiceAttempts: number;
  userNotes: string;
  lastPracticed?: Date;
  difficulty: "easy" | "medium" | "hard" | "very_hard";
  timeSpent: number; // in seconds
}

export interface PerformanceAttempt {
  id: string;
  timestamp: Date;
  completedMeasures: number;
  totalMeasures: number;
  averageTempo: number;
  notes: string;
}

// Generic content component props
export interface ContentComponentProps {
  step: LearningStep;
  context: StepContext;
  actions: Action[];
  onAction: (actionId: string, value: any) => void;
  onStepComplete: (stepId: string, data?: any) => void;
  onStepSkip: (stepId: string) => void;
}

// Core system state
export interface LearningSystemState {
  isActive: boolean;
  currentScenario: string;
  currentStepIndex: number;
  completedSteps: string[];
  skippedSteps: string[];
  context: StepContext;
  sessionStartTime: Date;
}

// Enhanced Learning Step that includes setup and guidance
export interface LearningStep {
  id: string;
  title: string;
  description: string;
  type: "setup" | "instruction" | "practice" | "validation" | "feedback";
  required: boolean;
  estimatedDuration?: number;
  prerequisites?: string[];
  options?: LearningStepOption[];
  onaiGuidance?: string; // Onai's specific guidance for this step
}

export interface LearningStepOption {
  id: string;
  label: string;
  value: any;
  default?: boolean;
}

// Enhanced scenarios that include the initial setup
export const ENHANCED_PIANO_LEARNING_SCENARIOS: {
  [key: string]: LearningStep[];
} = {
  // Universal scenario that starts with song setup
  universal_start: [
    {
      id: "welcome",
      title: "Welcome to Your Practice Session",
      description:
        "Let's get started with your personalized piano practice session.",
      type: "setup",
      required: true,
      onaiGuidance:
        "Welcome to the practice session, I'll guide you step by step until you master your song. Before we begin, I'll need you to give me some info about your song.",
    },
    {
      id: "song_form",
      title: "Tell Me About Your Song",
      description: "Provide information about the piece you want to practice.",
      type: "setup",
      required: true,
      onaiGuidance: "Fill the form to start your practice session!",
    },
    {
      id: "setup_complete",
      title: "Ready to Begin",
      description: "Your practice session is configured and ready to start.",
      type: "setup",
      required: true,
      prerequisites: ["song_form"],
      onaiGuidance:
        "Great! You are now ready to start your practice session. Follow the instructions and you'll be playing your song in no time!",
    },
  ],

  // Beginner scenario (continues after setup)
  beginner: [
    {
      id: "analyze_sheet",
      title: "Analyze the Sheet Music",
      description:
        "Look at the key signature, time signature, and tempo marking. Identify difficult passages.",
      type: "instruction",
      required: true,
      estimatedDuration: 3,
      onaiGuidance:
        "Let's start by understanding your sheet music. Take a moment to examine the key signature, time signature, and any tempo markings. Use the progress view on the right to track which measures you find challenging.",
    },
    {
      id: "listen_reference",
      title: "Listen to Reference Recording",
      description:
        "Listen to the complete piece 2-3 times to understand the musical style and tempo.",
      type: "instruction",
      required: true,
      estimatedDuration: 5,
      onaiGuidance:
        "Now let's listen to your piece to get familiar with how it should sound. As you listen, mark any measures that seem particularly challenging in your progress view.",
      options: [
        {
          id: "has_recording",
          label: "I have a reference recording",
          value: true,
          default: true,
        },
        { id: "skip_listening", label: "Skip this step", value: false },
      ],
    },
    {
      id: "choose_hand_practice",
      title: "Choose Hand Practice Method",
      description: "Select which hands to practice first.",
      type: "instruction",
      required: true,
      onaiGuidance:
        "For beginners, I recommend starting with hands separately. You can track your left and right hand progress separately in the progress view. Which approach would you like to take?",
      options: [
        {
          id: "right_first",
          label: "Right hand first",
          value: "right",
          default: true,
        },
        { id: "left_first", label: "Left hand first", value: "left" },
        {
          id: "both_together",
          label: "Both hands together (advanced)",
          value: "both",
        },
      ],
    },
    {
      id: "slow_practice",
      title: "Practice Slowly",
      description:
        "Practice very slowly, focusing on correct notes and fingering.",
      type: "practice",
      required: true,
      estimatedDuration: 10,
      prerequisites: ["choose_hand_practice"],
      onaiGuidance:
        "Let's start with slow, careful practice. Use the progress view to start practice timers for individual measures. Focus on getting the right notes and fingering - speed will come later.",
    },
    {
      id: "tempo_building",
      title: "Build Up Tempo Gradually",
      description: "Gradually increase tempo while maintaining accuracy.",
      type: "practice",
      required: true,
      estimatedDuration: 20,
      prerequisites: ["slow_practice"],
      onaiGuidance:
        "Now let's work towards your target tempo. Use the progress view to adjust your current tempo for each measure as you improve. Remember, accuracy is more important than speed.",
    },
    {
      id: "combine_hands",
      title: "Combine Both Hands",
      description: "If practicing hands separately, now combine them slowly.",
      type: "practice",
      required: true,
      estimatedDuration: 15,
      prerequisites: ["slow_practice"],
      onaiGuidance:
        "Time to bring both hands together! Mark both left and right hand complete for measures you can play with both hands. Take it slowly and be patient with yourself.",
    },
    {
      id: "final_validation",
      title: "Performance Validation",
      description: "Play the complete piece at target tempo without stops.",
      type: "validation",
      required: true,
      estimatedDuration: 5,
      prerequisites: ["tempo_building", "combine_hands"],
      onaiGuidance:
        "Time for your performance! Use the 'Full Performance' button in the progress view to record your attempts. This helps track your readiness to perform the complete piece.",
    },
  ],

  // Similar structure for intermediate and advanced...
  intermediate: [
    {
      id: "quick_overview",
      title: "Quick Sheet Analysis",
      description:
        "Scan for key changes, difficult passages, and overall structure.",
      type: "instruction",
      required: true,
      estimatedDuration: 2,
      onaiGuidance:
        "Let's quickly analyze your piece to identify the main challenges and structure. Mark difficult sections in your progress view as we go.",
    },
    {
      id: "problem_identification",
      title: "Identify Problem Areas",
      description: "Focus on the most challenging measures first.",
      type: "practice",
      required: true,
      estimatedDuration: 10,
      onaiGuidance:
        "Use the progress view to identify and practice your most challenging measures. Set their difficulty level and track your improvement.",
    },
    {
      id: "flexible_practice",
      title: "Flexible Practice Approach",
      description: "Practice different sections based on your needs.",
      type: "practice",
      required: true,
      estimatedDuration: 15,
      onaiGuidance:
        "Practice flexibly based on your progress. Use the measure timers and tempo controls to work on specific areas that need attention.",
    },
  ],

  advanced: [
    {
      id: "artistic_analysis",
      title: "Artistic and Technical Analysis",
      description:
        "Deep analysis of musical structure, harmony, and technical challenges.",
      type: "instruction",
      required: true,
      estimatedDuration: 5,
      onaiGuidance:
        "Let's dive deep into the artistic and technical aspects of this piece. Use the progress view to document your insights about each section.",
    },
    {
      id: "strategic_practice",
      title: "Strategic Practice Planning",
      description: "Plan your practice strategy based on analysis.",
      type: "practice",
      required: true,
      estimatedDuration: 20,
      onaiGuidance:
        "Based on your analysis, create a strategic practice plan. The progress view will help you track your focused practice on specific technical and musical elements.",
    },
  ],
};

// Enhanced Action Definitions - Removed progress-related actions
export const ENHANCED_ACTION_DEFINITIONS: Record<string, Omit<Action, "id">> = {
  // Setup actions
  welcome_ready: {
    type: "button",
    label: "Ready?",
  },

  song_form: {
    type: "form",
    label: "Song Information Form",
    options: {
      fields: [
        {
          name: "songName",
          label: "Song Title *",
          type: "text",
          required: true,
          placeholder: "e.g., Für Elise, Moonlight Sonata, etc.",
        },
        {
          name: "measuresNumber",
          label: "Number of Measures *",
          type: "number",
          required: true,
          min: 1,
          max: 500,
        },
        {
          name: "difficulty",
          label: "Your Playing Level",
          type: "select",
          options: [
            {
              value: "beginner",
              label: "Beginner - New to piano or this type of piece",
            },
            {
              value: "intermediate",
              label: "Intermediate - Comfortable with basic techniques",
            },
            { value: "advanced", label: "Advanced - Experienced player" },
          ],
          default: "beginner",
        },
        {
          name: "targetTempo",
          label: "Target Tempo (BPM)",
          type: "number",
          min: 40,
          max: 200,
          default: 120,
        },
        {
          name: "timeSignature",
          label: "Time Signature",
          type: "select",
          options: [
            { value: "4/4", label: "4/4" },
            { value: "3/4", label: "3/4" },
            { value: "2/4", label: "2/4" },
            { value: "6/8", label: "6/8" },
          ],
          default: "4/4",
        },
        {
          name: "keySignature",
          label: "Key Signature",
          type: "select",
          options: [
            { value: "C major", label: "C major" },
            { value: "G major", label: "G major" },
            { value: "D major", label: "D major" },
            { value: "A minor", label: "A minor" },
            { value: "E minor", label: "E minor" },
          ],
          default: "C major",
        },
        {
          name: "youtubeLink",
          label: "YouTube Link (Optional)",
          type: "text",
          placeholder: "https://youtube.com/watch?v=...",
        },
        {
          name: "remarks",
          label: "Notes & Remarks",
          type: "textarea",
          placeholder:
            "Any specific challenges, goals, or notes about this piece...",
        },
      ],
    },
  },

  setup_complete: {
    type: "button",
    label: "Start My Practice Session!",
  },

  // Instruction and validation actions
  ready_button: {
    type: "button",
    label: "Ready!",
  },

  skip_button: {
    type: "button",
    label: "Skip this step",
    required: false,
  },

  difficulty_assessment: {
    type: "select",
    label: "How difficult was this step?",
    options: {
      choices: [
        { value: "easy", label: "Easy - got it quickly" },
        { value: "medium", label: "Medium - needed some work" },
        { value: "hard", label: "Hard - struggled with it" },
        { value: "very_hard", label: "Very hard - need more practice" },
      ],
    },
  },

  notes_input: {
    type: "text_input",
    label: "Practice notes (optional)",
    options: {
      multiline: true,
      placeholder: "Any observations, difficulties, or breakthroughs...",
    },
  },
};

// Enhanced Step-Action Mapping - Removed progress-related actions
export const ENHANCED_STEP_ACTION_MAPPING: Record<
  string,
  Record<string, string[]>
> = {
  universal_start: {
    welcome: ["welcome_ready"],
    song_form: ["song_form"],
    setup_complete: ["setup_complete"],
  },

  beginner: {
    analyze_sheet: ["ready_button", "skip_button", "notes_input"],
    listen_reference: ["ready_button", "skip_button"],
    choose_hand_practice: ["ready_button"],
    slow_practice: ["difficulty_assessment", "notes_input", "ready_button"],
    tempo_building: ["ready_button"],
    combine_hands: ["difficulty_assessment", "ready_button"],
    final_validation: ["difficulty_assessment", "notes_input", "ready_button"],
  },

  intermediate: {
    quick_overview: ["ready_button", "notes_input"],
    problem_identification: ["ready_button", "notes_input"],
    flexible_practice: ["ready_button"],
  },

  advanced: {
    artistic_analysis: ["ready_button", "notes_input"],
    strategic_practice: ["ready_button"],
  },
};

// ==========================================
// ENHANCED LEARNING SYSTEM CONTROLLER
// ==========================================

export class EnhancedLearningSystemController {
  private state: LearningSystemState;
  private onStateChange: (state: LearningSystemState) => void;
  private currentScenarioSteps: LearningStep[];

  constructor(onStateChange: (state: LearningSystemState) => void) {
    this.onStateChange = onStateChange;

    // Start with the universal setup scenario
    this.currentScenarioSteps =
      ENHANCED_PIANO_LEARNING_SCENARIOS.universal_start;

    this.state = {
      isActive: true,
      currentScenario: "universal_start",
      currentStepIndex: 0,
      completedSteps: [],
      skippedSteps: [],
      context: {
        stepId: this.currentScenarioSteps[0].id,
        scenario: "universal_start",
        songData: null, // Will be filled when form is completed
        userPreferences: {
          notation: "anglo", // Default values
          defaultTempo: 80,
          useMetronome: true,
          handPreference: "separate",
        },
        sessionData: {
          timeSpent: 0,
          measuresCompleted: [],
          currentStep: this.currentScenarioSteps[0].id,
          stepData: {},
          progressData: {
            measuresProgress: [],
            performanceAttempts: [],
            sessionCompleted: false,
          },
        },
      },
      sessionStartTime: new Date(),
    };
  }

  getCurrentStep(): LearningStep | null {
    if (this.state.currentStepIndex >= this.currentScenarioSteps.length) {
      return null;
    }
    return this.currentScenarioSteps[this.state.currentStepIndex];
  }

  getAvailableActions(): Action[] {
    const currentStep = this.getCurrentStep();
    if (!currentStep) return [];

    const actionIds =
      ENHANCED_STEP_ACTION_MAPPING[this.state.currentScenario]?.[
        currentStep.id
      ] || [];

    return actionIds
      .map((actionId) => ({
        id: actionId,
        ...ENHANCED_ACTION_DEFINITIONS[actionId],
      }))
      .filter(Boolean);
  }

  handleAction = (actionId: string, value: any) => {
    console.log(`Action executed: ${actionId}`, value);

    const currentStep = this.getCurrentStep();
    if (currentStep) {
      this.state.context.sessionData.stepData[currentStep.id] = {
        ...this.state.context.sessionData.stepData[currentStep.id],
        [actionId]: value,
      };
    }

    // Special handling for different action types
    switch (actionId) {
      case "song_form":
        this.handleSongFormSubmission(value);
        break;
      case "progress_update":
        this.handleProgressUpdate(value);
        break;
      case "performance_attempt":
        this.handlePerformanceAttempt(value);
        break;
      case "session_complete":
        this.handleSessionComplete();
        break;
      case "global_measure_update":
        this.state.context.sessionData.measuresCompleted = value;
        break;
    }

    this.onStateChange(this.state);
  };

  private handleSongFormSubmission = (formData: any) => {
    // Update song data in context
    this.state.context.songData = {
      title: formData.songName,
      measuresNumber: formData.measuresNumber,
      targetTempo: formData.targetTempo,
      keySignature: formData.keySignature,
      timeSignature: formData.timeSignature,
      difficulty: formData.difficulty,
      youtubeLink: formData.youtubeLink,
      remarks: formData.remarks,
    };

    // Initialize measures array
    this.state.context.sessionData.measuresCompleted = Array(
      formData.measuresNumber || 12
    ).fill(false);

    // Initialize progress data for ProgressView
    this.state.context.sessionData.progressData.measuresProgress = Array.from(
      { length: formData.measuresNumber || 12 },
      (_, index) => ({
        measureNumber: index + 1,
        leftHandComplete: false,
        rightHandComplete: false,
        currentTempo: Math.round((formData.targetTempo || 120) * 0.6),
        targetTempo: formData.targetTempo || 120,
        practiceAttempts: 0,
        userNotes: "",
        difficulty: "medium" as const,
        timeSpent: 0,
      })
    );

    // Store the selected difficulty for later scenario transition
    this.state.context.sessionData.stepData.selectedDifficulty =
      formData.difficulty;
  };

  private handleProgressUpdate = (progressData: {
    measuresProgress: MeasureProgress[];
    timeSpent: number;
  }) => {
    this.state.context.sessionData.progressData.measuresProgress =
      progressData.measuresProgress;
    this.state.context.sessionData.timeSpent += progressData.timeSpent;

    // Update measuresCompleted for backward compatibility
    this.state.context.sessionData.measuresCompleted =
      progressData.measuresProgress.map(
        (measure) => measure.leftHandComplete && measure.rightHandComplete
      );
  };

  private handlePerformanceAttempt = (
    attempt: Omit<PerformanceAttempt, "id" | "timestamp">
  ) => {
    const newAttempt: PerformanceAttempt = {
      ...attempt,
      id: Date.now().toString(),
      timestamp: new Date(),
    };

    this.state.context.sessionData.progressData.performanceAttempts.push(
      newAttempt
    );
  };

  private handleSessionComplete = () => {
    this.state.context.sessionData.progressData.sessionCompleted = true;
    this.state.isActive = false;
  };

  completeStep = (stepId: string, data?: any) => {
    if (data) {
      this.state.context.sessionData.stepData[stepId] = {
        ...this.state.context.sessionData.stepData[stepId],
        ...data,
      };
    }

    this.state.completedSteps.push(stepId);

    // Special handling for setup completion
    if (stepId === "setup_complete") {
      this.transitionToLearningScenario();
    } else {
      this.moveToNextStep();
    }
  };

  private transitionToLearningScenario = () => {
    const difficulty =
      this.state.context.sessionData.stepData.selectedDifficulty || "beginner";

    // Switch to the appropriate learning scenario
    this.state.currentScenario = difficulty;
    this.currentScenarioSteps =
      ENHANCED_PIANO_LEARNING_SCENARIOS[difficulty] ||
      ENHANCED_PIANO_LEARNING_SCENARIOS.beginner;
    this.state.currentStepIndex = 0;
    this.state.context.scenario = difficulty;
    this.state.context.stepId = this.currentScenarioSteps[0].id;
    this.state.context.sessionData.currentStep =
      this.currentScenarioSteps[0].id;

    this.onStateChange(this.state);
  };

  skipStep = (stepId: string) => {
    this.state.skippedSteps.push(stepId);
    this.moveToNextStep();
  };

  private moveToNextStep() {
    let nextIndex = this.state.currentStepIndex + 1;

    // Find next valid step (checking prerequisites)
    while (nextIndex < this.currentScenarioSteps.length) {
      const nextStep = this.currentScenarioSteps[nextIndex];
      if (this.arePrerequisitesMet(nextStep)) {
        this.state.currentStepIndex = nextIndex;
        this.state.context.stepId = nextStep.id;
        this.state.context.sessionData.currentStep = nextStep.id;
        break;
      }
      nextIndex++;
    }

    // If no valid next step, session is complete
    if (nextIndex >= this.currentScenarioSteps.length) {
      this.state.isActive = false;
    }

    this.onStateChange(this.state);
  }

  private arePrerequisitesMet(step: LearningStep): boolean {
    if (!step.prerequisites || step.prerequisites.length === 0) {
      return true;
    }

    return step.prerequisites.every(
      (prereqId) =>
        this.state.completedSteps.includes(prereqId) ||
        this.state.skippedSteps.includes(prereqId)
    );
  }

  getProgress(): { current: number; total: number; percentage: number } {
    const total = this.currentScenarioSteps?.length || 0;
    const current = this.state.currentStepIndex;
    const percentage = total > 0 ? (current / total) * 100 : 0;

    return { current, total, percentage };
  }

  getState(): LearningSystemState {
    return this.state;
  }
}
