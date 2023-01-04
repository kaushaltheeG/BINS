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

ActiveRecord::Schema[7.0].define(version: 2023_01_03_192245) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "direct_messages", force: :cascade do |t|
    t.string "name"
    t.bigint "workarea_id", null: false
    t.bigint "creator_id", null: false
    t.boolean "is_group", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_direct_messages_on_creator_id"
    t.index ["workarea_id"], name: "index_direct_messages_on_workarea_id"
  end

  create_table "memberships", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.boolean "status", default: true, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "membershipable_type"
    t.bigint "membershipable_id"
    t.index ["membershipable_type", "membershipable_id"], name: "membershipable_id_and_membershipable_type"
  end

  create_table "messages", force: :cascade do |t|
    t.text "body", null: false
    t.bigint "author_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "messageable_type"
    t.bigint "messageable_id"
    t.index ["author_id"], name: "index_messages_on_author_id"
    t.index ["messageable_type", "messageable_id"], name: "messageable_id_and_messageable_type"
  end

  create_table "pods", force: :cascade do |t|
    t.string "name", null: false
    t.string "description", null: false
    t.bigint "workarea_id", null: false
    t.bigint "admin_id", null: false
    t.boolean "private", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_pods_on_admin_id"
    t.index ["name"], name: "index_pods_on_name"
    t.index ["workarea_id", "name"], name: "index_pods_on_workarea_id_and_name", unique: true
    t.index ["workarea_id"], name: "index_pods_on_workarea_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "name", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  create_table "workareas", force: :cascade do |t|
    t.string "name", null: false
    t.bigint "owner_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image_url", default: "", null: false
    t.index ["owner_id"], name: "index_workareas_on_owner_id"
  end

  add_foreign_key "direct_messages", "users", column: "creator_id"
  add_foreign_key "direct_messages", "workareas"
  add_foreign_key "memberships", "users"
  add_foreign_key "messages", "users", column: "author_id"
  add_foreign_key "pods", "users", column: "admin_id"
  add_foreign_key "pods", "workareas"
  add_foreign_key "workareas", "users", column: "owner_id"
end
