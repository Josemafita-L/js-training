package models

import "gorm.io/gorm"

type Slot struct {
	gorm.Model

	Date      string `json:"date"`
	Time      string `json:"time"`
	Available bool   `json:"available"`
}