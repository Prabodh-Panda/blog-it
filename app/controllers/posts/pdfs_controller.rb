# frozen_string_literal: true

class Posts::PdfsController < ApplicationController
  before_action :load_post, only: [:create, :download]

  def create
    PdfsJob.perform_async(@post.slug, report_path.to_s)
    render_notice(t("in_progress", action: "PDF generation"))
  end

  def download
    if File.exist?(report_path)
      send_file(
        report_path,
        type: "application/pdf",
        filename: pdf_file_name,
        disposition: "attachment"
      )
    else
      render_error(t("not_found", entity: "PDF"), :not_found)
    end
  end

  private

    def load_post
      @post = Post.find_by!(slug: params[:post_slug])
    end

    def report_path
      @_report_path ||= Rails.root.join("tmp/#{pdf_file_name}")
    end

    def pdf_file_name
      "post_#{@post.slug}_export.pdf"
    end
end
