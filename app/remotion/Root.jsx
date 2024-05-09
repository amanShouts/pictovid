// @ts-ignore  

import { Composition } from "remotion";
import { MyComposition } from "./Composition";


export const STILL_DURATION = 30; // 10 frames
export const TRANSITION_DURATION = 20 // transition time, nuber of frames ? 

export const RemotionRoot = () => {

  // const calculateMetadata = () => {

  // }

  // const [handle] = useState(() => delayRender());

  // const fetchData = useCallback(async () => {
  //   try {
  //     setTimeout(() => {
  //       continueRender(handle);
  //     }, 10000)

  //   } catch (err) {
  //     cancelRender(err);
  //   }
  // }, [handle]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  return (
    <>
      <Composition
        id="Empty"
        component={MyComposition}
        durationInFrames={200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          imageBlobs: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJBJPerwiXf7lRhOpprHZDOBnAMaFVxDx6-FEYkB-Mcw&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTsaXv8_LxsgB_qniuQ-lappFUzFo-KwUk5w&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJBJPerwiXf7lRhOpprHZDOBnAMaFVxDx6-FEYkB-Mcw&s'],
          text: 'firstttttttttt'
        }}
        // schema={}
        calculateMetadata={({ props }) => {
          //props.imageBlobs
          const totalTime = (props.imageBlobs.length - 1) * (TRANSITION_DURATION + STILL_DURATION) + (STILL_DURATION)

          return {
            durationInFrames: parseInt(totalTime),
          };
        }}

      />
    </>
  );
};