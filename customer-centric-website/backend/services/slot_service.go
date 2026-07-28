package services

import (
	"customer-centric-website/backend/models"
	"customer-centric-website/backend/repository"
)

func CreateSlot(slot *models.Slot) error {
	return repository.CreateSlot(slot)
}

func GetAllSlots() ([]models.Slot, error) {
	return repository.GetAllSlots()
}

func DeleteSlot(id uint) error {
	return repository.DeleteSlot(id)
}
