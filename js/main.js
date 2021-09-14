var colors = [
        [255,   0,   0],
        [255, 165,   0],
        [255, 255,   0],
        [  0, 255,   0],
        [  0, 255, 255],
        [  0,   0, 255],
        [ 43,   0, 255],
        [ 87,   0, 255]
    ];

var Runner = new class {
    constructor() {
        this.setBorder();
        this.setDirection(parseInt(Math.random() * 360));
        this.now = [0, 1].map(i => Math.random() * this.border[i]);
        $('#box').css('left', this.now[0] + 'px').css('bottom', this.now[1] + 'px');
        setInterval(() => {this.move()}, 5);
    }

    setBorder() {
        this.border = ['width', 'height'].map(w => $('body')[w]() - $('#box')[w]());
        // 超出邊界則將座標設為在邊界上
        [0, 1].forEach(i => {if (this.now && this.now[i] > this.border[i]) {this.now[i] = this.border[i];}});
    }
    // 設定方向並變更顏色
    setDirection(r) {
        this.rotation = r > 180 ? r - 360 : r;
        this.vector = ['cos', 'sin'].map(f => Math.round(Math[f](r / 180 * Math.PI) * 1000) / 1000);
        this.changeColor();
    }
    changeColor() {
        let i = this.colorIndex ? this.colorIndex : parseInt(Math.random() * colors.length);
        $('#box').css('color', `rgb(${colors[i++].join()})`);
        this.colorIndex = i < colors.length ? i : 0;
    }
    move() {
        [0, 1].forEach(i => {this.now[i] += this.vector[i]});
        for (let i = 0; i < 2; i++) {
            if (this.now[i] < 0 || this.now[i] > this.border[i]) {
                this.now[i] -= this.vector[i];
                this.setDirection((i ? 0 : Math.sign(this.rotation) * 180) - this.rotation);
                this.now[i] += this.vector[i];
            }
        }
        $('#box').css('left', this.now[0] + 'px').css('bottom', this.now[1] + 'px');
    }
}

$().ready(() => {Runner;}).resize(() => {Runner.setBorder();});