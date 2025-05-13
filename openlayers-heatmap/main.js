// 전국 주요 도시 데이터 생성 (위도, 경도, 가중치)
const data = [
  // 서울 지역
  [126.9780, 37.5665, 1.0], // 서울 시청
  [127.0276, 37.4979, 0.9], // 강남
  [127.1058, 37.3947, 0.8], // 분당
  [127.0495, 37.5450, 0.9], // 동대문
  [126.9156, 37.5561, 0.8], // 홍대
  
  // 수도권
  [126.7052, 37.4563, 0.8], // 인천
  [127.0286, 37.7577, 0.7], // 의정부
  [127.1526, 37.4376, 0.8], // 성남
  
  // 강원도
  [128.8911, 37.7749, 0.6], // 강릉
  [127.7304, 37.8813, 0.5], // 춘천
  
  // 충청도
  [127.3845, 36.3504, 0.8], // 대전
  [127.4294, 36.6424, 0.6], // 청주
  
  // 경상도
  [128.6014, 35.8714, 0.9], // 대구
  [129.0756, 35.1796, 0.9], // 부산
  [128.6811, 35.2383, 0.7], // 창원
  [129.3114, 35.5384, 0.7], // 울산
  [128.1087, 35.8428, 0.6], // 구미
  [131.8652, 37.2424, 0.7], // 독도
  
  // 전라도
  [126.8526, 35.1596, 0.8], // 광주
  [127.1522, 35.8242, 0.6], // 전주
  [126.4620, 34.8121, 0.5], // 목포
  
  // 제주도
  [126.5312, 33.4996, 0.7], // 제주시
  
  // 추가 데이터 포인트들
  [127.7404, 37.8813, 0.4], // 원주
  [128.3222, 36.1190, 0.5], // 영주
  [126.9156, 35.9566, 0.5], // 익산
  [128.4395, 35.7911, 0.6]  // 김천
];

// 데이터를 OpenLayers Feature로 변환
const features = data.map(([lon, lat, weight]) => {
  const feature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
    weight: 0  // 초기 가중치를 0으로 설정
  });
  feature.set('targetWeight', weight); // 목표 가중치 저장
  return feature;
});

// 히트맵 레이어 생성
const heatmapLayer = new ol.layer.Heatmap({
  source: new ol.source.Vector({
    features: []
  }),
  blur: 20,
  radius: 15,
  weight: function(feature) {
    return feature.get('weight');
  },
  gradient: [
    'rgba(255,255,255,0)',
    'rgba(255,255,255,0.3)',
    'rgba(255,255,255,0.5)',
    'rgba(255,255,255,0.7)',
    'rgba(255,255,255,0.9)'
  ]
});

// 다크 테마 레이어 생성 (OpenStreetMap 다크 스타일)
const baseLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: 'https://cartodb-basemaps-{a-d}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
    attributions: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  })
});

// 지도 생성
const map = new ol.Map({
  target: 'map',
  layers: [baseLayer, heatmapLayer],
  view: new ol.View({
    center: ol.proj.fromLonLat([127.7669, 36.2084]), // 대한민국 중심점
    zoom: 7 // 전국이 보이도록 줌 레벨 조정
  })
});

// 숨쉬는 애니메이션 효과
const startBreathingAnimation = () => {
  let increasing = true;
  const minRadius = 12;
  const maxRadius = 18;
  const step = 0.5;
  
  setInterval(() => {
    let currentRadius = heatmapLayer.getRadius();
    
    if (increasing) {
      currentRadius += step;
      if (currentRadius >= maxRadius) {
        increasing = false;
      }
    } else {
      currentRadius -= step;
      if (currentRadius <= minRadius) {
        increasing = true;
      }
    }
    
    heatmapLayer.setRadius(currentRadius);
  }, 50); // 50ms마다 업데이트
};

// 부드러운 페이드인 효과를 위한 함수
const fadeInFeature = (feature) => {
  let currentWeight = 0;
  const targetWeight = feature.get('targetWeight');
  const duration = 500; // 페이드인 지속 시간 (밀리초)
  const steps = 20; // 애니메이션 단계
  const increment = targetWeight / steps;
  const stepDuration = duration / steps;

  const animate = () => {
    if (currentWeight < targetWeight) {
      currentWeight = Math.min(currentWeight + increment, targetWeight);
      feature.set('weight', currentWeight);
      setTimeout(animate, stepDuration);
    }
  };
  animate();
};

// 순차적으로 데이터 포인트 추가
let currentIndex = 0;
const addPoint = () => {
  if (currentIndex < features.length) {
    const feature = features[currentIndex];
    heatmapLayer.getSource().addFeature(feature);
    fadeInFeature(feature);
    currentIndex++;
    setTimeout(addPoint, 700); // 0.7초 간격
  } else {
    // 모든 포인트가 추가된 후 숨쉬는 애니메이션 시작
    startBreathingAnimation();
  }
};

// 애니메이션 시작
addPoint(); 