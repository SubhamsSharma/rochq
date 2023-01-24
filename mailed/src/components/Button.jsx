export default function Button({variant, onClick}){
    return(
        <button 
          onClick={onClick} 
          className='px-1 py-0.5 rounded-lg focus:bg-filterButtonColor text-lg focus:text-black'
        >
          {variant}
        </button>
    )
}