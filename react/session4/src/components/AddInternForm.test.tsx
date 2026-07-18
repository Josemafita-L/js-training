import { render, screen, waitFor } from "../test/test-utils"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

import AddInternForm from "./AddInternForm"


describe("AddInternForm", () => {


  /*
  describe groups related tests together.

  Nested describe blocks make test failures easier
  to understand.

  Example:
  AddInternForm > validation > name required

  But too much nesting makes tests difficult to read.
  Two levels deep is usually enough.
  */


  describe("initial state", () => {


    test("name input is empty", () => {

      render(<AddInternForm />)


      expect(
        screen.getByPlaceholderText("Intern Name")
      )
      .toHaveValue("")
    })


    test("score input starts at 0", () => {

      render(<AddInternForm />)


      expect(
        screen.getByPlaceholderText("Score")
      )
      .toHaveValue(0)
    })


    test("role defaults to Frontend", () => {

      render(<AddInternForm />)


      expect(
        screen.getByRole("combobox")
      )
      .toHaveValue("Frontend")
    })

  })



  describe("validation", () => {


    test("shows error when name is empty on submit", async () => {

      const user = userEvent.setup()


      render(<AddInternForm />)


      await user.click(
        screen.getByRole("button", {
          name:"Add Intern"
        })
      )


      expect(
        screen.getByText("Name is required")
      )
      .toBeInTheDocument()

    })



    test("shows error when score is above 100", async()=>{

      const user=userEvent.setup()


      render(<AddInternForm />)



      await user.type(
        screen.getByPlaceholderText("Intern Name"),
        "Rahul"
      )


      await user.clear(
        screen.getByPlaceholderText("Score")
      )


      await user.type(
        screen.getByPlaceholderText("Score"),
        "150"
      )


      await user.click(
        screen.getByRole("button",{
          name:"Add Intern"
        })
      )



      expect(
        screen.getByText(
          "Score must be between 0 and 100"
        )
      )
      .toBeInTheDocument()

    })



    test("clears error after valid input", async()=>{

      const user=userEvent.setup()


      render(<AddInternForm />)


      await user.click(
        screen.getByRole("button",{
          name:"Add Intern"
        })
      )


      expect(
        screen.getByText("Name is required")
      )
      .toBeInTheDocument()



      await user.type(
        screen.getByPlaceholderText("Intern Name"),
        "Rahul"
      )



      await waitFor(()=>{

        expect(
          screen.queryByText(
            "Name is required"
          )
        )
        .not
        .toBeInTheDocument()

      })

    })


  })



  describe("successful submit",()=>{


    test("clears form after adding intern",async()=>{


      const user=userEvent.setup()



      render(<AddInternForm />)



      await user.type(
        screen.getByPlaceholderText("Intern Name"),
        "Rahul"
      )



      await user.clear(
        screen.getByPlaceholderText("Score")
      )


      await user.type(
        screen.getByPlaceholderText("Score"),
        "90"
      )



      await user.click(
        screen.getByRole("button",{
          name:"Add Intern"
        })
      )



      await waitFor(()=>{

        expect(
          screen.getByPlaceholderText(
            "Intern Name"
          )
        )
        .toHaveValue("")

      })

    })

  })

})