import React from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { CaretUp } from "@phosphor-icons/react";
import { useCalendar } from "../context/DatesContext";

interface IAddEventProps {
  day: string;
}

interface FormValues {
  event: string;
}

export const AddEvent: React.FunctionComponent<IAddEventProps> = ({ day }) => {
  const { setIsModalOpen } = useCalendar();
  const formValues: FormValues = {
    event: "",
  };
  const validationYup = Yup.object({
    event: Yup.string().required(),
  });

  function handleSubmit(values: FormValues, formik: FormikHelpers<FormValues>) {
    console.log(values);
    formik.resetForm();
    setIsModalOpen(false);
  }

  return (
    <div className="grid gap-4 relative">
      <CaretUp
        weight="fill"
        size={42}
        color="#3A3943"
        className="absolute -top-12 left-1/2 -translate-x-1/2"
      />
      <h2 className="font-bold text-center text-white text-lg">
        New Event on {day}
      </h2>
      <Formik
        initialValues={formValues}
        validationSchema={validationYup}
        onSubmit={(values, formik) => handleSubmit(values, formik)}
      >
        {(formik) => (
          <Form className="grid gap-5">
            <Field
              name="event"
              type="text"
              autoFocus={true}
              arial-label="Type here the event's name"
              className="rounded-md bg-gray py-2 px-3 text-white outline-blue"
            />

            <div className="grid grid-cols-2 gap-12">
              <button
                type="button"
                className="text-white text-center font-bold bg-gray py-2 px-8 rounded-lg"
              >
                Edit Details...
              </button>
              <button
                type="submit"
                className="bg-blue disabled:opacity-70 text-center text-white font-bold py-2 rounded-lg"
                disabled={!formik.values.event.trim()}
              >
                Add
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
