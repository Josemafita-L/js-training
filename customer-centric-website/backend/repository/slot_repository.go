package repository

import (
	"customer-centric-website/backend/config"
	"customer-centric-website/backend/models"
)

func CreateSlot(slot *models.Slot) error {
	return config.DB.Create(slot).Error
}

func GetAllSlots() ([]models.Slot, error) {
	var slots []models.Slot
	err := config.DB.Find(&slots).Error
	return slots, err
}

func DeleteSlot(id uint) error {
	return config.DB.Delete(&models.Slot{}, id).Error
}
