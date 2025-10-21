var siteName = document.getElementById("bookmarkname");
var siteUrl = document.getElementById("bookmarkurl");
var tbody = document.getElementById("tbody");
var links = [];

if (localStorage.getItem('marks')) {
    links = JSON.parse(localStorage.getItem("marks"));
    displayBookmark();
}

function isValidUrl(url) {
    var pattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]{2,}(\/.*)?$/i;
    return pattern.test(url);
}

function creatBookmark() {
    var link = {
        sName: siteName.value,
        sUrl: siteUrl.value
    };

    if(checkWebName(link))return;

    if(!checkWebUrl(link))return;

    links.push(link);

    localStorage.setItem('marks', JSON.stringify(links));

    clearInputs();

    displayBookmark();
}

function checkWebName(link) {
    var isDuplicate = links.some(function (item) {
        return item.sName.toLowerCase() === link.sName.toLowerCase();
    });

    if (isDuplicate) {
        window.alert("This Name Is Already Exist!⚠️");
        return true;
    }
}
function checkWebUrl(link) {
    if (link.sName === '' || link.sUrl === '') {
        window.alert("Please Fill All The Fields ⚠️");
        return true;
    }

    if (!isValidUrl(link.sUrl)) {
        window.alert("❌ The link is invalid! Make sure it is spelled correctly like: https://example.com");
        return false;
    }
}

function clearInputs() {
    siteName.value = '';
    siteUrl.value = '';
}

function deleteWebLink(elementindex) {
    links.splice(elementindex, 1);
    localStorage.setItem('marks', JSON.stringify(links));
    displayBookmark();
}

function visitWeb(elementindex) {
    window.open(links[elementindex].sUrl);
}

function displayBookmark() {
    var bookmark = ``;
    for (var i = 0; i < links.length; i++) {
        bookmark += `
            <tr>
                <td>${i + 1}</td>
                <td>${links[i].sName}</td>
                <td><button onclick="visitWeb(${i})" class="btn btn-success"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
                <td><button onclick="deleteWebLink(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>`;
    }
    tbody.innerHTML = bookmark;
}
