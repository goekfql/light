// 지도 생성
const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([127.9, 36.5]), // 한국 중심 좌표를 더 왼쪽으로 이동
        zoom: 7
    })
});

// 마커 레이어 설정
const markerSource = new ol.source.Vector();
const markerLayer = new ol.layer.Vector({
    source: markerSource
});
map.addLayer(markerLayer);

const regionImage = document.getElementById('region-image');
const guideMessage = document.getElementById('guide-message');

// 페이지 로드 시 초기 상태
regionImage.style.display = 'none';
guideMessage.style.display = 'block';

// 마커 추가 함수
function addMarker(lon, lat, imageUrl, link, title, isGangnam = false, imageSrc = '') {
    const feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
    });

    // 마커 스타일 설정
    const markerStyle = new ol.style.Style({
        image: new ol.style.Icon({
            src: imageUrl,
            scale: 0.05,
            anchor: [0.5, 1]
        })
    });

    feature.setStyle(markerStyle);
    feature.set('link', link);
    feature.set('title', title);
    feature.set('isGangnam', isGangnam);
    feature.set('imageSrc', imageSrc);
    markerSource.addFeature(feature);
}

// 클릭 이벤트 처리
map.on('singleclick', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
        return feature;
    });
    if (feature && feature.get('imageSrc')) {
        // 마커 클릭 시
        regionImage.src = feature.get('imageSrc');
        regionImage.style.display = 'block';
        guideMessage.style.display = 'none';
        // 모바일 환경에서만 플립 효과 적용
        if (window.innerWidth < 768) {
            document.querySelector('.flip-container').classList.add('flipped');
        } else {
            // PC 환경에서는 이미지 표시
            regionImage.style.display = 'block';
        }
    } else {
        // 마커가 없는 지도 클릭 시
        regionImage.style.display = 'none';
        guideMessage.style.display = 'block';
        // 닫기 버튼 이벤트 처리
        document.querySelector('.close-button').addEventListener('click', function() {
            document.querySelector('.flip-container').classList.remove('flipped');
        });
    }
});

// 서울시 구별 마커 추가
const seoulDistricts = [
    { name: '강남구', lon: 127.0276, lat: 37.4979, imageSrc: 'seoul/seoul_gangnam.jpg' },
    { name: '용산구', lon: 126.9675, lat: 37.5326, imageSrc: 'seoul/seoul_yongsan.jpg' },
    { name: '강동구', lon: 127.1238, lat: 37.5495, imageSrc: 'seoul/seoul_kangdong.jpg' },
    { name: '강북구', lon: 127.0256, lat: 37.6396, imageSrc: 'seoul/seoul_kangbook.jpg' },
    { name: '강서구', lon: 126.8495, lat: 37.5507, imageSrc: 'seoul/seoul_kangseo.jpg' },
    { name: '관악구', lon: 126.9515, lat: 37.4784, imageSrc: 'seoul/seoul_kwanak.png' },
    { name: '광진구', lon: 127.0826, lat: 37.5385, imageSrc: 'seoul/seoul_kwangjin.jpg' },
    { name: '구로구', lon: 126.8874, lat: 37.4954, imageSrc: 'seoul/seoul_guro.png' },
    { name: '금천구', lon: 126.9027, lat: 37.4563, imageSrc: 'seoul/seoul_geumcheon.jpg' },
    { name: '노원구', lon: 127.0568, lat: 37.6542, imageSrc: 'seoul/seoul_nowon.jpg' },
    { name: '도봉구', lon: 127.0326, lat: 37.6688, imageSrc: 'seoul/seoul_dobong.jpg' },
    { name: '동대문구', lon: 127.0097, lat: 37.5744, imageSrc: 'seoul/seoul_dongdaemoon.jpg' },
    { name: '동작구', lon: 126.9403, lat: 37.5124, imageSrc: 'seoul/seoul_dongjak.jpg' },
    { name: '마포구', lon: 126.9086, lat: 37.5638, imageSrc: 'seoul/seoul_mapo.jpg' },
    { name: '서대문구', lon: 126.9368, lat: 37.5796, imageSrc: 'seoul/seoul_seodaemoon.jpg' },
    { name: '서초구', lon: 127.0324, lat: 37.4837, imageSrc: 'seoul/seoul_seocho.png' },
    { name: '성동구', lon: 127.0366, lat: 37.5633, imageSrc: 'seoul/seoul_seongdong.jpg' },
    { name: '성북구', lon: 127.0167, lat: 37.5894, imageSrc: 'seoul/seoul_seongbook.jpg' },
    { name: '양천구', lon: 126.8666, lat: 37.5173, imageSrc: 'seoul/seoul_yangcheon.jpg' },
    { name: '영등포구', lon: 126.8950, lat: 37.5263, imageSrc: 'seoul/seoul_yeongdengpo.jpg' },
    { name: '은평구', lon: 126.9308, lat: 37.6028, imageSrc: 'seoul/seoul_eunpyeong.jpg' },
    { name: '종로구', lon: 126.9780, lat: 37.5730, imageSrc: 'seoul/seoul_jongro.jpg' },
    { name: '중구', lon: 126.9977, lat: 37.5640, imageSrc: 'seoul/seoul_junggu.jpg' },
    { name: '중랑구', lon: 127.0926, lat: 37.6066, imageSrc: 'seoul/seoul_jungrang.jpg' },
    { name: '송파구', lon: 127.1059, lat: 37.5144, imageSrc: 'seoul/seoul_songpa.jpg' }
];

// 서울시 구별 마커 추가
seoulDistricts.forEach(district => {
    addMarker(
        district.lon,
        district.lat,
        'marker.png',
        '#',
        district.name,
        false,
        district.imageSrc
    );
});
