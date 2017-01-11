var app = {
	// funcion de incio
	inicio: function() {

		this.iniciaBotones();
		this.iniciaFastClick();
		this.iniciaHammer();
	},

	iniciaFastClick: function() {
		FastClick.attach(document.body);
	},

	iniciaBotones: function() {
		// alamacenamos una referencia al boton claro y oscuro.
		var botonClaro = document.querySelector('#claro');
		var botonOscuro = document.querySelector('#oscuro');
		// Escuchador de eventos ('evento', funcion, false);
		botonClaro.addEventListener('click', this.ponloClaro, false);
		botonOscuro.addEventListener('click', this.ponloOscuro, false);
	},

	iniciaHammer: function() {
		var zona = document.getElementById('zona-gestos');
		var hammertime = new Hammer(zona);

		hammertime.get('pinch').set({ enable:true });
		hammertime.get('rotate').set({ enable:true });

		zona.addEventListener('webkitAnimationEnd', function(e){
			zona.className='';
		});

		hammertime.on('doubletap', function(ev) {
			zona.className='doubletap';
		});

		hammertime.on('press', function(ev) {
			zona.className='press';
		});	

		hammertime.on('swipe', function(ev) {
			var clase = undefined;
			direccion = ev.direction;

			if(direccion == 4) clase='swipe-derecha';
			if(direccion == 2) clase='swipe-izquierda';

			zona.className = clase;
		});

		hammertime.on('rotate', function(ev){
			var umbral=25;
			if(ev.distance > umbral) zona.className='rotate';
		});

		hammertime.on('tap', function(ev){
			zona.className='tap';			
		});
	},

	ponloClaro: function() {
		// recoje el fondo y le ponemos el className
		document.body.className = 'claro';
	}, 
	ponloOscuro: function() {
		document.body.className = 'oscuro';
	},
};

if('addEventListener' in document) {
	// Comprueba su esta el dom cargado
	document.addEventListener('DOMContentLoaded', function() {
		/*FastClick.attach(document.body);*/
		app.inicio();
	}, false);
}