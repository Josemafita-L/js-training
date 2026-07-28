package services

import (
	"customer-centric-website/backend/models"
	"customer-centric-website/backend/repository"
	"fmt"
)

func CreateBooking(
	booking *models.Booking,
) error {

	err := repository.CreateBooking(booking)

	if err != nil {
		return err
	}

	err = SendBookingConfirmation(
		booking.Email,
		booking.FullName,
		booking.Date,
		booking.Time,
	)

	if err != nil {
		fmt.Println("Email sending failed:", err)
	}

	return nil
}

func GetAllBookings() ([]models.Booking, error) {
	return repository.GetAllBookings()
}

func DeleteBooking(id uint) error {
	return repository.DeleteBooking(id)
}
