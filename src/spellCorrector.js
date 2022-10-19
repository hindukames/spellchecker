import axios from 'axios';
import $ from 'jquery';
import React, { useState,useRef,useEffect,useCallback } from 'react'   

var dataHoldingMap= new Map(); //To hold my api responses 
// My SpellChecker Component goes here....
function SpellCorrector() {   
 

    const [text,setText] = useState("");  // To get dynamic input from my textarea
    const textarearef = useRef(null); // To refer to my Textarea to enable contextMenu
    const [list,setList] = useState([]); //To have list of suggestions
    const [x,setX] = useState(0); // To have the list element at my selected cursor position
    const [y,setY] = useState(0);
    const [show, setShow] = useState(false); // hide menu when user clicks outside anywhere other than list
  

    // api call for the spellcheck
    const validateText= async ()=>{  
       
      await axios.get('https://api.textgears.com/spelling', { 
        params: {
          key: 'eBoHtDzWxGLBwqqx',
          text:text,
          language:"en-GB"
        }  
      }).then((response)=> response.data.response.errors).then(data=> data.forEach( word => dataHoldingMap.set(word.bad,word.better)));
      highlight(); // to highlight the misspelled words
      

}  

//To highlight my misspelled words
    function highlight() {     
  
      let inputText= $( "div.textarea" ).text().trim();
      let iterator="";
      let  validatedText="";

      for(let i=0;i<inputText.length;i++) { 
      
        if (inputText.charCodeAt(i)==160 || inputText.charCodeAt(i)==32 ||(i==inputText.length-1 && iterator!="")) { 
          validatedText+=" ";
          if((i==inputText.length-1 && iterator!="")){iterator+=inputText[i]}; 
          if (iterator !="" && dataHoldingMap.has(iterator)) validatedText+=`<span class="highlight">${iterator}</span>`;
          else validatedText+=iterator;
          iterator="";}    // to prevent &nbsp
        else {iterator+=inputText[i]; }
        
      }

      document.getElementById("textarea").innerHTML =validatedText;
    
}

   


    // To have suggestions on the Right Click 
    const handler = useCallback(
      (event) => {
        event.preventDefault();
        if( event.path.length==9) // to have suggestions contextMenu only for the misspelled words 
        { 
          setX(event.clientX); setY(event.clientY);
          setShow(true);
           let selectedText= event.path[0].innerHTML;  
           const handleListForSelection =(e)=>{ if( e.path[0].classList=="li" && (event.path[0].innerText==selectedText)){ event.path[0].innerText= e.path[0].innerText; event.path[0].classList.remove('highlight'); }}
           // Displaying the best  options
           let suggestions = dataHoldingMap.get(selectedText); 
           let tempArr=[];
           for(let i=0; i<suggestions?.length;i++)  tempArr.push(suggestions[i]);
           setList(tempArr);
           document.addEventListener("click",handleListForSelection) // To get the selected word from the suggestion list
        } 
      },
      [setX,setY]
    );   
    
  const handleClick = useCallback(() => (show ? setShow(false) : null), [show]); // To toggle my context menu on the click
  const handleInput =(e)=> { setText(e.target.innerText);} 

    useEffect(() => {
          
      // To display my suggestions on a right Click;
        const myArea = textarearef.current;  
        document.addEventListener("click", handleClick);
        myArea.addEventListener("contextmenu", handler);
        return () => {
          myArea.removeEventListener("contextmenu",handler);
          document.removeEventListener("click", handleClick);
        };
      }, [x,y,show]);


     // Used a contenteditablediv, faced challenge in setting the cursor in the editable div, Hence introduced a button to validate
     // text rather than a onChange event.
    return ( 
    <div className="container"> 
        <h2>Spell Checker</h2>
        <p><b> Please type your message below to get them spell-corrected </b></p>
        <div id="textarea" className="textarea"  onInput={e=>handleInput(e)} ref={textarearef} spellCheck="false" contentEditable="true" suppressContentEditableWarning="true"  placeholder= "Type your Message here..." > </div> 
        <button className="validateButton" onClick={()=>validateText() } >Submit for Validation</button>
    
        <ul id ="context" className="contextmenu"  
          style={
            { position:"absolute",
              top : y-15+"px",
              visibility: show ? 'visible' : 'hidden',
           left: x+"px" }}
          
        >
           {list.length > 0 && list.map((item) => <li className="li" key={item} >{item} </li>)}</ul> 
    </div>);

} 
export default SpellCorrector;