# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_08_02_124922) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug", null: false
    t.integer "organization_id", null: false
    t.index ["organization_id", "name"], name: "index_categories_on_organization_id_and_name", unique: true
    t.index ["organization_id", "slug"], name: "index_categories_on_organization_id_and_slug", unique: true
    t.index ["organization_id"], name: "index_categories_on_organization_id"
  end

  create_table "categories_posts", id: false, force: :cascade do |t|
    t.integer "post_id", null: false
    t.integer "category_id", null: false
    t.index ["category_id", "post_id"], name: "index_categories_posts_on_category_id_and_post_id"
    t.index ["post_id", "category_id"], name: "index_categories_posts_on_post_id_and_category_id", unique: true
  end

  create_table "data_migrations", primary_key: "version", id: :string, force: :cascade do |t|
  end

  create_table "organizations", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_organizations_on_name", unique: true
  end

  create_table "posts", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.integer "upvotes", default: 0, null: false
    t.integer "downvotes", default: 0, null: false
    t.boolean "is_bloggable", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug", null: false
    t.integer "user_id", null: false
    t.integer "organization_id", null: false
    t.string "status", default: "draft", null: false
    t.datetime "last_published_at"
    t.index ["organization_id"], name: "index_posts_on_organization_id"
    t.index ["slug"], name: "index_posts_on_slug", unique: true
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
    t.integer "organization_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "authentication_token"
    t.index ["organization_id"], name: "index_users_on_organization_id"
  end

  create_table "votes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "post_id", null: false
    t.string "vote_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id"], name: "index_votes_on_post_id"
    t.index ["user_id", "post_id"], name: "index_votes_on_user_id_and_post_id", unique: true
    t.index ["user_id"], name: "index_votes_on_user_id"
    t.index ["vote_type"], name: "index_votes_on_vote_type"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "categories", "organizations"
  add_foreign_key "posts", "organizations"
  add_foreign_key "posts", "users"
  add_foreign_key "users", "organizations"
  add_foreign_key "votes", "posts"
  add_foreign_key "votes", "users"
end
