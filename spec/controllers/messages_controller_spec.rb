require 'rails_helper'

describe MessagesController do
  # 複数のexampleで同一のインスタンスを使いたい場合、letメソッドを利用
  # letメソッドは呼び出された際に初めて実行される、遅延評価という特徴を持っている
  # letメソッドは初回の呼び出し時のみ実行される
  # 複数回行われる処理を一度の処理で実装できるため、テストを高速にすることができる
  # また、一度実行された後は常に同じ値が返って来るため、テストで使用したいオブジェクトの定義に適している
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in' do
      # ログインしている場合
      # beforeブロックの内部に記述された処理は、各exampleが実行される直前に、毎回実行
      before do
        login user
        # loginメソッドは、/spec/support/controller_macros.rbで定義したもの
        get :index, params: { group_id: group.id }
        # 「擬似的にindexアクションを動かすリクエストを行う」ために、getメソッドを利用
        # messagesのルーティングはgroupsにネストされているため、group_idを含んだパスを生成する。そのため、getメソッドの引数として、params: { group_id: group.id }を渡している
      end

      it 'assigns @message' do
        # アクション内で定義しているインスタンス変数があるか
        # インスタンス変数に代入されたオブジェクトは、コントローラのassigns メソッド経由で参照
        # @messageを参照したい場合、assigns(:message)と記述
        # @messageはMessage.newで定義された新しいMessageクラスのインスタンス
        # be_a_newマッチャを利用することで、 対象が引数で指定したクラスのインスタンスかつ未保存のレコードであるかどうか確かめることができる
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        # アクション内で定義しているインスタンス変数があるか
        # @groupはeqマッチャを利用してassigns(:group)とgroupが同一であることを確かめることでテストできる
        expect(assigns(:group)).to eq group
      end

      it 'renders index' do
        # 該当するビューが描画されているか
        # responseは、example内でリクエストが行われた後の遷移先のビューの情報を持つインスタンス
        # マッチャは引数にアクション名を取り、引数で指定されたアクションがリクエストされた時に自動的に遷移するビューを返す
        expect(response).to render_template :index
      end
    end

    context 'not lon in' do
      # ログインしていない場合
      # beforeブロックの内部に記述された処理は、各exampleが実行される直前に、毎回実行
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirecrts to new_user_session_path' do
        # 意図したビューにリダイレクトできているか
        # redirect_toマッチャは引数にとったプレフィックスにリダイレクトした際の情報を返すマッチャ
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end

