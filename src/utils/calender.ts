export const ToGoogleCalenderDate = (date: Date) => {
    return date.toISOString().replaceAll("-", "").replaceAll(":", "").replaceAll(".", "");
};
