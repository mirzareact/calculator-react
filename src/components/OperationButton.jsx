import {ACTIONS} from "../App"

function OperationButton({ dispatch, operation }) {
    return (
        <button onClick={()=>dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation}})}
            className='col-span-1 h-[50px] w-auto bg-blue-300 m-[1px] rounded-sm outline-none text-2xl hover:bg-blue-400'>{operation}</button>
    )
}

export default OperationButton