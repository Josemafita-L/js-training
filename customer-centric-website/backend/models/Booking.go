package models

import "time"

type Booking struct {
	ID uint `gorm:"primaryKey"`

	FullName string `json:"full_name"`

	CompanyName string `json:"company_name"`

	Email string `json:"email"`

	Phone string `json:"phone"`

	Budget string `json:"budget"`

	Date string `json:"date"`

	Time string `json:"time"`

	Notes string `json:"notes"`


	SlotID uint `json:"slot_id"`

	CreatedAt time.Time
}