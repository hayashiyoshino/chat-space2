FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    # image File.open("#{Rails.root}/public/uploads/message/image/IMG_1619.jpg")
    user
    group
  end
end
