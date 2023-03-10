export default {
  mounted: (el) => {
    function loadImage() {
      const imageElement = Array.from(el.children).find(el => el.nodeName === "IMG");
      if (imageElement) imageElement.src = imageElement.dataset.src;
      else console.log("no image element found");
    };

    function handleIntersect(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(el);
        }
      });
    };

    function createObserver() {
      const options = {
        root: null,
        threshold: "0"
      };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(el);
    };

    if (window["IntersectionObserver"]) createObserver();
    else loadImage();
  }
};