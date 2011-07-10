var Pointer = atom.Class({
    
    Implements: [LibCanvas.Behaviors.Animatable, LibCanvas.Behaviors.Drawable],
    
    config : null,
    
    map: null,
    
    position: {
        x: 5, 
        y: 5
    },
    
    canvas: null,
    
    angle: 0,
        
    initialize: function(config, canvas) {
        this.config   = config;
        this.canvas = canvas;
        this.image   = new Image();
        
        this.image.src      = this.config.image.src;
        this.image.height = this.config.image.height;
        this.image.width   = this.config.image.width;
        
        this.canvas.ctx.set({
            'fillStyle': 'white',
            'strokeStyle': 'black'
        });
        
        this.shape = new Rectangle(0, 0, 10, 10);
//        this.shape.draw(this.canvas.ctx, 'stroke');
    },
    
    setMap: function(map) {
        this.map = map;
    },
    
    start: function() {
        this.canvas.ctx.drawImage({
            image: this.image,
            draw: this.shape
        });
    },
       
    gotoxy: function(x, y, a) {
        if (a !== false) {
            this.angle  = this.degressToRadians(a);
        }
        
        this.move(x - this.position.x, y - this.position.y);
        
    },    
    
    move: function(offsetX, offsetY) {
        if (offsetX == 0 && offsetY == 0) {
            return undefined;
        }
        
        var point = {
            x: this.position.x + offsetX,
            y: this.position.y + offsetY
        }
        
        if (!this.map.isPointInFrame(point)) {
            offsetY = -offsetY;
        }
        
        this.position.x += offsetX;
        this.position.y += offsetY;
        
        this.canvas.ctx.clearRect(this.shape);
        
        this.shape.move({
            'x': offsetX, 
            'y': offsetY
        });
        
        //this.shape.draw(this.canvas.ctx, 'stroke');
        
        this.canvas.ctx.drawImage({image: this.image, draw : this.shape, angle: this.angle});
        return this;
    }, 
    
    clear: function() {
       this.canvas.ctx.clearRect(this.shape);
    },
    
    left: function() {
        if (this.angle <= 0.8) {
            this.angle = 6.28;
        } else {
            this.angle -= 0.8;
        }

        this.move(0, 0);
        return this;
        
    },
    
    right: function() {
        if (this.angle > 6) {
            this.angle = 0.8;
        } else {
            this.angle += 0.8;
        };
        
        this.move(0, 0);
        return this;
    },
    
    degressToRadians: function(degress) {
        return Math.round(degress*(3.14/180));
    }
})


