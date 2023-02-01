package entity

import (
	"testing"
	"time"

	"github.com/asaskevich/govalidator"
	. "github.com/onsi/gomega"
)

func TestUserNameNotBlank(t *testing.T) {
	g := NewGomegaWithT(t)

	user := Customer{
		Name:            "",
		ID_card:         "123123123",
		DOB:             time.Date(2021, 8, 15, 14, 30, 45, 100, time.Local),
		Phone:           "0643284596",
		GENDER_ID:       new(uint),
		GENDER:          Gender{},
		CAREER_ID:       new(uint),
		CAREER:          Career{},
		PREFIX_ID:       new(uint),
		PREFIX:          Prefix{},
		Email:           "chanwit@gmail.com",
		Password:        "111",
	}

	// ตรวจสอบด้วย govalidator
	ok, err := govalidator.ValidateStruct(user)

	// ok ต้องไม่เป็นค่า true แปลว่าต้องจับ error ได้
	g.Expect(ok).ToNot(BeTrue())

	// err ต้องไม่เป็นค่า nil แปลว่าต้องจับ error ได้
	g.Expect(err).ToNot(BeNil())

	// err.Error ต้องมี error message แสดงออกมา
	g.Expect(err.Error()).To(Equal("Name cannot be blank"))
}