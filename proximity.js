
function visualizer(audioSource, audioCanvas, smoothing, fftSize) {
	console.log(audioSource, audioCanvas);
	var _context = new (window.AudioContext || window.webkitAudioContext)(),
		_smoothing = smoothing || 0.7,
		_fftSize = fftSize || 2048,
		_audioSource = audioSource,
		_audioCanvas = audioCanvas,
		_audioCanvasContext;
	
	this.freqs = null;
	this.animation = function(){
		this.analyserNode.smoothingTimeConstant = _smoothing;
		this.analyserNode.fftSize = _fftSize;

		this.analyserNode.getByteFrequencyData(this.freqs);
		var analyserNodeLength = this.analyserNode.frequencyBinCount,
			canvasWidth = _audioCanvas.clientWidth,
			canvasHeight = _audioCanvas.clientHeight,
			minSize = (canvasWidth > canvasHeight) ? canvasHeight : canvasWidth;

		_audioCanvasContext.canvas.width = canvasWidth;
		_audioCanvasContext.canvas.height = canvasHeight;

		
		//white lines with slightly transparent blurry shadow works with any background.
		_audioCanvasContext.shadowColor = "rgba(0, 0, 0, 0.75)";
		_audioCanvasContext.shadowOffsetX = 0;
		_audioCanvasContext.shadowOffsetY = 0;
		_audioCanvasContext.shadowBlur = minSize*0.012;	
		_audioCanvasContext.lineWidth = minSize*0.0042;

		var innerRadius = minSize*0.28, maxRadius = minSize*0.4, center = {x: canvasWidth / 2, y: canvasHeight / 2};
		for (var i = 0; i <= this.freqs.length - 4; i+=4){
			var a = 0; for (var j = 0; j < 4; j++) a += this.freqs[i+j];
			var percentage = a / (256 * 4),	angle = i / analyserNodeLength * Math.PI * 2 + Math.PI,	value = Math.max((maxRadius - innerRadius) * percentage, 3);

			_audioCanvasContext.strokeStyle = "#fff";
			_audioCanvasContext.beginPath();
			_audioCanvasContext.moveTo(center.x + Math.sin(angle) * innerRadius, center.y + Math.cos(angle) * innerRadius);
			_audioCanvasContext.lineTo(center.x + Math.sin(angle) * (innerRadius + value), center.y + Math.cos(angle) * (innerRadius + value));
			_audioCanvasContext.stroke();
		}				
		window.requestAnimationFrame(this.animation.bind(this));
	};
	this.init = function(){		
		_audioCanvasContext = _audioCanvas.getContext("2d");

		this.sourceNode = _context.createMediaElementSource(_audioSource);
		this.analyserNode = _context.createAnalyser();
		this.analyserNode.maxDecibels = -20;
		this.analyserNode.minDecibels = -90;
		this.sourceNode.connect(this.analyserNode);
		this.analyserNode.connect(_context.destination);
		this.freqs = new Uint8Array(this.analyserNode.frequencyBinCount);
		this.animation();
	};

};





