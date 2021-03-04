if (window.console == undefined) {console={log:function(){} };}

(function($, window, document, undefined){
	"use strict";
	/**
	* Plugin name: applyPlaceholder
	*
	* Description: placeholder ie9 이하 대응
	*
	* Creator: 최원형
	*
	* Version: v1.0
	*
	* Released on: 2020-08-13
	*/

	var ApplyPlaceholder = function(tg, opt){
		var _ = this;
		_._$tg = $(tg);
		_._initClass = 'apply-placeholder-init';
		_._valueExistClass = 'is-value';

		_._defaults = {
			focusEvent: function(){},
			blurEvent: function(){},
		};
		_._options = $.extend({}, _._defaults, opt);

		_.init();
	};

	ApplyPlaceholder.prototype.init = function(){
		var _ = this;

		if (!_._$tg.hasClass(_._initClass)) {
			_._$tg.addClass(_._initClass);

			_._event();
		};
	};

	ApplyPlaceholder.prototype.focusEvent = function(fnc){
		var _ = this;

		_._options.focusEvent = fnc;
	};

	ApplyPlaceholder.prototype.blurEvent = function(fnc){
		var _ = this;

		_._options.blurEvent = fnc;
	};

	ApplyPlaceholder.prototype._valueCheck = function($tg){
		var _ = this;

		if ($tg.val() == '') {
			$tg.removeClass(_._valueExistClass);
		}else{
			$tg.addClass(_._valueExistClass);
		};
	};

	ApplyPlaceholder.prototype._event = function(){
		var _ = this;

		_._valueCheck(_._$tg);

		_._$tg.on('focus',function(){
			var $this = $(this);

			$this.addClass(_._valueExistClass);

			_._options.focusEvent();
		}).on('blur',function(){
			var $this = $(this);

			_._valueCheck($this);

			_._options.blurEvent();
		});
	};

	$.fn.applyPlaceholder = function(){
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		for (i = 0; i < l; i++){
			if (typeof opt == 'object' || typeof opt == 'undefined')
				_[i].pluginName = new ApplyPlaceholder(_[i], opt);
			else
				ret = _[i].pluginName[opt].apply(_[i].pluginName, args);
			if (typeof ret != 'undefined') return ret;
		};
		return _;
	};

	window.ApplyPlaceholder = ApplyPlaceholder;

})(jQuery, window, document);

(function($, window, document, undefined){
	"use strict";
	/**
	* Plugin name: scrollTopFix
	*
	* Description: 스크롤 상단 고정
	*
	* Creator: 최원형
	*
	* Version: v1.0
	*
	* Released on: 2020-08-10
	*/

	var ScrollTopFix = function(tg, opt){
		var _ = this;
		_._$tg = $(tg);
		_._initClass = 'scrollTopFix-init';
		_._insertWrapClass = 'scrollTopFix-wrap';
		_._addClass = 'is-fixed';
		_._$wrap = null;
		_._$window = $(window);
		_._diffTop = false;

		_._defaults = {
			top: 0,
			gap: 0
		};
		_._options = $.extend({}, _._defaults, opt);

		_.init();
	};

	ScrollTopFix.prototype.init = function(){
		var _ = this;

		if (!_._$tg.hasClass(_._initClass)) {
			_._$tg.addClass(_._initClass);

			_._ready();
			_._event();
		};
	};

	ScrollTopFix.prototype._ready = function(){
		var _ = this;

		_._$tg.wrapAll('<div class="' + _._insertWrapClass + '"></div>');
		_._$wrap = _._$tg.parent();
	};

	ScrollTopFix.prototype.update = function(){
		var _ = this;
		var tgHeight = _._$tg.outerHeight(true);

		_._$wrap.css('height', tgHeight + 'px');

		var wTop = _._$window.scrollTop();

		if (_._$wrap.offset().top + _._options.gap <= wTop) {
			if (_._diffTop == false) {
				_._diffTop = true;
				_._$tg.addClass(_._addClass).css({'top': _._options.top});
			};
		}else{
			if (_._diffTop == true) {
				_._diffTop = false;
				_._$tg.removeClass(_._addClass).css({'top': '0'});
			};
		};
	};

	ScrollTopFix.prototype._event = function(){
		var _ = this;

		_._$window.on('load resize',function(){
			_.update();
		});

		_._$window.on('scroll',function(){
			var wTop = $(this).scrollTop();

			if (_._$wrap.offset().top + _._options.gap <= wTop) {
				if (_._diffTop == false) {
					_._diffTop = true;
					_._$tg.addClass(_._addClass).css({'top': _._options.top});
				};
			}else{
				if (_._diffTop == true) {
					_._diffTop = false;
					_._$tg.removeClass(_._addClass).css({'top': '0'});
				};
			};
		});
	};

	$.fn.scrollTopFix = function(){
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		for (i = 0; i < l; i++){
			if (typeof opt == 'object' || typeof opt == 'undefined')
				_[i].pluginName = new ScrollTopFix(_[i], opt);
			else
				ret = _[i].pluginName[opt].apply(_[i].pluginName, args);
			if (typeof ret != 'undefined') return ret;
		};
		return _;
	};

	window.ScrollTopFix = ScrollTopFix;

})(jQuery, window, document);

(function($, window, document, undefined){
	"use strict";
	/**
	* Plugin name: waTabNavi
	*
	* Description: 접근성 탭 네비게이션
	*
	* Creator: 최원형
	*
	* Version: v1.0
	*
	* Released on: 2020-08-03
	*/

	var WaTabNavi = function(tab, opt){
		var _ = this;
		_._$tab = $(tab);
		_._initClass = 'tabNavi-init';
		_._$tabBtn = _._$tab.find('> li > [data-tabnavi-btn]');
		_._$tabCont = $('[data-tabnavi-area='+ _._$tab.attr('data-tabnavi-target') +']').find('> [data-tabnavi-cont]');
		_._$scrollTg = $('html, body');
		_._isReady = false;

		_._defaults = {
			addClass: 'is-on',
			titleOn: '선택됨',
			preventDefault: true,
			scrollTop: false,
			scrollTopSpeed: 300,
			fade: false,
			fadeSpeed: 300,
			changeEvent: function(){}
		};
		_._options = $.extend({}, _._defaults, opt);

		_.init();
	};

	WaTabNavi.prototype.init = function(){
		var _ = this;

		if (!_._$tab.hasClass(_._initClass)) {
			_._$tab.addClass(_._initClass);

			_._ready();
			_._event();
		};
	};

	WaTabNavi.prototype.show = function(tg, scrollTop, fade){
		var _ = this;

		_._$tabBtn.removeClass(_._options.addClass).attr({'title': '', 'aria-selected': false});
		_._$tabBtn.filter('[data-tabnavi-btn='+ tg +']').addClass(_._options.addClass).attr({'title': _._options.titleOn, 'aria-selected': true});

		_._$tabCont.hide().attr({'tabindex': '-1', 'aria-hidden': true});
		if (fade) {
			_._$tabCont.filter('[data-tabnavi-cont='+ tg +']').stop().fadeIn(_._options.fadeSpeed).attr({'tabindex': '0', 'aria-hidden': false});
		}else{
			_._$tabCont.filter('[data-tabnavi-cont='+ tg +']').stop().show().attr({'tabindex': '0', 'aria-hidden': false});
		};

		if (scrollTop) {
			var tabTop = _._$tab.offset().top;

			_._$scrollTg.stop().animate({scrollTop:tabTop}, _._options.scrollTopSpeed);
		};

		if (_._isReady) {
			_._options.changeEvent();
		};
	};

	WaTabNavi.prototype.changeEvent = function(fnc){
		var _ = this;

		_._options.changeEvent = fnc;
	};

	WaTabNavi.prototype._ready = function(){
		var _ = this;

		_.show(_._$tabBtn.filter('.' + _._options.addClass).attr('data-tabnavi-btn'), false, false);

		_._isReady = true;
	};

	WaTabNavi.prototype._event = function(){
		var _ = this;

		_._$tabBtn.on('click',function(e){
			var $this = $(this),
				tg = $this.attr('data-tabnavi-btn');

			_.show(tg, _._options.scrollTop, _._options.fade);

			if (_._options.preventDefault) {
				e.preventDefault();
			};
		});
	};

	$.fn.waTabNavi = function(){
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		for (i = 0; i < l; i++){
			if (typeof opt == 'object' || typeof opt == 'undefined')
				_[i].pluginName = new WaTabNavi(_[i], opt);
			else
				ret = _[i].pluginName[opt].apply(_[i].pluginName, args);
			if (typeof ret != 'undefined') return ret;
		};
		return _;
	};

	window.WaTabNavi = WaTabNavi;

})(jQuery, window, document);

(function($, window, document, undefined){
	"use strict";
	/**
	* Plugin name: textMore
	*
	* Description: 텍스트 더보기
	*
	* Creator: 최원형
	*
	* Version: v1.0
	*
	* Released on: 2020-09-01
	*/

	var TextMore = function(tg, opt){
		var _ = this;
		_._$boxMore = $(tg);
		_._initClass = 'textMore-init';
		_._$boxMoreBtn = _._$boxMore.find('.btn-more');
		_._$boxMoreCont = _._$boxMore.find('> .inner');
		_._lineHeight = 0;
		_._contHeight = 0;
		_._maxHeight = 0;
		_._$window = $(window);

		_._defaults = {
			ellipsisClass : 'is-ellipsis',
			btnHideClass : 'is-btnhide',
			btnClickEvent: function(){}
		};
		_._options = $.extend({}, _._defaults, opt);

		_.init();
	};

	TextMore.prototype.init = function(){
		var _ = this;

		if (!_._$boxMore.hasClass(_._initClass)) {
			_._$boxMore.addClass(_._initClass);

			_._ready();
			_._event();
		};
	};

	TextMore.prototype.btnClickEvent = function(fnc){
		var _ = this;

		_._options.btnClickEvent = fnc;
	};

	TextMore.prototype._ready = function(){
		var _ = this;

		_.update();
	};

	TextMore.prototype.update = function(){
		var _ = this;

		_._lineHeight = parseInt(_._$boxMoreCont.css('line-height'), 10);
		// _._contHeight = _._$boxMoreCont[0].scrollHeight; // ios scrollHeight 값 버그
		_._contHeight = _._$boxMoreCont[0].clientHeight;
		_._maxHeight = parseInt(_._$boxMore.attr('data-max-height'), 10);

		if (_._contHeight > (_._lineHeight * _._maxHeight)) {
			_._$boxMore.removeClass(_._options.btnHideClass);
			_._$boxMore.addClass(_._options.ellipsisClass);
		}else{
			_._$boxMore.addClass(_._options.btnHideClass);
			_._$boxMore.removeClass(_._options.ellipsisClass);
		};
	};

	TextMore.prototype._event = function(){
		var _ = this;

		_._$boxMoreBtn.on('click',function(e){
			if (!_._$boxMore.hasClass(_._options.btnHideClass)) {
				_._$boxMore.toggleClass(_._options.ellipsisClass);
				_._options.btnClickEvent();
			};
			e.preventDefault();
		});
	};

	$.fn.textMore = function(){
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		for (i = 0; i < l; i++){
			if (typeof opt == 'object' || typeof opt == 'undefined')
				_[i].pluginName = new TextMore(_[i], opt);
			else
				ret = _[i].pluginName[opt].apply(_[i].pluginName, args);
			if (typeof ret != 'undefined') return ret;
		};
		return _;
	};

	window.TextMore = TextMore;

})(jQuery, window, document);

(function($, window, document, undefined){
	"use strict";
	/**
	* Plugin name: scrollNavi
	*
	* Description: 스크롤 네비게이션
	*
	* Creator: 최원형
	*
	* Version: v1.0
	*
	* Released on: 2020-08-04
	*/

	var ScrollNavi = function(navi, opt){
		var _ = this;
		_._$navi = $(navi);
		_._initClass = 'scrollNavi-init';
		_._$naviBtn = _._$navi.find('[data-scrollnavi-btn]');
		_._$naviArea = $('[data-scrollnavi-area='+ _._$navi.attr('data-scrollnavi-target') +']');
		_._$naviCont = _._$naviArea.find('> [data-scrollnavi-cont]');
		_._$window = $(window);
		_._$scrollTg = $('html, body');
		_._diffIdx = null;
		_._isBtnClick = false;
		_._timeOut = null;

		_._defaults = {
			addClass: 'is-on',
			title: '해당 영역으로 스크롤 이동',
			gap: 0,
			scrollTime: 600,
			changeEvent: function(){},
			outSideDisable: false
		};
		_._options = $.extend({}, _._defaults, opt);

		_.init();
	};

	ScrollNavi.prototype.init = function(){
		var _ = this;

		if (!_._$navi.hasClass(_._initClass)) {
			_._$navi.addClass(_._initClass);

			_._ready();
			_._event();
		};
	};

	ScrollNavi.prototype.move = function(tg, ani){
		var _ = this,
			tgTop = _._$naviCont.filter('[data-scrollnavi-cont='+ tg +']').offset().top + _._options.gap;

		if (ani) {
			_._$scrollTg.stop().animate({scrollTop: tgTop}, _._options.scrollTime);
		}else{
			_._$scrollTg.stop().animate({scrollTop: tgTop}, 1);
		};
	};

	ScrollNavi.prototype.changeEvent = function(fnc){
		var _ = this;

		_._options.changeEvent = fnc;
	};

	ScrollNavi.prototype._ready = function(){
		var _ = this;

		_._$naviBtn.attr('title', _._options.title);
	};

	ScrollNavi.prototype._event = function(){
		var _ = this;

		_._$naviBtn.on('click',function(e){
			var $this = $(this),
				tg = $this.attr('data-scrollnavi-btn');

			_.move(tg, true);

			_._diffIdx = null;

			_._$naviBtn.removeClass(_._options.addClass);
			$this.addClass(_._options.addClass);

			_._isBtnClick = true;
			if (_._timeOut != null) {
				clearTimeout(_._timeOut);
			};
			_._timeOut = setTimeout(function(){
				_._isBtnClick = false;
			}, _._options.scrollTime + 50);

			_._options.changeEvent();

			e.preventDefault();
		});

		_._$window.on('scroll load',function(){
			if (!_._isBtnClick) {
				var wTop = $(this).scrollTop();

				if (_._options.outSideDisable) {
					if(!(_._$naviArea.offset().top + _._options.gap - 1 <= wTop && _._$naviArea.offset().top + _._options.gap + _._$naviArea.outerHeight(true) - 1 > wTop)){
						if (_._diffIdx != null) {
							_._diffIdx = null;
							_._$naviBtn.removeClass(_._options.addClass);
						};
					};
				};

				_._$naviCont.each(function(idx){
					var $this = $(this);
					if($this.offset().top + _._options.gap - 1 <= wTop && $this.offset().top + _._options.gap + $this.outerHeight(true) - 1 > wTop){
						if (_._diffIdx != idx) {
							_._diffIdx = idx;
							_._$naviBtn.removeClass(_._options.addClass);
							_._$naviBtn.eq(idx).addClass(_._options.addClass);
							_._options.changeEvent();
							return false;
						};
					};
				});
			};
		});
	};

	$.fn.scrollNavi = function(){
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		for (i = 0; i < l; i++){
			if (typeof opt == 'object' || typeof opt == 'undefined')
				_[i].pluginName = new ScrollNavi(_[i], opt);
			else
				ret = _[i].pluginName[opt].apply(_[i].pluginName, args);
			if (typeof ret != 'undefined') return ret;
		};
		return _;
	};

	window.ScrollNavi = ScrollNavi;

})(jQuery, window, document);

(function($, window, document, undefined){
	"use strict";
	/**
	* Plugin name: WaLayer
	*
	* Description: 접근성 레이어팝업, ie8+
	*
	* Creator: 최원형
	*
	* Version: v1.0
	*
	* Released on: 2020-09-11
	*/

	var WaLayer = function(layer, opt){
		var _ = this;
		_._$layer = $(layer);
		_._initClass = 'waLayer-init';
		_._$scrollLockEl = $('body');
		_._scrollLockClass = 'no-scroll';
		_._orginEl = null;
		_._orginTop = 0;

		_._defaults = {
			keyControl: false,
			focusControl: false,
			fade: false,
			fadeSpeed: 200,
			closeBtn: '.dialog-close',
			closeDimmed: false,
			scrollLock: true
		};
		_._options = $.extend({}, _._defaults, opt);

		_.init();
	};

	WaLayer.prototype.init = function(){
		var _ = this;

		if (!_._$layer.hasClass(_._initClass)) {
			_._$layer.addClass(_._initClass);

			if (_._options.keyControl) {
				_._keyEvent();
			};
			_._event();
		};
	};

	WaLayer.prototype._setFocusEl = function($tg){
		var _ = this;
		_._focusable = [];
		_._firstFocusEl = null;
		_._lastFocusEl = null;

		$tg.find('*').each(function(i, val) {
			if(val.tagName.match(/^A$|AREA|INPUT|TEXTAREA|SELECT|BUTTON/gim) && parseInt(val.getAttribute('tabIndex')) !== -1) {
				_._focusable.push(val);
			};
			if((val.getAttribute('tabIndex') !== null) && (parseInt(val.getAttribute('tabIndex')) >= 0) && (val.getAttribute('tabIndex', 2) !== 32768)) {
				_._focusable.push(val);
			};
		});

		_._firstFocusEl = _._focusable[0];
		_._lastFocusEl = _._focusable[_._focusable.length - 1];
	};

	WaLayer.prototype._keyEvent = function(){
		var _ = this;

		_._setFocusEl(_._$layer);

		_._$layer.on({
			'keydown' : function(e){
				var keyCode = e.keyCode || e.which;
				if (keyCode == 27){
					_.close();
				};
			}
		});

		$(_._firstFocusEl).on({
			'keydown' : function(e){
				if (e.target == this){
					var keyCode = e.keyCode || e.which;
					if (keyCode == 9){
						if (e.shiftKey){
							$(_._lastFocusEl).focus();
							e.preventDefault();
						};
					};
				};
			}
		});

		$(_._lastFocusEl).on({
			'keydown' : function(e){
				var keyCode = e.keyCode || e.which;
				if (keyCode == 9){
					if (!e.shiftKey){
						$(_._firstFocusEl).focus();
						e.preventDefault();
					};
				};
			}
		});
	};

	WaLayer.prototype._event = function(){
		var _ = this;

		_._$layer.find(_._options.closeBtn).on('click',function(e){
			_.close();
			e.preventDefault();
		});

		if (_._options.closeDimmed) {
			_._$layer.on('click',function(e){
				if (e.target == this) {
					_.close();
					e.preventDefault();
				};
			});
		};
	};

	WaLayer.prototype.open = function(){
		var _ = this;

		_._setFocusEl(_._$layer);

		if (_._options.fade) {
			_._$layer.stop().scrollTop(0).fadeIn(_._options.fadeSpeed, function(){
				if (_._options.focusControl) {
					_._$layer.scrollTop(0).find($(_._firstFocusEl)).focus();
				};
				_._$layer[0].scrollTop = 0;
			});
		}else{
			_._$layer.scrollTop(0).show(0, function(){
				if (_._options.focusControl) {
					_._$layer.scrollTop(0).find($(_._firstFocusEl)).focus();
				};
				_._$layer[0].scrollTop = 0;
			});
		};

		if (_._options.scrollLock) {
			_._orginTop = window.pageYOffset;
			_._$scrollLockEl.addClass(_._scrollLockClass).css('top', -_._orginTop + 'px');
		};
	};

	WaLayer.prototype.close = function(){
		var _ = this;

		if (_._options.fade) {
			_._$layer.stop().fadeOut(_._options.fadeSpeed, function(){
				if (!$('.' + _._initClass).is(':visible')) {
					if (_._options.focusControl) {
						$(_._orginEl).focus();
					};

					if (_._options.scrollLock) {
						_._$scrollLockEl.removeClass(_._scrollLockClass).css('top','');
						window.scrollTo(0, _._orginTop);
					};
				}else{
					var $layerVisibleLast = $('.' + _._initClass + ':visible').last();
					_._setFocusEl($layerVisibleLast);

					if (_._options.focusControl) {
						$(_._firstFocusEl).focus();
					};
				};
			});
		}else{
			_._$layer.hide(0, function(){
				if (!$('.' + _._initClass).is(':visible')) {
					if (_._options.focusControl) {
						$(_._orginEl).focus();
					};

					if (_._options.scrollLock) {
						_._$scrollLockEl.removeClass(_._scrollLockClass).css('top','');
						window.scrollTo(0, _._orginTop);
					};
				}else{
					var $layerVisibleLast = $('.' + _._initClass + ':visible').last();
					_._setFocusEl($layerVisibleLast);

					if (_._options.focusControl) {
						$(_._firstFocusEl).focus();
					};
				};
			});
		};
	};

	WaLayer.prototype.closeFocus = function(tg){
		var _ = this;
		_._orginEl = tg;
	};

	$.fn.waLayer = function(){
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		for (i = 0; i < l; i++){
			if (typeof opt == 'object' || typeof opt == 'undefined')
				_[i].pluginName = new WaLayer(_[i], opt);
			else
				ret = _[i].pluginName[opt].apply(_[i].pluginName, args);
			if (typeof ret != 'undefined') return ret;
		};
		return _;
	};

	window.WaLayer = WaLayer;

})(jQuery, window, document);

(function($, window, document, undefined){
	"use strict";
	/**
	* Plugin name: parallaxBg
	*
	* Description: 패럴랙스 백그라운드
	*
	* Creator: 최원형
	*
	* Version: v1.0
	*
	* Released on: 2020-09-04
	*/

	var ParallaxBg = function(tg, opt){
		var _ = this;
		_._$tg = $(tg);
		_._initClass = 'parallaxBg-init';
		_._$window = $(window);
		_._wTop = 0;
		_._tgTop = 0;
		_._tgHeight = 0;
		_._bgPosiX = 0;
		_._bgPosiY = 0;
		_._posiValue = 0;

		_._defaults = {
			topGap: 0,
			bottomGap: 0,
			posiDevi: 25
		};
		_._options = $.extend({}, _._defaults, opt);

		_.init();
	};

	ParallaxBg.prototype.init = function(){
		var _ = this;

		if (!_._$tg.hasClass(_._initClass)) {
			_._$tg.addClass(_._initClass);

			_._ready();
			_._event();
		};
	};

	ParallaxBg.prototype._ready = function(){
		var _ = this;

		_._bgPosiX = parseInt(_._$tg.css('background-position').split(' ')[0], 10);
		_._bgPosiY = parseInt(_._$tg.css('background-position').split(' ')[1], 10);
	};

	ParallaxBg.prototype.update = function(){
		var _ = this;

		_._wTop = _._$window.scrollTop();
		_._tgTop = _._$tg.offset().top;
		_._tgHeight = _._$tg.outerHeight();

		if ((_._tgTop + _._tgHeight + _._options.bottomGap) >= _._wTop && _._wTop >= (_._tgTop - _._options.topGap)) {
			// tg 영역
			_._posiValue = (-2 * (0.5 - (((_._wTop) - (_._tgTop - _._options.topGap)) / (_._tgHeight + _._options.topGap + _._options.bottomGap)))).toFixed(2);
			_._$tg.css('background-position', _._bgPosiX + '%' + ' ' + (_._bgPosiY + (_._posiValue * _._options.posiDevi)) + '%');
		}else if ((_._tgTop + _._tgHeight + _._options.bottomGap) < _._wTop) {
			// tg 아래 영역
			_._$tg.css('background-position', _._bgPosiX + '%' + ' ' + (_._bgPosiY + _._options.posiDevi) + '%');
		}else if (_._wTop < (_._tgTop - _._options.topGap)) {
			// tg 위 영역
			_._$tg.css('background-position', _._bgPosiX + '%' + ' ' + (_._bgPosiY - _._options.posiDevi) + '%');
		};
	};

	ParallaxBg.prototype._event = function(){
		var _ = this;

		_._$window.on('load resize scroll',function(){
			_.update();
		});
	};

	$.fn.parallaxBg = function(){
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		for (i = 0; i < l; i++){
			if (typeof opt == 'object' || typeof opt == 'undefined')
				_[i].pluginName = new ParallaxBg(_[i], opt);
			else
				ret = _[i].pluginName[opt].apply(_[i].pluginName, args);
			if (typeof ret != 'undefined') return ret;
		};
		return _;
	};

	window.ParallaxBg = ParallaxBg;

})(jQuery, window, document);

(function($, window, document, undefined){
	"use strict";
	/**
	* Plugin name: scrollBottomFix
	*
	* Description: 스크롤 하단 고정
	*
	* Creator: 최원형
	*
	* Version: v1.0
	*
	* Released on: 2020-09-03
	*/

	var ScrollBottomFix = function(tg, opt){
		var _ = this;
		_._$tg = $(tg);
		_._initClass = 'scrollBottomFix-init';
		_._insertWrapClass = 'scrollBottomFix-wrap';
		_._$wrap = null;
		_._$window = $(window);

		_._defaults = {
			bottom: 0,
			heightGap: 0
		};
		_._options = $.extend({}, _._defaults, opt);

		_.init();
	};

	ScrollBottomFix.prototype.init = function(){
		var _ = this;

		if (!_._$tg.hasClass(_._initClass)) {
			_._$tg.addClass(_._initClass);

			_._ready();
			_._event();
		};
	};

	ScrollBottomFix.prototype._ready = function(){
		var _ = this;

		_._$tg.wrapAll('<div class="' + _._insertWrapClass + '"></div>');
		_._$wrap = _._$tg.parent();
	};

	ScrollBottomFix.prototype.update = function(){
		var _ = this;
		var tgHeight = _._$tg.outerHeight(true);

		_._$wrap.css('height', tgHeight + _._options.heightGap + 'px');
		_._$tg.css({'bottom': _._options.bottom});
	};

	ScrollBottomFix.prototype.show = function(){
		var _ = this;

		_._$wrap.show();
		_.update();
	};

	ScrollBottomFix.prototype.hide = function(){
		var _ = this;

		_._$wrap.hide();
	};

	ScrollBottomFix.prototype._event = function(){
		var _ = this;

		_._$window.on('load resize',function(){
			_.update();
		});
	};

	$.fn.scrollBottomFix = function(){
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		for (i = 0; i < l; i++){
			if (typeof opt == 'object' || typeof opt == 'undefined')
				_[i].pluginName = new ScrollBottomFix(_[i], opt);
			else
				ret = _[i].pluginName[opt].apply(_[i].pluginName, args);
			if (typeof ret != 'undefined') return ret;
		};
		return _;
	};

	window.ScrollBottomFix = ScrollBottomFix;

})(jQuery, window, document);

(function($, window, document, undefined){
	"use strict";
	/**
	* Plugin name: scrollBottomGradation
	*
	* Description: 스크롤 하단 그라데이션
	*
	* Creator: 최원형
	*
	* Version: v1.0
	*
	* Released on: 2020-09-10
	*/

	var ScrollBottomGradation = function(tg, opt){
		var _ = this;
		_._$box = $(tg);
		_._initClass = 'scrollBottomGradation-init';
		_._insertWrapClass = 'scrollBottomGradation-wrap';
		_._insertGradClass = 'scrollBottomGradation-grad';
		_._$wrap = null;
		_._$grad = null;

		_._defaults = {
			opacityOffGap: 30
		};
		_._options = $.extend({}, _._defaults, opt);

		_.init();
	};

	ScrollBottomGradation.prototype.init = function(){
		var _ = this;

		if (!_._$box.hasClass(_._initClass)) {
			_._$box.addClass(_._initClass);

			_._ready();
			_._event();
			_.update();
		};
	};

	ScrollBottomGradation.prototype._ready = function(){
		var _ = this;

		_._$box.wrapAll('<div class="' + _._insertWrapClass + '"></div>');
		_._$box.after('<div class="' + _._insertGradClass + '"></div>');
		_._$wrap = _._$box.parent();
		_._$grad = _._$box.next();
	};

	ScrollBottomGradation.prototype.update = function(){
		var _ = this;

		_._$box.trigger('scroll');
	};

	ScrollBottomGradation.prototype._event = function(){
		var _ = this;

		_._$box.on('scroll',function(){
			var $tg = $(this),
				sTop = $tg.scrollTop(),
				tgHeight = $tg[0].clientHeight,
				tgSclHeight = $tg[0].scrollHeight,
				tgScl = sTop + tgHeight + _._options.opacityOffGap;

			if (tgScl >= tgSclHeight ) {
				_._$grad.css('opacity', 1 - ((tgScl - tgSclHeight) / _._options.opacityOffGap).toFixed(2) );
			}else{
				_._$grad.css('opacity', '1');
			};

			if (tgSclHeight - sTop == tgHeight){
				//scroll end
				_._$grad.hide();
			}else{
				_._$grad.show();
			};
		});
	};

	$.fn.scrollBottomGradation = function(){
		var _ = this,
			opt = arguments[0],
			args = Array.prototype.slice.call(arguments, 1),
			l = _.length,
			i,
			ret;
		for (i = 0; i < l; i++){
			if (typeof opt == 'object' || typeof opt == 'undefined')
				_[i].pluginName = new ScrollBottomGradation(_[i], opt);
			else
				ret = _[i].pluginName[opt].apply(_[i].pluginName, args);
			if (typeof ret != 'undefined') return ret;
		};
		return _;
	};

	window.ScrollBottomGradation = ScrollBottomGradation;

})(jQuery, window, document);

$(document).ready(function(){
	// 기본 레이어팝업 버튼
	$('.btn-layer-open').on('click',function(e){
		var $this = $(this),
			layerTarget = $this.attr('data-layer-target');

		$(layerTarget).waLayer('closeFocus', this);
		$(layerTarget).waLayer('open');
		e.preventDefault();
	});
	$('.btn-layer-close').on('click',function(e){
		var $this = $(this),
			layerTarget = $this.attr('data-layer-target');

		$(layerTarget).waLayer('closeFocus', null);
		$(layerTarget).waLayer('close');
		e.preventDefault();
	});
});


