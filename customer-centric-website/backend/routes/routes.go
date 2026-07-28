package routes

import (
	"customer-centric-website/backend/handlers"
	"customer-centric-website/backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {

	api := router.Group("/api")//route group

	api.POST(
		"/login",
		handlers.Login,
	)

	api.POST(
		"/website-request",
		handlers.CreateWebsiteRequest,
	)

	api.POST(
		"/bookings",
		handlers.CreateBooking,
	)
	api.POST("/slots", handlers.CreateSlot)
	api.GET("/slots", handlers.GetSlots)
	api.DELETE("/slots/:id", handlers.DeleteSlot)//id is a route parameter

	protected := api.Group("/")
	protected.Use(middleware.AuthMiddleware())//every route inside this group automatically gets authentication

	protected.GET(
		"/bookings",
		handlers.GetBookings,
	)

	protected.GET(
		"/website-request",
		handlers.GetWebsiteRequests,
	)

	protected.DELETE(
		"/bookings/:id",
		handlers.DeleteBooking,
	)

	protected.DELETE(
		"/website-request/:id",
		handlers.DeleteWebsiteRequest,
	)
}
