import { useDispatch, useSelector } from "react-redux"
import Button from "../../ui/Button"
import { deleteItem } from "./cartSlice"

function Deletebtn({id}) {
    const dispatch = useDispatch()
    return (
        <Button onClick={() => dispatch(deleteItem(id))} type="small">delete</Button>
    )
}

export default Deletebtn
