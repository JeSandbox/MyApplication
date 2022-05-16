
//API end point
const myUrl ="https://script.google.com/macros/s/AKfycbx07fcibom2PHCt86jFPtr78vUdmDvIE90DdEbVZzI75uIAzAzm9qEqsbAwoRaj60c2/exec";

function init() {
  console.log("ready");
  //fetch request
  fetch(myUrl)
    .then((res)=> {return res.json()}) //return response object as json
    .then((data)=>{
      createTable(data); //data content we get from the response object
    })
}


function createTable(data) {
  console.log(data.GoogleSheetData);
  //create HTML element table
  const tblFruits = document.createElement('table');

  //add row
  var tblRow = tblFruits.insertRow();

  //add cells for item and price
  var cell1 = tblRow.insertCell(0);
  var cell2 = tblRow.insertCell(1);

  //set values for cells
  cell1.innerHTML = "Item";
  cell2.innerHTML = "Price";

  //align the value to the right
  cell2.style.textAlign = "right";

  //loop each object
  data.GoogleSheetData.forEach((row)=>{

    tblRow = tblFruits.insertRow();

    cell1 = tblRow.insertCell(0);
    cell2 = tblRow.insertCell(1);

    cell1.innerHTML = row.ITEM;
    cell2.innerHTML = row.PRICE;
    cell2.style.textAlign = "right";
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

    //clear the textbox
    document.getElementById("txtItem").value = "";
    document.getElementById("txtPrice").value = "";

    //load table again
    init();
  }
  else {
    alert("Please fill up all fields");
  }

}
