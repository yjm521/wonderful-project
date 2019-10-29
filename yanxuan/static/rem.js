function rem () {
  document.documentElement.style.fontSize = document.documentElement.clientWidth / 5.6 + 'px'
}
rem()
window.onresize = rem
