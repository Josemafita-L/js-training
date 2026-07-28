package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"customer-centric-website/backend/dto"
	"customer-centric-website/backend/services"
	"customer-centric-website/backend/utils"
)

func CreateWebsiteRequest(c *gin.Context) {

	var request dto.WebsiteRequestDTO

	// Convert JSON body
	err := c.ShouldBindJSON(&request)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	// Validate DTO

	err = utils.ValidateStruct(request)

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	// Convert DTO to Model

	model := dto.WebsiteDTOToModel(request)

	// Save using service

	err = services.CreateWebsiteRequest(&model)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to save request",
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{

		"message": "Website request submitted successfully",

		"data": model,
	})

}

func GetWebsiteRequests(c *gin.Context) {

	requests, err := services.GetAllWebsiteRequests()

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Unable to fetch website requests",
		})

		return
	}

	c.JSON(http.StatusOK, requests)
}
func DeleteWebsiteRequest(c *gin.Context) {

	id, err := strconv.Atoi(c.Param("id"))

	if err != nil {

		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid ID",
		})

		return
	}

	err = services.DeleteWebsiteRequest(uint(id))

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Unable to delete request",
		})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Website request deleted successfully",
	})
}
