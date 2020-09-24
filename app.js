'use strict';

// put your own value below!
// function generateCampground(responseJson){
//     return `
//     <div class="group">
//     <div class="item"><p>${responseJson.fullName}</p></div>
//     <div class="item">${responseJson.description}</div>
//     <div class="item">${responseJson.url}</div>
//     </div> 
//     `
// }

const apiKey = 'OjzVc0ZN83etOfZtFUZpeK4DmpiPFGT6CUrEJVim'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function getParkData(query, maxResults=10) {
  const params = {
    q: query,
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString + '&api_key=' + apiKey;

  fetch(url)
      .then(response => response.json())
      .then(responseJson => 
        displayParkData(responseJson))
      .catch(error => alert('Something went wrong. Try again later.'));
      console.log(query + " is the username you are searching for.");
  }


function displayParkData(responseJson){
    console.log(responseJson);
    let endResult = [];
for (let i=0; i<responseJson.data.length; i++) {
    //endResult.push(`<p>${responseJson.data[i].fullName}</p>`);
    endResult.push(`<div class=group>
    <div class="item">
    <h1>${responseJson.data[i].fullName}</h1>
    </div>
    <div class="item">
    <h3>${responseJson.data[i].description}</h3>
    </div>
    <div class ="item">
    <h3><a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a></h3>
    </div>
    </div>`)
    $('.js-end-data').html(endResult);
    //alert(endResult);
    $('.js-end-data').removeClass('hidden');
    //console.log(responseJson[i]);
}
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParkData(searchTerm, maxResults);
  });
}

$(watchForm);