import btn from '../assets/PortButton.svg'
import btnActive from '../assets/PortButtonActive.svg'
export default function PortIcon({isActive = false}) {
  return (
        <img src={isActive ? btnActive : btn} style={{width: "100%",aspectRatio:1,height:"auto"}}/>
  )
}
