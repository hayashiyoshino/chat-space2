$(function() {
  var search_list = $('#user-search-result');

  function appendUser(user) {
    var html = `<div class='chat-group-user clearfix'>
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class='user-search-add chat-group-user__btn chat-group-user__btn--add' data-user-id = ${ user.id } data-user-name = ${ user.name }>追加</a>
                </div>`;
    search_list.append(html);
  }

  function appendNoUser(user){
    var html = `<div class="chat-group-user clearfix id="chat-group-user-22">
                  <input name="group[user_ids][]" type="hidden" value="1">
                  <p class="chat-group-user__name">
                  <strong>Nothing such as user!!!</strong>
                  </p>
                </div>`
    search_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
    console.log(input);
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users){
      search_list.empty();
      if (users.length !== 0 && input.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }else{
        appendNoUser('一致する名前がありません');
      }
    })
    .fail(function(){
      alert('ユーザーの検索に失敗しました');
    })
  })

  var result_list = $("#chat-group-users")

  function addUser(name, id){
    var html = `<div class='chat-group-user clearfix id='chat-group-user-22'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn-remove js-remove-btn'>削除</a>
                </div>`
    result_list.append(html);
  }

  $("#user-search-result").on('click', '.user-search-add', function() {
    console.log(this);
    var name = $(this).data("user-name")
    var id = $(this).data("user-id")
    addUser(name, id)
    $(this).parent().remove();
  })
})




























