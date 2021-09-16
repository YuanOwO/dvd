/**
 * Copyright (c) 2021 HiJimmy.
 */
const body = $('body'), app = $('#app');

var Runner = {
    init : function() {
        let r = Math.random() * 2 * Math.PI;
        this.vector = ['cos', 'sin'].map(f => Math.round(Math[f](r) * 1000) / 1000);
        this.now = ['width', 'height'].map(attr => Math.random() * (body[attr]() - app[attr]()));
        this.changeColor();
        this.run();
    },
    changeColor : function() {
        let i = parseInt(Math.random() * colors.length);
        app.css('color', colors[i]);
    },
    run : function() {
        for (let i in [0, 1]) {
            let attr = ['width', 'height'][i],
                border = body[attr]() - app[attr]();
            this.now[i] += this.vector[i];
            if (this.now[i] > border) {this.now[i] = border;}
            if (this.now[i] < 0 || this.now[i] == border) {
                this.vector[i] = -this.vector[i];
                this.now[i] += 2 * this.vector[i];
                this.changeColor();
            }
        }
        app.css('left', this.now[0] + 'px').css('bottom', this.now[1] + 'px');
        setTimeout(() => {this.run()});
    }
}

body.ready(() => {Runner.init();})