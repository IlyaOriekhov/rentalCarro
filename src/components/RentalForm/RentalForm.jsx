import { useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../utils/formatters";
import { getIconPath } from "../../utils/iconUtils";
import styles from "./RentalForm.module.css";
import sprite from "../../images/sprite.svg";

const RentalForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  const [selectedDate, setSelectedDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Використовуємо загальну утиліту для форматування дати
    setFormData({
      ...formData,
      bookingDate: formatDate(date),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Перевіряємо обов'язкові поля
    if (!formData.name || !formData.email || !selectedDate) {
      toast.error("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Імітуємо відправку даних
    setTimeout(() => {
      toast.success("Your booking has been sent successfully!");
      setFormData({
        name: "",
        email: "",
        comment: "",
      });
      setSelectedDate(null);
      setIsSubmitting(false);
    }, 1000);
  };

  // Кастомний хедер для дейтпікера
  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className={styles.calendarHeader}>
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        type="button"
        className={styles.navButton}
      >
        <svg width="16" height="16">
          <use href={getIconPath(sprite, "arr-up")} transform="rotate(270)" />
        </svg>
      </button>
      <div className={styles.monthSelector}>
        {date.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </div>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        type="button"
        className={styles.navButton}
      >
        <svg width="16" height="16">
          <use href={getIconPath(sprite, "arr-up")} transform="rotate(90)" />
        </svg>
      </button>
    </div>
  );

  return (
    <div className={styles.bookingFormContainer}>
      <h2 className={styles.formTitle}>Book your car now</h2>
      <p className={styles.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            className={styles.formInput}
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            className={styles.formInput}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.datePickerContainer}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd.MM.yyyy"
              placeholderText="Booking date*"
              className={styles.formInput}
              calendarClassName={styles.customCalendar}
              wrapperClassName={styles.datePickerWrapper}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              required
              renderCustomHeader={renderCustomHeader}
            />
            <span className={styles.calendarIcon}>
              <svg width="18" height="18">
                <use href={getIconPath(sprite, "calendar")}></use>
              </svg>
            </span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <textarea
            name="comment"
            placeholder="Comment"
            className={styles.formTextarea}
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default RentalForm;
