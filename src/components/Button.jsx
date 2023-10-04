import "../App.css"
import {ACTIONS} from "../App"

function DigitButton({ dispatch, digit}) {
    return (
        <button onClick={()=>dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit}})} className='col-span-1 h-[50px] w-auto bg-blue-300 m-[1px] rounded-sm outline-none text-2xl hover:bg-blue-400'>{digit}</button>
    )
}

export default DigitButton