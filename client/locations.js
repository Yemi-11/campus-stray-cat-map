const catLocations = [
    { name: "厚学楼", lng: 118.782723, lat: 31.911402, cats: ["大佐", "草草", "鱼饼/小泰迪", "早早", "奶昔"] },
    { name: "西门", lng: 118.781388, lat: 31.91401, cats: ["大佐", "大脸(月饼)", "柠檬"] },
    { name: "思源楼", lng: 118.784251, lat: 31.916677, cats: ["马户(布丁)"] },
    { name: "22舍楼下", lng: 118.788815, lat: 31.916518, cats: ["妖精", "六花"] },
    { name: "东湖", lng: 118.787232, lat: 31.914835, cats: ["猪猪", "橘胖", "高高", "白糖"] },
    { name: "勤学楼", lng: 118.787763, lat: 31.913095, cats: ["葡萄/乌龙"] },
    { name: "博学楼", lng: 118.788437, lat: 31.912509, cats: ["芒果", "山竹", "榴莲", "大刀", "蜜橘", "迪佐"] },
    { name: "行政楼", lng: 118.784331, lat: 31.912034, cats: ["猴猴", "猬猬/焦糖", "饼饼", "苦橘"] },
    { name: "情人坡", lng: 118.788165, lat: 31.915703, cats: ["安安"] },
    { name: "13舍附近", lng: 118.782981, lat: 31.916158, cats: ["摩托"] },
    { name: "广场", lng: 118.782156, lat: 31.911891, cats: ["啵啵"] }
];

function renderCatLocationsList() {
    const container = document.getElementById("catLocationsList");
    container.innerHTML = catLocations.map(function(loc, i) {
        return '<div class="panel-item cat" data-i="' + i + '">📍 ' + loc.name + '</div>';
    }).join('');

    document.querySelectorAll(".panel-item.cat").forEach(function(item) {
        item.addEventListener("click", function() {
            document.querySelectorAll(".panel-item").forEach(function(i) { i.classList.remove("active"); });
            item.classList.add("active");
            const i = parseInt(item.dataset.i);
            const loc = catLocations[i];
            if (loc && map) {
                map.setCenter([loc.lng, loc.lat]);
                map.setZoom(18);
                const list = loc.cats.join("、");
                var info = new AMap.InfoWindow({ content: '<div style="padding:8px; font-size:14px;">📍 ' + loc.name + '<br>常驻猫咪: ' + list + '</div>' });
                info.open(map, [loc.lng, loc.lat]);
            }
        });
    });
}
