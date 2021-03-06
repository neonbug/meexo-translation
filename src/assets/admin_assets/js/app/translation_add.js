/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["translation_add"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {};

	var app_data = {};

	function initRichEditors()
	{
		var editor_instances = {};
		var is_mobile = ($(window).width() < 768);
		var remove_buttons = is_mobile ? 
			'Print,Preview,Save,Templates,NewPage,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Language,BidiRtl,BidiLtr,About,Source,Cut,Copy,Paste,PasteText,PasteFromWord,Outdent,Indent,Blockquote,CreateDiv,Flash,SpecialChar,Smiley,PageBreak,Iframe,ShowBlocks'
			:
			'Print,Preview,Save,Templates,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Language,BidiRtl,BidiLtr,About,Flash,NewPage';
		
		var file_browser_base_href = config.base_url + '/vendor/common/admin_assets/js/ckeditor/plugins/kcfinder/';
		
		$('.field-translation-text').each(function(idx, el) {
			$('[type="checkbox"]', el).change(function() {
				var textarea = $('textarea', el);
				if (this.checked)
				{
					editor_instances[textarea.attr('name')] = CKEDITOR.replace(textarea.get(0), {
						entities: false, 
						basicEntities: false, 
						baseHref: config.base_url, 
						toolbarGroups: [
							{ name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
							{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
							{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
							{ name: 'forms', groups: [ 'forms' ] },
							{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
							{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
							'/',
							{ name: 'links', groups: [ 'links' ] },
							{ name: 'insert', groups: [ 'insert' ] },
							{ name: 'styles', groups: [ 'styles' ] },
							{ name: 'colors', groups: [ 'colors' ] },
							{ name: 'tools', groups: [ 'tools' ] },
							{ name: 'others', groups: [ 'others' ] },
							{ name: 'about', groups: [ 'about' ] }
						], 
						removeButtons: remove_buttons, 
						filebrowserBrowseUrl: file_browser_base_href + 'browse.php?opener=ckeditor&type=files', 
						filebrowserImageBrowseUrl: file_browser_base_href + 'browse.php?opener=ckeditor&type=images', 
						filebrowserFlashBrowseUrl: file_browser_base_href + 'browse.php?opener=ckeditor&type=flash', 
						filebrowserUploadUrl: file_browser_base_href + 'upload.php?opener=ckeditor&type=files', 
						filebrowserImageUploadUrl: file_browser_base_href + 'upload.php?opener=ckeditor&type=images', 
						filebrowserFlashUploadUrl: file_browser_base_href + 'upload.php?opener=ckeditor&type=flash'
					});
				}
				else
				{
					if (editor_instances[textarea.attr('name')] != undefined)
					{
						editor_instances[textarea.attr('name')].destroy();
					}
				}
			});
			
			// if current textarea's value is an HTML string, turn WYSIWYG editor on by default
			if (/<[a-z][\s\S]*>/i.test($('textarea', el).val()))
			{
				$('[type="checkbox"]', el).prop('checked', true);
				$('[type="checkbox"]', el).change();
			}
		});
	}

	module.exports.init = function(trans, config) {
		app_data.trans = trans;
		app_data.config = config;
		
		$(document).ready(function() {
			initRichEditors();
		});
	};


/***/ }
/******/ ]);