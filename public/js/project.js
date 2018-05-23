

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
		this.cmdBox_isOpen = false;  // 当前窗口是否打开

		// 命令行
		this.cmds = {
			'' : 'add:card',
		}
		
		this.addRow = this.addRow.bind(this);
		this.addCol = this.addCol.bind(this);
		this.addCol1 = this.addCol1.bind(this);
		this.select = this.select.bind(this);
		this.toggleNext = this.toggleNext.bind(this);
		this.togglePrev = this.togglePrev.bind(this);
		this.toggleParent = this.toggleParent.bind(this);
		this.toggleChild = this.toggleChild.bind(this);
		this.addColWidth = this.addColWidth.bind(this);
		this.reduceColWidth = this.reduceColWidth.bind(this);
		this.showSelectedInfo = this.showSelectedInfo.bind(this);
		this.clone = this.clone.bind(this);
		this.addSpace = this.addSpace.bind(this);
		this.delSelected = this.delSelected.bind(this);
		this.showCmdBox = this.showCmdBox.bind(this);
		this.hideCmdBox = this.hideCmdBox.bind(this);
		this.init = this.init.bind(this);
		this.add = this.add.bind(this);

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
		e.preventDefault();
		var el = $('.'+this.sname);
		var next = el.next();
		if(next[0]){
			this.select(next);
		}else{
			var first = el.siblings().first();
			this.select(first);
		}
		if(this.select().is('link,script,.selected_el_info')){
			return this.toggleNext(e);
		}
	}

	/**
	 * 切换前一个选中
	 * @param  {event} e 事件
	 */
	togglePrev(e){
		e.preventDefault();
		var el = $('.'+this.sname);
		var prev = el.prev();
		if(prev[0]){
			this.select(prev);
		}else{
			var last = el.siblings().last();
			this.select(last);
		}
		if(this.select().is('link,script,.selected_el_info')){
			return this.togglePrev(e);
		}
	}

	/**
	 * 切换到父节点
	 * @param  {event} e 事件
	 */
	toggleParent(e){
		e.preventDefault();
		var el = this.select();
		var el_p = el.parent();
		if(el_p.is('body')) return;
		this.select(el_p);
	}

	/**
	 * 切换到子节点
	 * @param  {event} e 事件
	 */
	toggleChild(e){
		e.preventDefault();
		var el = this.select();
		var el_c = el.children().eq(0);
		if(!el_c[0]) return;
		this.select(el_c);
	}

	/**
	 * 克隆节点
	 * @param  {event} e 事件
	 */
	clone(e){
		e.preventDefault();
		var el = this.select();
		if(!el) return;
		var el_clone = el.clone();
		el_clone.insertAfter(el);
		this.select(el_clone);
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

		if(!this.hasSiblings(el_s)){
			this.toggleParent(e);
		}else{
			this.toggleNext(e);
		}
		el_s.remove();
	}


	/**
	 * 是否含有兄弟节点
	 * @param  {dom}  el 
	 * @return {Boolean}  
	 */
	hasSiblings(el){
		var len = $(el).siblings().filter(function(i,n){
			return !$(n).is('link,script,.selected_el_info')
		}).length;
		if(len) return true;
		return false;
	}


	/**
	 * 添加margin或padding
	 * @param {string} type      类型 m|p
	 * @param {string} direction 方向 t|b|l|r
	 * @param {event} e      事件
	 */
	addSpace(type,direction,e){
		e.preventDefault();
		var el_s = this.select();
		var cur_i = -1;
		var cur_cn = '';
		for(var i=0; i<=5; i++){
			var class_name = type+direction+'-'+i; // ml2
			if(el_s.hasClass(class_name)){
				cur_cn = class_name;
				cur_i = i;
				break;
			}
		}
		if(cur_cn) el_s.removeClass(cur_cn);
		var next_i = cur_i+1;
		var next_cn = type+direction+'-'+next_i;
		if(next_i<=5){
			el_s.addClass(next_cn);
		}
		this.showSelectedInfo();
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
		if(!el_s[0]) return;		

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
			y += el_s.outerHeight() + this.sinfo.children().outerHeight()+2;
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
		if(this.cmdBox_isOpen) return;
		var _this = this;
		if(!this.cmdBox){
			this.cmdBox = $(this.tpl.cmdBox);
			// var cmds = $.map(this.cmds, function (value, key) { return { value: value, data: key }; });
			this.cmdBox.appendTo('body');

			var $cmd = $('#cmd');

			$cmd.autocomplete({
				// autoSelectFirst: true,
				tabDisabled: false,
				lookup : [
					{value:"add:widget:card", data:"add"},
					// {value:"add:card", data:"add1"}
				],
				onHint : function(hint){
					// console.log(hint)
				},
				onSelect : function(suggestion){
					_this.hideCmdBox();
					// var fnName = suggestion.data;
					// _this[fnName]();
				}
			});
		}
		this.cmdBox.show();
		$('#cmd').focus();
		this.cmdBox_isOpen = true;
	}


	/**
	 * 隐藏命令行
	 * @param  {event} e 事件
	 */
	hideCmdBox(e){
		if(e){
			e.preventDefault();
		}
		if(!this.cmdBox_isOpen) return;
		
		$('#cmd').val('').blur();
		if(this.cmdBox){
			this.cmdBox.hide();
		}
		this.cmdBox_isOpen = false;
	}

	/**
	 * arguments 转 数组
	 * @param  {arguments} args 
	 * @return {array}      
	 */
	argsToArr(args){
		var argsArr = [];
		for(var i=0; i<args.length; i++){
			argsArr.push(args[i]);
		}
		return argsArr;
	}

	/**
	 * 插入，新增节点
	 */
	add(){
		var args = this.argsToArr(arguments);
		var type = arguments[0]; // widget
		var fn = 'add'+ type.toString()[0].toUpperCase() + type.toString().slice(1); // addWidget
		return this[fn].apply(this, args.splice(1));
	}


	/**
	 * 添加组件
	 */
	addWidget(type){
		console.log(type);
		var _this = this;
		$.ajax({
			url : ROOT_URL+'/widget/'+type,
			success : function(html){
				_this.select().html(html);
			}
		})
	}


	/**
	 * 备份节点内部html
	 * @param  {dom} el 节点
	 */
	storeHistory(el){
		var el = $(el);
		var history = el.data('history');
		var history_ix = el.data('history_ix');
		if(!history) history = [];
		if(!history_ix) history_ix=0;

		history.splice(history_ix+1); // 如果当期状态在中间，切除数组后面的记录

		var html = el.html();
		history.push(html);
		el.data('history', history);
		el.data('history_ix', history.length-1);
	}

	/**
	 * 回滚节点内部html
	 * @param  {dom} el 节点
	 * @param  {int} step 步数
	 */
	loadHistory(el, step){
		var el = $(el);
		var history = el.data('history');
		if(!history || history.length==0 ) return;
		var ix = el.data('history_ix');

		var ix_n = el+step;
		if(ix_n<0 || ix_n>=history.length) return;
		el.data('history_ix', ix_n);
		el.html(history[ix_n]);
	}


	/**
	 * 点击选中事件
	 */
	bindClick(){
		var _this=this;
		$(document).click(function(e){
			e.preventDefault();
			var el = e.target || e.srcElement;
			el = $(el);
			if(el.is('body')) return;
			if(el.closest('.selected_el_info')[0]) return;
			_this.select(el);
		})
	}




	/**
	 * 按键绑定
	 */
	bindKeys(){
		var doc = $(document);
		var _this = this;

		doc.bind('keydown.r', _this.addRow );
		doc.bind('keydown.i', _this.addCol1 );
		doc.bind('keydown.left', _this.togglePrev );
		doc.bind('keydown.right', _this.toggleNext );
		doc.bind('keydown.up', _this.toggleParent );
		doc.bind('keydown.down', _this.toggleChild );
		doc.bind('keydown.Ctrl_right', _this.addColWidth );
		doc.bind('keydown.Ctrl_left', _this.reduceColWidth );
		doc.bind('keydown.c', _this.clone );
		doc.bind('keydown.d', _this.delSelected );
		doc.bind('keydown.Ctrl_Shift_p', _this.showCmdBox );
		doc.bind('keyup.space', _this.showCmdBox );
		doc.bind('keydown.esc', _this.hideCmdBox );
		doc.bind('keydown.Shift_right',function(e){_this.addSpace('m','r',e)});
		doc.bind('keydown.Shift_left',function(e){_this.addSpace('m','l',e)});
		doc.bind('keydown.Shift_up',function(e){_this.addSpace('m','t',e)});
		doc.bind('keydown.Shift_down',function(e){_this.addSpace('m','b',e)});
		doc.bind('keydown.Ctrl_Shift_right',function(e){_this.addSpace('p','r',e)});
		doc.bind('keydown.Ctrl_Shift_left',function(e){_this.addSpace('p','l',e)});
		doc.bind('keydown.Ctrl_Shift_up',function(e){_this.addSpace('p','t',e)});
		doc.bind('keydown.Ctrl_Shift_down',function(e){_this.addSpace('p','b',e)});


	}

	/**
	 * 初始化
	 */
	init(){
		this.bindKeys();
		this.bindClick();
	}


}

var pj = new Project();
