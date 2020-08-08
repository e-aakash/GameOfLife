import {
  Component, Input, ElementRef, AfterViewInit, ViewChild, OnInit
} from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewInit {
  width = 1000;
  height = 500;
  rows = 100;
  columns = 50;
  resolution = 10;   // in px
  animation: number;

  @ViewChild('canvas') public canvas: ElementRef;
  private cx: CanvasRenderingContext2D;

  grid: number[][];

  constructor() {
    this.grid = [];
    this.animation = 0;
    this.createGrid();
   }

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.drawGrid();
  }

  gameOfLife() {
    for(var i=0; i<this.rows; i++) {
      for(var j=0; j<this.columns; j++) {
        if (this.grid[i][j] > 0)
          this.grid[i][j] = 1;
        else 
          this.grid[i][j] = 0;
      }
    }
    
    for(var i=0; i<this.rows; i++) {
      for(var j=0; j<this.columns; j++) {
        var neighbours = this.getNeighbours(i, j);

        console.log(i, j, neighbours);
        
        // Rule 1 or Rule 3
        if ((this.grid[i][j] == 1) && ( (neighbours<2) || (neighbours>3) )) {
          this.grid[i][j] = -1; // -1 signifies the cell is now dead but originally was live.
        }

        // Rule 4
        if ((this.grid[i][j] == 0) && (neighbours == 3)) {
          this.grid[i][j] = 2;  // 2 signifies the cell is now live but was originally dead.
        }
      }
    }

  }

  getNeighbours(row: number, col: number) : number {
    var neighbors = [[1,0], [1,-1], [0,-1], [-1,-1], [-1,0], [-1,1], [0,1], [1,1]]
    var live_neighbors = 0

    for(var i=0; i<neighbors.length; i++) {
      var r = row + neighbors[i][0];
      var c = col + neighbors[i][1];

      if ((r<this.rows && r>=0) && (c<this.columns && c>=0) && (Math.abs(this.grid[r][c]) == 1) ) {
        live_neighbors += 1;
      }
    }
    return live_neighbors;
  }

  draw(x: number, y: number, z: number, style: string) {
    this.cx.fillStyle = style;
    this.cx.fillRect(x, y, z, z);
  }

  createGrid() {
    for (var i = 0; i < this.rows; i++) {
      this.grid[i] = []
      for (var j = 0; j < this.columns; j++) {
          this.grid[i][j] = Math.floor(Math.random() * 2);  
      }
    }
  }

  animateOneStep() {
    this.gameOfLife();
    this.drawGrid();
  }

  drawGrid() {
    this.cx.clearRect(0,0,this.width, this.height);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.columns; j++) {
        var color;
        if (this.grid[i][j] > 0)
          this.draw(i*this.resolution, j*this.resolution, this.resolution-2, "blue");
        else if (this.grid[i][j] == -1)
          this.draw(i*this.resolution, j*this.resolution, this.resolution-2, "lightblue");
      }
    }
  }

  runAnimation() {
    this.animation = setInterval(() => {
      this.gameOfLife();
      this.drawGrid();  
    }, 1);   
  }

  stopAnimation() {
    clearInterval(this.animation);
    this.animation = 0;
  }

  createNewGrid() {
    if (this.animation != 0){
      clearInterval(this.animation)
      this.animation = 0;
    }
    this.createGrid();
    this.drawGrid();
  }

}
