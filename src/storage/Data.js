const data= {
    setData: (i,value) => {
        localStorage.setItem(i, JSON.stringify(value));
    },
    setValue: (i,value) => {
        localStorage.setItem(i,JSON.stringify(value));
    },
    getData: (i)=>{
        if(localStorage.getItem(i)===false){
            console.log('--item null--');
            return null;
        }
        
        try{
            return JSON.parse(localStorage.getItem(i));
        }catch(e){
            console.log('--error--', e.message);
        }

    },
    deleteData:(i) => {
        localStorage.removeItem(i);
        console.log('--item removed--');

    },
    deleteAll:()=>{
        localStorage.clear();
        console.log('--delete all--');
    }
    
};

export default data;