package config

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"//reads env file

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB//pointer to a db object

func ConnectDatabase() {

	err := godotenv.Load()

	if err != nil {
		log.Println("No .env file found")
	}

	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	name := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		user,
		password,
		host,
		port,
		name,
	)//go communicates with mysql

	database, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Database connection failed")
	}

	DB = database

	fmt.Println("Database connected successfully")

}
