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

ActiveRecord::Schema[7.0].define(version: 2022_12_14_073604) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "forum_comments", force: :cascade do |t|
    t.string "content"
    t.boolean "deleted", default: false
    t.bigint "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "forum_post_id"
    t.bigint "user_id"
    t.index ["forum_post_id"], name: "index_forum_comments_on_forum_post_id"
    t.index ["parent_id"], name: "index_forum_comments_on_parent_id"
    t.index ["user_id"], name: "index_forum_comments_on_user_id"
  end

  create_table "forum_posts", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "tags", default: [], array: true
    t.bigint "user_id"
    t.index ["user_id"], name: "index_forum_posts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "deleted", default: false
    t.string "password_digest"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "forum_comments", "forum_comments", column: "parent_id"
  add_foreign_key "forum_comments", "forum_posts", on_update: :cascade, on_delete: :cascade
  add_foreign_key "forum_comments", "users", on_update: :cascade, on_delete: :cascade
  add_foreign_key "forum_posts", "users", on_update: :cascade, on_delete: :cascade
end
