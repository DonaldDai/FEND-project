// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

const errorMsg = "列数超过当前浏览器窗口最大容量，请重新输入<br>当前页面最大列容量为 ";

// rgb2hex辅助函数
function hexc(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

// 造格子行辅助函数
function makeLine(col) {
    let tr = "<tr>";
    let td = "<td></td>";
    for (let i = 1; i <= col; i++) {
        tr = tr + td;
    }
    tr = tr + "</tr>";
    return tr
}

// 格子点击函数
function changeColor() {
	self = $(this);
	console.log(hexc(self.css("background-color")));
    let color = $('#colorPicker').val();
    if (hexc(self.css("background-color")) == color) {
        self.css('background-color', "#FFFFFF");
    } else {
        self.css('background-color', color);
    }
}

// 造格子函数
function makeGrid() {
    $("#pixel_canvas tr").remove()
    $("#pixel_canvas p").remove()

    let maxCol = parseInt(document.body.clientWidth / 20);
    let row = $('#input_height').val();
    let col = $('#input_width').val();
    // 检测列数，避免溢出难看
    if (col > maxCol) {
        $("#pixel_canvas").append("<p>" + errorMsg + String(maxCol) + "</p>")
        return
    }
    // 画格子
    let line = makeLine(col);
    for (let i = 1; i <= row; i++) {
        $("#pixel_canvas").append(line);
    }
    $('#pixel_canvas').on('click', 'tr td', changeColor);
}


// 造格子事件绑定
$('#submit_button').on('click', makeGrid);