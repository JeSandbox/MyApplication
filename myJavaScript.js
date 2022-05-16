
//API end point
const myUrl ="https://script.google.com/macros/s/AKfycbx07fcibom2PHCt86jFPtr78vUdmDvIE90DdEbVZzI75uIAzAzm9qEqsbAwoRaj60c2/exec";

function init() {
  
  //fetch request
  fetch(myUrl)
    .then((res)=>{
      return res.json();
    }) //return response object as json
    .then((data)=>{
      createTable(data); //data content we get from the response object
    })
}


function createTable(data) {
  
  //create HTML element table
  const tblFruits = document.createElement('table');
  tblFruits.setAttribute("id","myTable");
  
  //add table header
  addNewCell(tblFruits, "Item","Price");

  //loop each object
  data.GoogleSheetData.forEach((row)=>{

    //add new row
    addNewCell(tblFruits, row.ITEM, row.PRICE);

  });
  //clear div holding the table
  document.getElementById("divFruits").innerHTML = "";

  //add the table into the div element
  document.getElementById("divFruits").append(tblFruits);

  //enable add button
  document.getElementById("btn").enabled = true;
}

function addNewItem() {
  //get the value of text fields
  var newItem = document.getElementById("txtItem").value;
  var newPrice = document.getElementById("txtPrice").value;

  if(newItem && newPrice){
    //disable add button
    document.getElementById("btn").enabled = false;

    fetch(myUrl, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({item:newItem,price:newPrice}) // body data type must match "Content-Type" header
    });

    //set table
    var tblName = document.getElementById("myTable");

    //add row to table
    addNewCell(tblName, newItem, newPrice);
    
    //clear the textbox
    document.getElementById("txtItem").value = "";
    document.getElementById("txtPrice").value = "";

  }
  else {
    alert("Please fill up all fields");
  }

}


function addNewCell(tblName, item1, item2) {
  //add row
  var tblRow = tblName.insertRow();

  //add cells for item and price
  var cell1 = tblRow.insertCell(0);
  var cell2 = tblRow.insertCell(1);

  //set values for cells
  cell1.innerHTML = item1;
  cell2.innerHTML = item2;

  //align the value to the right
  cell2.style.textAlign = "right";
}
