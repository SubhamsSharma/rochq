import { createContext, useContext, useReducer } from "react";

const FavoriteMailContext = createContext(null)
const FavoriteMailDispatchContext = createContext(null)


function favoriteMailReducer(favMails, action){
    switch (action.type) {
        case 'addToFavorite':
            console.log([...favMails, action.id])
            if(favMails.includes(action.id)) return favMails
            return [...favMails, action.id]
            
        default:
            throw new Error('this dispatch method is not supported');
    }
}

export default function FavoriteMailProvider({children}){
    
const [favMails, dispatch ] = useReducer(favoriteMailReducer, [] )

    return (
       <FavoriteMailContext.Provider value={favMails}>
        <FavoriteMailDispatchContext.Provider value={dispatch}>
            {children}
        </FavoriteMailDispatchContext.Provider>
       </FavoriteMailContext.Provider>
    )
}

export function useFavoriteMails(){
    return useContext(FavoriteMailContext)
}

export function useDispatchToFavoriteMails(){
    return useContext(FavoriteMailDispatchContext)
}
