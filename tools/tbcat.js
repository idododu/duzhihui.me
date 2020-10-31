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
    sleep(3*sleepTimes);
    return true;
}

// 进入养猫
function enterCat() {
    toast("点击养猫分20亿");
    click(353, 1639, 491,1777)
    sleep(2*sleepTimes);
    // toast("升级猫猫");
    // click(0, 1734,303,2025)
    // sleep(2*sleepTimes)
    toast("每天猫币点击领取");
    console.log('.............')
    if(textContains('喵币点击领取').exists()) {
        textContains('喵币点击领取').click()
        console.log('111111')
    }
    console.log('2222222')
    
    
    // if(btn.exists()) {
    //     btn.click()
    //     sleep(2*sleepTimes)
    // }
    
    return true;
}

// 领猫币
function getCoin() {
    toast("领猫币");
    click('赚喵币');
    sleep(2*sleepTimes);

    // 签到
    toast("签到");
    btn = text('签到').findOnce(0)
    if(btn) {
        btn.click(sleep(2*sleepTimes))
    }
    
    let btn
    //  巴巴农场
    toast("去领取");
    click('去领取')
    sleep(3*sleepTimes);
    click('点击领取')
    sleep(2*sleepTimes);

    
    let start = 0
    while(true) {
        btn = text('去浏览').findOnce(start)
        if(!btn) {
            btn = text('去逛逛').findOnce(start)
        }
        if(!btn) {
            btn = text('去完成').findOnce(start)
        }
        if(!btn) {
            btn = text('去搜索').findOnce(start)
        }
        if(btn) {
            btn.click()
            sleep(3*sleepTimes)
            swipe(100, 100, 110, 500, 500)
            sleep(5*sleepTimes)
            swipe(110, 500, 100, 800, 500)
            sleep(5*sleepTimes)
            swipe(110, 800, 100, 500, 500)
            sleep(5*sleepTimes)
            back()
            sleep(3*sleepTimes)
        } else {
            break;
        }
    }

    while(true) {
        btn = text('领取奖励').findOnce(start)
        if(btn) {
            btn.click()
            sleep(3*sleepTimes)
        } else {
            break;
        }
    }

    // click('去支付宝领更多喵币')
    // sleep(5*sleepTimes)
    // btn = id('alimod-2020-1111-game').findOnce(0)
    // if(btn) btn.click()
    // back()
    // back()
    text('关闭').click()
}

function feed() {
    toast("喂猫领红包");
    // text('返回我的猫').click()
    // sleep(sleepTimes)
    let i = 0
    while(i<100) {
        click(483, 1635, 597, 1749)
        sleep(1*sleepTimes)
        i++
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
