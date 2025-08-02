# frozen_string_literal: true

class PdfsJob
  include Sidekiq::Job

  def perform(post_slug, user_id)
    post = Post.find_by!(slug: post_slug)

    content = ApplicationController.render(
      assigns: { post: },
      template: "posts/pdf/download",
      layout: "pdf"
    )

    pdf = WickedPdf.new.pdf_from_string(content)

    current_user = User.find(user_id)
    if current_user.pdf.attached?
      current_user.pdf.purge_later
    end
    current_user.pdf.attach(
      io: StringIO.new(pdf), filename: "export.pdf",
      content_type: "application/pdf")
    current_user.save
  end
end
