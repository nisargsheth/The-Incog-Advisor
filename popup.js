chrome.tabs.query(
    { active: true, currentWindow: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
    function(tabs) {
      const { id: tabId } = tabs[0].url;
      let code = `document.cookie`;
      // http://infoheap.com/chrome-extension-tutorial-access-dom/
      chrome.tabs.executeScript(tabId, { code }, function (result) {
        // result has the return value from `code`
        const url = chrome.runtime.getURL('files/cookie.json');
        fetch(url)
        .then(response => response.json())
        .then(data =>{

          var cookies = String(result).split(";");

          table_html = '<thead> <tr> <th scope="col">#</th> <th scope="col">Cookie</th> <th scope="col">Controller</th> <th scope="col">Description</th> </tr> </thead> <tbody>'

          // alert(table_html);


          cookie_name = String(cookies[0].split("=")[0]);
            try {
              cookie_controller = data[cookie_name]["Data Controller"];
              cookie_description = data[cookie_name]["Description"];
              table_html += '<tr> <th scope="row"> ' + String(0) + ' </th>' + '<td> '+cookie_name+' </td>' + ' <td> '+cookie_controller+' </td> ' + '<td> '+cookie_description+' </td>' + ' </tr>';
            }
            catch(err) {
              table_html += '<tr> <th scope="row"> ' + String(0) + ' </th>' + ' <td> '+cookie_name+' </td> ' + ' <td> '+' No info'+' </td> ' + ' <td> '+' no info '+' </td> ' + ' </tr> ';
            }




          for(i=1; i<cookies.length; i++){
            cookie_name = String(cookies[i].split("=")[0]).substring(1);
            // alert(cookie_name + " " + cookie_controller + " " + cookie_description);
            try {
              cookie_controller = data[cookie_name]["Data Controller"];
              cookie_description = data[cookie_name]["Description"];
              table_html += '<tr> <th scope="row"> ' + String(i) + ' </th>' + '<td> '+cookie_name+' </td>' + ' <td> '+cookie_controller+' </td> ' + '<td> '+cookie_description+' </td>' + ' </tr>';
            }
            catch(err) {
              table_html += '<tr> <th scope="row"> ' + String(i) + ' </th>' + ' <td> '+cookie_name+' </td> ' + ' <td> '+' No info'+' </td> ' + ' <td> '+' no info '+' </td> ' + ' </tr> ';
            }
          }
          table_html += '</tbody>';
          // alert(table_html);
          document.getElementById("mytable").innerHTML += table_html;
        });
        document.getElementById("cookieButton").addEventListener('click',() => {
            document.getElementById("cookies").innerHTML = result;
        });
      });

    }
  );






  ///////////////////////////////////////////////////////////////////////////////////////////////
  // alert("hi"););

// var db = NaN;
// const url = chrome.runtime.getURL('files/cookie.json');
// // alert(url);
// fetch(url)
//   .then(response => response.json())
//   .then(data => db = data);
// alert(String(db))
// chrome.tabs.query(
//     { active: true, currentWindow: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
//     function(tabs) {
//       const { id: tabId } = tabs[0].url;
//       let code = `document.cookie`;
//       // http://infoheap.com/chrome-extension-tutorial-access-dom/
//       chrome.tabs.executeScript(tabId, { code }, function (result) {
//         // result has the return value from `code`
//         // alert(String(result).split(";")[0].split("=")[0]);
//         var cookies = String(result).split(";");

//         for(i=0; i<cookies.length; i++){
//           // alert(cookies[i].split("=")[0]);
//           // alert(db[cookies[i].split("=")[0]]);
//         }

//         document.getElementById("cookieButton").addEventListener('click',() => {
//             document.getElementById("cookies").innerHTML = result;
//         });
//       });

//     }
//   );