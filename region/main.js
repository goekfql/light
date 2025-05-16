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

// 마커와 팝업 요소
const markerSource = new ol.source.Vector();
const markerLayer = new ol.layer.Vector({
    source: markerSource
});
map.addLayer(markerLayer);

const popup = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');

// 마커 추가 함수
function addMarker(lon, lat, imageUrl, link, title) {
    const feature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
    });

    // 마커 스타일 설정
    const markerStyle = new ol.style.Style({
        image: new ol.style.Icon({
            src: imageUrl,
            scale: 0.2,
            anchor: [0.5, 1]/
        })
    });

    feature.setStyle(markerStyle);
    feature.set('link', link);
    feature.set('title', title);
    markerSource.addFeature(feature);
}

// 클릭 이벤트 처리: 팝업 없이, 마커 클릭 시 바로 링크로 이동
map.on('click', function(evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
        return feature;
    });

    if (feature) {
        const link = feature.get('link');
        if (link && link !== '#') {
            window.open(link, '_blank');
        }
    }
});

// 각 지역 마커 추가 (링크 순서대로 지정)
const regions = [
    { name: '서울', lon: 126.9779, lat: 37.5665, link: 'https://www.begintruekorea.com/region-1' },
    { name: '강원도', lon: 128.3445, lat: 37.8228, link: 'https://www.begintruekorea.com/region-2' },
    { name: '제주', lon: 126.5312, lat: 33.4996, link: 'https://www.begintruekorea.com/region-3' },
    { name: '호남', lon: 126.8526, lat: 35.1595, link: 'https://www.begintruekorea.com/region-4' },
    { name: '부울경', lon: 129.0756, lat: 35.1796, link: 'https://www.begintruekorea.com/region-5' },
    { name: '대구경북', lon: 128.6014, lat: 35.8714, link: 'https://www.begintruekorea.com/region-6' },
    { name: '충청', lon: 127.4292, lat: 36.3398, link: 'https://www.begintruekorea.com/region-7' },
    { name: '접경지', lon: 127.167145, lat: 38.257619, link: 'https://www.begintruekorea.com/policy-15' }
];

regions.forEach(region => {
    addMarker(
        region.lon,
        region.lat,
        'marker.png',
        region.link,
        region.name
    );
});
