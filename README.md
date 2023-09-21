# Edit in progress(23.09.22)
# Dockerized simple backend with mysql as database

## What it is
> This is a dockerized node-mysql container for [Metaverse Webtoon Creation System](https://github.com/metaversewebtoon/joljak).

## What it does
1. Simple logging of API request.
2. Register and login a user.
3. Password hashing(Salt not implemented).
4. Verify Request with JWT(Need better security measures).


## What it's built on
Backend : Node.js / Koa<br/>
Database : MySQL

## How to use(On mac or linux w/ docker)
* Clone this repo.
    ```
    git clone https://github.com/yweywe/metatoon
    ```
* Navigate to the project's root directory.
    ```
    cd metatoon
    ```
* Use docker-compose to run. May require root privilege on linux.
    ```
    docker compose up
    ```

## Edit History
|Date|Detail|
|---|---|
|23.06.14.|- Created Document for API<br />- Added API for TOON<br />- Added SQL file
|23.06.16.|- Put -> POST when requesting for password change(Problem implementing in Unity)
|23.06.22.|- Description for using tokens|
|23.07.25.|- Added API for thumbnail<br/>- Added episode to toon and thumbnail table<br/>- Change in toon_upload API<br/>- Change in thumbnail_upload API<br/>- Added toon_view API<br/>- Regarding `*_archive` API, file's name format has changed(except for toon_archive)<br/>|
|23.07.28.|- Fixed typos in API Document|


## API

| 목적 | 구분 | api | 반환형태 | 요청에 필요한 정보 | 구분 | 상세 |
| --- | --- | --- | --- | --- | --- | --- |
| 메인 페이지 | get | / | - | - NA | 개발중 |  - NA |
| 기타 페이지 이동() | get | /page/:page | - | - NA (단, :page 대신 string 입력) | 개발중 | - NA |
| - | - | - | - | - | - | - |
| 회원가입 | post | /api/user/register | 토큰 | - email<br/>- password<br/>- name | 개발완료 | - NA |
| 로그인 | post | /api/user/login | 토큰 | - email<br/>- password | 개발완료 | - NA |
| - | - | - | - | - | - | - |
| 사용자 정보 조회 | get | /api/user | json 형태 | - 헤더에 token 필요 | 개발완료 | - DB상의 사용자 정보 반환<br/>- id, email, password, name, created_at<br/>- password는 요청에 의해 포함됨 |
| 사용자 비밀번호 변경 | post | /api/user_update | json 형태 | - 헤더에 token 필요<br/>- originalPw : 기존 비밀번호<br/>- newPw : 변경할 비밀번호 | 개발완료 | - Token으로 DB상의 정보와 입력받은 originalPw의 정보가 일치하는지 확인<br/>- 일치할 경우 newPw로 암호 변경 후 토큰 반환 |
| - | - | - | - | - | - | - |
| 파일 업로드 | post | /file/upload | json 형태 | - 헤더에 token 필요<br/>- file : 사진파일<br/>- fileTitle | 개발완료 | - result, id 반환<br/>- 추가된 파일의 id |
| 파일 업데이트 | put | /file/update | json 형태 | - 헤더에 token 필요<br/>- file : 사진파일<br/>- fileId : 수정할 파일의 id<br/>- fileTitle : 사용자 지정 파일명 | 개발완료 | - result, id 반환<br/>- 수정된 파일의 id |
| 파일 다운로드 | get | /file/:id | png | - NA (단, :id 대신 숫자 입력) | 개발완료 | - NA |
| 파일 zip 다운 | get | /file_archive | zip | - NA | 개발완료 | - 헤더에 토큰을 포함시키면 소유자 id로 필터링 가능<br/>- 토큰 없으면 전체 파일 반환 |
| id 값 조회 | get | /file_index | json 형태 | - NA | 개발완료 | - NA |
| - | - | - | - | - | - | - |
| 웹툰 업로드 | post | /toon/upload | json 형태 | - 헤더에 token 필요<br/>- toon : 사진파일<br/>- toonTitle<br/>- episode / int 값 | 개발완료 | - result, id 반환<br/>- 추가된 파일의 id |
| 웹툰 업데이트 | put | /toon/update | json 형태 | - 헤더에 token 필요<br/>- toon : 사진파일<br/>- toonId : 수정할 웹툰의 id<br/>- toonTitle : 사용자 지정 파일명<br/>- episode / int 값 | 개발완료 | - result, id 반환<br/>- 수정된 파일의 id |
| 웹툰 다운로드 | get | /toon/:id | png | - NA (단, :id 대신 숫자 입력) | 개발완료 | - 요청마다 해당 웹툰의 열람수에 + 1 |
| 웹툰 다운로드(필터) | get | /toon_view/:title/:episode | zip | - NA (단, :title 대신 웹툰 제목, :episode 대신 회차 입력<br/>- e.g. /toon_view/toonA/1 | 개발완료 | - ‘title’의 ‘episode’번째 웹툰을 반환<br/>- 웹툰이름_회차_회차제목 형식으로 파일명 변경(e.g. 대학일기_1_수강신청) |
| 웹툰 zip 다운 | get | /toon_archive | zip | - NA | 개발완료 | - 헤더에 토큰을 포함시키면 소유자 id로 필터링 가능<br/>- 토큰 없으면 전체 파일 반환 |
| id 값 조회 | get | /toon_index | json 형태 | - NA | 개발완료 | - NA |
| - | - | - | - | - | - | - |
| 썸네일 업로드 | post | /thumbnail_upload | json 형태 | - 헤더에 token 필요<br/>- thumbnail : 사진파일<br/>- thumbnailTitle<br/>- toonTitle<br/>- episode / int 값 | 개발완료 | - result, id 반환<br/>- 추가된 파일의 id |
| 썸네일 업데이트 | put | /thumbnail_update | json 형태 | - 헤더에 token 필요<br/>- thumbnail : 사진파일<br/>- thumbnailId : 수정할 썸네일의 id<br/>- thumbnaTitle : 썸네일(회차명)<br/>- episode / int 값 | 개발완료 | - result, id 반환<br/>- 수정된 파일의 id |
| 썸네일 다운로드 | get | /thumbnail/:id | png | - NA (단, :id 대신 숫자 입력) | 개발완료 | - 요청마다 해당 웹툰의 열람수에 + 1 |
| 썸네일 zip 다운 | get | /thumbnail_archive | zip | - NA | 개발완료 | - episode가 0인 썸네일만 반환 |
| 썸네일 zip 다운(필터) | get | /thumbnail_archive/:toonTitle | zip | - NA (단, :toonTitle 대신 웹툰 제목 입력) | 개발완료 | - toonTitle에 속한 썸네일만 반환 |
| id 값 조회 | get | /thumbnail_index | json 형태 |  | 개발완료 | - NA |