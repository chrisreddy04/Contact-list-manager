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

     # GET /api/contacts
     def index
      contacts = Contact.all # Fetch all contacts from the database
      render json: contacts  # Return the contacts as JSON
    end

    private

    # Strong parameters for contact creation
    def contact_params
      params.require(:contact).permit(:name, :email)
    end
  end
end
