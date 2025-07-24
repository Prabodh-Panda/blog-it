# frozen_string_literal: true

class OrganizationsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    @organizations = policy_scope(Organization)
  end

  def create
    organization = Organization.create(organization_params)
    authorize organization
    organization.save!
    render_notice(t("successfully_created", entity: "Organization"))
  end

  private

    def organization_params
      params.require(:organization).permit(:name)
    end
end
