var Map = atom.Class({
    
    config: null,
    
    canvas: null,
    
    
    initialize: function(config, canvas) {
        this.config   = config;
        this.canvas = canvas;
    },
    
    showBorder: function() {
        this.canvas.ctx.stroke(new Line([0,0], [this.config.width, 0]), 'gray');
        this.canvas.ctx.stroke(new Line([0,this.config.height], [this.config.width, this.config.height]), 'gray');
        this.canvas.ctx.stroke(new Line([0,0], [0, this.config.height]), 'gray');
        this.canvas.ctx.stroke(new Line([this.config.width,0], [this.config.width, this.config.height]), 'gray');
    }, 
    
   isPointInFrame: function(point) {
      if (point.x >= this.config.width - 5) {
            return false;
      }
      
      if (point.y >= this.config.height - 5) {
            return false;
      }
      
      return true;
   }
   
});


