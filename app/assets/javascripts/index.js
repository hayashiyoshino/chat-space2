$(function() {

  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
    console.log(input);
    // $.ajax({
    //   type: 'GET',
    //   url: '/users',
    //   data: { keyword: input },
    //   dataType: 'json'
    // })

  })

})
