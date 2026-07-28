package dto

type SlotDTO struct {
	Date string `json:"date" binding:"required"`
	Time string `json:"time" binding:"required"`
}
