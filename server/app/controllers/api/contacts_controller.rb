module Api
  class ContactsController < ApplicationController
    before_action :set_contact, only: [:update, :destroy]

    # GET /api/contacts
    def index
      contacts = Contact.order(:name) # Order contacts by name
      render json: contacts, status: :ok
    end

    # POST /api/contacts
    def create
      contact = Contact.new(contact_params)
      if contact.save
        render json: contact, status: :created
      else
        Rails.logger.error("Failed to create contact: #{contact.errors.full_messages}")
        render json: { error: contact.errors.full_messages.to_sentence }, status: :unprocessable_entity
      end
    end

    # PUT /api/contacts/:id
    def update
      if @contact.update(contact_params)
        render json: @contact, status: :ok
      else
        Rails.logger.error("Failed to update contact: #{@contact.errors.full_messages}")
        render json: { error: @contact.errors.full_messages.to_sentence }, status: :unprocessable_entity
      end
    end

    # DELETE /api/contacts/:id
    def destroy
      if @contact.destroy
        render json: { message: 'Contact deleted successfully' }, status: :ok
      else
        Rails.logger.error("Failed to delete contact: #{@contact.errors.full_messages}")
        render json: { error: @contact.errors.full_messages.to_sentence }, status: :unprocessable_entity
      end
    end

    private

    # Find contact by ID
    def set_contact
      @contact = Contact.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Contact not found" }, status: :not_found
    end

    # Strong parameters for contact creation
    def contact_params
      params.require(:contact).permit(:name, :email)
    end
  end
end
