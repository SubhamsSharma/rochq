import { createContext, useContext, useReducer, useEffect} from "react";

const ReadMailContext = createContext(null)
const ReadMailDispatchContext = createContext(null)


function readMailReducer(readMails, action){
    switch (action.type) {
        case 'addToRead':
            
            if(readMails.includes(action.id)) return [...readMails]
            return [...readMails, action.id]
            
        default:
            throw new Error('this dispatch method is not supported');
    }
}

const initializer = (initialValue = initialState) => (
    JSON.parse(localStorage.getItem("localReadMails")) || initialValue
)

export default function ReadMailProvider({children}){
    
const [readMails, dispatch ] = useReducer(readMailReducer, [], initializer )

useEffect(() => {
    localStorage.setItem("localReadMails", JSON.stringify(readMails))
  }, [readMails])
  

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
