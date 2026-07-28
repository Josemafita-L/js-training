package services

import (
	"customer-centric-website/backend/models"
	"customer-centric-website/backend/repository"
)

func CreateWebsiteRequest(
	request *models.WebsiteRequest,
) error {

	err := repository.CreateWebsiteRequest(request)

	return err

}
func GetAllWebsiteRequests() ([]models.WebsiteRequest, error) {

	return repository.GetAllWebsiteRequests()

}
func DeleteWebsiteRequest(id uint) error {

	return repository.DeleteWebsiteRequest(id)

}