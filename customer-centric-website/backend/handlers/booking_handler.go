package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"customer-centric-website/backend/dto"
	"customer-centric-website/backend/services"
	"customer-centric-website/backend/utils"
)

func CreateBooking(c *gin.Context) {

	var request dto.BookingDTO//go allocates memory

	err := c.ShouldBindJSON(&request)

	if err != nil {
		fmt.Println("Bind Error:", err)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	err = utils.ValidateStruct(request)

	if err != nil {
		fmt.Println("Validation Error:", err)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	model := dto.BookingDTOToModel(request)

	err = services.CreateBooking(&model)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Booking failed",
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{

		"message": "Booking created successfully",

		"data": model,
	})

}
func GetBookings(c *gin.Context) {

	bookings, err := services.GetAllBookings()

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Unable to fetch bookings",
		})

		return
	}

	c.JSON(http.StatusOK, bookings)
}
func DeleteBooking(c *gin.Context) {

	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid ID",
		})

		return
	}

	err = services.DeleteBooking(uint(id))

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Unable to delete booking",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Booking deleted successfully",
	})
}
