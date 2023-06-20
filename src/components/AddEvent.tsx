import React from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { CaretUp } from "@phosphor-icons/react";
import { format } from "date-fns";

interface IAddEventProps {
  day: Date;
  onAddEvent: (values: FormDetailsValues) => void;
  setIsDetailsActive: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormValues {
  title: string;
}

interface FormDetailsValues extends FormValues {
  location?: string;
  allDay?: boolean;
  starts?: Date;
  ends?: Date;
  repeat?: string;
  endRepeat?: string;
  reminders?: string[];
  notes?: string;
}

export const AddEvent: React.FC<IAddEventProps> = ({
  day,
  onAddEvent,
  setIsDetailsActive,
}) => {
  const formatedDay = format(day, "PP");

  const formValues: FormValues = {
    title: "",
  };

  const validationYupSchema = Yup.object({
    title: Yup.string().required(),
  });

  // function handleSubmit(
  //   values: FormDetailsValues,
  //   formik: FormikHelpers<FormValues>
  // ) {
  //   const newEvent = {
  //     title: values.title,
  //     allDay: values.allDay ?? true,
  //     starts: values.starts ?? day,
  //     ends: values.ends ?? day,
  //     repeat: values.repeat ?? "no-repeat",
  //     reminders: values.reminders ?? [],
  //     notes: values.notes ?? "",
  //   };
  //   updateCalendar({
  //     ...calendar,
  //   });
  //   formik.resetForm();
  //   setIsModalOpen(false);
  // }

  function handleOpenDetails() {
    setIsDetailsActive(true);
  }

  return (
    <div className="grid gap-4 relative p-6">
      <CaretUp
        weight="fill"
        size={42}
        color="#3A3943"
        className="absolute -top-6 left-1/2 -translate-x-1/2"
      />
      <h2 className="font-bold text-center text-white text-lg">
        New Event on {formatedDay}
      </h2>
      <Formik
        initialValues={formValues}
        validationSchema={validationYupSchema}
        onSubmit={(values) => onAddEvent(values)}
      >
        {(formik) => (
          <Form className="grid gap-5">
            <Field
              name="title"
              type="text"
              autoFocus={true}
              arial-label="Type here the event's name"
              className="rounded-md bg-gray py-2 px-3 text-white outline-blue"
            />

            <div className="grid grid-cols-2 gap-12">
              <button
                onClick={handleOpenDetails}
                type="button"
                className="text-white text-center font-bold bg-gray py-2 px-8 rounded-lg"
              >
                Edit Details...
              </button>
              <button
                type="submit"
                className="bg-blue disabled:opacity-70 text-center text-white font-bold py-2 rounded-lg"
                disabled={!formik.values.title.trim()}
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
