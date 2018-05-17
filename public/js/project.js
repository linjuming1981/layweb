

class Project{

	/**
	 * 构造函数
	 */
	constructor(){

		this.tpl = {
			container : '<div class="container"></div>',
			row : '<div class="row"></div>',
			col1 : '<div class="col-1"></div>',
			cmdBox : '<div class="cmdBox"><input id="cmd" /></div>'
		}
		this.sname = 'selected_el'; // 选中节点class_name
		this.sinfo = null;  // 选中节点跟随信息box
		this.cmdBox = null; // 命令工具弹窗

		// 命令行
		this.cmds = {
		}
		
		this.addRow = this.addRow.bind(this);
		this.addCol = this.addCol.bind(this);
		this.addCol1 = this.addCol1.bind(this);
		this.select = this.select.bind(this);
		this.toggleNext = this.toggleNext.bind(this);
		this.togglePrev = this.togglePrev.bind(this);
		this.addColWidth = this.addColWidth.bind(this);
		this.reduceColWidth = this.reduceColWidth.bind(this);
		this.showSelectedInfo = this.showSelectedInfo.bind(this);
		this.delSelected = this.delSelected.bind(this);
		this.showCmdBox = this.showCmdBox.bind(this);
		this.hideCmdBOx = this.hideCmdBOx.bind(this);
		this.init = this.init.bind(this);

		this.init();
	}


	/**
	 * 选中某个节点
	 * @param  {dom} el 节点
	 */
	select(el){
		if(!el){
			var el_s = $('.'+this.sname);
			if(!el_s) return null;
			return el_s;
		}

		$('.'+this.sname).removeClass(this.sname);
		setTimeout(this.showSelectedInfo, 200);
		return $(el).addClass(this.sname);
	}

	/**
	 * 添加行
	 */
	addRow(e){
		var el_s = $('.'+this.sname);
		if(!el_s[0]){
			el_s = $('body');
		}
		if(!el_s.closest('.container')[0]){
			var container = $(this.tpl.container);
			this.select(container);
			container.appendTo(el_s);
			return this.addRow();
		}
		if(el_s.is('.container')){
			var row = $(this.tpl.row);
			this.select(row).appendTo(el_s);
			return;
		}
		if(el_s.is('.row')){
			var row = $(this.tpl.row);
			this.select(row).insertAfter(el_s);
		}
		e.preventDefault();

	}


	/**
	 * 切换下一个选中
	 * @param  {event} e 事件
	 */
	toggleNext(e){
		var el = $('.'+this.sname);
		var next = el.next();
		if(next[0]){
			this.select(next);
		}else{
			var first = el.siblings().first();
			this.select(first);
		}
		e.preventDefault();
	}

	/**
	 * 切换前一个选中
	 * @param  {event} e 事件
	 */
	togglePrev(e){
		var el = $('.'+this.sname);
		var prev = el.prev();
		if(prev[0]){
			this.select(prev);
		}else{
			var last = el.siblings().last();
			this.select(last);
		}
		e.preventDefault();
	}

	/**
	 * 添加栏col
	 */
	addCol(e){
		e.preventDefault();
		var el_s = $('.'+this.sname);
		if(!el_s[0]) return;
		var isCol = /col-/.test(el_s.attr('class'));
		var isRow = el_s.is('.row');
		if(!isRow && !isCol) return;

		if(isRow){
			// 空行时添加两个col-6
			if(!el_s.children()[0]){
				$(this.tpl.col6).appendTo(el_s);
				$(this.tpl.col6).appendTo(el_s);
				this.select(el_s.children().last());
				return;
			}
			// 下面有元素，不是col-*
			if(!el_s.children('[class*=col-]')[0]){
				return;
			}
			this.select(el_s.chilren().last());
			return this.addCol(e);
		}

		if(isCol){
			var children = el_s.parent().children();
			var len = children.length;
			if(len>3) return; // 6,4,3 最多4栏
			children.removeClass('col-6 col-4 col-3');
			if(len==2){
				children.addClass('col-4');
				this.select($(this.tpl.col4)).insertAfter(el_s);
				return;
			}
			if(len==3){
				children.addClass('col-3');
				this.select($(this.tpl.col3)).insertAfter(el_s);
				return;
			}
		}
	}

	/**
	 * 增加栏col-1
	 */
	addCol1(e){
		e.preventDefault();
		var el_s = $('.'+this.sname);
		if(!el_s[0]) return;
		var isCol = /col-/.test(el_s.attr('class'));
		var isRow = el_s.is('.row');
		if(!isRow && !isCol) return;

		if(isRow){
			if(!el_s.children()[0]){
				$(this.tpl.col1).appendTo(el_s);
				this.select(el_s.children().last());
				return;
			}
			// 下面有元素，不是col-*
			if(!el_s.children('[class*=col-]')[0]){
				return;
			}
			this.select(el_s.chilren().last());
			return this.addCol(e);
		}

		if(isCol){
			this.select($(this.tpl.col1)).insertAfter(el_s);
		}

	}


	/**
	 * 增加栏宽
	 * @param {event} e 
	 */
	addColWidth(e){
		e.preventDefault();
		var el_s = $('.'+this.sname);
		if(!el_s[0]) return;
		var arr = el_s.attr('class').match(/col-(\d+)/)
		if(!arr) return;

		var w = arr[1]*1;
		if(w>11) return;

		el_s.removeClass('col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12');
		el_s.addClass('col-'+(w+1));
		this.showSelectedInfo();
	}


	/**
	 * 减少栏宽
	 * @param  {event} e 
	 */
	reduceColWidth(e){
		e.preventDefault();
		var el_s = $('.'+this.sname);
		if(!el_s[0]) return;
		var arr = el_s.attr('class').match(/col-(\d+)/)
		if(!arr) return;

		var w = arr[1]*1;
		if(w<2) return;

		el_s.removeClass('col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12');
		el_s.addClass('col-'+(w-1));		
		this.showSelectedInfo();
	}


	/**
	 * 删除选中
	 * @param  {event} e 
	 */
	delSelected(e){
		var el_s = this.select();
		if(!el_s) return;
		if(el_s.is('body')) return;

		var prev = el_s.prev();
		var next = el_s.next();
		var parent = el_s.parent();

		if(next[0]){
			this.select(next);
		}else if(prev[0]){
			this.select(prev);
		}else{
			this.select(parent);
		}
		el_s.remove();
	}


	/**
	 * 显示选中节点的id和class信息
	 */
	showSelectedInfo(){
		if(!this.sinfo){
			var info_div = '<div class="selected_el_info"><span><i></i></span></div>';
			this.sinfo = $(info_div);
			this.sinfo.appendTo('body');
		}
		var el_s = $('.'+this.sname);

		// class="hello world" => .hello.world
		var class_str = el_s.attr('class') || '';
		if(class_str){
			var class_arr = class_str.split(' ');
			$.each(class_arr, function(i,n){
				class_arr[i] = '.'+n;
			});
			class_str = class_arr.join('');
			class_str = class_str.replace('.selected_el','');
		}

		// id="good boy" => #good#boy
		var id_str = el_s.attr('id') || '';
		if(id_str){
			var id_arr = id_str.split(' ');
			$.each(id_arr, function(i,n){
				id_arr[i] = '#'+n;
			});
			id_str = id_arr.join('');
		}

		// #good#boy.hello.world
		this.sinfo.children().children().html(id_str+class_str);
		this.sinfo.show();

		// 偏移位置
		var offset = el_s.offset();
		var x = offset.left + el_s.outerWidth();
		var y = offset.top;
		if(y<30){
			y += el_s.height() + this.sinfo.children().outerHeight()+2;
		}
		this.sinfo.css({
			left : x+'px',
			top : y+'px'
		});

	}

	/**
	 * 显示命令行
	 * @param  {event} e 事件
	 */
	showCmdBox(e){
		e.preventDefault();
		var _this = this;
		if(!this.cmdBox){
			this.cmdBox = $(this.tpl.cmdBox);
			var cmds = $.map(this.cmds, function (value, key) { return { value: value, data: key }; });
			this.cmdBox.appendTo('body');

			$('#cmd').autocomplete({
				lookup : cmds,
				tabDisabled: false,
				onSelect : function(suggestion){
					var fnName = suggestion.data;
					_this.hideCmdBOx();
					_this[fnName]();
				}
			});
		}
		this.cmdBox.show();
		$('#cmd').focus();
	}


	/**
	 * 隐藏命令行
	 * @param  {event} e 事件
	 */
	hideCmdBOx(e){
		if(e){
			e.preventDefault();
		}
		$('#cmd').val('').blur();
		if(this.cmdBox){
			this.cmdBox.hide();
		}
	}


	/**
	 * 按键绑定
	 */
	bindKeys(){
		var doc = $(document);
		var _this = this;

		doc.bind('keydown.r', _this.addRow );
		doc.bind('keydown.i', _this.addCol1 );
		doc.bind('keydown.tab', _this.toggleNext );
		doc.bind('keydown.down', _this.toggleNext );
		doc.bind('keydown.up', _this.togglePrev );
		doc.bind('keydown.Ctrl_right', _this.addColWidth );
		doc.bind('keydown.Ctrl_left', _this.reduceColWidth );
		doc.bind('keydown.d', _this.delSelected );
		doc.bind('keydown.Ctrl_Shift_p', _this.showCmdBox );
		doc.bind('keydown.esc', _this.hideCmdBOx );

	}

	/**
	 * 初始化
	 */
	init(){
		this.bindKeys();
	}


}

var pj = new Project();
