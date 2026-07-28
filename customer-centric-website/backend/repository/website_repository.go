package repository

import (
	"customer-centric-website/backend/config"
	"customer-centric-website/backend/models"
)

func CreateWebsiteRequest(
	request *models.WebsiteRequest,
) error {

	result := config.DB.Create(request)

	return result.Error

}
func GetAllWebsiteRequests() ([]models.WebsiteRequest, error) {

	var requests []models.WebsiteRequest

	err := config.DB.Find(&requests).Error

	return requests, err
}
func DeleteWebsiteRequest(id uint) error {

	result := config.DB.Delete(&models.WebsiteRequest{}, id)

	return result.Error
}
