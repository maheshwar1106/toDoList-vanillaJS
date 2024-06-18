//Getting the input from the frontend
var dataBase=new Array();
var statusReport=new Array();
var dateReport=new Array();
var displayTable="<table ><tr id='tableHead'><td>TaskName<img id='downArrowName' onclick='arrowName()' src='./Downarrow-40168_1280.png'></td><td>Status<img  id='downArrowStatus' onclick='arrowStatus()' src='./Downarrow-40168_1280.png'></td><td >Date<img onclick='arrowDate()' id='downArrowDate'src='./Downarrow-40168_1280.png'></td><td colspan='2'>Action</td></tr>";


displayInput();
// editng values
var inputValue;
var statusValue;
var indexValue;

function getInput(){
    //displayInput();
     
    console.log(input);
    if(document.getElementById("addButton").innerHTML=="Add Item"){
        var checkDuplicate=false;
        var input=document.getElementById("input").value;
        if(input==""){
            return
        }
        dataBase.filter(item=>{
            if(item.toLowerCase()==input.toLowerCase()){
                console.log("Duplicate Record");
                checkDuplicate=true;
            }
        })
       if(validateInput(input) && !checkDuplicate && dropBox() ){
        
        console.log("Valid Input");
        console.log(`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`);
    
        dataBase.push(input);
        statusReport.push(document.getElementById("dropBox").value);
        dateReport.push(`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`)
        
        displayInput()
        document.getElementById("dropBox").value="Status";
       }
       else{
        console.log("Invalid Input");
        var alert=document.getElementById("alert");
        alert.style.display="block";
        document.getElementById("dropBox").value="Status"; 
       }
       document.getElementById("input").value="";
    }else{
        var input=document.getElementById("input").value;
        var statusInput=document.getElementById("dropBox").value;
        if(input==inputValue && statusInput==statusValue){
            return;
        }
        
        // when button is update
        if(validateInput(input)  && dropBox()){
            dataBase=dataBase.filter(item=>item!=dataBase[indexValue]);
            statusReport.splice(indexValue,1);
        
            console.log("Valid Input");
            console.log(`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`);
        
            dataBase.push(input);
            statusReport.push(document.getElementById("dropBox").value);
            dateReport.push(`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`)
          
            
            displayInput()
            document.getElementById("dropBox").value="Status";
           }
           else{
            console.log("Invalid Input");
            var alert=document.getElementById("alert");
            alert.style.display="block";
            document.getElementById("dropBox").value="Status"; 
           }
           document.getElementById("input").value="";


    }   
  
}

//functon for dropBox

function dropBox(){
    var value=document.getElementById("dropBox").value;
    console.log(value);
    if(value=="Pending" || value=="Completed"){
        return true;
    }
    return false; 
}

//Validating the input 
function validateInput(input){
    for(var i=0;i<input.length;i++){
        if((input.charAt(i)>="A" && input.charAt(i)<="Z")||(input.charAt(i)>="a" && input.charAt(i)<="z")){
            //run
        }else{
            return false;
        }
    }
    return true;
}

//Displaying the validated Input

function displayInput(){
    console.log(dataBase);
   
    //displayng no records
    if(dataBase.length==0){
        displayTable+=`<tr id='no-Records'><td colspan='5'>No Records to Display !</td></tr>`

    }else{
        for(let i=0;i<dataBase.length;i++){
            displayTable+=`<tr id='tableRows' ><td id='data${i}'>${dataBase[i]}</td><td id='status${i}'>${statusReport[i]}</td><td id='date${i}'>${dateReport[i]}</td><td id='edit${i}'><button id='editButton${i}' title='Edit'  onclick="editItem(${i})"><img src="./edit-icon-2375785_1280.png" id="editImg" alt="Edit"></button></td><td id='remove${i}'><button id='delButton${i}' title='Delete' onclick="removeItem(${i})"><img id="delImg"src="./bin.png" alt="Delete"></button></td></tr>`
        }
    }
    displayTable+="</table>"
    document.getElementById("displayTable").innerHTML=displayTable
    console.log(displayTable);
    displayTable="<table ><tr id='tableHead'><td>TaskName<img id='downArrowName' onclick='arrowName()' src='./Downarrow-40168_1280.png'></td><td>Status<img  id='downArrowStatus'  onclick='arrowStatus()' src='./Downarrow-40168_1280.png'></td><td >Date<img  id='downArrowDate'  onclick='arrowDate() 'src='./Downarrow-40168_1280.png'></td><td colspan='2'>Action</td></tr>";

}

function removeItem(i){
  dataBase=dataBase.filter(item=>item!=dataBase[i]);
  displayInput();
}   

function editItem(i){
    if(indexValue!=undefined){
    document.getElementById(`data${indexValue}`).style.color="black";
    document.getElementById(`status${indexValue}`).style.color="black";
    document.getElementById(`date${indexValue}`).style.color="black";
    let buttonOld1=document.getElementById(`editButton${indexValue}`).disabled=false;
    //button1.ariaDisabled=true;
    let buttonOld2=document.getElementById(`delButton${indexValue}`).disabled=false;
   // button2.ariaDisabled=true;
    console.log("Is Edit button disabled "+buttonOld1);
    console.log("Is Delete button disabled "+buttonOld2);
    }
    inputValue=dataBase[i];
    statusValue=statusReport[i];
    indexValue=i;

    document.getElementById("input").value=dataBase[i];
    document.getElementById("addButton").innerHTML="Update";
    document.getElementById("dropBox").value=statusReport[i];
    
    document.getElementById(`data${i}`).style.color="red";
    document.getElementById(`status${i}`).style.color="red";
    document.getElementById(`date${i}`).style.color="red";
    let button1=document.getElementById(`editButton${i}`).disabled=true;
    //button1.ariaDisabled=true;
    let button2=document.getElementById(`delButton${i}`).disabled=true;
   // button2.ariaDisabled=true;
    console.log("Is Edit button disabled "+button1);
    console.log("Is Delete button disabled "+button2);
    console.log( inputValue);
    console.log( statusValue);
    console.log( indexValue);
   
}
document.getElementById("addButton").addEventListener("click",()=>{
    document.getElementById("addButton").innerHTML="Add Item";
})

document.getElementById("alert-close").addEventListener("click",()=>{
        var alert=document.getElementById("alert");
       alert.style.display="none";
       displayInput();

});

    //Sorting of Inputs in the table
var tableNameAscSort=false;

function arrowName(){
    if(!tableNameAscSort){
        descInput();
        document.getElementById('downArrowName').setAttribute('src',"./Upwardarrow-147174_1280.png");
        tableNameAscSort=!tableNameAscSort;
    }else{
        ascInput();
        document.getElementById('downArrowName').setAttribute('src',"./Downarrow-40168_1280.png");
        tableNameAscSort=!tableNameAscSort;
    }
}




//Input in decending Order
function descInput(){
    let DescInputArr=new Array();
    for(let i=0;i<dataBase.length;i++){
        DescInputArr[i]=[];
        DescInputArr[i][0]=dataBase[i];
        DescInputArr[i][1]=statusReport[i]; 
        DescInputArr[i][2]=dateReport[i];     
    }
    
    DescInputArr.sort((a,b)=>{
        if(a[0]==b[0]){
            return 0;
        }else{
            return (a[0]<b[0]) ?1:-1;
        }
    })
  

    for(let i=0;i<dataBase.length;i++){
        for(let j=0;j<dataBase.length;j++){
            console.log(DescInputArr[i][j]);
        }
    }

    for(let i=0;i<DescInputArr.length;i++){
       dataBase[i]=DescInputArr[i][0];
       statusReport[i]=DescInputArr[i][1];
       dateReport[i]=DescInputArr[i][2];
    }
    displayInput();
}

//input in ascending order

function ascInput(){
    let AscInputArr=new Array();
    for(let i=0;i<dataBase.length;i++){
        AscInputArr[i]=[];
        AscInputArr[i][0]=dataBase[i];
        AscInputArr[i][1]=statusReport[i]; 
        AscInputArr[i][2]=dateReport[i];     
    }
    
    AscInputArr.sort((a,b)=>{
        if(a[0]==b[0]){
            return 0;
        }else{
            return (a[0]<b[0]) ?-1:1;
        }
    })
  

    for(let i=0;i<dataBase.length;i++){
        for(let j=0;j<dataBase.length;j++){
            console.log(AscInputArr[i][j]);
        }
    }

    for(let i=0;i<AscInputArr.length;i++){
       dataBase[i]=AscInputArr[i][0];
       statusReport[i]=AscInputArr[i][1];
       dateReport[i]=AscInputArr[i][2];
    }
    displayInput();
}

   



//sorting of Status in the table

var statusAscSort=false;

function arrowStatus(){
    if(!statusAscSort){
        descStatus();
        document.getElementById('downArrowStatus').src="./Upwardarrow-147174_1280.png";
        
        statusAscSort=!statusAscSort;
    }else{
        ascStatus();
        document.getElementById('downArrowStatus').src="./Downarrow-40168_1280.png";
       
        statusAscSort=!statusAscSort;
    }
}

//status in descending Order
function descStatus(){
    let DescStatusArr=new Array();
    for(let i=0;i<dataBase.length;i++){
        DescStatusArr[i]=[];
        DescStatusArr[i][0]=dataBase[i];
        DescStatusArr[i][1]=statusReport[i]; 
        DescStatusArr[i][2]=dateReport[i];     
    }
    
    DescStatusArr.sort((a,b)=>{
        if(a[1]==b[1]){
            return 0;
        }else{
            return (a[1]<b[1]) ?1:-1;
        }
    })
  

    for(let i=0;i<dataBase.length;i++){
        for(let j=0;j<dataBase.length;j++){
            console.log(DescStatusArr[i][j]);
        }
    }

    for(let i=0;i<DescStatusArr.length;i++){
       dataBase[i]=DescStatusArr[i][0];
       statusReport[i]=DescStatusArr[i][1];
       dateReport[i]=DescStatusArr[i][2];
    }
    displayInput();
}

//sorting status in Ascending Order
function ascStatus(){
    let AscStatusArr=new Array();
    for(let i=0;i<dataBase.length;i++){
        AscStatusArr[i]=[];
        AscStatusArr[i][0]=dataBase[i];
        AscStatusArr[i][1]=statusReport[i]; 
        AscStatusArr[i][2]=dateReport[i];     
    }
    
    AscStatusArr.sort((a,b)=>{
        if(a[1]==b[1]){
            return 0;
        }else{
            return (a[1]<b[1]) ?-1:1;
        }
    })
  

    for(let i=0;i<dataBase.length;i++){
        for(let j=0;j<dataBase.length;j++){
            console.log(AscStatusArr[i][j]);
        }
    }

    for(let i=0;i<AscStatusArr.length;i++){
       dataBase[i]=AscStatusArr[i][0];
       statusReport[i]=AscStatusArr[i][1];
       dateReport[i]=AscStatusArr[i][2];
    }
    displayInput();
}




//Sorting of Date in the table

var DateAscSort=false;

function arrowDate(){
    if(!DateAscSort){
        descDate();
        document.getElementById('downArrowDate').src="./Upwardarrow-147174_1280.png";
        DateAscSort=!DateAscSort;
    }else{
        document.getElementById('downArrowDate').src="./Downarrow-40168_1280.png";
        DateAscSort=!DateAscSort;
    }
}


//sorting Date in descending order

function descDate(){
    let DescDateArr=new Array();
    for(let i=0;i<dataBase.length;i++){
        DescDateArr[i]=[];
        DescDateArr[i][0]=dataBase[i];
        DescDateArr[i][1]=statusReport[i]; 
        DescDateArr[i][2]=dateReport[i];     
    }
    
    DescDateArr.sort((a,b)=>{
        if(a[2]==b[2]){
            return 0;
        }else{
            return (a[2]<b[2]) ?1:-1;
        }
    })
  

    for(let i=0;i<dataBase.length;i++){
        for(let j=0;j<dataBase.length;j++){
            console.log(DescDateArr[i][j]);
        }
    }

    for(let i=0;i<DescDateArr.length;i++){
       dataBase[i]=DescDateArr[i][0];
       statusReport[i]=DescDateArr[i][1];
       dateReport[i]=DescDateArr[i][2];
    }
    displayInput();
}

//sort status in ascending

function ascDate(){
    let AscDateArr=new Array();
    for(let i=0;i<dataBase.length;i++){
        AscDateArr[i]=[];
        AscDateArr[i][0]=dataBase[i];
        AscDateArr[i][1]=statusReport[i]; 
        AscDateArr[i][2]=dateReport[i];     
    }
    
    AscDateArr.sort((a,b)=>{
        if(a[2]==b[2]){
            return 0;
        }else{
            return (a[2]<b[2]) ?-1:1;
        }
    })
  

    for(let i=0;i<dataBase.length;i++){
        for(let j=0;j<dataBase.length;j++){
            console.log(AscDateArr[i][j]);
        }
    }

    for(let i=0;i<AscDateArr.length;i++){
       dataBase[i]=AscDateArr[i][0];
       statusReport[i]=AscDateArr[i][1];
       dateReport[i]=AscDateArr[i][2];
    }
    displayInput();
}











    



