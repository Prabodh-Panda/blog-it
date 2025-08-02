# frozen_string_literal: true

class PdfsJob
  include Sidekiq::Job

  def perform(post_slug, pdf_path)
    post = Post.find_by!(slug: post_slug)

    content = ApplicationController.render(
      assigns: { post: },
      template: "posts/pdf/download",
      layout: "pdf"
    )

    pdf_blob = WickedPdf.new.pdf_from_string(content)

    File.open(pdf_path, "wb") do |file|
      file.write(pdf_blob)
    end
  end
end
