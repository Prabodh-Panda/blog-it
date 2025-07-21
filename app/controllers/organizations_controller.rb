# frozen_string_literal: true

class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  def index
    @organizations = Organization.all
  end

  def create
    organization = Organization.create(organization_params)
    organization.save!
    render_notice(t("successfully_created", entity: "Organization"))
  end

  private

    def organization_params
      params.require(:organization).permit(:name)
    end
end
