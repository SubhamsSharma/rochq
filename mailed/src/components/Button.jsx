export default function Button({variant, onClick}){
    return(
        <button 
          onClick={onClick} 
          className='bg-filterButtonColor p-1 rounded-md focus:bg-yellow-200 focus:text-black'
        >
          {variant}
        </button>
    )
}