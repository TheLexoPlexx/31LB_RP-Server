alt.on("makeVisible", () => {
  document.getElementById("html").style.opacity = "1";
});
alt.on("inventorydata", (arg0) => {
  document.getElementById("interntext").innerHTML = arg0;
});