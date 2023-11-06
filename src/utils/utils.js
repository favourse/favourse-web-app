export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const truncateFromMiddle = (fullStr = "", strLen, middleStr = "...") => {
  if (fullStr.length <= strLen) return fullStr;
  const midLen = middleStr.length;
  const charsToShow = strLen - midLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.substr(0, frontChars) +
    middleStr +
    fullStr.substr(fullStr.length - backChars)
  );
};

export const validateFormData = (data) => {
  let errors = {};

  // Name validation
  if (!data.name.trim()) errors.name = "Name is required";

  // Description validation
  if (!data.description.trim()) errors.description = "Description is required";

  // Date validations
  if (!data.start_date.trim()) errors.start_date = "Start date is required";
  if (!data.end_date.trim()) errors.end_date = "End date is required";

  // Time validations
  if (!data.start_time.trim()) errors.start_time = "Start time is required";
  if (!data.end_time.trim()) errors.end_time = "End time is required";

  // Location and event_banner validations
  if (!data.location.trim()) errors.location = "Location is required";
  // if (!data.event_banner.trim())
  //   errors.event_banner = "Event banner is required";

  // Capacity validation
  if (!data.capacity.trim() || isNaN(data.capacity))
    errors.capacity = "Capacity should be a valid number";

  // Ticket price validation
  if (!data.isFree) {
    if (!data.ticket_price.trim() || isNaN(data.ticket_price))
      errors.ticket_price = "Ticket price should be a valid number";
  }

  return errors;
};
