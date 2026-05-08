function loadComponent(selector, file) {
  fetch(file)
    .then(response => response.text())
    .then(html => {
      document.querySelector(selector).innerHTML = html;
    })
    .catch(err => console.error('Failed to load:', file, err));
}

loadComponent('#top-navbar', '../navbar-top.html');
loadComponent('#footer', '../footer.html');