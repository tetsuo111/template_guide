(function() {
  function AddTableRow(btn, max) {
    this.btn = btn;
    this.maxRowNum = max;
    this.index = this.btn.dataset.addRowBtn;
    this.targetTable = document.querySelector('[data-add-row-target="' + this.index + '"]');
    this.targetTbody = this.targetTable.querySelector('tbody');
    this.tr = this.targetTbody.firstElementChild;
    this.cloneSource = this.tr.cloneNode(true);
    this.count = 1;
    this.handleEvents();
  }

  AddTableRow.prototype.handleEvents = function() {
    var closeBtn = this.tr.querySelector('[data-add-row-close]');
    this.addCloseEvent(closeBtn);
    var self = this;
    this.btn.addEventListener('click', function() {
      if (self.count !== Number(self.maxRowNum)) {
        var closeBtn = self.cloneSource.querySelector('[data-add-row-close]');
        self.addCloseEvent(closeBtn);
        self.add();
      }
    });
  }

  /**
   * addCloseEvent 要素削除する関数
   * @param  {HTMLObj} closeBtn 要素を削除するボタン
   */
  AddTableRow.prototype.addCloseEvent = function(closeBtn) {
     // 追加しようとしている要素の閉じるボタンにイベント追加
    var $tr = $(closeBtn).closest('tr');
    var self = this;
    closeBtn.addEventListener('click', function() {
      $tr.remove();
      self.count --;
      self.activateBtn();
    });
  }

  /**
   * add クローンした要素を追加
   */
  AddTableRow.prototype.add = function() {
    this.targetTbody.appendChild(this.cloneSource); // 次に追加する要素をクローン生成
    this.addRelatedEvnets()

    this.cloneSource = this.cloneSource.cloneNode(true);
    this.count ++;
    if (this.count === Number(this.maxRowNum)) {
      this.disableBtn();
    }
  }

  /**
   * ボタンをdisabledにする
   */
  AddTableRow.prototype.disableBtn = function() {
    this.btn.setAttribute('disabled', 'disabled');
    this.btn.classList.add('btn--disabled');
  }

  /**
   * ボタンをdisabledの解除する
   */
  AddTableRow.prototype.activateBtn = function() {
    this.btn.removeAttribute('disabled');
    this.btn.classList.remove('btn--disabled');
  }

  /**
   * その他のイベントを登録する
   */
  AddTableRow.prototype.addRelatedEvnets = function() {
    // カンマ付与の関数追加
    var eleArr = Array.prototype.slice.call(this.cloneSource.querySelectorAll('.js-add-comma'));
    eleArr.forEach(function(ele) {
      model.funcStore.handleAddComma(ele);
    });
  }

  var addTableRowBtns = Array.prototype.slice.call(document.querySelectorAll('[data-add-row-btn]'));
  if (addTableRowBtns.lenght !== 0) {
    addTableRowBtns.forEach(function(btn) {
      var max = btn.dataset.addRowMax;
      new AddTableRow(btn, max);
    });
  }
})();

function appModel() {
  this.funcStore = {}
};

appModel.prototype.set = function(key, func) {
  if (!this.funcStore[key]) {
    this.funcStore[key] = func;
  }
}

var model = new appModel();

(function() {
  // ボタンクリック時の演出コントロール
  var btns = document.querySelectorAll('.btn');

  for (var i = 0; i < btns.length; i++) {
    if (!btns[i].classList.contains('btn--plain')) {
      var btn = btns[i].firstElementChild;
      // クリックされたらクラス付与
      btn.addEventListener('mousedown', function() {
        var target = this;
        if (!target.classList.contains('btn--disabled') && !target.classList.contains('is-clicked')) {
          target.classList.add('is-clicked');
          setTimeout(function() {
            target.classList.remove('is-clicked');
          }, 400);
        }
      })
    }
  }

  var navListItems = document.querySelectorAll('.nav__list__item');

  for (var i = 0; i < navListItems.length; i++) {
    var item = navListItems[i];
    // クリックされたらクラス付与
    item.addEventListener('mousedown', function() {
      var target = this;
      if (!target.classList.contains('is-clicked')) {
        target.classList.add('is-clicked');
        setTimeout(function() {
          target.classList.remove('is-clicked');
        }, 400);
      }
    })
  }

  var navListItems = document.querySelectorAll('.header__tool__content__item');

  for (var i = 0; i < navListItems.length; i++) {
    var item = navListItems[i];
    // クリックされたらクラス付与
    item.addEventListener('mousedown', function() {
      var target = this;
      if (!target.classList.contains('header__tool__content__item--static') && !target.classList.contains('is-clicked')) {
        target.classList.add('is-clicked');
        setTimeout(function() {
          target.classList.remove('is-clicked');
        }, 400);
      }
    })
  }
})();

(function() {
  // セレクトボックスのテキストカラーコントロール
  var formSelectArr = Array.prototype.slice.call(document.querySelectorAll('.form-select'));

  var checkHasValue = function(val, target) {
    if (val) {
      target.classList.add('has-value');
    } else {
      target.classList.remove('has-value');
    }
  }

  if (formSelectArr.length !== 0) {
    formSelectArr.forEach(function(formSelect) {
      var select = formSelect.firstElementChild;
      checkHasValue(formSelect.firstElementChild.value, formSelect);
      select.addEventListener('change', function(e) {
        checkHasValue(e.target.value, formSelect);
      });
    })
  }
})();

(function() {
  // target="_blank"にアイコン付与付与
  var targetBlankLinks = Array.prototype.slice.call(document.querySelectorAll('.txt-link[target="_blank"]'));
  targetBlankLinks.forEach(function(link) {
    var iconELe = document.createElement('i');
    iconELe.classList.add('icon');
    iconELe.classList.add('icon-blank');
    link.appendChild(iconELe);
  });
})();

(function() {
  // .txt-attentionにアイコン付与付与
  var txtAttentions = Array.prototype.slice.call(document.querySelectorAll('.txt-attention'));
  txtAttentions.forEach(function(ele) {
    var chara = ele.innerHTML.slice(0, -1);
    var lastChara = ele.innerHTML.slice(-1);
    lastChara = '<span class="txt-attention__last_chara">' + lastChara + '</span>';
    ele.innerHTML = chara + lastChara;
  });
})();

(function() {
  // ページトップに戻るボタン
  var toTop = document.querySelector('.to-top');
  var isShown = false;
  var scrollTop = $(window).scrollTop();

  if (toTop) {
    window.addEventListener('scroll', function() {
      scrollTop = $(window).scrollTop();
      if (scrollTop > 800) {
        if (isShown === false) {
          toTop.style.display = 'block';
          setTimeout(function() {
            toTop.style.opacity = 1;
          }, 10);
          isShown = true;
        }
      } else {
        if (isShown === true) {
          toTop.style.opacity = 0;

          setTimeout(function() {
            toTop.style.display = 'none';
          }, 300);
          isShown = false;
        }
      }
    })
    toTop.addEventListener('click', function() {
      $('html, body').animate({ scrollTop: 0 }, '400');
    });
  }
})();

(function() {
  // ボタンのデフォルトイベントキャンセル
  var buttons = Array.prototype.slice.call(document.querySelectorAll('button'));
  buttons.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      if (btn.getAttribute('type') !== 'submit') {
        e.preventDefault();
        document.activeElement.blur(); // フォームのフォーカスを外す
      }
    });
  });
})();

(function() {
  // クリック後ボタンをdisabledにする
  var btns = Array.prototype.slice.call(document.querySelectorAll('.js-prevent-double-click'));
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btn.setAttribute('disabled', 'disabled');
      btn.classList.add('btn--disabled');
    });
  });
})();

(function() {
  // 金額などの入力の際に3桁ごとに「,」をつける
  var addCommaInput = Array.prototype.slice.call(document.querySelectorAll('.js-add-comma'));

  var handleAddComma = function(ele) {
    var input = ele.firstElementChild;
    var val;
    var newVal;

    var separate = function(num){
      num = String(num);
      var separated = '';
      var nums = num.split('');
      var len = nums.length;
      for(var i = 0; i < len; i++){
        separated = nums[(len - 1) - i] + separated;
        if(i % 3 === 2 && nums[(len - 2) - i]) {
          separated = ',' + separated;
        }
      }
      return separated;
    }

    input.addEventListener('blur', function(e) {
      setTimeout(function() {
        if (e.target.value.match(/^[0-9,]+$/)) {
          val = e.target.value.toString();
          newVal = val.replace(/,/g, '');
          newVal = separate(Number(newVal));
          e.target.value = newVal;
        }
      }, 10);
    })
  }

  addCommaInput.forEach(function(ele) {
    handleAddComma(ele);
  });

  model.set('handleAddComma', handleAddComma);
})();

(function() {
  // ファイルアップロードのinputフォーム
  var fileInputArr = Array.prototype.slice.call(document.querySelectorAll('.js-file-input'));
  fileInputArr.forEach(function(fileInput) {
    var input = fileInput.previousElementSibling;
    var btn = fileInput.nextElementSibling;
    fileInput.innerHTML = 'ファイルを指定'
    fileInput.addEventListener('click', function() {
      $(input).focus();
      $(input).click();
    });
    btn.addEventListener('click', function() {
      $(input).focus();
      $(input).click();
    });
    input.addEventListener('change', function() {
      if (input.value) {
        fileInput.innerHTML = input.value;
        fileInput.classList.add('is-filled');
      } else {
        fileInput.innerHTML = 'ファイルを指定'
        fileInput.classList.remove('is-filled');
      }
    });

  });
})();

(function() {
  // 日付入力フィールドセットリスト
  var dateInputs = document.querySelectorAll('.js-form-date');
  dateInputs = Array.prototype.slice.call(dateInputs);
  // 時間入力フィールドセットリスト
  var timeInputs = document.querySelectorAll('.js-form-time');
  timeInputs = Array.prototype.slice.call(timeInputs);

  /**
   * 日付入力フォームの処理（Flatpickrを使用）
   */
  var handleDateTimeInput = function() {
    var createDatePicker = function(target) {
      return flatpickr(target, {
        wrap: true,
        allowInput: true,
        dateFormat: "Y/m/d",
        onChange: function() {
          dateTimeValidation.validate(target.firstElementChild, 'date');
        }
      });
    }

    var createTimePicker = function(target) {
      $(target).clockpicker({
        donetext: '選択',
        afterDone: function() {
          var inputArea = target.firstElementChild;
          var value = inputArea.value;
          inputArea.value = value + ':00'
          dateTimeValidation.validate(target.firstElementChild, 'time');
        }
      });
    }

    var createFlatPicker = function(target) {
      return createDatePicker(target);
    };

    var handleDatePicker = function(target, picker) {
      var inputArea = target.firstElementChild;
      var value;
      // 直接入力する際はpickerを表示させないようにインスタンスを削除
      inputArea.addEventListener('mouseenter', function() {
        value = inputArea.value;
        picker.destroy();
        inputArea.value = value;
        inputArea.value = value; // Safariバージョン10のバグ対応用
      });
      // カーソルがinputから外れたら再度インスタンスを作成
      inputArea.addEventListener('mouseout', function() {
        value = inputArea.value;
        picker = createFlatPicker(target);
        inputArea.value = value;
        inputArea.value = value; // Safariバージョン10のバグ対応用
      });
    };

    var handleTimePicker = function(target) {
      var inputArea = target.firstElementChild;
      var value;
      // 直接入力する際はpickerを表示させないようにインスタンスを削除
      inputArea.addEventListener('mouseenter', function() {
        value = inputArea.value;
        $(target).clockpicker('remove');
        inputArea.value = value;
      });
      // カーソルがinputから外れたら再度インスタンスを作成
      inputArea.addEventListener('mouseout', function() {
        createTimePicker(target);
      });
    }

    // 日付Picker登録
    dateInputs.forEach(function(dateInput) {
      var picker = createFlatPicker(dateInput);
      handleDatePicker(dateInput, picker);
    });
    // 時間Picker登録
    timeInputs.forEach(function(timeInput) {
      createTimePicker(timeInput);
      handleTimePicker(timeInput);
    });
  }

  handleDateTimeInput();

  /**
   * 日時入力のエラーハンドル、入力補完
   */
  var handleDateTimeError = function() {

    var handleEvents = function(ele, type) {
      var target = ele.firstElementChild;

      // フォーカスが外れたタイミングでvalidationを実行
      target.addEventListener('blur', function() {
        dateTimeValidation.validate(target, type);
      });
      // 入力値がエラーの場合は、
      //    Tabキーでの移動を禁止、validationを実行
      //    returnキーも実行させず、validationを実行
      target.addEventListener('keydown', function(e) {
        if (!dateTimeValidation.preventTabValidate(target, type) && e.keyCode === 9) {
          e.preventDefault();
          dateTimeValidation.validate(target, type);
        }else if(e.keyCode === 13){
          if(!dateTimeValidation.preventTabValidate(target, type)){
            e.preventDefault();
          }
          dateTimeValidation.validate(target, type);
        }
      });
    };

    if (dateInputs.length !== 0) {
      for (var i = 0; i < dateInputs.length; i++) {
        handleEvents(dateInputs[i], 'date');
      }
    }
    if (timeInputs.length !== 0) {
      for (var i = 0; i < timeInputs.length; i++) {
        handleEvents(timeInputs[i], 'time');
      }
    }
  }

  handleDateTimeError();
})();


/**
 * 日付・時間入力のバリデーション
 */
function DateTimeValidation() {}

DateTimeValidation.prototype.evalValue = function(value, type) {
  var statusArr = [];

  // validのケース
  if (type === 'date' && value && value.match(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/)) { // 日付が全て正しく入力されていた場合
    statusArr.push('is-valid');
    return statusArr;
  }
  if (type === 'time' && value && value.match(/^[0-9]{2}:[0-9]{2}:[0-9]{2}$/)) { // 時間が全て正しく入力されていた場合
    statusArr.push('is-valid');
    return statusArr;
  }
  if (type === 'date' && value && value.match(/^[0-9]{8}$/)) { // 日付が数字8文字でのみで入力されていた場合
    statusArr.push('is-all-num');
    return statusArr;
  }
  if (type === 'time' && value && value.match(/^[0-9]{6}$/)) { // 時間が数字8文字でのみで入力されていた場合
    statusArr.push('is-all-num');
    return statusArr;
  }
  if (!value) {
    statusArr.push('is-valid');
    return statusArr;
  }

  // invalidのケース
  if (type === 'date' && value && !value.match(/^[0-9]{8}$/)) { //日付入力が8文字の数字でない場合
    statusArr.push('is-not-8num-error');
  }
  if (type === 'time' && value && !value.match(/^[0-9]{6}$/)) { //時間入力が6文字の数字でない場合
    statusArr.push('is-not-6num-error');
  }
  if (type === 'date' && value && !value.match(/^[0-9/]+$/)) { //日付入力に数字と/でないものが含まれている
    statusArr.push('is-not-num-error');
  }
  if (type === 'time' && value && !value.match(/^[0-9:]+$/)) { //時間入力に数字と:でないものが含まれている
    statusArr.push('is-not-num-error');
  }
  return statusArr;
};

DateTimeValidation.prototype.preventTabValidate = function(target, type) {
  var value = target.value;
  var statusArr = this.evalValue(value, type);

  // エラーを含む場合はfalseを返す
  if (
    statusArr.indexOf('is-not-8num-error') >= 0 ||
    statusArr.indexOf('is-not-6num-error') >= 0 ||
    statusArr.indexOf('is-not-num-error') >= 0
  ) {
    return false;
  }
  return true;
}

DateTimeValidation.prototype.validate = function(target, type) {
  var value = target.value;
  var statusArr = this.evalValue(value, type);
  var self = this;

  // エラーの処理がある場合は一旦全てのエラーを削除する
  if (
    statusArr.indexOf('is-not-8num-error') >= 0 ||
    statusArr.indexOf('is-not-6num-error') >= 0 ||
    statusArr.indexOf('is-not-num-error') >= 0
  ) {
    this.removeAllError(target, type);
  }

  statusArr.forEach(function(status) {
    switch (status) {
      case 'is-not-8num-error':
        self.runError(target, type, status);
        break;
      case 'is-not-6num-error':
        self.runError(target, type, status);
        break;
      case 'is-not-num-error':
        self.runError(target, type, status);
        break;
      case 'is-all-num':
        self.runComplement(target, type, status);
        break;
      case 'is-valid':
        self.removeError(target, type, status);
        break;
    }
  });
};

DateTimeValidation.prototype.formatDate = function(target) {
  var value = target.value.replace(/\//g, '');
  var valueLength = value.length;
  var newValue = value.substr(0, 4) + '/' + value.substr(4, 2) + '/' + value.substr(6, 2)
  target.value = newValue;
};

DateTimeValidation.prototype.formatTime = function(target) {
  var value = target.value.replace(/:/g, '');
  var valueLength = value.length;
  var newValue = value.substr(0, 2) + ':' + value.substr(2, 2) + ':' + value.substr(4, 2)
  target.value = newValue;
};

DateTimeValidation.prototype.runComplement = function(target, type, status) {
  if (type === 'date') {
    this.formatDate(target);
  } else if (type === 'time') {
    this.formatTime(target);
  }
  status = 'is-valid'; // statusを'isValid'に変更してエラー解除の処理を実行
  this.removeError(target, type, status);
};

DateTimeValidation.prototype.removeError = function(target, type, status) {
  var $formDataInput = $(target).closest('.form-date-input');
  var $formListItemWrapper = $(target).closest('.form-list__item__content__inner');

  if (type === 'date') {
    $formDataInput.removeClass('error-date');
  } else if (type === 'time') {
    $formDataInput.removeClass('error-time');
  }

  $(target).removeClass('is-not-8num-error');
  $(target).removeClass('is-not-6num-error');
  $(target).removeClass('is-not-num-error');
  this.identifyRmoveEle($formListItemWrapper, 'is-not-8num-error');
  this.identifyRmoveEle($formListItemWrapper, 'is-not-6num-error');
  this.identifyRmoveEle($formListItemWrapper, 'is-not-num-error');
};

DateTimeValidation.prototype.removeAllError = function(target, type) {
  var $formDataInput = $(target).closest('.form-date-input');
  var $formListItemWrapper = $(target).closest('.form-list__item__content__inner');

  if (type === 'date') {
    $formDataInput.removeClass('error-date');
  } else if (type === 'time') {
    $formDataInput.removeClass('error-time');
  }

  $(target).removeClass('is-not-8num-error');
  $(target).removeClass('is-not-6num-error');
  $(target).removeClass('is-not-num-error');
  this.identifyRmoveEle($formListItemWrapper, 'is-not-8num-error');
  this.identifyRmoveEle($formListItemWrapper, 'is-not-6num-error');
  this.identifyRmoveEle($formListItemWrapper, 'is-not-num-error');
};


DateTimeValidation.prototype.identifyRmoveEle = function($formListItemWrapper, dataName) {
  var $targetEle = $formListItemWrapper.find('[data-error-txt="' + dataName + '"]'); // 消すエラーメッセージ
  var allValidFlag = !$formListItemWrapper[0].querySelector('.' + dataName) ? true : false;
  if (allValidFlag) {
    $targetEle.css({ display: 'none' })
  }
}

DateTimeValidation.prototype.runError = function(target, type, status) {
  var $formDataInput = $(target).closest('.form-date-input');
  var $formListItemWrapper = $(target).closest('.form-list__item__content__inner');
  var $errorTxtEle = $formListItemWrapper.find('[data-error-txt="' + status + '"]')

  if (type === 'date') {
    $formDataInput.addClass('error-date');
  } else if (type === 'time') {
    $formDataInput.addClass('error-time');
  }
  $(target).addClass(status);

  // エラーを含むものが一つでもあればエラーテキストを表示
  var hasError = $formListItemWrapper.find('.error-date') || $formListItemWrapper.find('.error-time') ? true : false ;
  if (hasError) {
    $errorTxtEle.css({ display: 'block' });
  }
};

var dateTimeValidation = new DateTimeValidation();

(function() {
  // ハンバーガーメニュー
  function handleHumbergerMenu() {
    var btn = document.querySelector('.js-header-menu-btn');
    var nav = document.getElementById('nav');
    var main = document.getElementById('main');
    if (btn && nav && main) {
      btn.addEventListener('click', function() {
        if (btn.classList.contains('is-closed')) {
          btn.classList.remove('is-closed');
          nav.classList.remove('is-closed');
          main.classList.remove('is-wide');
        } else {
          btn.classList.add('is-closed');
          nav.classList.add('is-closed');
          main.classList.add('is-wide');
        }
      });
    }
  }

  new handleHumbergerMenu();

  // ヘッダーエリアのツール類
  function handleTools(ele) {
    var btn = ele.querySelector('.js-header-tool-btn');
    var target = ele.querySelector('.js-header-tool-target');

    var isOpen = false;

    btn.addEventListener('click', function(e) {
      if (isOpen) {
        $(target).slideUp();
        isOpen = false;
      } else {
        $(target).slideDown();
        isOpen = true;
      }
    });
  }

  var headerToolArr = Array.prototype.slice.call(document.querySelectorAll('.js-header-tool'));
  headerToolArr.forEach(function(headerTool) {
    new handleTools(headerTool);
  })
})();

(function() {
  // モーダルの操作
  var handleModal = function(btn) {
    var index = btn.dataset.modalOpenNum;
    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-modal-target-num="' + index + '"]'));
    var closeBtns = Array.prototype.slice.call(document.querySelectorAll('[data-modal-close-num="' + index + '"]'));

    closeBtns.forEach(function(closeBtn) {
      btn.addEventListener('click', function() {
        targets.forEach(function(target) {
          $(target).show();
        });
      });
    });

    closeBtns.forEach(function(closeBtn) {
      closeBtn.addEventListener('click', function() {
        targets.forEach(function(target) {
          $(target).hide();
        });
      });
    });
  }

  var btns = Array.prototype.slice.call(document.querySelectorAll('[data-modal-open-num]'))
  btns.forEach(function(btn) {
    handleModal(btn);
  });

  // アクション完了通知の操作
  var handleActionNotice = function(btn) {
    var index = btn.dataset.noticeOpenNum;
    var target = document.querySelectorAll('[data-notice-target-num="' + index + '"]');

    btn.addEventListener('click', function() {
      var $target = $(target);
      $target.css({opacity: 1}).show();

      var erase = function() {
        return $target.animate({opacity: 0}, 600).promise();
      }

      setTimeout(function() {
        erase().then(function() {
          $target.css({display: 'none'})
        });
      }, 800)
    });
  }

  var btns = Array.prototype.slice.call(document.querySelectorAll('[data-notice-open-num]'))
  btns.forEach(function(btn) {
    handleActionNotice(btn);
  });
})();

(function() {

  var handleSubmit = function(form, num) {
    var submitBtns = form.querySelectorAll('.js-form-submit-btn');

    submitBtns = Array.prototype.slice.call(submitBtns); // 配列に変換
    var submitTarget = document.querySelector('.js-form-submit-target-' + num);

    if (submitBtns.length != 0 && submitTarget) {
      submitBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          $(submitTarget).show();
          model.funcStore.handleTableCell();
        });
      });
    }
  }

  var setHandler = function(form, num) {
    return handleSubmit(form, num);
  }

  for (var i = 0; i < $('[class*="js-form-submit-handler"]').length; i++) {
    var num = i + 1;
    var form = document.querySelector('.js-form-submit-handler-' + num);

    setHandler(form, num);
  }
})();

$(function() {
  function handleTableCell() {
    var tableOver = document.querySelector('.table-over');
    if (tableOver.innerHTML) return false;
    this.tableListWrapper = document.querySelector('.table-list-wrapper');
    this.tableListInner = document.querySelector('.table-list-inner');
    this.$tableList = $('.table-list');
    this.$tabeOver = $('.table-over');
    this.$thead = $('.table-list thead').clone();
    this.$thead.appendTo(this.$tabeOver);
    this.trArr = Array.prototype.slice.call($('.table-list tbody tr')); // table-listのtrリスト
    this.thArr = Array.prototype.slice.call($('.table-over th')); // table-overのthリスト

    this.setSizer();
    var self = this;
    setTimeout(function() {
      self.addBgEle();
      self.adjustWidth(self.$thead.width());
      self.initHeight();
      self.handleResize();
    }, 100);
  }

  handleTableCell.prototype.handleResize = function() {
    var self = this;
    var timer;
    window.addEventListener('resize', function() {
      clearTimeout(timer);
      timer = setTimeout(function() {
        self.adjustWidth();
      }, 300);
    });
  }

  handleTableCell.prototype.setSizer = function() {
    var self = this;
    var thHeight = $(this.thArr[0]).height();

    this.thArr.forEach(function(th) {
      $(th).resizable({
        handles: "e",
        minHeight: thHeight,
        maxHeight: thHeight,
        minWidth: 45,
        resize: function (event, ui) {
          var sizer = event.target.querySelector('.sizer');
          var width = ui.size.width;
          $(sizer).width(width);
        },
        stop: function(event, ui) {
          var width = ui.size.width;
          self.adjustWidth(width);
          self.adjustBgWidth();
        }
      });
    })
  }

  handleTableCell.prototype.initHeight = function() {
    var criteriaHeight = $(window).height() * 0.75;
    var tableListHeight = this.$tableList.height();
    if (tableListHeight < criteriaHeight) {
      this.tableListWrapper.style.height = tableListHeight + 'px';
      this.tableListInner.style.height = tableListHeight + 'px';
    } else {
      this.tableListWrapper.style.height = criteriaHeight + 'px';
      this.tableListInner.style.height = criteriaHeight + 'px';
    }
  }

  handleTableCell.prototype.adjustWidth = function(width) {
    var thWidthArr = []; // thのサイズを格納する配列
    var targetTr;
    var tdArr;
    var td;

    for (var i = 0; i < this.thArr.length; i++) {
      thWidthArr.push(this.thArr[i].clientWidth);
    }

    for (var i = 0; i < this.trArr.length; i++) {
      targetTr = this.trArr[i]; // trごとに処理する
      tdArr = targetTr.querySelectorAll('td');
      for (var t = 0; t < tdArr.length; t++) {
        td = (tdArr[t]);

        if (t === tdArr.length - 1) {
          td.style.width = (thWidthArr[t] - 17) + 'px'; // thのpadding+スクロールバーの分を差し引く
        }　else {
          td.style.width = (thWidthArr[t]) + 'px'; // thのpaddingを差し引く
        }
      }
    }
    var tableWidth = this.$tabeOver.width();
    var wrapperWidth = this.tableListWrapper.clientWidth;
    if (tableWidth < wrapperWidth) {
      $('.table-list-inner').width(wrapperWidth);
    } else {
      $('.table-list-inner').width(tableWidth);
    }

    var self = this;
    setTimeout(function() {
      self.adjustBgWidth();
    }, 100)
  }

  handleTableCell.prototype.addBgEle = function() {
    var innerWidth = this.tableListInner.clientWidth;

    for (var i = 0; i < this.trArr.length; i++) {
      var div = document.createElement('div');
      div.classList.add('bg-ele');
      div.style.width = innerWidth + 'px';
      this.trArr[i].appendChild(div);
    }
  }

  handleTableCell.prototype.adjustBgWidth = function() {
    var innerWidth = this.tableListInner.clientWidth;

    for (var i = 0; i < this.trArr.length; i++) {
      var bgEle = this.trArr[i].querySelector('.bg-ele');
      bgEle.style.width = innerWidth + 'px';
    }
  }

  var initHandleTableCell = function() {
    new handleTableCell();
  }

  model.set('handleTableCell', initHandleTableCell);
});

(function() {
  // "js-toggle-btn-{num}"のクラスを持つ要素をクリックで、
  // "js-toggle-content-{num}"のクラスを持つ要素をスライドトグル
  var handleToggle = function(num) {
    var $toggleBtn = $('.js-toggle-btn-' + num);
    var $toggleContent = $('.js-toggle-target-' + num);

    for (var i = 0; i < $toggleBtn.length; i++) {
      $toggleBtn[i].addEventListener('click', function() {
        // submitボタンの場合、実行を遅らせる
        if (this.classList.contains('js-form-submit-btn')) {
          setTimeout(function() {
            $toggleContent.slideToggle();
            $toggleBtn.toggleClass('is-closed');
            $toggleBtn.toggleClass('is-open');
          }, 500)
        } else {
          $toggleContent.slideToggle();
          $toggleBtn.toggleClass('is-closed');
          $toggleBtn.toggleClass('is-open');
        }
        callbackFuncs();
      });
    }
  }

  var callbackFuncs = function() {
    // テーブル操作関数実行
  }

  var setToggle = function(num) {
    return handleToggle(num);
  }

  for (var i = 0; i < $('[class*="js-toggle-btn-"]').length; i++) {
    var num = i + 1;
    setToggle(num);
  }
})();

(function() {
  var disableBtn = function(btns) {
    for (var i = 0; i < btns.length; i++) {
      btns[i].parentNode.classList.add('btn--disabled');
      btns[i].setAttribute('disabled', 'disabled');
    }
  }

  var showBtn = function(btns) {
    for (var i = 0; i < btns.length; i++) {
      btns[i].parentNode.classList.remove('btn--disabled');
      btns[i].removeAttribute('disabled');
    }
  }

  /**
   * フォームの検知イベントの登録
   * @param  {DOM} ele  input要素などのDOM
   * @param  {func} func イベント発動時に発火させる関数
   */
  var formEvnetHandler = function(ele, func) {
    ele.addEventListener('keyup', function() {
      func();
    });
    ele.addEventListener('paste', function() {
      setTimeout(function() {
        func();
      }, 10);
    });
    ele.addEventListener('change', function() {
      func();
    });
  }

  /**
   * 日付判定
   */
  var validateDate = function(ele) {
    return ele.value.match(/[0-9]{4}\/[0-9]{2}\/[0-9]{2}/) ? true : false;
  }

  /**
   * 時間判定
   */
  var validateTime = function(ele) {
    return ele.value.match(/[0-9]{2}:[0-9]{2}:[0-9]{2}/) ? true : false;
  }


  /**
   * 一つでも入力されていれば通す関数
   * @param  {DOM} form フォームのDOM
   */
  var anyRequiredValidation = function(form) {
    var query = '.js-any-required';
    var requiredEles = Array.prototype.slice.call(form.querySelectorAll(query)); //HTML Listから配列に変換
    var formBtns = form.querySelectorAll('.js-form-btn');

    // 一つでも値があればshowBtnを実行
    var validate = function() {
      var validFlag = false;

      requiredEles.forEach(function(ele) {
        // 日付入力フォームかの判定
        var isDate = ele.classList.contains('form-date-input__date') ? true : false ;
        var isTime = ele.classList.contains('form-date-input__time') ? true : false ;

        // 日付かつvalidでなければdisabled
        if (ele.value && isDate && validateDate(ele) === false) {
          disableBtn(formBtns);
          return true;
        }
        // 時間かつvalidでなければdisabled
        if (ele.value && isTime && validateTime(ele) === false) {
          disableBtn(formBtns);
          return true;
        }
        // 入力されていなければdisabled
        if (!ele.value) {
          disableBtn(formBtns);
          return true;
        }
        validFlag = true;
      });
      validFlag && showBtn(formBtns);
    }

    requiredEles.forEach(function(ele) {
      formEvnetHandler(ele, validate)
    });

    validate();
  }


  // フォーム登録
  var form = document.querySelectorAll('form');
  for (var i = 0; i < form.length; i++) {
    anyRequiredValidation(form[i]);
  }
})();

(function() {
  // デフォルトイベントをキャンセル
  var cancelEvent = function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
    });
  }
  var jsSubmitBtn = document.querySelectorAll('.js-form-submit-btn');
  for (var i = 0; i < jsSubmitBtn.length; i++) {
    return cancelEvent(jsSubmitBtn[i]);
  }
})();
