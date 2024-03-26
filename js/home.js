document.addEventListener("DOMContentLoaded", function() {
  // Your code here
  getQueriesFromAPI();
  getUsersFromAPI();
  getBlockedIps();
  getBlockedProviders();
  setInterval(getQueriesFromAPI, 5000);
  setInterval(getUsersFromAPI, 30000);
  setInterval(getBlockedIps, 30000);
  setInterval(getBlockedProviders, 30000);

});

let idsToAnimate = [];

function getQueriesFromAPI() {
  const queriesTotal = document.getElementById("queries-total");

  let lastCount = queriesTotal.textContent.includes("Loading") ? 0 : Number.parseInt(queriesTotal.textContent.replaceAll(',', ''));

  fetch("https://funkemunky.cc/api/queries/month")
    .then(response => response.json())
    .then(data => {
      animateValue("queries-total", lastCount, data.count, 800);
    })
    .catch(error => {
      if(queriesTotal.includes("Loading")) {
        queriesTotal.textContent = 'Error';
      }
      console.error("Error:", error);
    });
}

function getUsersFromAPI() {
  const usersTotal = document.getElementById("users-total");

  let lastCount = usersTotal.textContent.includes("Loading") ? 0 : Number.parseInt(usersTotal.textContent.replaceAll(',', ''));

  fetch("https://funkemunky.cc/api/users/total")
    .then(response => response.json())
  .then(data => {
      animateValue("users-total", lastCount, data.count, 800);
    })
    .catch(error => {
      if(usersTotal.includes("Loading")) {
        usersTotal.textContent = 'Error';
      }
      console.error("Error:", error);
    });
}

function getBlockedIps() {
  const blocksIps = document.getElementById("blocks-ips");

  let lastCount = blocksIps.textContent.includes("Loading") ? 0 : Number.parseInt(blocksIps.textContent.replaceAll(',', ''));

  fetch("https://funkemunky.cc/api/blocked/ips")
    .then(response => response.json())
    .then(data => {
      animateValue("blocks-ips", lastCount, data.count, 800);
    })
    .catch(error => {
      if(blocksIps.includes("Loading")) {
        blocksIps.textContent = 'Error';
      }
      console.error("Error:", error);
    });
}

function getBlockedProviders() {
  const blockedProviders = document.getElementById("blocks-providers");

  let lastCount = blockedProviders.textContent.includes("Loading") ? 0 : Number.parseInt(blockedProviders.textContent.replaceAll(',', ''));

  fetch("https://funkemunky.cc/api/blocked/providers")
    .then(response => response.json())
    .then(data => {
      animateValue("blocks-providers", lastCount, data.count, 800);
    })
    .catch(error => {
      if(blockedProviders.includes("Loading")) {
        blockedProviders.textContent = 'Error';
      }
      console.error("Error:", error);
    });
}

function animateValue(id, start, end, duration) {
  let obj = document.getElementById(id);
  let range = end - start;
  let minTimer = 50;
  let stepTime = Math.abs(Math.floor(duration / range));
  stepTime = Math.max(stepTime, minTimer);
  let startTime = new Date().getTime();
  let endTime = startTime + duration;
  let timer;

  obj.style.transition = "ease-in-out 2s";

  // Set css to transition ease in and out

  idsToAnimate.push(id);

  const endNumber = end.toLocaleString();
  function run() {
    let now = new Date().getTime();
    let remaining = Math.max((endTime - now) / duration, 0);
    let value = Math.round(end - (remaining * range));
    let valueToSet = value.toLocaleString();

    while(valueToSet.length < endNumber.length) {
      valueToSet = '0' + valueToSet;
    }

    obj.textContent = valueToSet;

    if (value === end || !idsToAnimate.includes(id)) {
      clearInterval(timer);
    }
  }

  timer = setInterval(run, stepTime);
  run();
}
