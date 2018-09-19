class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages

  accepts_nested_attributes_for :group_users, allow_destroy: true

  validates :name, presence: true

  # after_create :create_group_user

  def show_last_message
    if (last_message = messages.last).present?
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end

  # private
  # def create_group_user
  #   self.group_user = GroupUser.create(group_id: group_id, user_id: current_user.id, updated_at: updated_at)
  # end
end
