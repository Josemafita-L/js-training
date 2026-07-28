package utils

import (
	"fmt"
	"net/smtp"
	"os"

	"customer-centric-website/backend/models"
)

func SendBookingConfirmation(booking models.Booking) error {

	from := os.Getenv("EMAIL_USER")
	password := os.Getenv("EMAIL_PASSWORD")

	to := []string{
		booking.Email,
	}

	smtpHost := "smtp.gmail.com"
	smtpPort := "587"

	subject := "Subject: Discovery Call Booking Confirmation\r\n"

	body := fmt.Sprintf(`
Hello %s,

Thank you for booking a discovery call with Web Studio.

Your booking has been confirmed successfully.

------------------------------------
Name    : %s
Company : %s
Date    : %s
Time    : %s
------------------------------------

Our team will contact you shortly.

Regards,
Web Studio Team
`,
		booking.FullName,
		booking.FullName,
		booking.CompanyName,
		booking.Date,
		booking.Time,
	)

	message := []byte(subject + "\r\n" + body)

	auth := smtp.PlainAuth(
		"",
		from,
		password,
		smtpHost,
	)

	err := smtp.SendMail(
		smtpHost+":"+smtpPort,
		auth,
		from,
		to,
		message,
	)

	return err
}
