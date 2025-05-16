// 일정 데이터
const scheduleData = [
    {
        id: 1,
        time: '10:20',
        title: '전북 익산시 유세',
        location: '익산역 동부광장 (전북 익산시 중앙동1가 2-1)',
        isLive: true,
        prepTime: '11:00',
        description: '후보유세'
    },
    {
        id: 2,
        time: '12:20',
        title: '전북 군산시 유세',
        location: '이성당 앞 구시청광장 (전북 군산시 중앙로 177)',
        isLive: true,
        prepTime: '13:00',
        description: '후보유세'
    },
    {
        id: 3,
        time: '14:40',
        title: "K-컬처 '전통의 소리를 잇다- 청년 국악인과의 간담회'",
        location: '',
        isLive: true,
        prepTime: '',
        description: '풀단취재'
    },
    {
        id: 4,
        time: '15:20',
        title: '전북 전주시 집중유세',
        location: '전북대 후문 (전북 전주시 덕진구 권삼득로 315)',
        isLive: true,
        prepTime: '16:00',
        description: '후보유세'
    },
    {
        id: '4-1',
        time: '16:30',
        title: '이세종열사 추모비 참배',
        location: '',
        isLive: true,
        prepTime: '',
        description: '풀단 취재'
    },
    {
        id: 5,
        time: '17:50',
        title: '전북 정읍시 유세',
        location: '정읍역 광장 (전북 정읍시 연지동 343-265)',
        isLive: true,
        prepTime: '18:30',
        description: '후보유세'
    }
];

// 날짜를 직접 입력하는 상수
const scheduleDate = '2025년 5월 16일';

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
                                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-medium">
                                    ${event.id}
                                </div>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center mb-1">
                                    <i data-lucide="clock" class="h-4 w-4 text-indigo-500 mr-1"></i>
                                    <span class="text-sm text-indigo-700 font-medium">${event.time}</span>
                                    ${event.prepTime ? `
                                        <span class="ml-2 text-sm text-gray-500">(후보유세 ${event.prepTime})</span>
                                    ` : ''}
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
                                ${event.description ? `
                                    <div class="mt-1 text-sm text-gray-500">${event.description}</div>
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
