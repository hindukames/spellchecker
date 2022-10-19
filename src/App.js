import React from 'react' 
import './App.css';
import SpellCorrector from './spellCorrector'; 

function App() {
  return (
    <div>
        <SpellCorrector/>
    </div>
  );
}

export default App; 

// textInput.forEach ( word => dataHoldingMap.has(word)? validatedText+="<span>"+ word +"</span>":validatedText+=word );  
//     //console.log(validatedText);  
//     function me (str,tmp1)
//     {
//           return str.replace(/\w+/g, `<span>$&</span>`);  
//     }
//     //handleText(<span>{Text}</span>); 

// console.log(event.target)
//         let start=myArea.selectionStart;
//         let arr = myArea.value.split(" ");
//         let sum = 0    
//         for (let i = 0; i < arr.length; i++) { 
//           sum += arr[i].length + 1  
//           //if (sum > start ) (arr[i]);
//          }