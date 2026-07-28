package services

func Login(email, password string) bool {

	return email == "admin@webstudio.com" &&
		password == "Admin@123"

}
