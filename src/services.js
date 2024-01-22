const padTo2Digits = (num) => num.toString().padStart(2, '0');

export const formatDate = date => {
    const dateObj = new Date(date)
    return [
        padTo2Digits(dateObj.getDate()),
        padTo2Digits(dateObj.getMonth() + 1),
        dateObj.getFullYear().toString().substr(-2),
      ].join('/');
}