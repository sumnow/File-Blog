<template>
  <div>
    <div class="bg_black">
      <canvas class="maze" id="maze"></canvas>
    </div>
  </div>
</template>

<script>
import { commonMixin } from "@/util/mixin";

export default {
  name: "noFound",
  mixin: [commonMixin],
  methods: {
    ready() {}
  },
  mounted() {
    this.$nextTick(() => {
      class UnionSet {
        constructor(size) {
          this.set = new Array(size);
          for (var i = this.set.length - 1; i >= 0; i--) {
            this.set[i] = -1;
          }
        }

        union(root1, root2) {
          if (this.set[root1] < this.set[root2]) {
            this.set[root2] = root1;
          } else {
            if (this.set[root1] === this.set[root2]) {
              this.set[root2]--;
            }
            this.set[root1] = root2;
          }
        }

        findSet(x) {
          if (this.set[x] < 0) return x;
          return (this.set[x] = this.findSet(this.set[x]));
        }

        sameSet(x, y) {
          return this.findSet(x) === this.findSet(y);
        }

        unionElement(x, y) {
          this.union(this.findSet(x), this.findSet(y));
        }
      }

      class Maze {
        constructor(columns, rows, canvas) {
          this.columns = columns;
          this.rows = rows;
          this.cells = columns * rows;
          //存放是连通的格子，{1: [2, 11]}表示第1个格子和第2、11个格子是相通的
          this.linkedMap = {};
          this.unionSets = new UnionSet(this.cells);
          this.canvas = canvas;
        }

        //生成迷宫
        generate() {
          //每次任意取两个相邻的格子，如果它们不在同一个连通集，
          //则拆掉中间的墙，让它们连在一起成为一个连通集
          while (!this.firstLastLinked() || !this.linkedToFirstCell()) {
            var cellPairs = this.pickRandomCellPairs();
            if (!this.unionSets.sameSet(cellPairs[0], cellPairs[1])) {
              this.unionSets.unionElement(cellPairs[0], cellPairs[1]);
              this.addLinkedMap(cellPairs[0], cellPairs[1]);
            }
          }
        }

        firstLastLinked() {
          return this.unionSets.sameSet(0, this.cells - 1);
        }

        linkedToFirstCell() {
          for (var i = 1; i < this.cells; i++) {
            if (!this.unionSets.sameSet(0, i)) return false;
          }
          return true;
        }

        //取出随机的两个挨着的格子
        pickRandomCellPairs() {
          var cell = (Math.random() * this.cells) >> 0;
          //再取一个相邻格子，0 = 上，1 = 右，2 = 下，3 = 左
          var neiborCells = [];
          var row = (cell / this.columns) >> 0,
            column = cell % this.rows;
          //不是第一排的有上方的相邻元素
          if (row !== 0) {
            neiborCells.push(cell - this.columns);
          }
          //不是最后一排的有下面的相邻元素
          if (row !== this.rows - 1) {
            neiborCells.push(cell + this.columns);
          }
          if (column !== 0) {
            neiborCells.push(cell - 1);
          }
          if (column !== this.columns - 1) {
            neiborCells.push(cell + 1);
          }
          var index = (Math.random() * neiborCells.length) >> 0;
          return [cell, neiborCells[index]];
        }

        addLinkedMap(x, y) {
          if (!this.linkedMap[x]) this.linkedMap[x] = [];
          if (!this.linkedMap[y]) this.linkedMap[y] = [];
          if (this.linkedMap[x].indexOf(y) < 0) {
            this.linkedMap[x].push(y);
          }
          if (this.linkedMap[y].indexOf(x) < 0) {
            this.linkedMap[y].push(x);
          }
        }

        draw() {
          var linkedMap = this.linkedMap;
          var cellWidth = this.canvas.width / this.columns,
            cellHeight = this.canvas.height / this.rows;
          var canvasBuffer = document.createElement("canvas");
          canvasBuffer.width = this.canvas.width;
          canvasBuffer.height = this.canvas.height;
          var ctx = canvasBuffer.getContext("2d");
          ctx.translate(0.5, 0.5);
          for (var i = 0; i < this.cells; i++) {
            var row = (i / this.columns) >> 0,
              column = i % this.columns;
            //画右边的竖线
            if (
              column !== this.columns - 1 &&
              (!linkedMap[i] || linkedMap[i].indexOf(i + 1) < 0)
            ) {
              ctx.moveTo(
                ((column + 1) * cellWidth) >> 0,
                (row * cellHeight) >> 0
              );
              ctx.lineTo(
                ((column + 1) * cellWidth) >> 0,
                ((row + 1) * cellHeight) >> 0
              );
            }
            //画下面的横线
            if (
              row !== this.rows - 1 &&
              (!linkedMap[i] || linkedMap[i].indexOf(i + this.columns) < 0)
            ) {
              ctx.moveTo(
                (column * cellWidth) >> 0,
                ((row + 1) * cellHeight) >> 0
              );
              ctx.lineTo(
                ((column + 1) * cellWidth) >> 0,
                ((row + 1) * cellHeight) >> 0
              );
            }
          }
          ctx.strokeStyle = "#fff";
          ctx.stroke();
          this.drawBorder(ctx, cellWidth, cellHeight);
          this.canvas.getContext("2d").drawImage(canvasBuffer, 0, 0);
        }

        drawBorder(ctx, cellWidth, cellHeight) {
          ctx.moveTo(0, cellHeight);
          ctx.lineTo(0, this.rows * cellHeight - 1);
          ctx.lineTo(this.columns * cellWidth - 1, this.rows * cellHeight - 1);
          ctx.moveTo(
            this.columns * cellWidth - 1,
            this.rows * cellHeight - 1 - cellHeight
          );
          ctx.lineTo(this.columns * cellWidth - 1, 0);
          ctx.lineTo(0, 0);
          ctx.stroke();
        }

        calPath() {
          var pathTable = new Array(this.cells);
          for (var i = 0; i < pathTable.length; i++) {
            pathTable[i] = { known: false, prevCell: -1 };
          }
          pathTable[0].known = true;
          var map = this.linkedMap;
          //用一个队列存储当前层的节点，先进队列的结点优先处理
          var unSearchCells = [0];
          var j = 0;
          while (!pathTable[pathTable.length - 1].known) {
            while (unSearchCells.length) {
              var cell = unSearchCells.pop();
              for (var i = 0; i < map[cell].length; i++) {
                if (pathTable[map[cell][i]].known) continue;
                pathTable[map[cell][i]].known = true;
                pathTable[map[cell][i]].prevCell = cell;
                unSearchCells.unshift(map[cell][i]);
                if (pathTable[pathTable.length - 1].known) break;
              }
            }
          }
          var cell = this.cells - 1;
          var path = [cell];
          while (cell !== 0) {
            var cell = pathTable[cell].prevCell;
            path.push(cell);
          }
          return path;
        }

        drawPath(path) {
          var cellWidth = this.canvas.width / this.columns,
            cellHeight = this.canvas.height / this.rows;
          var canvasBuffer = document.createElement("canvas");
          canvasBuffer.width = this.canvas.width;
          canvasBuffer.height = this.canvas.height;
          var ctx = canvasBuffer.getContext("2d");
          ctx.moveTo(
            this.canvas.width - 1,
            this.canvas.height - cellHeight / 2
          );
          for (var i = 0; i < path.length; i++) {
            var row = Math.floor(path[i] / this.columns);
            var column = path[i] % this.columns;
            var row_prev = this.rows - 1;
            var column_prev = this.columns;
            var row_next = 0;
            var column_next = 0;
            if (i > 0) {
              row_prev = Math.floor(path[i - 1] / this.columns);
              column_prev = path[i - 1] % this.columns;
            }
            if (i < path.length - 1) {
              row_next = Math.floor(path[i + 1] / this.columns);
              column_next = path[i + 1] % this.columns;
            } else {
              row_next = 0;
              column_next = -1;
            }
            if (row_next === row_prev) {
              // 同一行，画横线
              if (column > column_next) {
                ctx.lineTo(column * cellWidth, (row_prev + 0.5) * cellHeight);
              } else {
                ctx.lineTo(
                  (column + 1) * cellWidth,
                  (row_prev + 0.5) * cellHeight
                );
              }
            }
            if (column_next === column_prev) {
              // 同一列，画纵线
              if (row > row_next) {
                ctx.lineTo((column + 0.5) * cellWidth, row * cellHeight);
              } else {
                ctx.lineTo((column + 0.5) * cellWidth, (row + 1) * cellHeight);
              }
            }
            if (
              row === row_next &&
              column < column_next &&
              row < row_prev &&
              column === column_prev
            ) {
              ctx.moveTo((column + 0.5) * cellWidth, (row + 1) * cellHeight);
              ctx.lineTo((column + 0.5) * cellWidth, (row + 0.5) * cellHeight);
              ctx.lineTo((column + 1) * cellWidth, (row + 0.5) * cellHeight);
            }
            if (
              row === row_prev &&
              column < column_prev &&
              row < row_next &&
              column === column_next
            ) {
              ctx.moveTo((column + 1) * cellWidth, (row + 0.5) * cellHeight);
              ctx.lineTo((column + 0.5) * cellWidth, (row + 0.5) * cellHeight);
              ctx.lineTo((column + 0.5) * cellWidth, (row + 1) * cellHeight);
            }
            if (
              row === row_next &&
              column > column_next &&
              row < row_prev &&
              column === column_prev
            ) {
              ctx.moveTo((column + 0.5) * cellWidth, (row + 1) * cellHeight);
              ctx.lineTo((column + 0.5) * cellWidth, (row + 0.5) * cellHeight);
              ctx.lineTo(column * cellWidth, (row + 0.5) * cellHeight);
            }
            if (
              row === row_prev &&
              column > column_prev &&
              row < row_next &&
              column === column_next
            ) {
              ctx.moveTo(column * cellWidth, (row + 0.5) * cellHeight);
              ctx.lineTo((column + 0.5) * cellWidth, (row + 0.5) * cellHeight);
              ctx.lineTo((column + 0.5) * cellWidth, (row + 1) * cellHeight);
            }
            if (
              row === row_next &&
              column < column_next &&
              row > row_prev &&
              column === column_prev
            ) {
              ctx.moveTo((column + 0.5) * cellWidth, row * cellHeight);
              ctx.lineTo((column + 0.5) * cellWidth, (row + 0.5) * cellHeight);
              ctx.lineTo((column + 1) * cellWidth, (row + 0.5) * cellHeight);
            }
            if (
              row === row_prev &&
              column < column_prev &&
              row > row_next &&
              column === column_next
            ) {
              ctx.moveTo((column + 1) * cellWidth, (row + 0.5) * cellHeight);
              ctx.lineTo((column + 0.5) * cellWidth, (row + 0.5) * cellHeight);
              ctx.lineTo((column + 0.5) * cellWidth, row * cellHeight);
            }
            if (
              row === row_next &&
              column > column_next &&
              row > row_prev &&
              column === column_prev
            ) {
              ctx.moveTo((column + 0.5) * cellWidth, row * cellHeight);
              ctx.lineTo((column + 0.5) * cellWidth, (row + 0.5) * cellHeight);
              ctx.lineTo(column * cellWidth, (row + 0.5) * cellHeight);
            }
            if (
              row === row_prev &&
              column > column_prev &&
              row > row_next &&
              column === column_next
            ) {
              ctx.moveTo(column * cellWidth, (row + 0.5) * cellHeight);
              ctx.lineTo((column + 0.5) * cellWidth, (row + 0.5) * cellHeight);
              ctx.lineTo((column + 0.5) * cellWidth, row * cellHeight);
            }
          }

          ctx.strokeStyle = "#FF0000";
          // ctx.shadowColor = "#fff";
          // ctx.shadowBlur = 40;
          ctx.lineWidth = 6;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;
          ctx.strokeStyle = "#fff";
          ctx.stroke();
          // ctx.fill();
          this.canvas.getContext("2d").drawImage(canvasBuffer, 0, 0);
        }
      }

      const WINDOW_WIDTH = this.isComputer
        ? document.body.offsetWidth
        : screen.width;
      const WINDOW_HEIGHT = this.isComputer
        ? document.body.offsetHeight
        : screen.height;
      var canvas = document.getElementById("maze");
      canvas.width = Math.min(WINDOW_WIDTH, WINDOW_HEIGHT) - 40;
      canvas.height = Math.min(WINDOW_WIDTH, WINDOW_HEIGHT) - 40;
      document.querySelector(".bg_black").style.padding =
        WINDOW_WIDTH - WINDOW_HEIGHT > 0
          ? "10px " + (WINDOW_WIDTH - WINDOW_HEIGHT) / 2 + "px"
          : (WINDOW_HEIGHT - WINDOW_WIDTH) / 2 + "px 10px";
      const column = Math.floor(canvas.width / 15);
      const row = Math.floor(canvas.width / 15);

      var maze = new Maze(column, row, canvas);

      console.time("generate maze");
      maze.generate();
      console.timeEnd("generate maze");
      console.time("draw maze");
      maze.draw();
      console.timeEnd("draw maze");
      console.time("calculate path");
      var path = maze.calPath();
      console.timeEnd("calculate path");
      console.time("draw path");
      maze.drawPath(path);
      console.timeEnd("draw path");
    });
  }
};
</script>

<style>
.bg_black {
  grid-template-rows: 100px 1fr 100px;
  width: 100vw;
  height: 100vh;
  padding: 10px;
  background: #000;
  color: #fff;
  text-align: center;
}
</style>
