// 위치 좌표 정의
const locations = [
    { name: '청계광장 중앙선대위 출정식', coords: [126.977794, 37.569192], url: 'https://www.youtube.com/live/_tflDyiGMdI?si=Pyo_24RMYOsJ5hcI' },
    { name: '판교역 유세', coords: [127.111653, 37.394458], url: 'https://www.youtube.com/live/s2Xegvh9uXk?si=C0NUVEq9M884LYrZ' },
    { name: '동탄 센트럴파크 K-반도체 집중유세', coords: [127.063569, 37.205323], url: 'https://youtube.com/live/Pa5tcE1dRSk?feature=share' },
    { name: '대전 중구 중앙로 164 유세', coords: [127.427220, 36.329094], url: 'https://youtube.com/live/QqO0B8jI7M0?feature=share' },
    { name: '구미역 광장 유세', coords: [128.330508, 36.129082], url: 'https://youtube.com/live/PvBnLCxQgmM?feature=share' },
    { name: '대구 집중유세', coords: [128.594906, 35.869073], url: 'https://youtu.be/Bm5S17einBc' },
    { name: '경북 포항시 유세', coords: [129.342658, 36.018394], url: 'https://youtube.com/live/UincJGqrWRI?feature=share' },
    { name: '롯데백화점 울산점 광장', coords: [129.338581, 35.538366], url: 'https://www.youtube.com/live/EX2uFDzXjsA?si=QE9kdLxO9xL4_M3n' },
    { name: '유엔기념공원 참배', coords: [129.092132, 35.124529], url: 'https://youtube.com/live/WOmt559trBM?feature=share' },
    { name: '부산 유세', coords: [129.060897, 35.155113], url: 'https://youtube.com/live/yQ07oiqJtng?feature=share' },
    { name: '경남 창원시 집중유세', coords: [128.683207, 35.221136], url: 'https://youtube.com/live/r58ExqZJLyE?feature=share' },
    { name: '경남 통영시 유세', coords: [128.425801, 34.844550], url: 'https://youtube.com/live/J_GaknYmoJQ?feature=share' },
    { name: '경남 거제시 유세', coords: [128.624771, 34.889280], url: 'https://youtube.com/live/-wulh-KRWWM?feature=share' },
    { name: '동서화합 화개장터', coords: [127.624240, 35.188045], url: 'https://www.youtube.com/live/7ORxT6JIAGk?si=TFHAJvooHmWfSlib' },
    { name: '전남 광양시 유세', coords: [127.726960, 34.932854], url: 'https://www.youtube.com/live/O0iuNaUoiBc?si=TU1aMuNha1OM1eZp' },
    { name: '전남 여수시 집중 유세', coords: [127.735500, 34.739014], url: 'https://www.youtube.com/live/89XCB9ysCqc?si=YHZGxwLMwn7tzBhq' },
    { name: '전남 순천시 유세', coords: [127.517407, 34.952561], url: 'https://youtube.com/live/RumVqjWpTY8?feature=share' },
    { name: '전남 목포시 유세', coords: [126.431737, 34.797792], url: 'https://www.youtube.com/live/SNMY-7fIvsI?si=iCnCAzMz9jkqB7_M' }
];

// 두 지점 간의 거리를 계산하는 함수 (Haversine 공식)
function calculateDistance(coord1, coord2) {
    const R = 6371; // 지구의 반경 (km)
    const lat1 = coord1[1] * Math.PI / 180;
    const lat2 = coord2[1] * Math.PI / 180;
    const dLat = (coord2[1] - coord1[1]) * Math.PI / 180;
    const dLon = (coord2[0] - coord1[0]) * Math.PI / 180;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// 총 이동 거리 계산
const totalDistance = locations.reduce((total, location, index) => {
    if (index === 0) return 0;
    return total + calculateDistance(locations[index-1].coords, location.coords);
}, 0);

// 거리 표시 요소 생성
const distanceElement = document.createElement('div');
distanceElement.innerHTML = `<div style="
    position: absolute;
    top: 120px;
    right: 30px;
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    font-family: 'Noto Sans KR', sans-serif;
    z-index: 1000;
">총 이동 거리: ${Math.round(totalDistance)}km</div>`;

// 지도 생성
const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([127.0, 37.0]),
        zoom: 7
    })
});

// 포인트와 라인을 그릴 벡터 레이어 생성
const vectorSource = new ol.source.Vector();
const vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#0000ff',
            width: 2
        }),
        image: new ol.style.Icon({
            src: 'light.png',
            scale: 0.04  // 이미지 크기를 1/10로 줄임
        })
    })
});

map.addLayer(vectorLayer);

// 포인트 추가 및 라인 연결
const points = locations.map(location => {
    return new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat(location.coords)),
        name: location.name,
        url: location.url
    });
});

// 라인스트링 생성
const lineString = new ol.Feature({
    geometry: new ol.geom.LineString(
        locations.map(location => ol.proj.fromLonLat(location.coords))
    )
});

// 벡터 소스에 피처 추가
vectorSource.addFeatures([...points, lineString]);

// 팝업 오버레이 생성
const popup = new ol.Overlay({
    element: document.createElement('div'),
    positioning: 'bottom-center',
    offset: [0, -10]
});
map.addOverlay(popup);

// 포인트 클릭 이벤트 처리
map.on('click', function(evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
        return feature;
    });

    if (feature && feature.getGeometry() instanceof ol.geom.Point) {
        const coordinates = feature.getGeometry().getCoordinates();
        const name = feature.get('name');
        const url = feature.get('url');
        
        popup.getElement().innerHTML = `
            <div style="
                background: white;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                text-align: center;
            ">
                <div style="margin-bottom: 8px;">${name}</div>
                <a href="${url}" target="_blank" style="
                    display: inline-block;
                    background: #0066cc;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 3px;
                    text-decoration: none;
                    font-size: 14px;
                ">델리민주 라이브 바로가기</a>
            </div>`;
        popup.setPosition(coordinates);
    } else {
        popup.setPosition(undefined);
    }
});

// 지도 생성 후에 거리 표시 요소 추가
map.getTargetElement().appendChild(distanceElement); 
