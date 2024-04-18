const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const url = event.target.href;
        Router.go(url);
      });
    });
    // Event handler for URL changes
    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
    // Check initial URL
    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log(`Going to ${route}`);
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }
    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "http://127.0.0.1:5501/":
        pageElement = document.createElement("menu-page");
        break;
      case "http://127.0.0.1:5501/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          const paramID = route.substring(route.lastIndexOf("-") + 1);
          pageElement.dataset.productId = paramID;
        }
    }
    if (pageElement) {
      const cache = document.querySelector("main");
      cache.innerHTML = "";
      cache.appendChild(pageElement);
      window.scrollX = 0;
      window.scrollY = 0;
    } else {
      document.querySelector("main").innerHTML = "Ooops, 404!";
    }
  },
};

export default Router;
