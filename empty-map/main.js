// OpenLayers 맵 초기화
const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([127.0, 37.5]), // 서울 중심 좌표
        zoom: 7
    })
}); 
