import { useSelector } from "react-redux"

function Username() {
    const Username = useSelector(store => store.User.userName)
    return (
        <div className="hidden font-semibold text-sm md:block">
            {Username}
        </div>
    )
}

export default Username
