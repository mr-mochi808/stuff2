document.addEventListener("DOMContentLoaded", () => {
  const aboutBtn = document.getElementById("aboutBlankButton");
  const blobBtn = document.getElementById("blobCloakButton");
  if (blobBtn) blobBtn.addEventListener("click", openBlobCloak);
});

function openGame(url) {
  const win = window.open();
  if (!win) {
    alert("Please allow pop-ups for this site!");
    return;
  }

  // Write a minimal HTML skeleton to the new window
  win.document.write(`
    <html>
      <head>
        <title>Deep</title>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            background: var(--background-color, #2e3440);
          }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body></body>
    </html>
  `);

  // Now create the iframe dynamically
  const iframe = win.document.createElement('iframe');
  iframe.src = url;
  win.document.body.appendChild(iframe);
}

function launchCustom() {
  const url = document.getElementById("gameUrl").value.trim();
  if (!url) {
    alert("Please enter a URL first.");
    return;
  }

  // Auto-prepend https:// if the user forgets
  const finalUrl = url.startsWith("http://") || url.startsWith("https://")
    ? url
    : "https://" + url;

  openGame(finalUrl);
}

function openBlobCloak() {
  try {
    if (typeof ABC === "undefined") {
      alert("ABC library failed to load!");
      return;
    }

    const page = new ABC({
      type: "blob",
      url: "https://deeperthandeepest.netlify.app"
    });
    page.open();
  } catch (err) {
    console.error("Blob cloak failed:", err);
  }
}
