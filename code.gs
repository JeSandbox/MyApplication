function doGet() {

  //get data from google sheet
  var content = getSheetData();

  //add the data array into an object
  var contentObject = {GoogleSheetData: content};

  return ContentService.createTextOutput(JSON.stringify(contentObject)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e){
  const body = e.postData.contents;
  const bodyJSON = JSON.parse(body);
  
  //open spreadsheet
  const datasource = SpreadsheetApp.openById("1WgzUpRxbWyDIkkOwZzF3gOKR7FkpKME7oe9qafAjAlw");

  //get sheet Fruits
  const sheet = datasource.getSheetByName("Fruits");

  sheet.appendRow([bodyJSON.item, bodyJSON.price]);
}

function getSheetData() {
 //open spreadsheet
  const datasource = SpreadsheetApp.openById("1WgzUpRxbWyDIkkOwZzF3gOKR7FkpKME7oe9qafAjAlw");

  //get sheet Fruits
  const sheet = datasource.getSheetByName("Fruits");

  //get data range populated in the sheet
  var dataRange = sheet.getDataRange();

  //get data from the sheet Fruits
  var dataList = dataRange.getValues();

  //get the header of each column
  var headerRow = dataList[0];

  //create an empty array to hold spreadsheet data
  var data = [];  
  
  //loop through each row in the spreadsheet
  for (var currentRow = 1; currentRow < dataList.length; currentRow++) {  
    
    //Create an object to hold the data from the current row
    var obj   = {};
   
    //loop through each column in the current row of the spreadshset
    for(var rowColumn=0;rowColumn<headerRow.length;rowColumn++){
      obj[headerRow[rowColumn]]=dataList[currentRow][rowColumn];
    }
    
    //add object into the array
    data.push(obj);
    
  }
 
  return data;
}



