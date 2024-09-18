import {memo, useCallback} from "react"



const ToggleSounds = memo(function ToggleSounds({ allowSound, setAllowSound }) {
  const handleSound = useCallback( function handleSound(){
    setAllowSound((allow) => !allow)
  }, [setAllowSound])
  return (
    <button
      className="btn-sound"
      onClick={handleSound}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
})

export default ToggleSounds;
