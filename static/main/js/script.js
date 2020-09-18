let cce = getCookie('cities')
removeButtons = document.querySelectorAll(".data-container")
removeButtons.forEach(element=>{
    element.addEventListener('click', event=>{
        let dataContainer = event.target.closest('.data-container')
        let cityName = dataContainer.dataset.city
        cce = cce.replace(' ' + cityName, '')
        document.cookie = 'cities=' + cce
        console.log(cce)
        dataContainer.parentNode.removeChild(dataContainer);
    })
})

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
