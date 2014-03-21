/**
 * Archivo JavaScript con utilidades comunes
 */

var $ = function(selector) {
    var e = document.querySelectorAll(selector);
    return (e.length == 1)? e[0] : e;
};

var net = function(){};

net.READY_STATE_UNINITIALIZED=0;
net.READY_STATE_LOADING=1;
net.READY_STATE_LOADED=2;
net.READY_STATE_INTERACTIVE=3;
net.READY_STATE_COMPLETE=4;

// ==== Cargador contenidos básico ============================================
// Constructor
net.CargadorContenidos = function(url, funcion, funcionError) {
	this.url = url;
	this.req = null;
	this.onload = funcion;
	this.onerror = (funcionError) ? funcionError : this.defaultError;
	this.cargaContenidoXML(url);
};

net.CargadorContenidos.prototype = {
	cargaContenidoXML: function(url) {
		if (window.XMLHttpRequest) {
			this.req = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			this.req = new ActiveXObject("Microsoft.XMLHTTP");
		}

		if(this.req) {
			try {
				var loader = this;
				this.req.onreadystatechange = function() {
					loader.onReadyState.call(loader);
				};
				this.req.open('GET', url, true);
				this.req.send(null);
			} catch (err) {
				this.onerror.call(this);
			}
		}
	},

	onReadyState: function() {
		var req = this.req;
		var ready = req.readyState;
		if (ready == net.READY_STATE_COMPLETE) {
			var httpStatus = req.status;
			if(httpStatus === 200 || httpStatus === 0) {
				this.onload.call(this);
			}
			else {
				this.onerror.call(this);
			}
		}
	},

	defaultError: function() {
		alert("Se ha producido un error al obtener los datos"
				+ "\n\nreadyState:" + this.req.readyState
				+ "\nstatus: " + this.req.status
				+ "\nheaders: " + this.req.getAllResponseHeaders());
	}
};

// ==== Cargador contenidos completo ==========================================
// Constructor
net.CargadorContenidosCompleto = function(url, funcion, funcionError, metodo, parametros, contentType, sincrona) {
	this.url = url;
	this.req = null;
	this.onload = funcion;
	this.onerror = (funcionError) ? funcionError : this.defaultError;
	this.cargaContenidoXML(url, metodo, parametros, contentType, sincrona);
};

net.CargadorContenidosCompleto.prototype = {
	cargaContenidoXML: function(url, metodo, parametros, contentType, sincrona) {
		if (window.XMLHttpRequest) {
			this.req = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			this.req = new ActiveXObject("Microsoft.XMLHTTP");
		}

		if(this.req) {
			try {
				var loader = this;
				this.req.onreadystatechange = function() {
					loader.onReadyState.call(loader);
				};

				this.req.open(metodo, url, (sincrona===false)?false:true);

				if(contentType) {
					this.req.setRequestHeader("Content-Type", contentType);
				}
				this.req.send(parametros);
			} catch (err) {
				this.onerror.call(this);
			}
		}
	},

	onReadyState: function() {
		var req = this.req;
		var ready = req.readyState;
		if (ready == net.READY_STATE_COMPLETE) {
			var httpStatus = req.status;
			if(httpStatus === 200 || httpStatus === 0) {
				this.onload.call(this);
			}
			else {
				this.onerror.call(this);
			}
		}
	},

	defaultError: function() {
		alert("Se ha producido un error al obtener los datos"
				+ "\n\nreadyState:" + this.req.readyState
				+ "\nstatus: " + this.req.status
				+ "\nheaders: " + this.req.getAllResponseHeaders());
	}
};

// ==== Utilidad para eventos =================================================
var EventUtil = function(){};

EventUtil.addEventHandler = function(elTarget, tipoEvento, funcion) {
	if(elTarget.addEventListener) { // navegadores DOM
		elTarget.addEventListener(tipoEvento, funcion, false);
	} else if(elTarget.attachEvent) { // Internet Explorer
		elTarget.attachEvent("on"+tipoEvento, funcion);
	} else { // resto de navegadores
		elTarget["on"+tipoEvento] = funcion;
	}
};

EventUtil.removeEventHandler = function(elTarget, tipoEvento, funcion) {
	if(elTarget.removeEventListener) { // navegadores DOM
		elTarget.removeEventListener(tipoEvento, funcion, false);
	} else if(elTarget.detachEvent) { // Internet Explorer
			elTarget.detachEvent("on"+tipoEvento, funcion);
	} else { // resto de navegadores
			elTarget["on"+tipoEvento] = null;
	}
};

EventUtil.getEvent = function() {
	if(window.event) { // Internet Explorer
		return this.formatEvent(window.event);
	} else { // navegadores DOM
		return EventUtil.getEvent.caller.arguments[0];
	}
};

EventUtil.formatEvent = function(elEvento) {

		elEvento.charCode = (elEvento.type=="keypress") ? elEvento.keyCode : 0;
		elEvento.eventPhase = 2;
		elEvento.isChar = (elEvento.charCode > 0);
		elEvento.pageX = elEvento.clientX + document.body.scrollLeft;
		elEvento.pageY = elEvento.clientY + document.body.scrollTop;
		elEvento.preventDefault = function() {
			this.returnValue = false;
		};
		if(elEvento.type == "mouseout") {
			elEvento.relatedTarget = elEvento.toElement;
		} else if(elEvento.type == "mouseover") {
			elEvento.relatedTarget = elEvento.fromElement;
		}
		elEvento.stopPropagation = function() {
			this.cancelBuble = true;
		};
		elEvento.target = elEvento.srcElement;
		elEvento.time = (new Date()).getTime();

	elEvento.isAlphanumeric = (elEvento.keyCode >= 48 && elEvento.keyCode <= 57 ) ||  ( elEvento.keyCode >= 65 && elEvento.keyCode <= 90 );
	return elEvento;
};