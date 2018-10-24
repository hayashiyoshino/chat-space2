
  json.array! @new_messages do |message|
    json.image message.content
    json.user_name message.user.name
    json.content message.content
    json.time message.created_at.to_s
    json.id message.id
    # json.created_at message.created_at.strftime('%Y/%m/%d %H:%M:%S')
  end

