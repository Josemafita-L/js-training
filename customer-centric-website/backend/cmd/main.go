package main

import (
	"fmt"

	"github.com/gin-gonic/gin"

	"customer-centric-website/backend/config"

	"customer-centric-website/backend/models"

	"customer-centric-website/backend/routes"

	"github.com/gin-contrib/cors"
	
)

func main() {

	config.ConnectDatabase()//enters the config package
	config.DB.AutoMigrate(
		&models.WebsiteRequest{},
		&models.Booking{},
		&models.Slot{},
	)

	router := gin.Default()
	router.Use(cors.New(cors.Config{

		AllowOrigins: []string{
			"http://localhost:5173",
		},

		AllowMethods: []string{
			"GET",
			"POST",
			"PUT",
			"DELETE",
		},

		AllowHeaders: []string{
			"Origin",//metadata about the request
			"Content-Type",//data types
			"Authorization",//login tokens
		},
	}))
	routes.SetupRoutes(router)

	err := router.Run(":8080")

	if err != nil {
		fmt.Println("Server failed")
	}

}
