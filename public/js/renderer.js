// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {

    console.log("beforeinstallprompt - showme!!!");
    // Prevent Chrome <= 67 from automatically showing the prompt
    event.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = event;
    // Update the install UI to notify the user app can be installed
    document.querySelector('#installBut').classList.add("showme");
});


  window.addEventListener('appinstalled', (evt) => {
    console.log('a2hs', 'installed');
  });


  if (window.matchMedia('(display-mode: standalone)').matches) {
    window.resizeTo(1200,900);
  }