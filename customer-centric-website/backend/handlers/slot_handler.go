package handlers

import (
	"net/http"
	"strconv"

	"customer-centric-website/backend/dto"
	"customer-centric-website/backend/models"
	"customer-centric-website/backend/services"

	"github.com/gin-gonic/gin"
)

func CreateSlot(c *gin.Context) {

	var slotDTO dto.SlotDTO

	if err := c.ShouldBindJSON(&slotDTO); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	slot := models.Slot{
		Date:      slotDTO.Date,
		Time:      slotDTO.Time,
		Available: true,
	}

	if err := services.CreateSlot(&slot); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, slot)
}

func GetSlots(c *gin.Context) {

	slots, err := services.GetAllSlots()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, slots)
}

func DeleteSlot(c *gin.Context) {

	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid ID",
		})
		return
	}

	if err := services.DeleteSlot(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.Status(http.StatusNoContent)
}
