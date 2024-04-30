import { AbsoluteFill } from "remotion";

export const Text = ({ value }) => {
  return (
    <AbsoluteFill>
      <div style={{ marginBottom : '0px', paddingTop : '1500px' , color : 'gray', fontSize : '100px', zIndex : '200'}}>
        {value}
      </div>
    </AbsoluteFill>
  )
}