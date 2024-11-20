let searchResultsEl = document.getElementById("searchResults");
let searchInputEl = document.getElementById("searchInput");
let spinnerEl = document.getElementById("spinner");

function createAppendSearchResult(result) {
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");


    let {
        link,
        title,
        description
    } = result;
    let titleEl = document.createElement("a");
    titleEl.href = link;
    titleEl.textContent = title;
    titleEl.target = "_blank";
    titleEl.classList.add("result-title");
    resultItemEl.appendChild(titleEl);


    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);


    let urlEl = document.createElement("a");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);


    let urlBreakEl = document.createElement("br");
    resultItemEl.appendChild(urlBreakEl);


    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultItemEl.appendChild(descriptionEl);


    searchResultsEl.appendChild(resultItemEl);
}


function displayResult(searchResult) {
    for (let result of searchResult) {
        spinnerEl.classList.add("d-none");
        createAppendSearchResult(result);
    }
}


function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let option = {
            method: "GET"
        };
        fetch(url, option)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResult(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);