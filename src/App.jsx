import { useReducer, useState } from 'react'
import DigitButton from './components/Button'
import OperationButton from './components/OperationButton'
import './App.css'

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate"
}

function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state

      if (payload.digit === "." && state.currentOperand.includes(".")) return state
      
      return {
        ...state, currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation
      }
    
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.length == 1) {
        return {
          ...state,
          currentOperand:null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
      
    case ACTIONS.CLEAR:
      return {}
    
    case ACTIONS.EVALUATE:
      if (state.operation == null || state.previousOperand == null || state.currentOperand == null) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,   
        currentOperand: evaluate(state)
      }
  }
}

function evaluate({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)

  if (isNaN(prev) || isNaN(current)) return ""
  
  let computation = ""

  switch (operation) {
    case "+":
      computation= prev+current
      break;
    
    case "-":
      computation= prev-current
      break;
    
    case "*":
      computation= prev*current
      break;
    
    case "/":
      computation= prev/current
      break;
  
  }

  return computation.toString()
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0
})

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")

  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {

  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {})

  return (
    <div className='w-full h-screen bg-gradient-to-r from-indigo-500 to-blue-500 flex justify-center items-center'>
      <div className="w-[300px] bg-slate-500 m-auto rounded-md" >
        <div className="min-h-[100px] bg-green-900 rounded-t-md grid auto-rows-fr">
          <div className='text-right text-white text-xl p-2 max-w-[492px] break-all'>
            {formatOperand(previousOperand)} {operation}
          </div>
          <div className='text-right text-2xl text-white font-bold pr-2 max-w-[492px] break-all'>
            {formatOperand(currentOperand)}
          </div>
        </div>
        <div className='grid grid-cols-4 bg-white'>
          <button onClick={() => dispatch({type: ACTIONS.CLEAR })} className='col-span-2 h-[50px] w-auto bg-blue-300 text-2xl hover:bg-blue-400 m-[1px] rounded-sm'>AC</button>
          <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT })} className='col-span-1 h-[50px] w-auto bg-blue-300 m-[1px] rounded-sm outline-none text-2xl hover:bg-blue-400'>DEL</button>
          <OperationButton dispatch={dispatch} operation="/"/>
          <DigitButton digit="1" dispatch={dispatch}/>
          <DigitButton digit="2" dispatch={dispatch}/>
          <DigitButton digit="3" dispatch={dispatch}/>
          <OperationButton dispatch={dispatch} operation="*"/>
          <DigitButton digit="4" dispatch={dispatch}/>
          <DigitButton digit="5" dispatch={dispatch}/>
          <DigitButton digit="6" dispatch={dispatch}/>
          <OperationButton dispatch={dispatch} operation="+"/>
          <DigitButton digit="7" dispatch={dispatch}/>
          <DigitButton digit="8" dispatch={dispatch}/>
          <DigitButton digit="9" dispatch={dispatch}/>
          <OperationButton dispatch={dispatch} operation="-"/>
          <DigitButton digit="." dispatch={dispatch}/>
          <DigitButton digit="0" dispatch={dispatch}/>
          <button onClick={() => dispatch({type: ACTIONS.EVALUATE })} className='col-span-2 h-[50px] w-auto bg-blue-300 m-[1px] rounded-sm outline-none text-2xl hover:bg-blue-400'>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
