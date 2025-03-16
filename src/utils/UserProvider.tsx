import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

// Helpers to get date strings in YYYY-MM-DD format
const getTodayDate = (): string => new Date().toISOString().split("T")[0];
const getYesterdayDate = (): string => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
};

// Type for a challenge attempt
export interface Challenge {
  id: string;
  title: string;
  description?: string;
  date?: string;
  level?: number;
}

// Type for challenge levels
export interface ChallengeLevel {
  level: number;
  title: string;
  description: string;
  progress: number; // percentage progress in this level
}

// Type for an exercise session history item
export interface ExerciseHistoryItem {
  date: string;
  score: number;
  level: number;
  rounds: number;
}

// User state type
interface User {
  name: string;
  challenges: Challenge[];
  streak: number;
  lastChallengeDate: string | null;
  challengeHistory: string[]; // dates when a challenge was completed
  timeSpent: number; // minutes practiced today
  currentLevel: number;
  notation: "anglo" | "solfege";
  exerciseHistory: ExerciseHistoryItem[];
}

// Context type – includes functions to update profile, challenge, and gamification data
interface UserContextType {
  user: User;
  updateProfileName: (newName: string) => void;
  addChallenge: (challenge: Challenge) => void;
  updateTimeSpent: (minutes: number) => void;
  updateCurrentLevel: (level: number) => void;
  toggleNotation: () => void;
  recordExerciseSession: (score: number, rounds: number) => void;
  dailyProgress: number;
  chartData: any;
  chartOptions: any;
  challengeLevels: ChallengeLevel[];
  updateChallengeProgress: (level: number, progress: number) => void;
}

const defaultUser: User = {
  name: "Guest",
  challenges: [],
  streak: 0,
  lastChallengeDate: null,
  challengeHistory: [],
  timeSpent: 0,
  currentLevel: 1,
  notation: "anglo",
  exerciseHistory: [],
};

const defaultChallengeLevels: ChallengeLevel[] = [
  {
    level: 1,
    title: "Single Note Mastery",
    description: "Play one note correctly.",
    progress: 0,
  },
  {
    level: 2,
    title: "Double Note Challenge",
    description: "Play two notes in sequence correctly.",
    progress: 0,
  },
  {
    level: 3,
    title: "Triple Note Challenge",
    description: "Play three notes in sequence correctly.",
    progress: 0,
  },
  // More levels can be added here…
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem("user-onaipiano");
    return saved ? JSON.parse(saved) : defaultUser;
  });
  const [challengeLevels, setChallengeLevels] = useState<ChallengeLevel[]>(
    defaultChallengeLevels
  );

  useEffect(() => {
    localStorage.setItem("user-onaipiano", JSON.stringify(user));
  }, [user]);

  const updateProfileName = (newName: string) => {
    setUser((prev) => ({ ...prev, name: newName }));
  };

  const addChallenge = (challenge: Challenge) => {
    const today = getTodayDate();
    setUser((prev) => {
      const alreadyDone = (prev.challengeHistory || []).includes(today);
      let newStreak = prev.streak;
      let newHistory = [...prev.challengeHistory];
      if (!alreadyDone) {
        newStreak =
          prev.lastChallengeDate === getYesterdayDate() ? prev.streak + 1 : 1;
        newHistory.push(today);
      }
      return {
        ...prev,
        challenges: [...prev.challenges, { ...challenge, date: today }],
        streak: newStreak,
        lastChallengeDate: today,
        challengeHistory: newHistory,
      };
    });
  };

  const updateTimeSpent = (minutes: number) => {
    const today = getTodayDate();
    setUser((prev) => {
      if (prev.lastChallengeDate !== today) {
        return { ...prev, timeSpent: minutes, lastChallengeDate: today };
      } else {
        return { ...prev, timeSpent: prev.timeSpent + minutes };
      }
    });
  };

  const updateCurrentLevel = (level: number) => {
    setUser((prev) => ({ ...prev, currentLevel: level }));
  };

  const toggleNotation = () => {
    setUser((prev) => ({
      ...prev,
      notation: prev.notation === "anglo" ? "solfege" : "anglo",
    }));
  };

  const recordExerciseSession = (score: number, rounds: number) => {
    const newSession = {
      date: getTodayDate(),
      score,
      level: user.currentLevel,
      rounds,
    };
    setUser((prev) => ({
      ...prev,
      exerciseHistory: [...prev.exerciseHistory, newSession],
    }));
  };

  const updateChallengeProgress = (level: number, progress: number) => {
    setChallengeLevels((prev) =>
      prev.map((l) => (l.level === level ? { ...l, progress } : l))
    );
  };

  // Daily goal in minutes; progress is computed accordingly.
  const dailyGoal = 30;
  const dailyProgress = Math.min((user.timeSpent / dailyGoal) * 100, 100);

  const chartData = {
    datasets: [
      {
        data: [dailyProgress, 100 - dailyProgress],
        backgroundColor: ["#1a5da6", "#f0f0f0"],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    cutout: "80%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
  };

  return (
    <UserContext.Provider
      value={{
        user,
        updateProfileName,
        addChallenge,
        updateTimeSpent,
        updateCurrentLevel,
        toggleNotation,
        recordExerciseSession,
        dailyProgress,
        chartData,
        chartOptions,
        challengeLevels,
        updateChallengeProgress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
