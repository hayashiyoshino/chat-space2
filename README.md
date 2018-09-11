# chat-space2

By Hayashi

Chat-space2 is an instant messaging and collaboration system.

## database design

## members table

|Column   |Type     |Options                       |
|---------|---------|------------------------------|
|user_id  |reference|null: false, foreign_key: true|
|group_id |reference|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



## user table

|Column   |Type   |Options                             |
|---------|-------|------------------------------------|
|name     |string |null: false                         |
|email    |string |null: false, add_index, unique: true|

### Association
- has_many :messages
- has_many :groups, through: :members



## groups table

|Column    |Type   |Option                              |
|----------|-------|------------------------------------|
|group_name|string |null: false, add_index, unique: true|

### Association
- has_many :messages
- has_many :users, through: :members



## messages table

|Column   |Type     |Option                        |
|---------|---------|------------------------------|
|body     |text     |null: false                   |
|image    |string   |                              |
|group_id |reference|null: false, foreign_key: true|
|user_id  |reference|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group







This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
