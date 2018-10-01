$(function() {
  function buildHTML(message){
    var img ='';

    if ( message.image ){
      img = `<img src = "${ message.image }", class="lower-message__image">`
    };

    var html = `<div class="message">
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
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__message').val('');
      $('#button').prop('disabled', false);
    })
  })
})
