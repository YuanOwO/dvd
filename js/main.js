$(function() {
        // 邊界
    const max = [$('body').width() - $('#box').width(), $('body').height() - $('#box').height()],
        // 顏色
        colors = [
                [255,   0,   0],
                [255, 165,   0],
                [255, 255,   0],
                [  0, 255,   0],
                [  0, 255, 255],
                [  0,   0, 255],
                [ 43,   0, 255],
                [ 87,   0, 255]
            ];
    let i = 1, // 顏色 index
        rotation, vector; // 移動方向 (-180~180°), 移動向量
    function setRotationVector() {
        rotation = rotation > 180 ? rotation - 360 : rotation;
        let r = rotation / 180 * Math.PI;
        vector = [Math.cos(r), -Math.sin(r)].map(x => Math.round(x * 100) / 100);
    }
    function changeColor() {
        $('#box').css('color', `rgb(${colors[i].join()})`);
        i = i == colors.length - 1 ? 0 : i + 1;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // 初始化
    $('#box').css('left', Math.random() * max[0] + 'px')
    $('#box').css('top',  Math.random() * max[1] + 'px')
    rotation = Math.random() * 360;
    setRotationVector()
    // 運作開始
    setInterval(function() {
        let now = ['left', 'top'].map(x => Number($('#box').css(x).replace('px',''))),
            next = [now[0] + vector[0], now[1] + vector[1]];

        if (next[0] < 0 || next[0] > max[0]) {
            rotation = rotation > 0 ? 180 - rotation : -180 - rotation;
            setRotationVector();
            next[0] = now[0] + vector[0];
            changeColor();
        }
        if (next[1] < 0 || next[1] > max[1]) {
            rotation = -rotation;
            setRotationVector();
            next[1] = now[1] + vector[1];
            changeColor();
        }
        $('#box').css('left', next[0] + 'px');
        $('#box').css('top',  next[1] + 'px');
    }, 5)
})