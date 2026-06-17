// 1. 初始化 Cesium 3D 地球 (使用預設憑證，實務上需去 Cesium 官網申請免費 Token)
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain(), // 載入全球真實 3D 地形
    animation: false,
    timeline: false,
    navigationHelpButton: false,
    sceneModePicker: false
});

// 2. 將攝影機定位到初始戰場（例如：臺北上空）
viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(121.5654, 25.0340, 1500), // 經度, 緯度, 高度(公尺)
    orientation: {
        heading: Cesium.Math.toRadians(0.0), // 朝向正北
        pitch: Cesium.Math.toRadians(-15.0), // 稍微向下看
        roll: 0.0
    }
});

// 3. 遊戲邏輯：監聽鍵盤控制「戰機/攝影機」移動
let speed = 350;
window.addEventListener('keydown', (e) => {
    const camera = viewer.camera;
    
    switch(e.key.toLowerCase()) {
        case 'w': // 俯衝
            camera.lookUp(-0.02);
            break;
        case 's': // 拉高
            camera.lookUp(0.02);
            break;
        case 'a': // 左翻滾/轉向
            camera.twistLeft(0.02);
            break;
        case 'd': // 右翻滾/轉向
            camera.twistRight(0.02);
            break;
        case ' ': // 空白鍵發射飛彈
            fireMissile();
            break;
    }
});

// 模擬發射飛彈
function fireMissile() {
    let ammoElement = document.getElementById('ammo');
    let currentAmmo = parseInt(ammoElement.innerText);
    if (currentAmmo > 0) {
        ammoElement.innerText = currentAmmo - 1;
        alert("🚀 飛彈發射！(此處可加入 HTML5 Audio 音效或畫線特效)");
    } else {
        alert("⚠️ 彈藥耗盡！");
    }
}

// 遊戲循環：更新 HUD 上的高度數據
viewer.scene.postRender.addEventListener(() => {
    const cameraHeight = viewer.camera.positionCartographic.height;
    // 轉換為英呎顯示
    document.getElementById('altitude').innerText = Math.round(cameraHeight * 3.28084);
});
