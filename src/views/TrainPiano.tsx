import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useSpring, useSpringRef, animated } from "@react-spring/web";
import { AwesomeButton } from "react-awesome-button";
// import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.css";
import Select from "react-select";

import "../index.css";
import {
  allPieces,
  frenchLetters,
  letters,
  optionsPieces,
  sizeOfStepNum,
  sizeOfStepPx,
  startPosition,
  totalOfSteps,
} from "../data/constantsPiano";

const TrainPiano = () => {
  const [startState, setStartState] = useState<boolean>(true);
  const [pauseState, setPauseState] = useState<boolean>(true);

  const [musicalPiece, setMusicalPiece] = useState<any | null>(null);

  const [numberOfLines, setNumberOfLines] = useState<number>(0);

  const [isCleared, clearNotes] = useState<boolean>(false);

  const [props, api] = useSpring(
    () => ({
      from: { y: -(sizeOfStepNum * totalOfSteps) },
    }),
    []
  );

  const renderContentFallingNotes = useMemo(() => {
    console.log("render the animated element");
    console.log("musicalPiece", musicalPiece);
    console.log("allPieces", allPieces[musicalPiece?.value ?? ""]);
    if (
      !isCleared &&
      props &&
      api &&
      musicalPiece?.value &&
      allPieces[musicalPiece.value]?.steps
    ) {
      setNumberOfLines(allPieces[musicalPiece.value].steps.length);
      return (
        <animated.div
          style={{
            ...props,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            className="falling-notes-board"
            style={{ height: `${sizeOfStepNum * totalOfSteps}px` }}
          >
            {musicalPiece?.value &&
              allPieces[musicalPiece.value].steps.map(
                (line: Note[][], index: number) => {
                  const allNotes = line.flat();
                  return (
                    <div
                      name={"line" + index}
                      id={"line" + index}
                      style={{
                        height: sizeOfStepPx,
                      }}
                      key={"line" + index}
                      className="falling-white-line"
                    >
                      {allNotes.map((note: Note) => {
                        if (note.name.includes("#")) return null;
                        return (
                          <div
                            className="falling-white-note"
                            style={{
                              height: sizeOfStepPx,
                              border: note.isSilent
                                ? "none"
                                : "solid 1px black",
                              borderTop: "none",
                              borderBottom: "none",
                              backgroundColor: note.isSilent
                                ? "transparent"
                                : note.color,
                            }}
                            id={
                              (note.isSilent ? "silent" : "falling") +
                              "-" +
                              index +
                              "-" +
                              note.name +
                              "-" +
                              note.sectionNumber
                            }
                            key={Math.random()}
                          >
                            {note.isSilent ? "" : note.name}
                          </div>
                        );
                      })}
                    </div>
                  );
                }
              )}
          </div>
        </animated.div>
      );
    }
    return (
      <div
        className="falling-notes-board"
        style={{ height: `${sizeOfStepNum * totalOfSteps}px` }}
      />
    );
  }, [musicalPiece, api, isCleared]);

  const playLineCallback = useCallback(
    (lineIndex: number) => {
      if (lineIndex >= numberOfLines) {
        return;
      }

      const playableNotes: { note: string; section: number }[] = [];
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

      // Highlight the keys being played
      playableNotes.forEach(({ note, section }) => {
        const keyElement = document.getElementById(`key${note}${section}`);
        console.log("keyElement is", keyElement);
        if (keyElement) {
          keyElement.style.backgroundColor = "blue";
        }
      });

      // Animate the falling notes
      api.start({
        from: { y: 0 },
        y: 110,
        config: { duration: 1000 },
        onRest: () => {
          // Reset key colors
          playableNotes.forEach(({ note, section }) => {
            const keyElement = document.getElementById(`key${note}${section}`);
            if (keyElement) {
              keyElement.style.backgroundColor = note.includes("#")
                ? "black"
                : "white";
            }
          });

          // Remove the played line
          const lineNode = document.getElementById(`line${lineIndex}`);
          if (lineNode) {
            lineNode.remove();
          }

          // Play the next line
          playLineCallback(lineIndex + 1);
        },
      });
    },
    [api, numberOfLines]
  );

  const playButton = useCallback(() => {
    setStartState(!startState);
    if (startState) {
      clearNotes(false);
      // Animate the falling notes
      api.start({
        from: { y: -(sizeOfStepNum * totalOfSteps) },
        y: 0,
        config: { duration: 5000 },
        onRest: () => {
          // play now on rest
          playLineCallback(0);
        },
      });
    } else {
      console.log("Reset");
      clearNotes(true);
      setPauseState(true);
      api.resume();
    }
  }, [playLineCallback, api, setStartState, startState]);

  return (
    <>
      {startState && (
        <div
          className="title-container"
          style={{
            background: "linear-gradient(0deg, #d1fdff, #fff7e5, #d1fdff)",
          }}
        >
          <div className="overlay"></div>
          <div className="text">
            <div className="wrapper">
              <div id="L" className="letter">
                L
              </div>
              <div className="shadow">L</div>
            </div>
            <div className="wrapper">
              <div id="O" className="letter">
                O
              </div>
              <div className="shadow">O</div>
            </div>
            <div className="wrapper">
              <div id="V" className="letter">
                V
              </div>
              <div className="shadow">V</div>
            </div>
            <div className="wrapper">
              <div id="E" className="letter">
                E
              </div>
              <div className="shadow">E</div>
            </div>
            <div className="wrapper">
              <div id="♥" className="letter">
                ♥
              </div>
              <div className="shadow">♥</div>
            </div>
            <div className="wrapper">
              <div id="P" className="letter">
                P
              </div>
              <div className="shadow">P</div>
            </div>
            <div className="wrapper">
              <div id="I" className="letter">
                I
              </div>
              <div className="shadow">I</div>
            </div>
            <div className="wrapper">
              <div id="A" className="letter">
                A
              </div>
              <div className="shadow">A</div>
            </div>
            <div className="wrapper">
              <div id="N" className="letter">
                N
              </div>
              <div className="shadow">N</div>
            </div>
            <div className="wrapper">
              <div id="O" className="letter">
                O
              </div>
              <div className="shadow">O</div>
            </div>
          </div>
        </div>
      )}
      <div className="paper-piano">
        <div className="actions-container">
          <div className="select-container">
            <Select
              value={musicalPiece}
              onChange={(newValue) => {
                setMusicalPiece(newValue);
              }}
              placeholder="Choose a musical Piece.."
              options={optionsPieces}
            />
          </div>
          <div className="buttons-container">
            {musicalPiece && (
              <>
                <AwesomeButton type="primary" onPress={playButton}>
                  {startState ? "Start Playing" : "Reset Playing"}
                </AwesomeButton>
                {!startState && (
                  <AwesomeButton
                    type="primary"
                    onPress={() => {
                      setPauseState(!pauseState);
                      if (pauseState) {
                        api.pause();
                      } else {
                        api.resume();
                      }
                    }}
                  >
                    {pauseState ? "Pause Playing" : "Resume Playing"}
                  </AwesomeButton>
                )}
              </>
            )}
          </div>
        </div>

        <div className="studio">
          <div>{renderContentFallingNotes}</div>
          <div className="keyboard">
            <div className="keyboard-whites">
              {new Array(7).fill("@").map((_, index) => (
                <React.Fragment key={"white" + index}>
                  {letters.map((letter) => (
                    <React.Fragment key={letter}>
                      {letter.includes("#") ? null : (
                        <div
                          id={"key" + letter + (index + 1)}
                          className="white-note"
                        ></div>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div className="keyboard-blackes">
              {new Array(7).fill("@").map((_, index) => (
                <React.Fragment key={"black" + index}>
                  {letters.map((letter) => (
                    <React.Fragment key={letter}>
                      {letter.includes("#") ? (
                        <div
                          id={"key" + letter + (index + 1)}
                          className="black-note"
                          style={{
                            height: "55px",
                            marginRight: ["a#", "d#"].includes(letter)
                              ? "27px"
                              : "0",
                          }}
                        ></div>
                      ) : (
                        <></>
                      )}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainPiano;
