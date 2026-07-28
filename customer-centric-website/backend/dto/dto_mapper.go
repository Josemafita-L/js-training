package dto

import "customer-centric-website/backend/models"

func WebsiteDTOToModel(
	dto WebsiteRequestDTO,
) models.WebsiteRequest {

	return models.WebsiteRequest{

		FullName: dto.FullName,

		CompanyName: dto.CompanyName,

		Email: dto.Email,

		Phone: dto.Phone,

		Pages: dto.Pages,

		Features: dto.Features,

		Hosting: dto.Hosting,

		SEO: dto.SEO,

		Notes: dto.Notes,
	}

}

func BookingDTOToModel(
	dto BookingDTO,
) models.Booking {

	return models.Booking{

		FullName: dto.FullName,

		CompanyName: dto.CompanyName,

		Email: dto.Email,

		Phone: dto.Phone,

		Budget: dto.Budget,

		Date: dto.Date,

		Time: dto.Time,

		Notes: dto.Notes,

		SlotID: dto.SlotID,
	}

}
