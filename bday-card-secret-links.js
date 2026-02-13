if (page == "colin")
  localStorage.setItem("colin", true)
if (page == "caden")
  localStorage.setItem("caden", true)

if (localStorage.getItem("colin") && localStorage.getItem("caden")) {
  document.getElementById("text").innerText = "Both links discovered!"
  document.getElementById("link").style.display = "inline"
}