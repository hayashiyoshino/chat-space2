class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  def index
  end

  def new
    @groups = Groups.new
    @group.users << current_user
  end
  # @group.users << current_userと記述することで、現在ログイン中のユーザーを新規作成したグループに追加している。


  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice:'グループを作成しました'
    else
      render :new
    end
  end
  renderはHTTPリクエストを送らず、該当するビューだけを表示する。
  redirect_toだとHTTPリクエストを送りそのレスポンスとして返ってくるビューを表示する。


  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to groups_path, notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end

  def set_group
    @group = Group.find(params[:id])
  end
end
