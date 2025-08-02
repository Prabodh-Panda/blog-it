# frozen_string_literal: true

class Posts::PdfsController < ApplicationController
  before_action :load_post, only: [:create, :download]

  def create
    PdfsJob.perform_async(@post.slug, @current_user.id)
    render_notice(t("in_progress", action: "PDF generation"))
  end

  def download
    unless @current_user.pdf.attached?
      render_error(t("not_found", entity: "Pdf"), :not_found) and return
    end

    send_data @current_user.pdf.download, filename: pdf_file_name, content_type: "application/pdf"
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
