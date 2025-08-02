# frozen_string_literal: true

class PdfsJob
  include Sidekiq::Job

  def perform(post_slug, user_id)
    ActionCable.server.broadcast(user_id, { message: I18n.t("report.render"), progress: 25 })

    post = Post.find_by!(slug: post_slug)
    content = ApplicationController.render(
      assigns: { post: },
      template: "posts/pdf/download",
      layout: "pdf"
    )

    ActionCable.server.broadcast(user_id, { message: I18n.t("report.generate"), progress: 50 })

    pdf_report = WickedPdf.new.pdf_from_string(content)
    current_user = User.find(user_id)

    ActionCable.server.broadcast(user_id, { message: I18n.t("report.upload"), progress: 75 })

    if current_user.pdf.attached?
      current_user.pdf.purge_later
    end
    current_user.pdf.attach(
      io: StringIO.new(pdf_report), filename: "report.pdf",
      content_type: "application/pdf")
    current_user.save

    ActionCable.server.broadcast(user_id, { message: I18n.t("report.attach"), progress: 100 })
  end
end
