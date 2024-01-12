
const APIrequest = async(url='', optionsObj= null, errMsg=null) => {
    try{
        const response = await fetch(url, optionsObj);
        // if (!response.ok) {throw Error('Did not recieve expected data');         
        const data = await response.json();
      }
      catch(err){
        errMsg = err.message;
      }
      finally{
        return errMsg
      }
}

export default APIrequest