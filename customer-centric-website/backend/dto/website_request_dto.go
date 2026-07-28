package dto

type WebsiteRequestDTO struct {
	FullName string `json:"full_name" validate:"required"`

	CompanyName string `json:"company_name"`

	Email string `json:"email" validate:"required,email"`

	Phone string `json:"phone" validate:"required"`

	Pages int `json:"pages" validate:"required,min=1"`

	Features string `json:"features"`

	Hosting string `json:"hosting"`

	SEO string `json:"seo"`

	Notes string `json:"notes"`
}
