import { createContext, useContext, useReducer } from "react";

const ReadMailContext = createContext(null)
const ReadMailDispatchContext = createContext(null)


function readMailReducer(readMails, action){
    switch (action.type) {
        case 'addToRead':
            console.log([...readMails, action.id])
            if(readMails.includes(action.id)) return [...readMails]
            return [...readMails, action.id]
            
        default:
            throw new Error('this dispatch method is not supported');
    }
}

export default function ReadMailProvider({children}){
    
const [readMails, dispatch ] = useReducer(readMailReducer, [] )

    return (
       <ReadMailContext.Provider value={readMails}>
        <ReadMailDispatchContext.Provider value={dispatch}>
            {children}
        </ReadMailDispatchContext.Provider>
       </ReadMailContext.Provider>
    )
}

export function useReadMails(){
    return useContext(ReadMailContext)
}

export function useDispatchToReadMails(){
    return useContext(ReadMailDispatchContext)
}
