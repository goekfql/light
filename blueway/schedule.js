// 일정 데이터
const scheduleData = [
    {
        id: 1,
        time: '10:30',
        title: "유엔기념공원 참배",
        location: '부산 남구 유엔평화로 93',
        isLive: false,
        prepTime: '10:00',
        description: '풀단취재'
    },
    {
        id: 2,
        time: '12:00',
        title: "부산 유세",
        location: '서면 쥬디스태화 옆(부산 부산진구 신천대로50번길 79)',
        isLive: true,
        prepTime: '11:10'
    },
    {
        id: 3,
        time: '12:40',
        title: "유튜브 라이브 <K-이니셔티비 : 북극항로 대담>",
        location: '',
        isLive: true
    },
    {
        id: 4,
        time: '14:30',
        title: "경남 창원시 집중유세",
        location: '상남분수광장 (경남 창원시 성산구 마디미로38번길 11)',
        isLive: true,
        prepTime: '13:50'
    },
    {
        id: 5,
        time: '17:00',
        title: "경남 통영시 유세",
        location: '강구안 문화마당(경남 통영시 통영해안로 325)',
        isLive: true,
        prepTime: '16:20'
    },
    {
        id: 6,
        time: '18:30',
        title: "경남 거제시 유세",
        location: '엠파크 차없는 거리(경남 거제시 고현로11길 20)',
        isLive: true,
        prepTime: '17:50'
    }
];

// 날짜 포맷팅 함수
function formatDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}년 ${month}월 ${day}일`;
}

// 일정 HTML 생성 함수
function createScheduleHTML() {
    const container = document.getElementById('schedule-container');
    
    container.innerHTML = `
        <div class="flex flex-col h-full bg-gray-50 text-gray-800 font-sans">
            <!-- Header -->
            <div class="bg-indigo-600 text-white p-4 rounded-t-xl">
                <div class="mb-2">
                    <h1 class="text-lg font-bold">오늘의 일정</h1>
                </div>
                <p class="text-sm text-indigo-100">이재명 대통령선거후보</p>
            </div>
            
            <!-- Date Display -->
            <div class="bg-white p-4 flex items-center justify-between border-b">
                <div class="flex items-center">
                    <i data-lucide="calendar" class="h-5 w-5 text-indigo-500 mr-2"></i>
                    <span class="font-medium">${formatDate()}</span>
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