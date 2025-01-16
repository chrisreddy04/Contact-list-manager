module Api
  class ContactsController < ApplicationController
    # POST /api/contacts
    def create
      contact = Contact.new(contact_params)
      if contact.save
        render json: contact, status: :created
      else
        render json: { errors: contact.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    # Strong parameters for contact creation
    def contact_params
      params.require(:contact).permit(:name, :email)
    end
  end
end
