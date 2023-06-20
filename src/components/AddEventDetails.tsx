import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { useState } from "react";

interface FormDetailsValues {
  title: string;
  location?: string | any;
  allDay?: boolean;
  starts?: Date;
  ends?: Date;
  repeat?: string;
  endRepeat?: string;
  reminders?: string[];
  notes?: string;
}

interface IEventDetailsProps {
  onCloseModal: () => void;
  onAddEvent: (values: FormDetailsValues) => void;
  day: Date;
}

export function AddEventDetails({
  onCloseModal,
  onAddEvent,
  day,
}: IEventDetailsProps) {
  const [isAllDay, setIsAllDay] = useState(true);
  const formatedDay = format(day, "PPPP");
  const validationYupSchema = Yup.object({
    title: Yup.string().required("Title mandatory"),
    location: Yup.string().default(""),
    allDay: Yup.boolean().default(true),
    starts: Yup.string().default(formatedDay),
    ends: Yup.string().default(formatedDay),
    repeat: Yup.string().default("no repeat"),
    reminders: Yup.array(Yup.string().default("Add a Reminder")),
    notes: Yup.string(),
  });

  const initialFormValues: FormDetailsValues = {
    title: "",
    location: "",
    allDay: true,
    starts: day,
    ends: day,
    repeat: "no repeat",
    reminders: [],
    notes: "",
  };
  const repeatList = [
    "no repeat",
    "daily",
    "monday - friday",
    "weekly",
    "monthly",
    "yearly",
  ];
  const remindersList = [
    "5 minutes",
    "10 minutes",
    "30 minutes",
    "1 hour",
    "1 day",
    "2 days",
    "3 days",
    "1 week",
  ];

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validationYupSchema}
      onSubmit={(values) => onAddEvent(values)}
    >
      {(formik) => {
        return (
          <Form
            method="post"
            className="relative w-full rounded-lg overflow-hidden"
          >
            <header className="bg-black-border p-2 z-10 w-full top-0 gap-28 flex items-center justify-evenly text-white font-semibold text-sm">
              <button
                type="button"
                onClick={onCloseModal}
                className="px-5 py-2 transition duration-300 hover:brightness-75 rounded-lg bg-gray"
              >
                Cancel
              </button>

              <h3 className="text-base">Unnamed event</h3>

              <button
                type="submit"
                className="px-5 py-2 mt transition duration-300 hover:brightness-75 rounded-lg bg-blue"
              >
                Done
              </button>
            </header>

            <div className="grid gap-5 py-4 px-6 bg-black text-white">
              <section className="rounded-lg overflow-hidden grid gap-px">
                <InputText name="title" value={formik.values.title} />
                <InputText name="location" value={formik.values.location} />
              </section>

              <section>
                <TitleInputs name="Schedule" />
                <div className="grid gap-px rounded-lg overflow-hidden">
                  <WrapperInput name="allDay">
                    <span className="text-sm">All Day</span>
                    <button
                      onClick={() => setIsAllDay(!isAllDay)}
                      type="button"
                      className={`relative w-12 h-6 rounded-full ${
                        isAllDay ? "bg-blue" : "bg-gray"
                      }`}
                    >
                      <Field
                        className={"absolute inset-0 opacity-0"}
                        type="checkbox"
                        name="allDay"
                        id="allDay"
                      />
                      <div
                        className={`pointer-events-none bg-gray-light w-6 h-full rounded-full transition-all duration-300 ${
                          isAllDay && "translate-x-6"
                        }`}
                      ></div>
                    </button>
                  </WrapperInput>

                  <WrapperInput name="starts">
                    <span className="text-sm">Starts</span>
                    <span className="capitalize text-sm text-white text-opacity-60">
                      {formatedDay}
                    </span>
                  </WrapperInput>

                  <WrapperInput name="ends">
                    <span className="text-sm">Ends</span>
                    <span className="capitalize text-sm text-white text-opacity-60">
                      {formatedDay}
                    </span>
                  </WrapperInput>

                  <WrapperInput name="repeat">
                    <span className="text-sm">Repeat</span>
                    <Field
                      as="select"
                      name="repeat"
                      id="repeat"
                      className="text-sm font-bold bg-gray p-2 rounded-lg border-none outline-0 capitalize"
                    >
                      {repeatList.map((repeat) => (
                        <option
                          key={repeat}
                          className="text-black"
                          value={repeat}
                        >
                          {repeat}
                        </option>
                      ))}
                    </Field>
                  </WrapperInput>
                </div>
              </section>

              <section>
                <TitleInputs name="Reminders" />
                <div className="rounded-lg overflow-hidden">
                  <Field
                    as="select"
                    name="reminders"
                    className="w-full bg-black-border text-center p-2 border-none outline-0"
                  >
                    <option value="add_reminder">Add a Reminder...</option>
                    {remindersList.map((reminder) => (
                      <option key={reminder} value={reminder}>
                        {reminder}
                      </option>
                    ))}
                  </Field>
                </div>
              </section>

              <section>
                <TitleInputs name="Notes" />
                <Field
                  as="textarea"
                  name="notes"
                  className="bg-black-border px-4 py-3 resize-none w-full h-28 rounded border-none outline-0"
                />
              </section>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

function InputText({ value, name }: { value: string; name: string }) {
  return (
    <div className={`p-2 relative w-full bg-gray`}>
      <Field
        type="text"
        autoFocus={name === "title" && true}
        id={name}
        name={name}
        className="peer bg-opacity-0 px-2 pt-3 outline-0 border-none text-white bg-black"
      />
      <label
        htmlFor={name}
        className={`
          absolute 
          ${value.trim() ? "top-1.5 text-xs" : "top-4 text-sm"}
          left-4 
          text-white 
          text-opacity-60 
          peer-focus:top-1.5
          peer-focus:text-xs
          cursor-text
          capitalize
          transition-all ease duration-200
        `}
      >
        {name}
      </label>
    </div>
  );
}

function TitleInputs({ name }: { name: string }) {
  return <h4 className="font-bold text-lg mb-2">{name}</h4>;
}

function WrapperInput({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  return (
    <label
      htmlFor={name}
      className={`relative flex items-center justify-between p-4 w-full bg-gray`}
    >
      {children}
    </label>
  );
}
