alt.on("makeVisible", () => {
    document.getElementById("html").style.opacity = "1";
});
window.addEventListener("load", () => {
    let invData = JSON.parse(decodeURIComponent(window.location.search.split("=")[1]));
    document.getElementById("interntext").innerHTML = JSON.stringify(invData.int);
    document.getElementById("externtext").innerHTML = JSON.stringify(invData.ext);
    console.log(invData);
});
