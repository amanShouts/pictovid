import { Player } from "@remotion/player";
import { MyComposition } from "../Composition";
import { STILL_DURATION, TRANSITION_DURATION } from "../Root";

const VIDEO_PLAYER_SIZE_FACTOR = 4; 

const MyPlayer = ({ imageBlobs, text }) => {
  return (
    <Player
      component={MyComposition}
      inputProps={{ text: "World", imageBlobs: imageBlobs, }}
      durationInFrames={(imageBlobs.length - 1) * (TRANSITION_DURATION + STILL_DURATION) + (STILL_DURATION)} // first image + all other images
      compositionWidth={1080}
      compositionHeight={1920}
      fps={30}
      style={{
        width: parseInt(1080/VIDEO_PLAYER_SIZE_FACTOR),
        height: parseInt(1920/VIDEO_PLAYER_SIZE_FACTOR),
        margin : '30px auto'
      }}
      controls
      className="rounded"
      // frames
    />
  );
};

export default MyPlayer;