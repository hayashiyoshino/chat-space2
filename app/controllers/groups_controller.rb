class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]
  # グループの情報呼び出す処理はset_groupメソッドにまとめ、before_actionで呼び出す。

  def index
  end

  def new
    @group = Group.new
    @group.users << current_user
  end
  # @group.users << current_userと記述することで、現在ログイン中のユーザーを新規作成したグループに追加している。


  def create
    @group = Group.new(group_params)
    GroupUser.create(group_user_params)
    if @group.save
      redirect_to root_path, notice:'グループを作成しました'
    else
      flash.now[:alert] = "グループ名を入力してください"
      render :new
    end
  end
  # renderはHTTPリクエストを送らず、該当するビューだけを表示する。
  # redirect_toだとHTTPリクエストを送りそのレスポンスとして返ってくるビューを表示する。


  def edit
  end

  def update
    if @group.update(group_params)
      redirect_to groups_path, notice: 'グループを編集しました'
    else
      render :edit
    end
  end
  # グループが編集された時更新の可否に合わせた処理ができるように記述する。

  private
  def group_params
    params.require(:group).permit(:name, user_ids: [])
  end

  def group_user_params
    # params.require(:group).permit()
  end

  def set_group
    @group = Group.find(params[:id])
  end
  #まとめて書く
end
