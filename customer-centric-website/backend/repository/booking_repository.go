package repository

import (
	"customer-centric-website/backend/config"
	"customer-centric-website/backend/models"

	"gorm.io/gorm"
)

func CreateBooking(
	booking *models.Booking,
) error {

	return config.DB.Transaction(func(tx *gorm.DB) error {

		// Save booking
		if err := tx.Create(booking).Error; err != nil {
			return err
		}

		// Mark slot as unavailable
		if err := tx.Model(&models.Slot{}).
			Where("id = ?", booking.SlotID).
			Update("available", false).Error; err != nil {
			return err
		}

		return nil
	})
}
func GetAllBookings() ([]models.Booking, error) {

	var bookings []models.Booking

	err := config.DB.Find(&bookings).Error

	return bookings, err
}
func DeleteBooking(id uint) error {

	result := config.DB.Delete(&models.Booking{}, id)

	return result.Error
}
