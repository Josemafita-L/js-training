package dto

type BookingDTO struct {
	FullName string `json:"full_name" validate:"required"`

	CompanyName string `json:"company_name"`

	Email string `json:"email" validate:"required,email"`

	Phone string `json:"phone" validate:"required"`

	Budget string `json:"budget"`

	Date string `json:"date" validate:"required"`

	Time string `json:"time" validate:"required"`

	Notes string `json:"notes"`

	SlotID uint `json:"slot_id"`
}
