alt.on("makeVisible", () => {
  document.getElementById("html").style.opacity = "1";
});
alt.on("interntext", (arg0) => {
  document.getElementById("interntext").innerHTML = arg0;
});
alt.on("externtext", (arg1) => {
  document.getElementById("externtext").innerHTML = arg1;
});