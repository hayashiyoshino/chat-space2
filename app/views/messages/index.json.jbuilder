
  json.array! @new_messages do |message|
    json.id message.id
    json.content message.content
    json.image message.content
    json.user_name message.user.name
    json.created_at message.created_at.to_s
    # json.created_at message.created_at.strftime('%Y/%m/%d %H:%M:%S')
  end

