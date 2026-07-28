package handlers

import (
	//"fmt"
	"net/http"

	"customer-centric-website/backend/dto"
	"customer-centric-website/backend/services"
	"customer-centric-website/backend/utils"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {

	var request dto.LoginDTO

	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	if !services.Login(
		request.Email,
		request.Password,
	) {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Invalid credentials",
		})
		return
	}

	token, err := utils.GenerateToken(request.Email)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to generate token",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
	// fmt.Println("Email:", request.Email)
	// fmt.Println("Password:", request.Password)
}
