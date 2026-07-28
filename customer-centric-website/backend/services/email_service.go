package services

import (
	"fmt"
	"net/smtp"
	"os"
)

const (
	smtpHost = "smtp.gmail.com"
	smtpPort = "587"
)

func SendBookingConfirmation(
	toEmail string,
	name string,
	date string,
	time string,
) error {

	senderEmail := os.Getenv("EMAIL")
	senderPassword := os.Getenv("APP_PASSWORD")

	subject := "Subject: Booking Confirmation\r\n"

	body := fmt.Sprintf(
		"Hello %s,\n\n"+
			"Your discovery call has been booked successfully.\n\n"+
			"Date: %s\n"+
			"Time: %s (IST)\n\n"+
			"Thank you for choosing Web Studio.\n\n"+
			"Regards,\n"+
			"Web Studio Team",
		name,
		date,
		time,
	)

	message := []byte(subject + "\r\n" + body)

	auth := smtp.PlainAuth(
		"",
		senderEmail,
		senderPassword,
		smtpHost,
	)
	fmt.Println("EMAIL:", senderEmail)
	fmt.Println("PASSWORD LENGTH:", len(senderPassword))
	return smtp.SendMail(
		smtpHost+":"+smtpPort,
		auth,
		senderEmail,
		[]string{toEmail},
		message,
	)

}
