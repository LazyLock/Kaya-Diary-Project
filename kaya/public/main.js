const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

const mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };

const iwContent = '<button value="확인" id="info_button"></button>';

// 지도를 생성합니다
const map = new kakao.maps.Map(mapContainer, mapOption);

// 장소 검색 객체를 생성합니다
const ps = new kakao.maps.services.Places();

const placeSearch = document.getElementById("search_button");
const inputSearch = document.getElementById("place_search");

placeSearch.addEventListener("click", buttonEvent);
inputSearch.addEventListener("keyup", enterEvent);

function enterEvent(e) {
  if (e.keyCode == 13) {
    // e.target.keycode는 오류 발생함
    const input = document.getElementById("place_search").value;
    ps.keywordSearch(input, placesSearchCB);
  }
}

function buttonEvent(e) {
  const input = document.getElementById("place_search").value;
  ps.keywordSearch(input, placesSearchCB);
}
// 키워드로 장소를 검색합니다

// 키워드 검색 완료 시 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
  if (status === kakao.maps.services.Status.OK) {
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    // LatLngBounds 객체에 좌표를 추가합니다
    const bounds = new kakao.maps.LatLngBounds();

    for (let i = 0; i < data.length; i++) {
      displayMarker(data[i]);
      bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  }
}

// 지도에 마커를 표시하는 함수입니다
function displayMarker(place) {
  // 마커를 생성하고 지도에 표시합니다
  const marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  // 마커에 클릭이벤트를 등록합니다
  kakao.maps.event.addListener(marker, "click", function () {
    // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
    infowindow.setContent(
      '<div style="padding:5px;font-size:12px;">' +
        place.place_name +
        "</div><button style='padding-left:5px;' id='info_button'>선택</button>"
    );
    infowindow.open(map, marker);
    const infoButton = document.getElementById("info_button");
    const map_img = document.getElementById("map");
    infoButton.addEventListener("click", function (e) {
      const modal = document.getElementById("modal");
      map_img.style.display = "none";
      modal.style.display = "flex";
      const closeBtn = modal.querySelector(".close-area");
      closeBtn.addEventListener("click", (e) => {
        modal.style.display = "none";
        map_img.style.display = "block";
      });
      modal.addEventListener("click", (e) => {
        const evTarget = e.target;
        if (evTarget.classList.contains("modal-overlay")) {
          modal.style.display = "none";
          map_img.style.display = "block";
        }
      });
    });
  });
}
