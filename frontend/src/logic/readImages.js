const headers = new Headers();
const token = window.localStorage.getItem("token");
url = "http://34.145.65.5:46351/file_archive";

fetch(url,{
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "token": token // 토큰을 Authorization 헤더에 담아서 보냄
  },
})
  .then(function (response) {
    return response.blob();
  })
  .then(function (blob) {
    return JSZip.loadAsync(blob);
  })
  .then(function (zip) {
    var promises = [];

    zip.forEach(function (relativePath, zipEntry) {
      if (!zipEntry.dir && zipEntry.name.endsWith(".png")) {
        var promise = zipEntry.async("blob").then(function (content) {
         
          // Create an image element
          img = document.createElement("img");
          img.src = URL.createObjectURL(content);

          // 이미지 id 추출
          const imageName = zipEntry.name; // 전역 변수에 값을 할당합니다.
          const regex = /^(\d+)_([^_]+)\.png$/; // 정규 표현식: id와 title 추출
          const matches = imageName.match(regex); // 정규표현식에 매칭되는 부분을 추출

          if (matches && matches.length > 2) {
            const numberStr = matches[1]; // id 추출
            const textStr = matches[2]; // title 추출
            const number = parseInt(numberStr, 10); // 추출한 숫자를 정수로 변환

            console.log(number + textStr); // 정수 출력

            img.id=number;
            img.title = textStr;
          } else {
            console.log("숫자를 찾을 수 없습니다.");
          }

          // 이미지 엘리먼트를 이미지 컨테이너에 추가
          const imageContainer = document.getElementById("image-container");
          imageContainer.appendChild(img); // Append image to the body or any other container

          // 클릭 이벤트 핸들러 등록
          img.addEventListener("click", handleImageClick);
        });

        promises.push(promise);
      }
    });

    return Promise.all(promises);
  })
  .catch(function (error) {
    console.error(error);
  });


let currentImage = null;

// 이미지 클릭 이벤트 핸들러
function handleImageClick(event) {
  const clickedImage = event.target;
  const imageUrl = clickedImage.src;
  
  alert('Clicked image with src: ' + imageUrl + " " + clickedImage.id);

  // 기존 이미지가 있으면 제거
  if (currentImage) {
    imageEditor.removeObject(currentImage);
    currentImage = null;
  }

  // 이미지에디터에 클릭한 이미지 로드
  imageEditor.loadImageFromURL(imageUrl, 'selected-image').then(result => {
    currentImage = result.id;
    imageEditor.ui.activeMenuEvent();
    imageEditor.ui.resizeEditor();
  });

  imageEditor.image = clickedImage;

  console.log('클릭한 이미지의 id: ' + imageEditor.image.id);
  console.log('클릭한 이지미의 title: ' + imageEditor.image.title);


}





