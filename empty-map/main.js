const map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png',
                attributions: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'

            })
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([127.7669, 36.2084]), // 대한민국 중심좌표
        zoom: 7, // 초기 줌 레벨
        minZoom: 7, // 최소 줌 레벨
        maxZoom: 12, // 최대 줌 레벨
        extent: ol.extent.boundingExtent([
            // 드래그 범위
            ol.proj.fromLonLat([124.5, 33.0]), // 남서쪽 좌표
            ol.proj.fromLonLat([131.5, 39.5]), // 북동쪽 좌표
        ]),
        smoothExtentConstraint: true, // 부드러운 드래그
    })
}); 
