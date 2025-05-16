// 일정 데이터
const scheduleData = [
    {
        id: 1,
        time: '10:20',
        title: "< 'K-이니셔TV' 케미폭발 '동서화합' 화개장터 라이브>",
        location: '',
        isLive: true,
        prepTime: '',
        description: '유튜브 라이브, 현장풀 취재'
    },
    {
        id: 2,
        time: '11:50',
        title: '전남 광양시 유세',
        location: '전남 드래곤즈구장 축구장 북문(전남 광양시 백운로 1641)',
        isLive: true,
        prepTime: '12:30',
        description: '후보유세'
    },
    {
        id: 3,
        time: '13:20',
        title: '전남 여수시 집중유세',
        location: '이순신 광장(전남 여수시 선어시장길 6)',
        isLive: true,
        prepTime: '14:00',
        description: '후보유세'
    },
    {
        id: 4,
        time: '15:10',
        title: '전남 순천시 유세',
        location: '연향동 패션의 거리(전남 순천시 연향번영길 149)',
        isLive: true,
        prepTime: '15:50',
        description: '후보유세'
    },
    {
        id: 5,
        time: '18:20',
        title: '전남 목포시 유세',
        location: '평화광장 원형상가 앞(전남 목포시 원형로 19)',
        isLive: true,
        prepTime: '19:00',
        description: '후보유세'
    }
];

// 날짜를 직접 입력하는 상수
const scheduleDate = '2025년 5월 15일'; // 예시 날짜, 필요에 따라 수정

// 일정 HTML 생성 함수
function createScheduleHTML() {
    const container = document.getElementById('schedule-container');
    
    container.innerHTML = `
        <div class="flex flex-col h-full bg-gray-50 text-gray-800 font-sans">
            <!-- Date Display -->
            <div class="bg-white p-4 flex items-center justify-between border-b">
                <div class="flex items-center">
                    <i data-lucide="calendar" class="h-5 w-5 text-indigo-500 mr-2"></i>
                    <span class="font-medium">${scheduleDate}</span>
                </div>
            </div>
            
            <!-- Schedule List -->
            <div class="flex-1 overflow-auto bg-gray-50 p-4 hide-scrollbar">
                ${scheduleData.map(event => `
                    <div class="bg-white rounded-lg mb-3 overflow-hidden shadow-sm border border-gray-100">
                        <div class="p-4 flex items-start">
                            <div class="mr-3 flex-shrink-0">
                                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                    ${event.id}
                                </div>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center mb-1">
                                    <i data-lucide="clock" class="h-4 w-4 text-indigo-500 mr-1"></i>
                                    <span class="text-sm text-indigo-700 font-medium">${event.time}</span>
                                    ${event.isLive ? `
                                        <span class="ml-2 bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">L</span>
                                    ` : ''}
                                </div>
                                <h3 class="font-medium mb-1">${event.title}</h3>
                                ${event.location ? `
                                    <div class="flex items-start text-gray-500 text-sm">
                                        <i data-lucide="map-pin" class="h-4 w-4 mr-1 mt-0.5 flex-shrink-0"></i>
                                        <span>${event.location}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <!-- Bottom Action Button -->
            <div class="p-4 bg-white border-t">
                <a href="https://theminjoo.kr/main/sub/news/schedule.php" target="_blank" class="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium inline-block text-center hover:bg-indigo-700 transition-colors">
                    자세히 보기
                </a>
            </div>
        </div>
    `;

    // Lucide 아이콘 초기화
    lucide.createIcons();
}

// 초기 렌더링
document.addEventListener('DOMContentLoaded', createScheduleHTML); 
