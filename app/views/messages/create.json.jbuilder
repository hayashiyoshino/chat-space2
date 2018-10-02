json.image @message.image.url
json.user_name @message.user.name
json.content @message.content
json.time @message.created_at
json.id @message.id

# jbuilderファイルでは基本的にjson.KEY VALUEという形で書くことができる。
# こうすることによってJavaScriptファイルに返ってきたデータをjbuilderで定義したキーとバリューの形で呼び出して使うことができる。
