$(function() {
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
  })
})
