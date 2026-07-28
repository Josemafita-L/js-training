package models

import "time"

type WebsiteRequest struct {
	ID uint `gorm:"primaryKey"`

	FullName string `json:"full_name"`

	CompanyName string `json:"company_name"`

	Email string `json:"email"`

	Phone string `json:"phone"`

	Pages int `json:"pages"`

	Features string `json:"features"`

	Hosting string `json:"hosting"`

	SEO string `json:"seo"`

	Notes string `json:"notes"`

	CreatedAt time.Time
}
