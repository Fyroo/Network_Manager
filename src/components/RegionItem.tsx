import { Regionsboard } from './database';
const RegionItem=() =>{
  return (

    <div id='region-item'>
        {item(Regionsboard)}
    </div>
  )
}
function item(data:any){
    const NamesList = () => (
        <div>
          <ul>{data.map((element:any,index:any) =>(
             <div className='flex' key={index}>
                   <div className='info'>
                       <button className='region-name'>{element.name}</button>
                          <span className='region-ip'> {element.ip}</span>
                     </div>
                </div>))}
            </ul>
        
        </div>
       
      );
      console.log(Array.isArray(data))
      
    return(
            <div>
               <NamesList/>
                </div>
        // <>
        // {
        //     data.map((element, index) =>(
        //         <div className='flex' key={index}>
        //         <div className='info'>
        //             <h3 className='region-name'>{element.name}</h3>
        //             <span className='region-ip'> {element.ip}</span>
        //         </div>
        //     </div>
        //     ))
        //     }
        // </>
    )
}
export default RegionItem