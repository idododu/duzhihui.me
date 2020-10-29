// 翻页次数 好友越多页数越多
var collectTimes = 20;
var sleepTimes = 1100;
var tryTimnes = 5; // 相关操作最多尝试的次数
// 主入口函数
mainEntrence();

// 获取权限和设置参数
function prepareThings() {
    // 设定屏幕分辨率
    setScreenMetrics(1080, 2340);
    // 请求截图权限
    if (!requestScreenCapture()) {
        toast("请求截图失败，脚本退出");
        exit();
    }
    toast("请求截图权限成功");
    sleep(sleepTimes);
}

// 截图
function getCaptureImg() {
    sleep(0.5*sleepTimes);
    var img0 = captureScreen();
    sleep(0.1*sleepTimes);
    if (img0 == null || typeof (img0) == "undifined") {
        toastLog("截图失败，脚本退出");
        exit();
    } else {
        sleep(0.1*sleepTimes);
        return img0;
    }
}

// 进入养猫
function enterCat() {
    click("养猫分20亿");
    toast("准备养猫");
    sleep(3*sleepTimes);
    return true;
}

// 领猫币
function getCoin() {
    toast("准备领猫币");
    click("领猫币");
    sleep(sleepTimes);
}

// 进入总排行榜
function enterRank() {
    toast("进入排行榜");
    click("总排行榜");
    sleep(sleepTimes);

    toast("查看更多好友");
    click("查看更多好友");
    sleep(sleepTimes);
    return true;
}


// 结束后返回主页面
function whenComplete() {
    toast("结束");
    back();
    sleep(1.5*sleepTimes);
}

// 打开淘宝APP
function openTaobao() {
    launchApp("手机淘宝");
    toast("等待淘宝启动");
    sleep(2*sleepTimes);
    // 打开我的淘宝
    click(894,2154,1050,2310);
    sleep(2*sleepTimes);
    return true;
}

function feed() {
    toast("准备喂猫");
    for(var i = 0; i < 2; i++) {
        click("喂猫领红包");
        sleep(sleepTimes);
    }
}
//程序主入口
function mainEntrence() {
    // 前置准备操作
    prepareThings();
    // 打开淘宝APP
    openTaobao();
    // 进入养猫主页
    enterCat();

    // 领猫币
    getCoin()

    // 喂猫
    feed()

    //结束后返回主页面
    whenComplete();
    sleep(sleepTimes);
    exit();
}
