let count = 0;
let webtoonIndex = 1;
let pageCheck = 0;
const container = document.getElementById("toonContainer");
const loading = document.getElementById("toonLoading");

fetch("http://34.145.65.5:46351/thumbnail_archive")
  .then(function (response) {
    return response.blob();
  })
  .then(function (blob) {
    return JSZip.loadAsync(blob);
  })
  .then(function (zip) {
    var promises = [];
    var htmlContents = []; // Array to store HTML contents
    var urls = []; // Array to store image URLs

    zip.forEach(function (relativePath, zipEntry) {
      if (!zipEntry.dir && zipEntry.name.endsWith(".png")) {
        var promise = zipEntry.async("blob").then(function (content) {
          var toon = document.createElement("a");
          toon.className = "toon";
          toon.href = "javascript:void(0)";

          var thumbnail = document.createElement("div");
          thumbnail.className = "toons";

          var image = document.createElement("img");
          image.src = URL.createObjectURL(content);
          image.alt = "Image" + (count + 1);
          //image.style = "width: 106px; height: 62px";

          // Extract title from image name
          var imageName = zipEntry.name;
          var str = imageName.split("_");
          var title = str[0];
          console.log(title);

          // Create an h3 element for the title
          var titleElement = document.createElement("h2");
          titleElement.textContent = title;

          thumbnail.appendChild(image);
          thumbnail.appendChild(titleElement);
          toon.appendChild(thumbnail);
          container.appendChild(toon);

          count = count + 1;

          // Generate HTML content and store in the array
          var htmlContent = `
          <!DOCTYPE html>
            <html lang="en">
            <link rel="stylesheet" href="/css/webtoon_test.css" />
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>웹툰 뷰어 플랫폼</title>
                <!-- JSZip 사용하기 위한 소스 -->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.6.0/jszip.min.js"></script>
            </head>
            <body>
                <header>
                <h1>웹툰 뷰어 플랫폼</h1>
                <nav>
                    <ul>
                        <li><a href="/">홈</a></li>
                        <li><a id="link1" href=""></a></li>
                        <li><a id="link2" href=""></a></li>
                    </ul>
                </nav>
                <script src="/js/token_check.js"></script>
                <script src="/js/logout.js"></script>
                </header>
                <main>
                <section>
                    <h2 style="margin-bottom: 20px">회차 정보</h2>
                    <div id="loading">
                    <img src="/img/Rolling-1.4s-200px.gif" alt="Loading" />
                    </div>
                    <ul id="container" style="list-style: none"></ul>
                    <script type="module" src="/js/create_episode.js"></script>
                </section>
                </main>
                <footer>
                <p>웹툰 뷰어 플랫폼</p>
                </footer>
            </body>
            </html>
          `;

          htmlContents.push(htmlContent); // Store HTML content in the array
          urls.push(image.src); // Store image URL in the array
          webtoonIndex = webtoonIndex + 1;
        });

        promises.push(promise);
      }
    });

    return Promise.all(promises).then(function () {
      return { htmlContents: htmlContents, urls: urls };
    });
  })
  .then(function (data) {
    var htmlContents = data.htmlContents;
    var urls = data.urls;

    // Attach click event to each container
    var toons = document.querySelectorAll(".toons");
    toons.forEach(function (toon, index) {
      toon.addEventListener("click", function () {
        openContentPage(index);
      });
    });

    console.log("웹툰의 개수 = " + count);

    // Hide loading.gif after loaded webtoon successfully
    if (count > 0) {
      loading.style.display = "none";
      container.style = "list-style: none";
    }

    function openContentPage(index) {
      var newWindow = window.open("", "_self");
      newWindow.document.write(htmlContents[index]);
      console.log("New page opened");
    }
  })
  .catch(function (error) {
    console.error(error);
  });
