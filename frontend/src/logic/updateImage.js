// 데이터를 서버에 전송하는 함수
async function updateData() {
    // 서버 엔드포인트 URL 설정
    const url = "http://34.145.65.5:46351/file/update"; // 서버 엔드포인트 주소로 대체해야 함
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWFhIiwiaWQiOjEsImlhdCI6MTY4NTM1NDM4NX0.d2We3d-BTPOiT_73A_TsJD1TwQmbzW7ZjxonuTvH0j0";

    const file = imageEditor.image;
    const imageUrl = imageEditor.toDataURL();


    console.log(imageUrl + " " + file.id + " " + file.title);
    const image = await downloadImage(imageUrl);
    
    const formData = new FormData();
    formData.append('file', image );
    formData.append('fileId', file.id);
    formData.append('fileTitle', file.title);

    // 요청 보내기
    await fetch(url, {
        method: "PUT",
        headers: {
            //"Content-Type": "multipart/form-data",
            //"token": token // 토큰을 Authorization 헤더에 담아서 보냄
        },
        body: formData
    })
    .then(response => {
        // 서버 응답 처리
        if (response.result === "ok") {
            console.log("업데이트 성공! ID:", response.id);
            // 성공 처리 로직 추가
        } else if (response.result === "fail") {
            console.log("업데이트 실패");
            // 실패 처리 로직 추가
        }
    })
    .catch(error => {
        // 에러 처리
        console.error("에러 발생:", error);
    });
  
    window.location.reload();
}

// 이미지 Url -> png 변환
function downloadImage(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
  
      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(new Error('Failed to download image'));
        }
      };
  
      xhr.onerror = function() {
        reject(new Error('Failed to download image'));
      };
  
      xhr.send();
    });
  }
/*
// 이미지 다운로드 및 전송 함수
async function sendImageToServer(url) {
    try {
      const imageBlob = await downloadImage(url);
  
      const formData = new FormData();
      formData.append('file', imageBlob, 'image.png');
  
      const response = await fetch('http://example.com/upload', {
        method: 'POST',
        body: formData
      });
  
      if (response.ok) {
        console.log('Image uploaded successfully');
      } else {
        console.log('Failed to upload image');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  */