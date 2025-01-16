module Api
  class ContactsController < ApplicationController
    before_action :set_contact, only: [:update]

     # GET /api/contacts
     def index
      contacts = Contact.all # Fetch all contacts from the database
      render json: contacts, status: :ok # Return the contacts as JSON
    end

    # POST /api/contacts
    def create
      contact = Contact.new(contact_params)
      if contact.save
        render json: contact, status: :created
      else
        render json: { errors: contact.errors.full_messages }, status: :unprocessable_entity
      end
    end

     #PUT
    def update
      if @contact.update(contact_params)
        render json: @contact, status: :ok
      else
        render json: { error: @contact.errors.full_messages.join(", ") }, status: :unprocessable_entity
      end
    end
    private

     # Find contact by ID
  def set_contact
    @contact = Contact.find_by(id: params[:id])
    render json: { error: "Contact not found" }, status: :not_found unless @contact
  end

    # Strong parameters for contact creation
    def contact_params
      params.require(:contact).permit(:name, :email)
    end
  end
end
