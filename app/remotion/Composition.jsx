import { Sequence, Img, AbsoluteFill } from "remotion";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { slide, } from "@remotion/transitions/slide";
import { STILL_DURATION, TRANSITION_DURATION } from "./components/MyPlayer";
import { Text } from "./components/Text";

export const MyComposition = ({ imageBlobs, text }) => {
  return (<>
    <AbsoluteFill style={{ backgroundColor: 'white' }}
      className="p-6 border-[10px] border-slate-600"
    >
      <Sequence durationInFrames={Infinity}>
        <AbsoluteFill>
          <p style={{ zIndex: 10, top: '20px', justifyContent: "center", alignItems: "center", textAlign: "center" }}
            className="bg-slate-500 text-slate-100 text-8xl mt-32 font-normal rounded-xl w-[80%] mx-auto"
          > Stunning planets </p>
        </AbsoluteFill>
      </Sequence>
      <TransitionSeries>
        {imageBlobs?.map((blobUrl, index) => (
          <>
            {index == 0 ? '' :
              <TransitionSeries.Transition
                presentation={slide()}
                timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
              />}
            <TransitionSeries.Sequence
              durationInFrames={index == 0 ? (STILL_DURATION + TRANSITION_DURATION) : (STILL_DURATION + 2 * TRANSITION_DURATION)} key={index}
            >
              <AbsoluteFill>
                <Img alt={"cool"} src={blobUrl}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', zIndex: '1' }}
                />
              </AbsoluteFill>
              <AbsoluteFill>
                <Text value={`${index + 1} ${text}`} />
              </AbsoluteFill>
            </TransitionSeries.Sequence>
          </>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  </>)
}


