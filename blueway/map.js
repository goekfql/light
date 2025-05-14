// 위치 좌표 정의
const locations = [
    { name: '광화문 광장', coords: [126.976882, 37.575766] },
    { name: '판교', coords: [127.112225, 37.394776] },
    { name: '동탄', coords: [127.115306, 37.200707] },
    { name: '대전 중구 중앙로', coords: [127.421479, 36.327807] }
];

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
        name: location.name
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
        popup.getElement().innerHTML = `<div style="background: white; padding: 5px; border-radius: 5px;">${feature.get('name')}</div>`;
        popup.setPosition(coordinates);
    } else {
        popup.setPosition(undefined);
    }
}); 