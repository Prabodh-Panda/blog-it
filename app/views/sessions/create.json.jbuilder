# frozen_string_literal: true

json.extract! @user,
  :id,
  :name,
  :authentication_token,
  :email
