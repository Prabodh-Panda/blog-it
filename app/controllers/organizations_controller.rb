# frozen_string_literal: true

class OrganizationsController < ApplicationController
  def index
    @organizations = Organization.all
  end

  def create
    organization = Organization.create(organization_params)
    organization.save!
    render_notice(t("successfully_created"))
  end

  private

    def organization_params
      params.require(:organization).permit(:name)
    end
end
