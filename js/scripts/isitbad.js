document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('lookupIpButton').onclick = () => {
    lookupIp();
  }
});

function lookupIp() {

  const ipAddress = window.document.getElementById("ipAddress").value;

  fetch(`https://funkemunky.cc/vpn?ip=${ipAddress}`)
    .then(response => response.json()).then(data => {
      console.log(data);
      if(data.error) {
        window.document.getElementById("isitbad").textContent = 'Error';
      } else {
        window.document.getElementById("isitbad").textContent = data.proxy;
      }
  });
}
