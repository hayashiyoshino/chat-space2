class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end

  # deviseでは初期状態でサインアップ時にメールアドレスとパスワードのみを受け取れるようにストロングパラメーターが設定してあるので、追加したキーは許可されていない。
  # ユーザーの名前のようなdeviseのデフォルトで設定されているカラム以外のデータを保存する場合は設定を追加しないといけない。
  # 追加のパラメーターを許可したい時は、application_controller.rbにおいてbefore_actionにconfigure_permitted_parametersメソッドを設定する。
end
