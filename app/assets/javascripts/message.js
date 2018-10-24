$(function() {
  function buildHTML(message){
    var img ='';

    if ( message.image ){
      img = `<img src = "${ message.image }", class="lower-message__image">`
    };

    var html = `<div class="message" data-id='${ message.id }'>
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.time }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${ message.content }
                    </p>
                    ${ img }
                  </div>
                </div>`;
    return html;
  }
  // HTMLを追加している。簡単な記述で実現できるのはテンプレートリテラル記法を使用しているため
  // テンプレートリテラル記法は｀｀で囲むことによって、複数行文字列や文字列内挿入機能を使用できるもの。
  // buildHTMLの引数として渡されたcommentはサーバーから返されたデータであるjbuilderのデータであるため、ファイル内で定義したキーとバリューの形式で使用することができる。

  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    // FormDataはフォームの情報を取得するメソッド
    var url = $(this).attr('action');
    // attrメソッドは要素が持つ指定属性の値を返す
    console.log(formData);
    console.log(url);
    $.ajax({
    url: url,
    // locationは現在開いているページの様々な情報を含んでいるオブジェクト。locationオブジェクトのhref属性を指定すると、指定したurlが取れる。
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    // processDataオプションはデフォルトではtrueになっており、dataに指定したオブジェクトをクエリ文字に変換する役割がある
    contentType: false
    // contentTypeオプションはサーバーにデータのファイル形式を伝えるヘッダ
    // text/xmlでコンテンツタイプをXMLとして返してくる
    // ajaxのリクエストがFormDataのときはどちらの値も適切な状態で送ることが可能なため、falseにすることで設定が上書きされることを防ぐ
    // FormDataを使用してフォームの情報を取得した時には必ずfalseにするという認識で良い
    })
    .done(function(data){
      console.log(data);
      // 非同期通信に成功した時の記述
      // function(data)となっている部分の第一引数はサーバーから返されたデータが入っている
      // この時サーバーから返ってくるデータは、jbuilderで作成したcreate.json.jbuilderのデータ
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.form__submit').prop('disabled', false);
      scroll()
    })
    .fail(function(){
      alert('error')
      $('.form__submit').prop('disabled', false);
    })
  });

  $(function(){
    setInterval(update, 5000);
  });
  function update(){
    if($('.messages')[0]){
      // var message_id = $('.messages .message:last').attr('id');
      var message_id = $('.message').last().attr('id');
      console.log(message_id);
    } else {
      // var message_id = 0
    }
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
        message: message_id
      },
      // processData: false,
      // contentType: false,
      dataType: 'json'
    })
    .done(function(data){
       console.log(data)
       // $('.fomr__submit').prop('disabled', false);
      // data.forEach(function(a){
      //   var html = buildHTML(a);
      //   $('.messages').append(html);
      // })
      $.each(data, function(i, data){
         console.log(data)
        var html = buildHTML(data);
        $('.messages').append(html);
      });
    });
  }
});














